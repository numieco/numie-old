import React from 'react'
import AutosizeInput from 'react-input-autosize'

export default class ContactPhone extends React.Component {
  constructor (props) {
    super (props)

    this.handlePhone = this.handlePhone.bind(this)
  }

  handlePhone = (e) => {
    this.props.setPhone(e.target.value)
  }

  render () {
    return (
      <div className={ this.props.pageIndex === 4 ? 'contact-phone active' : 'contact-phone' }>
        <div className='wrapper'>
          <span className='phone-text'>My phone number is </span>
          <AutosizeInput
            name='form-field-phone'
            value={this.props.phone}
            className='phone-input'
            onChange={ this.handlePhone }
            placeholder='1118675309'
          />
        </div>
      </div>
    )
  }
}
