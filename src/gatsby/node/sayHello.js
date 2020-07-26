const YAML = require('pumlhorse-yamljs');
let Git = require('nodegit');
const path = require('path')
const fs = require('fs')

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
          concat_array.push(slugged_title + '-' + commit.date().toISOString() + '.md')
          album['publish_date'] = commit.date().toISOString()
          console.log(album)
        }
        return concat_array
      }

      const finish_array = await processAlbums(yaml_object.albums, blame, album_array)
      res.send(finish_array)
    } catch (error) {
      console.error(error)
    }
    // Git.Repository.open(pathToRepo).then(function(repo) {
    //   console.log('repo: ', repo)
    //   Git.Blame.file(repo, yaml_file_path, '-p').then(function(blame) {
    //     YAML.parseFile(yaml_file_path, ((yaml_object) => {
    //       yaml_object.albums.forEach(album => {
    //         let lineno = album.getLineNumber()
    //         console.log('line number: ', lineno)
    //         let hunk = blame.getHunkByLine(lineno)
    //         let commitId = hunk.finalCommitId()
    //         console.log('album line commit: ', commitId.toString().substring(0, 8));
    //         Git.Commit.lookup(repo, commitId).then(function(commit) {
    //           console.log('commit time: ', commit.date())
    //           album_array += album.title + ', ' + commit.date
    //         })
    //       })
    //       res.send(album_array)
    //     }))
    //   })
    // })
  })
}