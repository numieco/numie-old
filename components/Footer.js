import React from 'react'
import axios from 'axios'

const secret =  process.env.NODE_ENV == 'production' ? process.env : require('../secrets')

import Dip from './SVG/Dip'
import { Facebook, Twitter, Github, Instagram } from './SVG/Socials'
import { NumieLogoWhite } from './SVG/NumieLogo'

export default class Footer extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      subscriber: ''
    }

    this.handleSubscriber = this.handleSubscriber.bind(this)
    this.submitEmail = this.submitEmail.bind(this)
    this.submitOnEnter = this.submitOnEnter.bind(this)
  }

  handleSubscriber = (e) => {
    this.setState({
      subscriber: e.target.value
    })
  }

  submitEmail = () => {
    if(this.state.subscriber != '') {
      axios.post('/subscribe', {
        email: this.state.subscriber
      })
        .then((response) => {
          if(response.data.success && !response.data.failure)
            alert('SUBSCRIBED')
          if(response.data.failure && !response.data.success)
            alert('FAILURE')
        })
    }
  }

  submitOnEnter = (e) => {
    if (e.charCode == 13) {
      console.log('entered')
    }
  }

  render () {
    return (
      <footer>

        <div className='dip'>
          <Dip className='dip' white={ this.props.white } />
        </div>
        <div className='numie-logo'>
          <NumieLogoWhite />
        </div>
        <div id="subscribe">
          <h3 className="sub-tagline">
            Fresh articles of fascinating
            things delivered to your inbox.
          </h3>
          <form className="box field" id="sub-btn">
            <p className="control">
              <input
                className="input"
                type="email"
                placeholder="Your email"
                onChange={ this.handleSubscriber }
              />
            </p>
            <div
              className="subscribe-button button is-white"
              onClick={ this.submitEmail }>
              SUBSCRIBE
            </div>
          </form>
          <div className="sub-promise">
            No spam. No ads. No selfies. We promise.
          </div>
        </div>
        <div className="social">
          <div className='want-to-work'>
            Want to work on something great together?
          </div>
          <div className="numie-title">NUMIE STUDIO</div>
          <div className="numie-email"><a href='mailto:yo@numie.co?subject=Howdy!'>yo@numie.co</a></div>
          <div className='social-buttons'>
            <a href='https://instagram.com/numieco'><Instagram/></a>
            <a href='https://twitter.com/numieco'><Twitter/></a>
            <a href='https://facebook.com/numieco'><Facebook/></a>
            <a href='https://github.com/numieco'><Github/></a>
          </div>
          <div className='go-up'>GO UP</div>
        </div>
      </footer>
    )
  }
}
