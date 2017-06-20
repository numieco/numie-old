import React from 'react'
import Select from 'react-select'
import axios from 'axios'
import Header from '../components/Header'

const options = [
  { value: '< $2000', label: '< $2000' },
  { value: '2000 - 5000', label: '2000 - 5000' },
  { value: '5000 - 10000', label: '5000 - 10000' },
  { value: '10,000 - 15,000', label: '10,000 - 15,000' },
  { value: '15,000 - 20,000', label: '15,000 - 20,000' },
  { value: '> 20,000', label: '> 20,000' }
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
      isBusinessEnquiry: false
    }

    this.handleFullname = this.handleFullname.bind(this)
    this.handleEmail = this.handleEmail.bind(this)
    this.handlePhone = this.handlePhone.bind(this)
    this.handleDesc = this.handleDesc.bind(this)
    this.handleBudget = this.handleBudget.bind(this)
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

  handleBudget = (selectedValue) => {
    console.log(selectedValue)
    if(selectedValue !== null)
      this.setState({ budget: selectedValue.value }, () => console.log('budget ' + this.state.budget))
    else
      this.setState({ budget: '' })
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
      <div className='contact-page'>
        <Header />
        <div className='content'>
          <div className='fullname'>
            Full Name :
            <input type='text' value={ this.state.fullname } onChange={ this.handleFullname } />
          </div>
          <div className='email'>
            Email: 
            <input type='text' value={ this.state.email } onChange={ this.handleEmail } />
          </div>
          <div className='phone'>
            Phone: 
            <input type='text' value={ this.state.phone } onChange={ this.handlePhone } />
          </div>
          <div className='description'>
            Description: 
            <input type='text' value={ this.state.description } onChange={ this.handleDesc } />
          </div>
          <div className=''>
            <b>NOTE:</b> Only for Business Enquiry
          </div>
          <div className='budget'>
            Budget: 
            <Select 
              name='budget'
              className='budget-box'
              value={ this.state.budget }
              options={ options }
              onChange={ this.handleBudget }
            />
          </div>
          <div className='submit' onClick={ this.submitData }>
            SUBMIT
          </div>
        </div>
      </div>
    )
  }
}