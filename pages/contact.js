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

export default class ContactPage extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      pageIndex: 0,
      validName: false,
      validInterest: false,
      validEmail: false,

      nameError: false,

      name: ''
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
    if (pageIndex == 0 && this.state.name != '') {
      this.increaseIndex()
    } else {
      this.setState({
        nameError: true
      })
    }
  }

  increaseIndex = () => {
    if (this.state.pageIndex <= 5) {
      this.setState({
        pageIndex: this.state.pageIndex + 1
      }, () => console.log(this.state.pageIndex))
    }
  }

  decreaseIndex = () => {
    if (this.state.pageIndex > 0 && this.state.pageIndex != 0) {
      this.setState({
        pageIndex: this.state.pageIndex - 1
      }, () => console.log(this.state.pageIndex))
    }
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
            name={ this.state.name }
            nameError={ this.state.nameError }
            setName={ (value) => {
              this.setState({
                name: value,
                nameError: (value != '' ? false : this.state.nameError)
              })
            } }
          />
          <ContactInterest pageIndex={ this.state.pageIndex } />
          <ContactBudget pageIndex={ this.state.pageIndex } />
          <ContactEmail pageIndex={ this.state.pageIndex } />
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
