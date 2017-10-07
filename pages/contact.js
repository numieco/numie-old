import React from 'react'
import Router from 'next/router'
import axios from 'axios'

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
let validIndex = [2, 5, 6]

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
      phoneError: false,

      name: '',
      interest: {
        branding: false,
        design: false,
        dev: false,
        marketing: false,
        other: false
      },
      interestString: '',
      email: '',
      budget: 5000,
      phone: '',
      message: '',

      successName: '',
      successInterest: {}
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

    if (this.state.pageIndex == 4) {
      console.log('phone')
      if (this.state.phone == '' || this.validatePhone(this.state.phone))
        this.increaseIndex()
      else {
        this.setState({
          phoneError: true
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

  validatePhone = (number) => {
    return (/^(\+?([0-9]{2})\)?)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(number))
  }

  sendData = () => {
    this.setState({
      successName: this.state.name,
      successInterest: this.state.interest
    })

    axios({
      method: 'POST',
      url: '/getdata',
      data: {
        name: this.state.name,
        interest: this.state.interestString,
        email: this.state.email,
        budget: this.state.budget,
        phone: this.state.phone,
        message: this.state.message
      }
    })
    .then((response) => {
      this.setState({
        name: '',
        interest: {
          branding: false,
          design: false,
          dev: false,
          marketing: false,
          other: false
        },
        interestString: '',
        email: '',
        budget: 5000,
        phone: '',
        message: ''
      }, this.increaseIndex())
    })
    .catch(function (error) {
      console.log('AXIOS error')
      console.log(error)
    })
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
              },() => {
                let arr = []
                Object.keys(this.state.interest).map((key) => {
                  if (this.state.interest[key]) {
                    arr.push(key)
                  }
                })
                this.setState({
                  interestString: arr.toString()
                })
              })
            }}
          />

          <ContactBudget
            pageIndex={ this.state.pageIndex }
            budget={ this.state.budget }
            setBudget={ budget => this.setState({ budget: budget })}
          />

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

          <ContactPhone
            pageIndex={ this.state.pageIndex }
            phone={ this.state.phone }
            phoneError={ this.state.phoneError }
            setPhone={ phone => this.setState({
              phone: phone,
              phoneError: (phone != '' ? false : this.state.phoneError)
            }) }
          />

          <ContactMessage
            pageIndex={ this.state.pageIndex }
            message={ this.state.message }
            setMessage={ message => this.setState({ message }) }
          />

          <ContactSuccess
            pageIndex={ this.state.pageIndex }
            name={ this.state.successName }
            interest={ this.state.successInterest }
          />

          <ContactFooter
            pageIndex={ this.state.pageIndex }
            increaseIndex={ this.validate }
            decreaseIndex={ this.decreaseIndex }
            navigateHome={ this.goToHomePage }
            sendData={ this.sendData }
          />
        </div>
      </Layout>
    )
  }
}
