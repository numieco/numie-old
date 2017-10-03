import React from 'react'
import AutosizeInput from 'react-input-autosize'

export default class ContactMessage extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      name: 'John',
      interest: ['marketing', 'trading', 'design', 'development']
    }
  }

  render () {
    let len = this.state.interest.length
    let string = ''
    for (var i=0; i<len; i++) {
      if (len - 1 - i === 0) {
        string += (this.state.interest[i])
      } else if (len - 1 - i === 1) {
        string += (this.state.interest[i] + ' and ')
      } else {
        string += (this.state.interest[i] + ', ')
      }
    }

    return (
      <div className='contact-success'>
        <div className='large-text'>Thanks for the message <b>{ this.state.name }!</b></div>
        <div className='small-text'>
          We’ll be in touch to discuss your <b>{ string }</b> project soon.
        </div>
      </div>
    )
  }
}
