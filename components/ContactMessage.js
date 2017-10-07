import React from 'react'
import AutosizeInput from 'react-input-autosize'

export default class ContactMessage extends React.Component {
  constructor (props) {
    super (props)

    this.handleMessage = this.handleMessage.bind(this)
  }

  handleMessage = (e) => {
    this.props.setMessage(e.target.value)
  }

  render () {
    return (
      <div className={ this.props.pageIndex === 5 ? 'contact-message active' : 'contact-message' }>
        <textarea
          value={this.props.message}
          className='message-input'
          onChange={ this.handleMessage }
          placeholder='Include message'
        />
      </div>
    )
  }
}
