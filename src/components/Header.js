import React from 'react'
import { Link } from 'react-router-dom'

import NumieLogo from '../SVG/NumieLogo'

export default class Header extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      isMobile : false
    }
  }

  componentWillMount () {
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
        {
          this.state.isMobile === true
          ? (
              <div className='menu-wrapper'>
                <div className='logo'>
                  <Link to={'/'}>
                    <NumieLogo />
                  </Link>  
                </div>
                <div className='wrap-buttons'>
                  <div className='get-in-touch'>
                    <a href='#contact'>
                      Get In Touch
                    </a>
                  </div>
                  <div className='mobile-menu'>
                    <div className='menu-button-inner'>
                    </div>
                  </div>
                </div>
              </div>
            )
          : ( 
              <div className='menu-wrapper'>
                <div className='logo'>
                  <Link to={'/'}>
                    <NumieLogo />
                  </Link>
                </div>
                <div className='menu'>
                  <div className='home-menu'>
                    <Link to={'/'}>
                      Home
                    </Link>
                  </div>
                  <div className='what-we-do-menu'>
                    What we do
                  </div>
                  <div className='out-work-menu'>
                    Our work
                  </div>
                  <div className='writing-menu'>
                    Writing
                  </div>
                </div>
                <div className='get-in-touch'>
                  <a href='#contact'>
                    Get In Touch
                  </a>
                </div>
              </div>
            )
        }
      </div>
    )
  }
}