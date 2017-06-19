import React from 'react'
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
                  <NumieLogo />
                </div>
                <div className='wrap-buttons'>
                  <div className='get-in-touch'>
                    Get In Touch
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
                  <NumieLogo />
                </div>
                <div className='menu'>
                  <div className='home-menu'>
                    Home
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
                  Get In Touch
                </div>
              </div>
            )
        }
      </div>
    )
  }
}