import React from 'react'
import axios from 'axios'
import Doodles from './SVG/Doodles'
const secret =  process.env.NODE_ENV == 'production' ? process.env : require('../secrets')

export default class CallToAction extends React.Component {
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
      <div id="subscribe" className={ this.props.transparent ? "bg-transparent" : null }>
        {
          !this.props.transparent
          ? (
              <div className='doodles'>
                <Doodles />
              </div>
            )
          : null
        }
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
    )
  }
}
