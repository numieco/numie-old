import React from 'react'
import Header from './Header'
import Footer from './Footer'
import FooterButton from './FooterButton'
import CallToAction from './CallToAction'
import SinglePost from './SinglePost'
import ProjectsSection from './ProjectsSection'

export default class HomeComponent extends React.Component {
  render () {
    return (
      <div className='home-page'>
        <Header defaultLogo='red' url={ this.props.url } />

        <section className='home-section main-page-revealer'>
          <div className='circle-container'>
            <div className='circle' ></div>
            <div className='home-hero-title'>
              <span>lets </span>
              <span className='create'>create </span>
              <span>together.</span>
            </div>
          </div>

          <div className='development section'>
            <img className='image hero title-image' src='static/images/blog/forest.jpg'>
            </img>
            <div className='section-title'>
              <span>We help bring your </span>
              <span>vision into fruitition</span>
            </div>
            <div className='section-description'>
              Numie is a full service design studio that provides end-to-end design,
              development and marketing for you or your company.
              We’re in this with you until the end.
            </div>
          </div>

          <div className='what-we-do section'>
            <div className='title'>
              What we do best
            </div>
            <div className='section-description'>
              We provide a wide range of services that accomodate your business needs or goals.
            </div>
            <div className='services'>
              <div className='dev-design section'>
                <div className='card'>
                  <div className='image'>
                  </div>
                  <div className='intro'>
                    <div className='title'>
                      Full Range Design
                    </div>
                    <div className='description'>
                      UI / UX, motion, brand identity, you name it, we have you covered in all things design related.
                    </div>
                  </div>
                </div>

                <div className='card'>
                  <div className='image'>
                  </div>
                  <div className='intro'>
                    <div className='title'>
                      Full-stack Web Dev
                    </div>
                    <div className='description'>
                      We have your front and back when it comes to the web. Let us solve your complex issues.
                    </div>
                  </div>
                </div>
              </div>

              <div className='app-marketing section'>
                <div className='card'>
                  <div className='image'>
                  </div>
                  <div className='intro'>
                    <div className='title'>
                      Application Dev
                    </div>
                    <div className='description'>
                      Whether you’re an Apple or Android enthusiast, we can develop your app on any flavor OS.
                    </div>
                  </div>
                </div>

                <div className='card'>
                  <div className='image'>
                  </div>
                  <div className='intro'>
                    <div className='title'>
                      Marketing
                    </div>
                    <div className='description'>
                      A product does you no good if nobody is using it. Let us research your market and obtain users and customers.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <FooterButton
              footerSmallText='LEARN MORE ABOUT US'
              smallClassName='learn-more'
              onClick={() => console.log('footerbutton')}
            />
          </div>

          <div className='project-ref'></div>
          <ProjectsSection />

          <Footer />
        </section>

      </div>
    )
  }
}
