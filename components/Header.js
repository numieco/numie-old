import React from 'react'
import Link from 'next/link'

import { NumieLogoRed, NumieLogoBlack, NumieLogoWhite } from './SVG/NumieLogo'

let NUMIELOGO = <NumieLogoRed />

export default class Header extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      isMobile : false
    }
  }

  componentWillMount () {
    if (this.props.defaultLogo == 'red')
      NUMIELOGO = <NumieLogoRed />
    if (this.props.defaultLogo == 'black')
      NUMIELOGO = <NumieLogoBlack />
    if (this.props.defaultLogo == 'white')
      NUMIELOGO =  <NumieLogoWhite />
  }

  componentDidMount () {
    this.listenResizeEvent()
    window.addEventListener('resize', this.listenResizeEvent)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.listenResizeEvent)
  }

  listenResizeEvent = () => {
    if (window.innerWidth <= 767) {
      this.setState({
        isMobile: true
      })
    } else {
      this.setState({
        isMobile: false
      })
    }
  }

  render () {
    return (
      <div className='header'>
        <div className='menu-wrapper'>
          <div className='logo'>
            <Link href='/'>
              <a>
                { NUMIELOGO }
              </a>
            </Link>  
          </div>
          <div className={this.state.isMobile ? 'wrap-buttons' : ''}>
            {
              !this.state.isMobile
              ? (
                  <div className='menu'>
                    <div className='home-menu'>
                      <Link href='/'>
                        <a>Home</a>
                      </Link>
                    </div>
                    <div className='what-we-do-menu'>
                      What we do
                    </div>
                    <div className='out-work-menu'>
                      Our work
                    </div>
                    <div className='writing-menu'>
                      <Link href='/blog'>
                        <a>Writing</a>
                      </Link>
                    </div>
                  </div>
                )
              : null
            }
            <div className='get-in-touch'>
              <a>
                Get In Touch
              </a>
            </div>
            {
              this.state.isMobile
              ? (
                  <div className='mobile-menu'>
                    <div className='menu-button-inner'>
                    </div>
                  </div>
                )
              : null
            }
          </div>
        </div>
      </div>
    )
  }
}