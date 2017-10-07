import React from 'react'
import AutosizeInput from 'react-input-autosize'

export default class ContactEmail extends React.Component {
  constructor (props) {
    super (props)

    this.handleEmail = this.handleEmail.bind(this)
  }

  handleEmail = (e) => {
    this.props.setEmail(e.target.value)
  }

  render () {
    return (
      <div className={ this.props.pageIndex === 3 ? 'contact-email active' : 'contact-email' }>
        <div className='wrapper'>
          <span className='email-text'>My email is </span>
          <AutosizeInput
            name='form-field-email'
            value={this.props.email}
            className='email-input'
            onChange={ this.handleEmail }
            placeholder='email@company.com'
          />
          <div className={ this.props.emailError ? 'error emailError' : 'error emailError disable-err' }>
            Invalid email.
          </div>
        </div>
      </div>
    )
  }
}
