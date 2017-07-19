import React from 'react'
import Link from 'next/link'
import Select from 'react-select'
import axios from 'axios'
import Header from '../components/Header'
import FacebookSvg from '../components/SVG/FacebookSvg'
import InstagramSvg from '../components/SVG/InstagramSvg'
import TwitterSvg from '../components/SVG/TwitterSvg'

import Layout from '../containers/Layout'

const options = [
  { value: 'Prefer not to say', label: 'Prefer not to say' },
  { value: '< $2000', label: '< $2000' },
  { value: '$2000 - $5000', label: '$2000 - $5000' },
  { value: '$5000 - $10000', label: '$5000 - $10000' },
  { value: '$10,000 - $15,000', label: '$10,000 - $15,000' },
  { value: '$15,000 - $20,000', label: '$15,000 - $20,000' },
  { value: '> $20,000', label: '> $20,000' }
]

var revealer = null
var successRevealer = null

export default class ContactPage extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      fullname : '',
      email : '',
      phone : '',
      description: '',
      company: '',
      isBusinessEnquiry: false,
      type: 'anything',
      success: false,

      nameRequired: false,
      nameMinChar: false,
      emailRequired: false,
      emailInvalid: false,
      phoneRequired: false,
      phoneInvalid: false,
      messageRequired: false,
      messageMinChar: false,

      typeUpperClass: 'upper',
      typeLowerClass: 'lower',
      wrapTypeClass: 'wrap-type'
    }

    this.handleFullname = this.handleFullname.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handlePhone = this.handlePhone.bind(this)
    this.handleDesc = this.handleDesc.bind(this)
    this.handleCompany = this.handleCompany.bind(this)
    this.handleType = this.handleType.bind(this)
    this.submitData = this.submitData.bind(this)
    this.successReveal = this.successReveal.bind(this)
  }

  componentDidMount () {

    var successBlock = document.querySelector('.success-block')
    successRevealer = new RevealFx(successBlock)

    var formEl = document.querySelector('.contact-form')
    revealer = new RevealFx(formEl)

    let successRevealContent = document.querySelector('.block-ref')
    successBlock.appendChild(successRevealContent)

    var closeCtrlOne = document.querySelector('.contact-header .close-button'),
    closeCtrlTwo = document.querySelector('.wrap-buttons .close-button'),
    submitClickOne = document.querySelector('.send-button'),
    submitClickTwo = document.querySelector('.contact-input .send')

    document.querySelector('.get-in-touch').addEventListener('click', function() {
      let revealBlock = document.querySelector('.block-revealer__element')

      document.querySelector('.header').style.zIndex = -2
      document.querySelector('.contact-form').style.position = 'static'

      revealer.reveal({
        bgcolor: '#e0394a',
        direction: 'bt',
        duration: 600,
        onCover: function(contentEl, revealerEl) {
          formEl.classList.add('form--open')
          contentEl.style.opacity = 1
        },
        onComplete: function() {
          closeCtrlOne.addEventListener('click', closeForm)
          closeCtrlTwo.addEventListener('click', closeForm)
        }
      })
    })

    function closeForm() {
      revealer.reveal({
        bgcolor: '#e0394a',
        direction: 'tb',
        duration: 600,
        onCover: function(contentEl, revealerEl) {
          formEl.classList.remove('form--open')
          contentEl.style.opacity = 0
          setTimeout(() => {
            document.querySelector('.contact-form').style.position = 'fixed'
            // document.querySelector('.background').style.opacity = 0
            document.querySelector('.header').style.zIndex = 3
          }, 600)
        }
      })
    }

  }

  successReveal = () => {
    var formEl = document.querySelector('.contact-form')

    var successBlock = document.querySelector('.success-block')

    document.querySelector('.success-block').style.top = '0'
    document.querySelector('.success-block').style.zIndex = '9999'
    successRevealer.reveal({
      bgcolor: '#42E464',
      direction: 'bt',
      duration: 600,
      onCover: function(contentEl, revealerEl) {
        document.querySelector('.success-block').classList.add('success-block-active')
        successBlock.classList.add('form--open')
        contentEl.style.opacity = 1

        setTimeout(() => {
          document.querySelector('.background').style.opacity = 0
        }, 600)
      },
      onComplete: function() {
        let revealBlock = document.querySelector('.block-revealer__element').style.color = 'transparent'
        setTimeout(() => {
          closeSuccess()
        }, 2000)
      }
    })

    function closeSuccess () {
      var formEl = document.querySelector('.contact-form')
      var successBlock = document.querySelector('.success-block')
      document.querySelector('.success-block').style.zIndex = '2'
      revealer.reveal({
        bgcolor: '#42E464',
        direction: 'bt',
        duration: 600,
        onCover: function(contentEl, revealerEl) {
          formEl.classList.remove('form--open')
          successBlock.classList.remove('form--open')
          contentEl.style.opacity = 0
            document.querySelector('.success-block').classList.remove('success-block-active')
          setTimeout(() => {
            document.querySelector('.contact-form').style.position = 'fixed'

          }, 600)
        },
        onComplete: function() {
          document.querySelector('.header').style.zIndex = 3
          document.querySelector('.success-block').style.zIndex = '-1'
          document.querySelector('.success-block').style.top = '100vh'
        }
      })
    }
  }


  validateEmail (email) {
    return (/^(([^<>()[\]\\.,:\s@\"]+(\.[^<>()[\]\\.,:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
  }

  validatePhone (number) {
    return (/^(\+?([0-9]{2})\)?)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(number))
  }

  handleFullname = (e) => {
    if(e.target.value != '') {
      e.target.style.boxShadow = '0 1px 0 0 #fff'
      e.target.style.color = '#ffffff'
    } else {
      console.log(e.target.value)
      e.target.style.boxShadow = '0 1px 0 0 #2b2b2b'
    }

    this.setState({
      fullname: e.target.value,
      nameRequired: false
    })
  }


  handleEmail = (e) => {
    if(e.target.value != '') {
      e.target.style.boxShadow = '0 1px 0 0 #fff'
      e.target.style.color = '#ffffff'
    } else {
      e.target.style.boxShadow = '0 1px 0 0 #2b2b2b'
    }

    this.setState({
      email: e.target.value,
      emailRequired: false,
      emailInvalid: false
    })
  }


  handlePhone = (e) => {
    if(e.target.value != '') {
      e.target.style.boxShadow = '0 1px 0 0 #fff'
      e.target.style.color = '#ffffff'
    } else {
      e.target.style.boxShadow = '0 1px 0 0 #2b2b2b'
    }

    this.setState({
      phone: e.target.value,
      phoneRequired: false,
      phoneInvalid: false
    })
  }


  handleDesc = (e) => {
    if(e.target.value != '') {
      e.target.style.boxShadow = '0 1px 0 0 #fff'
      e.target.style.color = '#ffffff'
    } else {
      e.target.style.boxShadow = '0 1px 0 0 #2b2b2b'
    }

    this.setState({
      description: e.target.value,
      messageRequired: false
    })
  }


  handleCompany = (e) => {
    if(e.target.value != '') {
      e.target.style.boxShadow = '0 1px 0 0 #fff'
      e.target.style.color = '#ffffff'
    } else {
      e.target.style.boxShadow = '0 1px 0 0 #2b2b2b'
    }

    if(e.target !== null)
      this.setState({
        company: e.target.value
      })
    else
      this.setState({ company: '' })
  }


  handleType = () => {
    if (this.state.wrapTypeClass == 'wrap-type'
      || this.state.wrapTypeClass == 'wrap-type goDown') {
      this.setState({
        wrapTypeClass: 'wrap-type goUp'
      })
    } else if (this.state.wrapTypeClass == 'wrap-type up-active') {
      this.setState({
        wrapTypeClass: 'wrap-type goDown'
      })
    }

    setTimeout(() => {
      this.setState({
        type : this.state.type == 'anything' ? 'projects' : 'anything',
        wrapTypeClass: this.state.wrapTypeClass.indexOf('goDown') != -1 ? 'wrap-type' : 'wrap-type up-active'
      }, () => {
        if(this.state.type != 'projects') {
          this.setState({
            phone: '',
            budget: '',
            phoneRequired: false,
            phoneInvalid: false,
            budgetRequired: false
          })
        }
      })
    }, 301)

  }

  submitData = () => {
    this.setState({
      emailInvalid: this.state.email == '' ? false : !this.validateEmail(this.state.email),
      phoneInvalid: this.state.phone == '' ? false : !this.validatePhone(this.state.phone)

    }, () => console.log(this.state.emailInvalid))

    if( this.state.fullname == '' || this.state.email == '' || this.state.description == ''
      || this.state.nameRequired || this.state.nameMinChar
      || this.state.emailRequired || !this.validateEmail(this.state.email)
      || (this.state.phone != '' && !this.validatePhone(this.state.phone))
      || this.state.messageRequired || this.state.messageMinChar) {

      console.log(this.state.nameRequired,
        this.state.nameMinChar,
        this.state.emailRequired,
        !this.validateEmail(this.state.email),
        this.state.phone != '' && !this.validatePhone(this.state.phone),
        this.state.messageRequired,
        this.state.messageMinChar)

      if (this.state.fullname == '')
        this.setState({ nameRequired: true })
      if (this.state.email == '')
        this.setState({ emailRequired: true })
      if (this.state.description == '')
        this.setState({ messageRequired: true })

    } else {
      axios({
        method: 'POST',
        url: '/getdata',
        data: {
          firstname: this.state.fullname,
          email: this.state.email,
          phone: this.state.phone,
          description: this.state.description,
          company: this.state.company
        }
      })
      .then((response) => {
        console.log('AXIOS response')
        console.log(response)
        this.setState({
          fullname : '',
          email : '',
          phone : '',
          description: '',
          company: '',
          success: true
        }, this.successReveal)
      })
      .catch(function (error) {
        console.log('AXIOS error')
        console.log(error)
      })
    }
  }

  render () {
    return (
      <div>
      <div className='success-block'>
        <div className='block-revealer__content block-ref'>
          <div className='success-content'>
            SUCCESS !!
          </div>
        </div>
      </div>

      <div id='contact' className='contact-form'>
        <div className='block-revealer__content'>
          <div className='background' />
          <div className='page-wrap'>

            <div className='sidebar'>
              <div className='contact-header form__section'>
                <div className='title'>
                  get in touch
                </div>
                <div className='close-button'>
                  close
                </div>
              </div>

              <div className='contact-content'>
                <div className='sidebar-content form__section'>
                  <div className='sidebar-title'>
                    email
                  </div>
                  <div className='sidebar-value'>
                    yo@numie.co
                  </div>
                </div>
                <div className='sidebar-content form__section'>
                  <div className='sidebar-title'>
                    phone
                  </div>
                  <div className='sidebar-value'>
                    +1 960.333.5235
                  </div>
                </div>
                <div className='sidebar-content social-media-buttons form__section'>
                  <div className='sidebar-instagram'>
                    <InstagramSvg />
                  </div>
                  <div className='sidebar-twitter'>
                    <TwitterSvg />
                  </div>
                  <div className='sidebar-facebook'>
                    <FacebookSvg />
                  </div>
                </div>
                <div className='sidebar-content sidebar-text form__section'>
                  We’d love to help build your newest project.
                </div>
              </div>
            </div>

            <div className='contact-input'>
              <div className='wrap-input'>
                <div className={ (this.state.nameRequired || this.state.nameMinChar) ? 'name error' : 'name form__section' }>
                  <input
                    type='text'
                    className='input'
                    value={ this.state.fullname }
                    onChange={ this.handleFullname }
                    placeholder='Name*'
                  />
                  { this.state.nameRequired ? <div className='error-text'> required </div> : null }
                  { this.state.nameMinChar ? <div className='error-text'> Must be at least 2 characters </div> : null }
                </div>

                <div className={ (this.state.emailRequired || this.state.emailInvalid) ? 'email error' : 'email form__section' }>
                  <input
                    type='text'
                    className='input'
                    value={ this.state.email }
                    onChange={ this.handleEmail }
                    placeholder='Email*'
                  />
                  { this.state.emailRequired ? <div className='error-text'> required </div> : null }
                  { this.state.emailInvalid ? <div className='error-text'> Invalid Email Address </div> : null }
                </div>

                <div className={ (this.state.phoneInvalid) ? 'phone error' : 'phone form__section' }>
                  <input
                    type='text'
                    className='input'
                    value={ this.state.phone }
                    onChange={ this.handlePhone }
                    placeholder='Phone'
                  />
                  { this.state.phoneInvalid ? <div className='error-text'> Invalid Phone Number </div> : null }
                </div>
                <div className='company form__section'>
                  <input
                    type='text'
                    className='input'
                    value={ this.state.company }
                    onChange={ this.handleCompany }
                    placeholder='Company'
                  />
                </div>
                <div className={ (this.state.messageRequired || this.state.messageMinChar) ? 'message error ' : 'message form__section' }>
                  <textarea
                    type='text'
                    className='textarea'
                    value={ this.state.description }
                    onChange={ this.handleDesc }
                    placeholder='Message*'
                    cols='40'
                    rows='5'
                  />
                  { this.state.messageRequired ? <div className='error-text'> required </div> : null }
                  { this.state.messageMinChar ? <div className='error-text'> Must be at least 20 characters </div> : null }
                </div>
              </div>

              <div className='wrap-buttons form__section'>
                <div className='close-button'>
                  close
                </div>
                <div className='send-button' onClick={this.submitData}>
                  send
                </div>
              </div>
              <div className='send button form__section' onClick={this.submitData}>
                send
              </div>
            </div>
          </div>

        </div>
      </div>
      </div>
    )
  }
}
