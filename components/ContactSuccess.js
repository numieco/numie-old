import React from 'react'
import AutosizeInput from 'react-input-autosize'

export default class ContactMessage extends React.Component {
  constructor (props) {
    super (props)
  }

  render () {
    let interest = this.props.interest
    let arr = []
    Object.keys(interest).map((key) => {
      if (interest[key]){
        arr.push(key)
      }
    })

    let len = arr.length
    let string = ''
    for (var i=0; i<len; i++) {
      if (len - 1 - i === 0) {
        string += (arr[i])
      } else if (len - 1 - i === 1) {
        string += (arr[i] + ' and ')
      } else {
        string += (arr[i] + ', ')
      }
    }

    return (
      <div className={ this.props.pageIndex === 6 ? 'contact-success active' : 'contact-success' }>
        <div className='large-text'>Thanks for the message <b>{ this.props.name }!</b></div>
        <div className='small-text'>
          We’ll be in touch to discuss your <b>{ string }</b> project soon.
        </div>
      </div>
    )
  }
}
