import React from 'react'
import axios from 'axios'
import Layout from '../containers/Layout'
import ContactPage from './contact'
import Header from '../components/Header'
import SinglePost from '../components/SinglePost'

const domain = 'https://numie.ghost.io'
let page = 1
export default class Blog extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      posts: null,
      populatePosts: []
    }

    this.processPosts = this.processPosts.bind(this)
    this.loadMore = this.loadMore.bind(this)
  }

  componentDidMount () {
    this.makeARequest()
  }

  processPosts = () => {
    let populatePosts = this.state.populatePosts
    this.state.posts.map((post, i) => {
      populatePosts.push( 
        <SinglePost
          key={i}
          id={post.id}
          title={post.title}
          image={post.image}
          html={post.html}
        />
      )
    })

    this.setState({
      populatePosts
    })
  }

  makeARequest = () => {
    axios.get('/fetchposts?page=' + page)
      .then((response) => {
        this.setState({
          posts: response.data.posts
        }, this.processPosts)
        page++
      })
      .then((error) => {
        if (error) {
          console.log('error')
          console.log(error)
        }
      })
  }

  loadMore = () => {
    this.makeARequest()
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
              { this.state.populatePosts }
            </section>
            <div id="load-more" onClick={this.loadMore}>
              <a>LOAD MORE <br /> + </a>
            </div>
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