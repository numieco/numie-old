import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import Layout from '../containers/Layout'
import ContactPage from './contact'
import Header from '../components/Header'
import Footer from '../components/Footer'
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

  componentWillMount () {
    this.makeARequest()
  }

  componentWillUnmount () {
    page = 1
  }

  processPosts = () => {
    let populatePosts = this.state.populatePosts
    this.state.posts.map((post, i) => {
      populatePosts.push(
        <Link
          key={ i }
          href={{ pathname: '/_individualBlog', query: {
            slug:  post.slug
          }}}
          as={ '/blog/' + post.slug }>
            <a className='post columns'>
              <SinglePost
                key={ i }
                id={ post.id }
                title={ post.title }
                image={ post.image }
                html={ post.html }
                tag={ post.tags }
                author={ post.author }
                slug={ post.slug }
                published={ post.published_at }
              />
            </a>
        </Link>
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
      })
      .catch((error) => {
        if (error) {
          console.log('error')
        }
      })
  }

  loadMore = () => {
    page++
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
              MORE <br /> <span>+</span>
            </div>

            <Footer />
          </div>
        </Layout>
      </div>
    )
  }
}
