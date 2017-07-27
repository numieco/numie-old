import React from 'react'

export default class HomeComponent extends React.Component {
  render () {
    return (
      <div>
        <section className='home-section main-page-revealer'>
          <div className='circle-container'>
            
            <div className='circle' />
            <div className='home-hero-title'>
              <span>lets </span>
              <span className='create'>create </span>
              <span>together.</span>
            </div>
          </div>
          <div className='test' />
        </section>
      </div>
    )
  }
}