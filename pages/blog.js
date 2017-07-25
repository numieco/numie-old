import React from 'react'
import Layout from '../containers/Layout'
import Header from '../components/Header'
import ContactPage from './contact'

export default class Blog extends React.Component {
  constructor (props) {
    super (props)
  }

  render () {
    return (
      <div className='blog-page'>
        <Layout>
          <Header defaultLogo='black' />
          <ContactPage />
          <div className='blog-page-main-section main-page-revealer'>
            <header>
              <div className="hero" id="heading">
                <h1 className="title">NUMIE BLOG</h1>
                <h2 className="subtitle">
                  A curated collection of self-published articles
                  written by the Numie team for you to enjoy.
                  
                </h2>
              </div>
            </header>
            <section className="section" id="featured">
              <div className="container">
                <h2 className="featured-title">Numie is Google Certified</h2>
                <p className="featured-desc">
                  We're a multicultural, internationally based team
                  of designers, developers, and marketers who live
                  and breathe creating products that push the
                  boundaries.
                </p>
              </div>
              <div className="btn-container"><a className="read-btn featured-btn">READ POST</a></div>
            </section>
            <div className="tabs is-centered is-fullwidth" id="category-bar">
              <ul>
                <li><a>DESIGN</a></li>
                <li><a>DEVELOPMENT</a></li>
                <li><a>MARKETING</a></li>
                <li><a>PEOPLE</a></li>
                <li><a>COMPANY</a></li>
              </ul>
            </div>
            <section id="posts">
              <div className="post columns">
                <div className="column is-half"><img src="static/images/blog/forest.jpg" alt="" /></div>
                <div className="column is-half" id="post-container">
                  <h2 className="post-title">Why Remote Teams Thrive</h2><span className="post-category"># COMPANY</span>
                  <p className="post-content">
                    Tofu typewriter microdosing, plaid tumblr palo
                    santo bushwick kale chips gentrify humblebrag
                    hashtag swag. Small batch cred plaid, four loko
                    brooklyn pug raw denim. Small batch cred plaid,
                    four loko brooklyn pug raw denim.
                  </p>
                  <div className="btn-container">
                    <a className="read-btn post-btn">READ MORE</a>
                  </div>
                </div>
              </div>
              <div className="post columns">
                <div className="column is-half"><img src="static/images/blog/fireworks.png" alt="" /></div>
                <div className="column is-half" id="post-container">
                  <h2 className="post-title">Why Remote Teams Thrive</h2><span className="post-category"># COMPANY</span>
                  <p className="post-content">
                    Tofu typewriter microdosing, plaid tumblr palo
                    santo bushwick kale chips gentrify humblebrag
                    hashtag swag. Small batch cred plaid, four loko
                    brooklyn pug raw denim. Small batch cred plaid,
                    four loko brooklyn pug raw denim.
                  </p>
                  <div className="btn-container"><a className="read-btn post-btn">READ MORE</a></div>
                </div>
              </div>
              <div className="post columns">
                <div className="column is-half"><img src="static/images/blog/watch.jpg" alt="" /></div>
                <div className="column is-half" id="post-container">
                  <h2 className="post-title">Why Remote Teams Thrive</h2><span className="post-category"># COMPANY</span>
                  <p className="post-content">
                    Tofu typewriter microdosing, plaid tumblr palo
                    santo bushwick kale chips gentrify humblebrag
                    hashtag swag. Small batch cred plaid, four loko
                    brooklyn pug raw denim. Small batch cred plaid,
                    four loko brooklyn pug raw denim.
                  </p>
                  <div className="btn-container"><a className="read-btn post-btn">READ MORE</a></div>
                </div>
              </div>
              <div className="post columns">
                <div className="column is-half"><img src="static/images/blog/fireworks.png" alt="" /></div>
                <div className="column is-half" id="post-container">
                  <h2 className="post-title">Why Remote Teams Thrive</h2><span className="post-category"># COMPANY</span>
                  <p className="post-content">
                    Tofu typewriter microdosing, plaid tumblr palo
                    santo bushwick kale chips gentrify humblebrag
                    hashtag swag. Small batch cred plaid, four loko
                    brooklyn pug raw denim. Small batch cred plaid,
                    four loko brooklyn pug raw denim.
                  </p>
                  <div className="btn-container"><a className="read-btn post-btn">READ MORE</a></div>
                </div>
              </div>
              <div className="post columns">
                <div className="column is-half"><img src="static/images/blog/mountains.jpg" alt="" /></div>
                <div className="column is-half" id="post-container">
                  <h2 className="post-title">Why Remote Teams Thrive</h2><span className="post-category"># COMPANY</span>
                  <p className="post-content">
                    Tofu typewriter microdosing, plaid tumblr palo
                    santo bushwick kale chips gentrify humblebrag
                    hashtag swag. Small batch cred plaid, four loko
                    brooklyn pug raw denim. Small batch cred plaid,
                    four loko brooklyn pug raw denim.
                  </p>
                  <div className="btn-container"><a className="read-btn post-btn">READ MORE</a></div>
                </div>
              </div>
            </section>
            <div id="load-more"><a>LOAD MORE <br /> + </a></div>
            <footer className="footer">
              <div id="subscribe">
                <h3 className="sub-tagline">
                  Fresh articles of fascinating
                  things delivered to your inbox.
                </h3>
                <form className="box field" id="sub-btn">
                  <p className="control">
                    <input className="input" type="email" placeholder="Your email" />
                  </p>
                  <button className="button is-white" type="submit">SUBSCRIBE</button>
                </form>
                <small className="sub-promise">
                  <div>No spam. No ads. No selfies. We promise.</div>
                </small>
              </div>
              <hr />
              <div id="social">
                <h4 id="numie-title">NUMIE STUDIO</h4>
                <span id="numie-email">yo@numie.co</span>
                <a href="#">GO UP</a>
              </div>
            </footer>
          </div>
        </Layout>
      </div>
    )
  }
}