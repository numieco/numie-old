import React from 'react'
import ArrowSVG from './SVG/Arrow'

export default class ContactFooter extends React.Component {
  constructor (props) {
    super (props)
  }

  render () {
    return (
      <div className='contact-footer'>
        <div className='nav-button prev'>
          <div className='arrow'>
            <ArrowSVG />
          </div>
        </div>
        <div className='nav-button next disable'>
          <div className='arrow'>
            <ArrowSVG />
          </div>
        </div>
        <div className='skip'>skip</div>
        <div className='nav-button send'>Send</div>
        <span className='press-enter'>
          or press enter
        </span>
      </div>
    )
  }
}
