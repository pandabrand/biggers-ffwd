import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import Banner from '../components/Banner'

import SectionBody from '../components/SectionBody'

const HomeIndex = ({data}) => {
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
                    {data.allMarkdownRemark.nodes.map((node, index) => {
                        let album = node.frontmatter
                        let featureImage = album.new_image
                        return (
                            <section key={index}>
                                <a href={album.link} className="image">
                                    <div class="img-wrapper">
                                        {
                                            featureImage != null &&
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
                    {/* data.dataYaml.albums.map((album, index) => {
                        const newLocal = album.image.childImageSharp
                        let featuredImgFluid = newLocal
                        return (
                            <section key={index}>
                                <a href={album.link} className="image">
                                    <div className="img-wrapper">
                                        <img
                                            src={featuredImgFluid.fluid.src}
                                            srcSet={featuredImgFluid.fluid.srcSet}
                                            sizes={featuredImgFluid.fluid.sizes}
                                            alt={album.title}
                                        />
                                    </div>
                                </a>
                                <div className="content">
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
                    })*/}
                </section>
            </div>

        </Layout>
    )
}
export const query = graphql`
query {
    allMarkdownRemark(sort: {fields: frontmatter___published_date}) {
        nodes {
            frontmatter {
                title
                published_date
                content
                link
                new_image {
                    childImageSharp {
                        fluid(maxWidth: 800, maxHeight: 800) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
                artist
                apple_link
            }
        }
    }
}
`
export default HomeIndex