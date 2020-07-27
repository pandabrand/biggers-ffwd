import React from 'react'
import { graphql, Link } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import Banner from '../components/Banner'
import SectionBody from '../components/SectionBody'
import next from '../assets/images/ffwd__nxt.svg';
import prev from '../assets/images/ffwd__prv.svg';

const HomeIndex = ({data, pageContext}) => {
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
                        let featureImage = album.new_image
                        return (
                            <section key={index}>
                                <a href={album.link} className="image">
                                    <div class="img-wrapper">
                                        { featureImage != null &&
                                            <img
                                                src={featureImage.childImageSharp.fluid.src}
                                                srcSet={featureImage.childImageSharp.fluid.srcSet}
                                                sizes={featureImage.childImageSharp.fluid.sizes}
                                                alt={album.title}
                                            />
                                        }
                                    </div>
                                </a>
                                <div class="content">
                                    <div className="inner">
                                        <header className="major">
                                            <h3>{album.artist}</h3>
                                            <h3>{album.title}</h3>
                                        </header>
                                        <SectionBody content={album.content} />
                                        { album.apple_link != null &&
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
                <div className="pagination">
                    {previousPagePath ? <Link to={previousPagePath} className="link" ><img src={prev} alt="previous" className="arrows" />Previous</Link> : <div className="text" ><img src={prev} alt="previous" className="arrows" />Previous</div>}
                    {nextPagePath ? <Link to={nextPagePath} className="link" >Next<img src={next} alt="next" className="arrows" /></Link> : <div className="text" >Next<img src={next} alt="next" className="arrows" /></div>}
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

export default HomeIndex;