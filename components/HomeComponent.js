import React from 'react'
import Footer from './Footer'
import CallToAction from './CallToAction'

export default class HomeComponent extends React.Component {
  render () {
    return (
      <div className='home-page'>
        <section className='home-section main-page-revealer'>
          <div className='circle-container'>

            <div className='circle' />
            <div className='home-hero-title'>
              <span>lets </span>
              <span className='create'>create </span>
              <span>together.</span>
            </div>
          </div>
          <Footer />
        </section>
      </div>
    )
  }
}
