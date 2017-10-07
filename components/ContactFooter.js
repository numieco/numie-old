import React from 'react'
import ArrowSVG from './SVG/Arrow'

export default class ContactFooter extends React.Component {
  constructor (props) {
    super (props)
  }

  componentDidMount () {
    // document.querySelector('.name-input').onkeypress = (e) => {
    //   var keyCode = e.which || e.keyCode
    //   if (keyCode === 13) {
    //     this.props.increaseIndex()
    //   }
    // }
    //
    // document.querySelector('.email-input').onkeypress = (e) => {
    //   var keyCode = e.which || e.keyCode
    //   if (keyCode === 13) {
    //     this.props.increaseIndex()
    //   }
    // }

  }

  render () {
    return (
      <div className='contact-footer'>

        {
          this.props.pageIndex <= 5
          ? (
              <div className='nav-button prev disable' onClick={ this.props.decreaseIndex }>
                <div className='arrow'>
                  <ArrowSVG />
                </div>
              </div>
            )
          : null
        }

        {
          this.props.pageIndex <= 4
          ? (
              <div className='nav-button next' onClick={ this.props.increaseIndex }>
                <div className='arrow'>
                  <ArrowSVG />
                </div>
              </div>
            )
          : null
        }

        {
          this.props.pageIndex == 2
          ? (
              <div className='skip' onClick={ this.props.increaseIndex }>skip</div>
            )
          : null
        }

        {
          this.props.pageIndex === 5
          ? (
              <div className='nav-button send' onClick={ this.props.increaseIndex }>Send</div>
            )
          : null
        }

        {
          (this.props.pageIndex <= 4 & this.props.pageIndex != 2)
          ? (
              <span className='press-enter' onClick={ this.props.increaseIndex }>
              or press enter
              </span>
            )
          : null
        }

        {
          this.props.pageIndex == 6
          ? (
              <div className='nav-button home' onClick={ this.props.navigateHome }>
                home
              </div>
            )
          : null
        }

      </div>
    )
  }
}
