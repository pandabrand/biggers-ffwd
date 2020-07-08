const { paginate } = require('gatsby-awesome-pagination');
const path = require('path');

module.exports = async ({graphql, actions}) => {
  const { createPage } = actions;

  const albums = await graphql(
      `
        {
          allMarkdownRemark(sort: {fields: frontmatter___published_date, order: DESC}) {
            edges {
              node {
                frontmatter {
                  apple_link
                  artist
                  title
                  content
                  link
                  published_date(formatString: "Y-MM-DD")
                }
              }
            }
          }          
        }
      `
    );


  paginate({
    createPage,
    component: path.resolve('./src/templates/album.js'),
    items: albums.data.allMarkdownRemark.edges,
    itemsPerPage: 2,
    itemsPerFirstPage: 1,
    pathPrefix: "/album",
    context: {
      skip: 0,
      limit: 2
    }
  });
}