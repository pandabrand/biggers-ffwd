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
                <div style={{color: '#000', fontSize: '1.5rem', display: 'flex', justifyContent: 'space-between'}}>
                    {previousPagePath ? <Link to={previousPagePath} style={{margin: '25px', display: 'flex', alignItems: 'center', fontWeight: 'bold'}} ><img src={prev} alt="" height="75px" style={{margin: '0 15px'}} />Previous</Link> : <div style={{margin: '25px', display: 'flex', alignItems: 'center', fontWeight: 'bold'}} ><img src={prev} alt="" height="75px" style={{margin: '0 15px', opacity: '0.3'}} />Previous</div>}
                    {nextPagePath ? <Link to={nextPagePath} style={{margin: '25px', display: 'flex', alignItems: 'center', fontWeight: 'bold'}} >Next<img src={next} alt="" height="75px" style={{margin: '0 15px'}} /></Link> : <div style={{margin: '25px', display: 'flex', alignItems: 'center', fontWeight: 'bold'}} >Next<img src={next} alt="" height="75px" style={{margin: '0 15px', opacity: '0.3'}} /></div>}
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