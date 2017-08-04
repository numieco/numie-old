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
          }, () => {
            mainPost = []
            let postBy = document.getElementsByClassName('post-by')[0]
            let heroImage = document.getElementsByClassName('image')[0]
            let generalEl = document.getElementsByClassName('general')[0]
            let heroTitleEl = document.getElementsByClassName('post-title')[0]

            let scale = 0
            let translateY = 0

            let windowScrollY = window.scrollY

            let var1 = 10

            window.addEventListener('scroll', () => {

              if(window.scrollY == 0) {

              }

              if(window.scrollY >= heroImage.clientHeight) {
                postBy.style.opacity = 0
              }

              if(((heroImage.clientHeight > window.scrollY) && (window.scrollY>=0) && (windowScrollY < window.scrollY))
                ||((heroImage.clientHeight > window.scrollY) && (window.scrollY>=0) && (windowScrollY > window.scrollY))) {

                translateY = 0 - (300*(window.scrollY/heroImage.clientHeight))
                scale = 1 + (window.scrollY/heroImage.clientHeight)
                heroImage.style.transform = 'translate3d(0px, '+ translateY +'px, 0px) scale('+ scale +', '+ scale +')'
                generalEl.style.transform = 'translate3d(0px, '+ -translateY +'px, 0px)'
                heroTitleEl.style.transform = 'translate3d(0px, '+ -translateY +'px, 0px)'


                generalEl.style.opacity = 1 - 2*(window.scrollY/heroImage.clientHeight)
                heroTitleEl.style.opacity = 1 - 2*(window.scrollY/heroImage.clientHeight)
                heroImage.style.opacity = 1 - (window.scrollY/heroImage.clientHeight)

                if(translateY <= -100) {
                  postBy.style.opacity = 0
                } else {
                  postBy.style.opacity = 1
                }

                windowScrollY = window.scrollY
              }

            })

          })
        })
      })
      .catch((error) => {
        if (error) {
          console.log('error')
        }
      })
  }

  revealHeroImage = () => {


  }

  render () {
    return (
        <Layout>
          <div className='individual-blog'>
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
                <div className='single-post-container'>
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

            </div>
            <Footer white={true}/>
          </div>
        </div>
      </Layout>
    )
  }
}
