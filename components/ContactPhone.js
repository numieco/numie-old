import React from 'react'
import AutosizeInput from 'react-input-autosize'

export default class ContactPhone extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      phone: ''
    }

    this.handlePhone = this.handlePhone.bind(this)
  }

  handlePhone = (e) => {
    this.setState({
      phone: e.target.value
    }, () => {
      console.log(this.state.phone)
    })
  }

  render () {
    return (
      <div className='contact-phone'>
        <span className='phone-text'>My phone number is </span>
        <AutosizeInput
          phone='form-field-phone'
          value={this.state.phone}
          className='phone-input'
          onChange={ this.handlePhone }
          placeholder='1118675309'
        />
      </div>
    )
  }
}
