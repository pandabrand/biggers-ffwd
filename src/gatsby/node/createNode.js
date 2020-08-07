const { fmImagesToRelative } = require('gatsby-remark-relative-images');

module.exports = ({node}) => {
  fmImagesToRelative(node)
}