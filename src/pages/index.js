import React from 'react'
import { Link } from 'gatsby'
import Helmet from 'react-helmet'
import Layout from '../components/layout'
import Banner from '../components/Banner'

import pic08 from '../assets/images/pic08.jpg'
import pic09 from '../assets/images/pic09.jpg'
import pic10 from '../assets/images/pic10.jpg'

import albumYAML from '../../albums.yaml';
import SectionBody from '../components/SectionBody'

class HomeIndex extends React.Component {
    render() {

        return (
            <Layout>
                <Helmet
                    title="FFWD 2019"
                    meta={[
                        { name: 'description', content: 'Nunya' },
                        { name: 'keywords', content: 'nunya, bidness' },
                    ]}
                >
                </Helmet>

                <Banner />

                <div id="main">
                    <section id="one" className="spotlights">
                        {albumYAML.albums.map((album, index) => {
                            return (
                                <section key={index}>
                                    <a href={album.link} className="image">
                                        <img src={pic08} alt="" />
                                    </a>
                                    <div className="content">
                                        <div className="inner">
                                            <header className="major">
                                                <h3>{album.artist}</h3>
                                                <h3>{album.title}</h3>
                                            </header>
                                            <SectionBody content={album.content} />
                                            <ul className="actions">
                                                <li><a href={album.link} className="button">Apple Music</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </section>
                            );
                        })}
                        <section>
                            <Link to="/generic" className="image">
                                <img src={pic08} alt="" />
                            </Link>
                            <div className="content">
                                <div className="inner">
                                    <header className="major">
                                        <h3>Orci maecenas</h3>
                                    </header>
                                    <p>Nullam et orci eu lorem consequat tincidunt vivamus et sagittis magna sed nunc rhoncus condimentum sem. In efficitur ligula tate urna. Maecenas massa sed magna lacinia magna pellentesque lorem ipsum dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et sagittis tempus.</p>
                                    <ul className="actions">
                                        <li><Link to="/generic" className="button">Apple Music</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                        <section>
                            <Link to="/generic" className="image">
                                <img src={pic09} alt="" />
                            </Link>
                            <div className="content">
                                <div className="inner">
                                    <header className="major">
                                        <h3>Rhoncus magna</h3>
                                    </header>
                                    <p>Nullam et orci eu lorem consequat tincidunt vivamus et sagittis magna sed nunc rhoncus condimentum sem. In efficitur ligula tate urna. Maecenas massa sed magna lacinia magna pellentesque lorem ipsum dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et sagittis tempus.</p>
                                    <ul className="actions">
                                        <li><Link to="/generic" className="button">Apple Music</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                        <section>
                            <Link to="/generic" className="image">
                                <img src={pic10} alt="" />
                            </Link>
                            <div className="content">
                                <div className="inner">
                                    <header className="major">
                                        <h3>Sed nunc ligula</h3>
                                    </header>
                                    <p>Nullam et orci eu lorem consequat tincidunt vivamus et sagittis magna sed nunc rhoncus condimentum sem. In efficitur ligula tate urna. Maecenas massa sed magna lacinia magna pellentesque lorem ipsum dolor. Nullam et orci eu lorem consequat tincidunt. Vivamus et sagittis tempus.</p>
                                    <ul className="actions">
                                        <li><Link to="/generic" className="button">Apple Music</Link></li>
                                    </ul>
                                </div>
                            </div>
                        </section>
                    </section>
                </div>

            </Layout>
        )
    }
}

export default HomeIndex