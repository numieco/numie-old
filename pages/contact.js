import React from 'react'
import Router from 'next/router'

import Layout from '../containers/Layout'
import ContactHeader from '../components/ContactHeader'
import ContactFooter from '../components/ContactFooter'
import ContactName from '../components/ContactName'
import ContactInterest from '../components/ContactInterest'
import ContactBudget from '../components/ContactBudget'
import ContactEmail from '../components/ContactEmail'
import ContactPhone from '../components/ContactPhone'
import ContactMessage from '../components/ContactMessage'
import ContactSuccess from '../components/ContactSuccess'

let showOpenAnimation = require('../helpers/pageToPageAnimation')
let showCloseAnimation = require('../helpers/pageToPageAnimation')
let showSuccessCloseAnimation = require('../helpers/pageToPageAnimation')

var revealer = null
var successRevealer = null

let prevUrl = '/'
let pageIndex = 0
let validIndex = [2, 4, 5, 6]

export default class ContactPage extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      pageIndex: 0,
      validName: false,
      validInterest: false,
      validEmail: false,

      nameError: false,
      interestError: false,
      emailError: false,

      name: '',
      interest: {
        branding: false,
        design: false,
        dev: false,
        marketing: false,
        other: false
      },
      email: ''
    }

    this.increaseIndex = this.increaseIndex.bind(this)
  }

  componentDidMount () {
    window.scrollTo(0,0)
    //========= Code block for page reveal CONTACT-PAGE ----> OTHER-PAGE =========
    if(this.props.url.query.origin !== undefined){
      prevUrl = this.props.url.query.origin.slice(this.props.url.query.origin.lastIndexOf('/'))
      this.setState({ sidebarReveal: '' })
      showCloseAnimation({
        type: 'close',
        direction: 'bt',
        delay: 0,
        duration: 600,
        bgcolor: '#e0394a',
        halfway: true,
        onComplete: function () {
          document.querySelector('.contact-wrapper').classList.add('form--open')
        }
      })
    } else {
      setTimeout(() => {
        document.querySelector('.contact-wrapper').classList.add('form--open')
      }, 750)
    }
  }

  //========= Code block for page reveal OTHER-PAGE ----> CONTACT-PAGE =========
  closeContactAnimation = () => {
    showOpenAnimation({
      type: 'start',
      direction: 'tb',
      delay: 0,
      duration: 600,
      bgcolor: '#e0394a'
    })

    setTimeout(() => Router.push(
      (prevUrl.indexOf('-') !== -1 ? '/_individualBlog' : prevUrl) + '?origin=contact',
      prevUrl.indexOf('-') !== -1 ? ('/blog' + prevUrl) : prevUrl
    ), 700)
  }

  goToHomePage = () => {
    showOpenAnimation({
      type: 'start',
      direction: 'tb',
      delay: 0,
      duration: 600,
      bgcolor: '#e0394a'
    })

    setTimeout(() => Router.push(
      '/?origin=contact',
      '/'
    ), 700)
  }

  validate = () => {
    if (this.state.pageIndex == 0) {
      if(this.state.name != '') {
        this.increaseIndex()
      } else {
        this.setState({
          nameError: true
        })
      }
    }

    if (this.state.pageIndex === 1) {

      if(!(this.state.interest.branding === false
        && this.state.interest.design === false
        && this.state.interest.dev === false
        && this.state.interest.marketing === false
        && this.state.interest.other === false)) {

        this.increaseIndex()

      } else {
        this.setState({
          interestError: true
        })
      }
    }

    if (this.state.pageIndex == 3) {
      if (this.validateEmail(this.state.email))
        this.increaseIndex()
      else {
        this.setState({
          emailError: true
        })
      }
    }

    if (validIndex.includes(this.state.pageIndex)) {
      this.increaseIndex()
    }
  }

  increaseIndex = () => {
    if (this.state.pageIndex <= 5) {
      this.setState({
        pageIndex: this.state.pageIndex + 1
      })
    }
  }

  decreaseIndex = () => {
    if (this.state.pageIndex > 0 && this.state.pageIndex != 0) {
      this.setState({
        pageIndex: this.state.pageIndex - 1
      })
    }
  }

  validateEmail = (email) => {
    return (/^(([^<>()[\]\\.,:\s@\"]+(\.[^<>()[\]\\.,:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
  }

  render () {
    return (
      <Layout>
        <div className='contact-wrapper'>
          <ContactHeader
            onLogoClick={ this.goToHomePage }
            onCloseClick={ this.closeContactAnimation }
          />

          <ContactName
            pageIndex={ this.state.pageIndex }
            increaseIndex={ this.validate }
            name={ this.state.name }
            nameError={ this.state.nameError }
            setName={ (value) => {
              this.setState({
                name: value,
                nameError: (value != '' ? false : this.state.nameError)
              })
            } }
          />

          <ContactInterest
            pageIndex={ this.state.pageIndex }
            increaseIndex={ this.validate }
            interest={ this.state.interest }
            interestError={ this.state.interestError }
            changeInterestState = { (obj) => {
              this.setState({
                interest: Object.assign({}, this.state.interest, obj),
                interestError: (Object.keys(obj).some(i => obj[i]) ? false : this.state.interestError)
              },() => {console.log(this.state.interestError)})
            }}
          />

          <ContactBudget pageIndex={ this.state.pageIndex } />

          <ContactEmail
            pageIndex={ this.state.pageIndex }
            increaseIndex={ this.validate }
            email={ this.state.email }
            emailError={ this.state.emailError }
            setEmail={ (email) => {
              this.setState({
                email: email,
                emailError: (email != '' ? false : this.state.emailError)
              })
            }}

          />

          <ContactPhone pageIndex={ this.state.pageIndex } />

          <ContactMessage pageIndex={ this.state.pageIndex } />

          <ContactSuccess pageIndex={ this.state.pageIndex } />

          <ContactFooter
            pageIndex={ this.state.pageIndex }
            increaseIndex={ this.validate }
            decreaseIndex={ this.decreaseIndex }
            navigateHome={ this.goToHomePage }
          />
        </div>
      </Layout>
    )
  }
}
