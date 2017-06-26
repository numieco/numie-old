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
      type: 'anything'
    }

    this.handleFullname = this.handleFullname.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handlePhone = this.handlePhone.bind(this)
    this.handleDesc = this.handleDesc.bind(this)
    this.handleBudget = this.handleBudget.bind(this)
    this.handleType = this.handleType.bind(this)
    this.submitData = this.submitData.bind(this)
  }

  handleFullname = (e) => {
    this.setState({ fullname: e.target.value }, () => console.log('fname ' + this.state.fullname))
  }

  handleEmail = (e) => {
    this.setState({ email: e.target.value }, () => console.log('email ' + this.state.email))
  }

  handlePhone = (e) => {
    this.setState({ phone: e.target.value }, () => console.log('phone ' + this.state.phone))
  }

  handleDesc = (e) => {
    this.setState({ description: e.target.value }, () => console.log('desc ' + this.state.description))
  }

  handleBudget = (e) => {
    console.log(e.target.value)
    if(e.target !== null)
      this.setState({ budget: e.target.value }, () => console.log('budget ' + this.state.budget))
    else
      this.setState({ budget: '' })
  }

  handleType = () => {
    this.setState({
      type : this.state.type == 'anything' ? 'projects' : 'anything'
    })
  }

  submitData = () => {
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
                    <span className='upper'>
                      {this.state.type== 'anything' ? 'anything' : 'projects'}
                    </span>
                    <div className='lower' onClick={this.handleType}>
                      {this.state.type == 'anything' ? 'projects' : 'anything'}
                    </div>
                  </div>
                </div>
                <div className='close-button'>
                  <span className='x'>x</span>
                  <span className='close'>CLOSE</span>
                </div>
              </div>
              <div className='fullname'>
                <input type='text' 
                  value={ this.state.fullname } 
                  onChange={ this.handleFullname } 
                  placeholder='Name'
                />
              </div>
              <div className='email'>
                <input 
                  type='text' 
                  value={ this.state.email } 
                  onChange={ this.handleEmail } 
                  placeholder='Email'
                />
              </div>

              {
                this.state.type == 'projects'
                ? (
                    <div className='phone'>
                      <input 
                        type='text' 
                        value={ this.state.phone } 
                        onChange={ this.handlePhone } 
                        placeholder='Phone'
                      />
                    </div>
                  )
                : null
              }

              {
                this.state.type == 'projects'
                ? (
                    <div className='budget'>
                      <select onChange={this.handleBudget} value={this.state.budget}>
                        <option value='' disabled defaultValue=''>Budget</option>
                        <option value='Prefer not to say'>Prefer not to say</option>
                        <option value='2000 - $5000'>2000 - $5000</option>
                        <option value='$5000 - $10000'>$5000 - $10000</option>
                        <option value='$10,000 - $15,000'>$10,000 - $15,000</option>
                        <option value='$15,000 - $20,000'>$15,000 - $20,000</option>
                        <option value='> $20,000'> $20,000</option>
                      </select>
                    </div>
                  )
                : null
              }

              <div className={ 'description description-' + this.state.type } >
                <textarea 
                  type='text' 
                  value={ this.state.description } 
                  onChange={ this.handleDesc } 
                  placeholder='Message'
                  cols='40'
                  rows='5'
                />
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