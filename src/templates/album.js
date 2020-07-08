import React from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import Banner from '../components/Banner'
import SectionBody from '../components/SectionBody'

const AlbumIndex = ({data, pageContext}) => {
    const { previousPagePath, nextPagePath } = pageContext;
    const albums = data.allMarkdownRemark.edges;

    return (
        <Layout>
            <Helmet
                title="FFWD 2019"
                meta={[
                    { name: 'description', content: 'FFWD' },
                    { name: 'keywords', content: 'FFWD' },
                ]}
            >
            </Helmet>

            <Banner />

            <div id="main">
                <section id="one" className="spotlights">
                    {albums.map((edge, index) => {
                        let album = edge.node.frontmatter
                        let featureImage = album.new_image.childImageSharp
                        return (
                            <section key={index}>
                                <div class="img-wrapper">
                                    <img
                                        src={featureImage.fluid.src}
                                        srcSet={featureImage.fluid.srcSet}
                                        sizes={featureImage.fluid.sizes}
                                        alt={album.title}
                                    />
                                </div>
                                <div class="content">
                                <div className="inner">
                                        <header className="major">
                                            <h3>{album.artist}</h3>
                                            <h3>{album.title}</h3>
                                        </header>
                                        <SectionBody content={album.content} />
                                        { album.apple_link.length > 0 &&
                                            <ul className="actions">
                                                <li><a href={album.apple_link} className="button">Apple Music</a></li>
                                            </ul>
                                        }
                                    </div>
                                </div>
                            </section>
                        );
                    })}
                </section>
                <div>
                    {previousPagePath ? <Link to={previousPagePath}>Previous</Link> : null}
                    {nextPagePath ? <Link to={nextPagePath}>Next</Link> : null}
                </div>
            </div>

        </Layout>
    )
};

export const query = graphql`
    query($skip: Int!, $limit: Int!) {
        allMarkdownRemark(
            sort: {fields: frontmatter___published_date, order: DESC}
            skip: $skip
            limit: $limit
            ) {
            edges {
              node {
                frontmatter {
                    apple_link
                    artist
                    title
                    content
                    link
                    published_date(formatString: "Y-MM-DD")
                    new_image {
                        childImageSharp {
                            fluid(maxWidth: 800, maxHeight: 800) {
                                ...GatsbyImageSharpFluid
                            }
                        }
                    }
                }
              }
            }
        }          
    }
`

export default AlbumIndex;