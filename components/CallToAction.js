import React from 'react'
import axios from 'axios'
import Doodles from './SVG/Doodles'
const secret =  process.env.NODE_ENV == 'production' ? process.env : require('../secrets')

export default class CallToAction extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      subscriber: '',
      animate: false,
      animateSuccess: false
    }

    this.handleSubscriber = this.handleSubscriber.bind(this)
    this.submitEmail = this.submitEmail.bind(this)
    this.submitOnEnter = this.submitOnEnter.bind(this)
  }

  componentDidMount() {
    document.querySelector('.success-message').classList.add('hide-success')
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
          if(response.data.success && !response.data.failure) {
            setTimeout(() => {
              this.setState({
                animate: !this.state.animate
              })
            }, 0)
            setTimeout(() => {
              this.setState({
                animateSuccess: !this.state.animateSuccess
              })
            },1000)
            setTimeout(() => {
              this.setState({
                animateSuccess: !this.state.animateSuccess
              })
            },5000)
            setTimeout(() => {
              this.setState({
                animate: !this.state.animate
              })
              document.querySelector('.success-message').classList.add('hide-success')
            }, 6000)
          }

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
        <h3 className={ this.state.animate ? "sub-tagline content-fadeout" : "sub-tagline content-fadein" }>
          Fresh articles of fascinating
          things delivered to your inbox.
        </h3>
        <form className={ this.state.animate ? "box field content-fadeout" : "box field content-fadein" } id="sub-btn">
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
        <div className={ this.state.animate ? "sub-promise content-fadeout" : "sub-promise content-fadein" }>
          No spam. No ads. No selfies. We promise.
        </div>

        <div className={ !this.state.animateSuccess ? "success-message content-fadeout" : "success-message content-fadein" }>
          <span>Thanks for subscribing. <br/> We hope you enjoy our content!</span>
        </div>

      </div>
    )
  }
}
