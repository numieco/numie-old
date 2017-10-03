import React from 'react'
import AutosizeInput from 'react-input-autosize'

export default class ContactEmail extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      email: ''
    }

    this.handleEmail = this.handleEmail.bind(this)
  }

  handleEmail = (e) => {
    this.setState({
      email: e.target.value
    }, () => {
      console.log(this.state.email)
    })
  }

  render () {
    return (
      <div className='contact-email'>
        <span className='email-text'>My email is </span>
        <AutosizeInput
          name='form-field-email'
          value={this.state.email}
          className='email-input'
          onChange={ this.handleEmail }
          placeholder='email@company.com'
        />
      </div>
    )
  }
}
