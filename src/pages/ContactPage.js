import React from 'react'
import Select from 'react-select'
import axios from 'axios'
import Header from '../components/Header'
import FacebookSvg from '../SVG/FacebookSvg'
import InstagramSvg from '../SVG/InstagramSvg'
import TwitterSvg from '../SVG/TwitterSvg'

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
      typeLowerClass: 'lower'
    }

    this.handleFullname = this.handleFullname.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handlePhone = this.handlePhone.bind(this)
    this.handleDesc = this.handleDesc.bind(this)
    this.handleBudget = this.handleBudget.bind(this)
    this.handleType = this.handleType.bind(this)
    this.submitData = this.submitData.bind(this)

    this.handleFullnameBlur = this.handleFullnameBlur.bind(this)
    this.handleEmailBlur = this.handleEmailBlur.bind(this)
    this.handlePhoneBlur = this.handlePhoneBlur.bind(this)
    this.handleBudgetBlur = this.handleBudgetBlur.bind(this)
    this.handleDescBlur = this.handleDescBlur.bind(this)
  }

  validateEmail (email) {
    return (/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email))
  }

  validatePhone (numer) {
    return (/^(\+?([0-9]{2})\)?)?[-. ]?([0-9]{3})[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(numer))
  }

  handleFullname = (e) => {
    this.setState({
      fullname: e.target.value,
      nameRequired: e.target.value == '' ? true : false,
      nameMinChar: e.target.value.length < 2 ? true : false
    })
  }

  handleFullnameBlur = () => {
    if(this.state.fullname.length <= 0) { 
      this.setState({
        nameRequired: true,
        nameMinChar: false
      })
    } else {
      this.setState({
        nameRequired: false
      })
    }
  }

  handleEmail = (e) => {
    this.setState({
      email: e.target.value,
      emailRequired: e.target.value == '' ? true : false,
      emailInvalid: e.target.value == '' ? false : !this.validateEmail(e.target.value)
    })
  }

  handleEmailBlur = () => {
    if(this.state.email.length <= 0) { 
      this.setState({
        emailRequired: true,
        emailInvalid: false
      })
    } else {
      this.setState({
        emailRequired: false
      })
    }
  }

  handlePhone = (e) => {
    this.setState({
      phone: e.target.value,
      phoneRequired: e.target.value == '' ? true : false,
      phoneInvalid: e.target.value == '' ? false : !this.validatePhone(e.target.value)
    })
  }

  handlePhoneBlur = () => {
    if(this.state.phone.length <= 0) { 
      this.setState({
        phoneRequired: true,
        phoneInvalid: false
      })
    } else {
      this.setState({
        phoneRequired: false
      })
    }
  }

  handleDesc = (e) => {
    this.setState({
      description: e.target.value,
      messageRequired: e.target.value == '' ? true : false,
      messageMinChar: e.target.value.length < 20 ? true : false
    })
  }

  handleDescBlur = () => {
    if(this.state.description.length <= 0) { 
      this.setState({
        messageRequired: true,
        messageMinChar: false
      })
    } else {
      this.setState({
        messageRequired: false
      })
    }
  }

  handleBudget = (e) => {
    if(e.target !== null)
      this.setState({
        budget: e.target.value,
        budgetRequired: e.target.value == '' ? true : false
      })
    else
      this.setState({ budget: '' })
  }

  handleBudgetBlur = () => {
    if(this.state.budget.length <= 0) { 
      this.setState({
        budgetRequired: true
      })
    } else {
      this.setState({
        budgetRequired: false
      })
    }
  }

  handleType = () => {
    if(this.state.typeUpperClass == 'upper') {
      this.setState({
        typeUpperClass: 'upper translate-active-toDown'
      })
    }

    if(this.state.typeUpperClass == 'lower') {
      this.setState({
        typeUpperClass: 'lower translate-active-toUp'
      })
    }

    if(this.state.typeLowerClass == 'lower') {
      this.setState({
        typeLowerClass: 'lower translate-active-toUp'
      })
    }

    if(this.state.typeLowerClass == 'upper') {
      this.setState({
        typeLowerClass: 'upper translate-active-toDown'
      })
    }
    
    setTimeout(() => {
      this.setState({
        type : this.state.type == 'anything' ? 'projects' : 'anything',
        typeLowerClass: this.state.typeLowerClass.indexOf('lower') != -1 ? 'upper' : 'lower',
        typeUpperClass: this.state.typeUpperClass.indexOf('lower') != -1 ? 'upper' : 'lower'
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

    if( this.state.fullname == '' || this.state.email == '' || this.state.description == ''
      || (this.state.type == 'projects' && this.state.phone == '')
      || (this.state.type == 'projects' && this.state.budget == '')
      || this.state.nameRequired || this.state.nameMinChar
      || this.state.emailRequired || this.state.emailInvalid
      || this.state.phoneRequired || this.state.phoneInvalid
      || this.state.messageRequired || this.state.messageMinChar
      || this.state.budgetRequired ) {
      //do nothing
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
    }
  }

  render () {
    return (
      <div>
        <div className='page-wrap'>
          <div className='contact-page'>
            <div className='background' />
            <div className='content'>
              <div className='contact-title'>
                <div className='inquiry-type'>
                  <span className='lets-chat'>let's chat</span>
                  <div className='wrap-type'>
                    <div className={this.state.typeUpperClass}
                      onClick={this.handleType}
                    >
                      anything
                    </div>
                    <div className={this.state.typeLowerClass}
                      onClick={this.handleType}
                    >
                      projects
                    </div>
                  </div>
                </div>
                <div className='close-button'>
                  <span className='x'>x</span>
                  <span className='close'>CLOSE</span>
                </div>
              </div>
              <div className={ (this.state.nameRequired || this.state.nameMinChar) ? 'fullname error' : 'fullname' }>
                <input type='text' 
                  value={ this.state.fullname } 
                  onChange={ this.handleFullname } 
                  onBlur={ this.handleFullnameBlur }
                  placeholder='Name'
                />
                { this.state.nameRequired ? <div className='error-text'> required </div> : null }
                { this.state.nameMinChar ? <div className='error-text'> Must be at least 2 characters </div> : null }
              </div>
              <div className={ (this.state.emailRequired || this.state.emailInvalid) ? 'email error' : 'email' }>
                <input 
                  type='text' 
                  value={ this.state.email } 
                  onChange={ this.handleEmail } 
                  onBlur={ this.handleEmailBlur }
                  placeholder='Email'
                />
                { this.state.emailRequired ? <div className='error-text'> required </div> : null }
                { this.state.emailInvalid ? <div className='error-text'> Invalid Email Address </div> : null }
              </div>
              {
                this.state.type == 'projects'
                ? (
                    <div className={ (this.state.phoneRequired || this.state.phoneInvalid) ? 'phone error' : 'phone' }>
                      <input 
                        type='text' 
                        value={ this.state.phone } 
                        onChange={ this.handlePhone } 
                        onBlur={ this.handlePhoneBlur }
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
                    <div className={ this.state.budgetRequired ? 'budget error' : 'budget' }>
                      <select 
                        onChange={this.handleBudget} 
                        onBlur={ this.handleBudgetBlur }
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
              <div className={ (this.state.messageRequired || this.state.messageMinChar) ? ('description error description-' + this.state.type) : ('description description-' + this.state.type) } >
                <textarea 
                  type='text' 
                  value={ this.state.description } 
                  onChange={ this.handleDesc } 
                  onBlur={ this.handleDescBlur }
                  placeholder='Message'
                  cols='40'
                  rows='5'
                />
                { this.state.messageRequired ? <div className='error-text'> required </div> : null }
                { this.state.messageMinChar ? <div className='error-text'> Must be at least 20 characters </div> : null }              
              </div>
              <div className='submit' onClick={ this.submitData }>
                SEND
              </div>
            </div>
          </div>
        </div>
        <div className='side-info-bar'>
          {
            this.state.type == 'projects'
            ? (
                  <div className='projects-text'>
                    We’d love to help build your newest project.
                  </div>
              )
            : (
                  <div className='thoughts-text'>
                    Have something on your mind? Let’s chat!
                  </div>
              )
          }
          <div className='sidebar-email-title'>
            email
          </div>
          <div className='sidebar-email-value'>
            yo@numie.co
          </div>
          <div className='sidebar-phone-title'>
            phone
          </div>
          <div className='sidebar-phone-value'>
            +1 960.333.5235
          </div>
          <div className='social-media-buttons'>
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
    )
  }
}