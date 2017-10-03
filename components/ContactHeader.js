import React from 'react'
import { NumieLogoRed } from './SVG/NumieLogo'

export default class ContactHeader extends React.Component {
  render () {
    return (
      <div className='contact-header'>
        <div className='logo'>
          <NumieLogoRed />
        </div>

        <div className='close-button'onClick={this.props.onCloseClick}>
        </div>
      </div>
    )
  }
}
