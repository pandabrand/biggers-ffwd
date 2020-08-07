const YAML = require('pumlhorse-yamljs');
let Git = require('nodegit');
const path = require('path')
const fs = require('fs')
let remark = require('remark')
let styleGuide = require('remark-preset-lint-markdown-style-guide')

module.exports = ({ app }) => {
  app.get('/hello', async function( req, res ) {
    try {
      let yaml_file_path = 'src/data/albums.yaml'
      let pathToRepo = path.resolve('./')
      let album_array = []

      const repo = await Git.Repository.open(pathToRepo)
      const blame = await Git.Blame.file(repo, yaml_file_path, '-p' )
      const yaml_object = await YAML.parseFile(yaml_file_path)

      async function processAlbums(albums, blame_obj, concat_array) {
        for( const album of albums ) {
          const lineno = album.getLineNumber()
          const commitID = blame_obj.getHunkByLine(lineno).finalCommitId()
          let commit = await Git.Commit.lookup(repo, commitID)
          slugged_title = album.title.toLowerCase().replace(/[^a-z0-9]+/gi, '-')
          album_file_name = slugged_title + '-' + commit.date().toISOString() + '.md'
          concat_array.push(album_file_name)
          album['new_image'] = album.image.toString()
          album['published_date'] = commit.date().toISOString()
          raw_content = album.content
          md_content = String((raw_content && raw_content.length > 0 && raw_content != '\n' ) ? remark().use(styleGuide).processSync(raw_content) : '')
          album.content = md_content
          delete album.image
          delete album.album
          album_md = '---\n' + YAML.dump(album) + '---'
          fs.writeFileSync(path.resolve('data/albums/' + album_file_name), album_md)
        }
        return concat_array
      }

      const finish_array = await processAlbums(yaml_object.albums, blame, album_array)
      res.send(finish_array)
    } catch (error) {
      console.error(error)
    }
  })
}