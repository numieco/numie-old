import React from 'react'
import axios from 'axios'

import Layout from '../containers/Layout'
import ContactPage from './contact'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SinglePost from '../components/SinglePost'

let mainPost = []
export default class IndividualBlog extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      id: '',
      title: '',
      image: '',
      html: '',
      tag: [],
      author: '',
      slug: '',
      published: new Date(),
      mainPost: []
    }

  }

  componentWillMount () {

  }

  componentDidMount () {
    if (this.props.url.query.id == undefined) {
      this.makeARequest()
    }
  }

  makeARequest = () => {
    axios.get('/fetch-single-post?slug=' + window.location.href.slice(window.location.href.lastIndexOf('/blog/')+6))
      .then((response) => {
        this.setState({
          id: response.data.posts[0].id,
          title: response.data.posts[0].title,
          image: response.data.posts[0].image,
          html: response.data.posts[0].html,
          tag: response.data.posts[0].tags,
          author: response.data.posts[0].author,
          slug: response.data.posts[0].slug,
          published: response.data.posts[0].published_at
        }, () => {
          mainPost.push(
            <SinglePost
              key={0}
              id={ this.state.id }
              title={ this.state.title }
              image={ this.state.image }
              html={ this.state.html }
              tag={ this.state.tag }
              author={ this.state.author }
              slug={ this.state.slug }
              published={ this.state.published }
            />
          )

          this.setState({
            mainPost
          }, () => mainPost = [])
        })
      })
      .catch((error) => {
        if (error) {
          console.log('error')
        }
      })
  }

  render () {
    return (
      <div className='individual-blog'>
        <Layout>
          <Header defaultLogo='white' />
          <ContactPage />
          <div className='main-page-revealer individual-blog-main-section'>
            <div className='single-blog'>
            { mainPost }
            </div>
            <div className='more-blogs'>
              <div className='title'>
                ARTICLES YOU WILL ENJOY
              </div>
              <div id='posts'>
                <div className='post columns'>
                <SinglePost
                  id={ this.state.id }
                  title={ this.state.title }
                  image={ this.state.image }
                  html={ this.state.html }
                  tag={ this.state.tag }
                  author={ this.state.author }
                  slug={ this.state.slug }
                />
                </div>
                <div className='post columns'>
                <SinglePost
                  id={ this.state.id }
                  title={ this.state.title }
                  image={ this.state.image }
                  html={ this.state.html }
                  tag={ this.state.tag }
                  author={ this.state.author }
                  slug={ this.state.slug }
                />
                </div>
                <div className='post columns'>
                <SinglePost
                  id={ this.state.id }
                  title={ this.state.title }
                  image={ this.state.image }
                  html={ this.state.html }
                  tag={ this.state.tag }
                  author={ this.state.author }
                  slug={ this.state.slug }
                />
                </div>
                <div className='post columns'>
                <SinglePost
                  id={ this.state.id }
                  title={ this.state.title }
                  image={ this.state.image }
                  html={ this.state.html }
                  tag={ this.state.tag }
                  author={ this.state.author }
                  slug={ this.state.slug }
                />
                </div>
                <div className='post columns'>
                <SinglePost
                  id={ this.state.id }
                  title={ this.state.title }
                  image={ this.state.image }
                  html={ this.state.html }
                  tag={ this.state.tag }
                  author={ this.state.author }
                  slug={ this.state.slug }
                />
                </div>
                <div className='post columns'>
                <SinglePost
                  id={ this.state.id }
                  title={ this.state.title }
                  image={ this.state.image }
                  html={ this.state.html }
                  tag={ this.state.tag }
                  author={ this.state.author }
                  slug={ this.state.slug }
                />
                </div>
              </div>

            </div>
            <Footer white={true}/>
          </div>
        </Layout>
      </div>
    )
  }
}
