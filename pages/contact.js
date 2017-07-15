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

export default class ContactPage extends React.Component {
  constructor (props) {
    super (props)
    this.state = {
      fullname : '',
      email : '',
      phone : '',
      description: '',
      budget: '',
      isBusinessEnquiry: false,
      type: 'anything',

      nameRequired: false,
      nameMinChar: false,
      emailRequired: false,
      emailInvalid: false,
      phoneRequired: false,
      phoneInvalid: false,
      budgetRequired: false,
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
    this.handleBudget = this.handleBudget.bind(this)
    this.handleType = this.handleType.bind(this)
    this.submitData = this.submitData.bind(this)
  }

  componentDidMount () {

    var formEl = document.querySelector('.contact-form'),
    revealer = new RevealFx(formEl),
    closeCtrl = document.querySelector('.close-button')

    //document.querySelector('lower').addEventListener('click', () => {})

    document.querySelector('.get-in-touch').addEventListener('click', function() {

      document.querySelector('.submit').style.bottom = 0
      document.querySelector('.background').style.top = 0
      document.querySelector('#contact').style.top = 0
      document.querySelector('.header').style.zIndex = -2

      revealer.reveal({
        bgcolor: '#e0394a',
        direction: 'bt',
        duration: 600,
        onCover: function(contentEl, revealerEl) {
          formEl.classList.add('form--open')
          contentEl.style.opacity = 1
        },
        onComplete: function() {
          closeCtrl.addEventListener('click', closeForm)
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
            document.querySelector('.header').style.zIndex = 3
          }, 601)
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
    this.setState({
      fullname: e.target.value,
      nameRequired: false
    })
  }


  handleEmail = (e) => {
    this.setState({
      email: e.target.value,
      emailRequired: false,
      emailInvalid: false
    })
  }


  handlePhone = (e) => {
    this.setState({
      phone: e.target.value,
      phoneRequired: false,
      phoneInvalid: false
    })
  }


  handleDesc = (e) => {
    this.setState({
      description: e.target.value,
      messageRequired: false
    })
  }


  handleBudget = (e) => {
    if(e.target !== null)
      this.setState({
        budget: e.target.value,
        budgetRequired: false
      })
    else
      this.setState({ budget: '' })
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
      || (this.state.type == 'projects' && this.state.phone == '')
      || (this.state.type == 'projects' && this.state.budget == '')
      || this.state.nameRequired || this.state.nameMinChar
      || this.state.emailRequired || !this.validateEmail(this.state.email)
      || this.state.phoneRequired || (this.state.type == 'projects' && !this.validatePhone(this.state.phone))
      || this.state.messageRequired || this.state.messageMinChar
      || this.state.budgetRequired ) {
      
      console.log(this.state.nameRequired,
        this.state.nameMinChar,
        this.state.emailRequired,
        !this.validateEmail(this.state.email),
        this.state.phoneRequired,
        this.state.type == 'projects' && !this.validatePhone(this.state.phone),
        this.state.messageRequired,
        this.state.messageMinChar,
        this.state.budgetRequired)
              
      if (this.state.fullname == '')
        this.setState({ nameRequired: true })
      if (this.state.email == '')
        this.setState({ emailRequired: true })
      if (this.state.description == '')
        this.setState({ messageRequired: true })
      if (this.state.type == 'projects' && this.state.phone == '')
        this.setState({ phoneRequired: true })
      if (this.state.type == 'projects' && this.state.budget == '')
        this.setState({ budgetRequired: true })

    } else {
      axios({
        method: 'POST',
        url: '/getdata',
        data: {
          firstname: this.state.fullname,
          email: this.state.email,
          phone: this.state.phone,
          description: this.state.description,
          budget: this.state.budget
        }
      })
      .then((response) => {
        console.log('AXIOS response')
        console.log(response)
      })
      .catch(function (error) {
        console.log('AXIOS error')
        console.log(error)
      })
    }
  }

  render () {
    return (
      <div id='contact' className='contact-form'>
      <div className='block-revealer__content'>
        <div className='page-wrap'>
          <div className='contact-page'>
            <div className='background' />
            <div className='content'>
              <div className='contact-title'>
                <div className='inquiry-type'>
                  <span className='lets-chat'>let's chat</span>
                  <div className={this.state.wrapTypeClass}>
                    <div className='upper'
                      onClick={this.handleType}
                    >
                      anything
                    </div>
                    <div className='lower'
                      onClick={this.handleType}
                    >
                      projects
                    </div>
                  </div>
                </div>
                <Link href='/'>
                <div className='close-button form__section'>
                  <span className='x'>x</span>
                  <span className='close'>CLOSE</span>
                </div>
                </Link>
              </div>
              <div className={ (this.state.nameRequired || this.state.nameMinChar) ? 'fullname error' : 'fullname form__section' }>
                <input type='text'
                  value={ this.state.fullname }
                  onChange={ this.handleFullname }
                  placeholder='Name'
                />
                { this.state.nameRequired ? <div className='error-text'> required </div> : null }
                { this.state.nameMinChar ? <div className='error-text'> Must be at least 2 characters </div> : null }
              </div>
              <div className={ (this.state.emailRequired || this.state.emailInvalid) ? 'email error' : 'email form__section' }>
                <input
                  type='text'
                  value={ this.state.email }
                  onChange={ this.handleEmail }
                  placeholder='Email'
                />
                { this.state.emailRequired ? <div className='error-text'> required </div> : null }
                { this.state.emailInvalid ? <div className='error-text'> Invalid Email Address </div> : null }
              </div>
              {
                this.state.type == 'projects'
                ? (
                    <div className={ (this.state.phoneRequired || this.state.phoneInvalid) ? 'phone error' : 'phone form__section' }>
                      <input
                        type='text'
                        value={ this.state.phone }
                        onChange={ this.handlePhone }
                        placeholder='Phone'
                      />
                      { this.state.phoneRequired ? <div className='error-text'> required </div> : null }
                      { this.state.phoneInvalid ? <div className='error-text'> Invalid Phone Number </div> : null }

                    </div>
                  )
                : null
              }
              {
                this.state.type == 'projects'
                ? (
                    <div className={ this.state.budgetRequired ? 'budget error' : 'budget form__section' }>
                      <select
                        onChange={this.handleBudget}
                        value={this.state.budget}
                      >
                        <option value='' disabled defaultValue=''>Budget</option>
                        <option value='Prefer not to say'>Prefer not to say</option>
                        <option value='2000 - $5000'>2000 - $5000</option>
                        <option value='$5000 - $10000'>$5000 - $10000</option>
                        <option value='$10,000 - $15,000'>$10,000 - $15,000</option>
                        <option value='$15,000 - $20,000'>$15,000 - $20,000</option>
                        <option value='> $20,000'> $20,000</option>
                      </select>
                      { this.state.budgetRequired ? <div className='error-text'> required </div> : null }
                    </div>
                  )
                : null
              }
              <div className={ (this.state.messageRequired || this.state.messageMinChar) ? ('description error description-' + this.state.type) : ('description form__section description-' + this.state.type) } >
                <textarea
                  type='text'
                  value={ this.state.description }
                  onChange={ this.handleDesc }
                  placeholder='Message'
                  cols='40'
                  rows='5'
                />
                { this.state.messageRequired ? <div className='error-text'> required </div> : null }
                { this.state.messageMinChar ? <div className='error-text'> Must be at least 20 characters </div> : null }
              </div>
              <div className='submit form__section' onClick={ this.submitData }>
                SEND
              </div>
            </div>
          </div>
        </div>
        <div className='side-info-bar'>
          {
            this.state.type == 'projects'
            ? (
                  <div className='projects-text form__section'>
                    We’d love to help build your newest project.
                  </div>
              )
            : (
                  <div className='thoughts-text form__section'>
                    Have something on your mind? Let’s chat!
                  </div>
              )
          }
          <div className='sidebar-email-title form__section'>
            email
          </div>
          <div className='sidebar-email-value form__section'>
            yo@numie.co
          </div>
          <div className='sidebar-phone-title form__section'>
            phone
          </div>
          <div className='sidebar-phone-value form__section'>
            +1 960.333.5235
          </div>
          <div className='social-media-buttons form__section'>
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
        </div>
      </div>
      </div>
    )
  }
}
