import React from 'react'
import axios from 'axios'
import Layout from '../containers/Layout'
import ContactPage from './contact'
import Header from '../components/Header'
import SinglePost from '../components/SinglePost'

import FacebookSvg from '../components/SVG/FacebookSvg'
import InstagramSvg from '../components/SVG/InstagramSvg'
import TwitterSvg from '../components/SVG/TwitterSvg'
import GithubSvg from '../components/SVG/GithubSvg'

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
          tag={post.tags}
          author={post.author}
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
          <Header defaultLogo='white' />
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

            <section id="posts">
              { this.state.populatePosts }
            </section>
            <div id="load-more" onClick={this.loadMore}>
              MORE <br /> +
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
                  <div className="subscribe-button button is-white">
                    SUBSCRIBE
                  </div>
                </form>
                <div className="sub-promise">
                  <div>No spam. No ads. No selfies. We promise.</div>
                </div>
              </div>
              <div className="social">
                <div className="numie-title">NUMIE STUDIO</div>
                <div className="numie-email">yo@numie.co</div>
                <div className='social-buttons'>
                  <InstagramSvg />
                  <TwitterSvg />
                  <FacebookSvg />
                  <GithubSvg />
                </div>
                <div className='go-up'>GO UP</div>
              </div>
            </footer>
          </div>
        </Layout>
      </div>
    )
  }
}