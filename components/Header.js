import React from 'react'
import Link from 'next/link'

import {
  NumieLogoRed,
  NumieLogoBlack,
  NumieLogoWhite
} from './SVG/NumieLogo'

import {
  SmallFacebook,
  SmallTwitter,
  SmallInstagram
} from './SVG/Socials'

let NUMIELOGO = <NumieLogoRed />

export default class Header extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      isMobile : true,
      toggleMenu: false
    }

    this.toggleMenu = this.toggleMenu.bind(this)
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

    // document.body.style.overflowY = 'visible'

    var menu = document.querySelector('.menu-for-mobile')
    let menuRevealer = new RevealFx(menu)

    var closeControl = document.querySelector('.menu-close-cross')
    var menuHeader = document.querySelector('.menu-header')
    var menuRevealContent = document.querySelector('.block-ref-menu')

    document.querySelector('.mobile-menu').addEventListener('click', function() {
      menu.style.zIndex = 5
      menu.style.opacity = 1

      menuRevealer.reveal({
        bgcolor: '#e0394a',
        direction: 'rl',
        duration: 600,
        onCover: function(contentEl, revealerEl) {
          menu.classList.add('form--open')
          contentEl.style.opacity = 1
          menu.style.background = '#141516'
          // document.body.style.overflowY = 'hidden'
        },
        onComplete: function() {
          closeControl.addEventListener('click', closeForm)
        }
      })
    })

    function closeForm() {
      menuRevealer.reveal({
        bgcolor: '#e0394a',
        direction: 'lr',
        duration: 600,
        onCover: function(contentEl, revealerEl) {
          menu.classList.remove('form--open')
          contentEl.style.opacity = 0
          menu.style.background = 'transparent'
          // document.body.style.overflowY = 'visible'
        },
        onComplete: function () {
          menu.style.opacity = 0
          menu.style.zIndex = -3
        }
      })
    }


  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.listenResizeEvent)
  }

  toggleMenu = () => {
    this.setState({
      toggleMenu: !this.state.toggleMenu
    })
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
      <div>
        <div className='header'>
          <div className='menu-wrapper'>
            <div className='logo'>
              <Link href='/'>
                <a>
                  { NUMIELOGO }
                </a>
              </Link>
            </div>
            <div>
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
              <div className='secondary hollow get-in-touch'>
                <a>
                  Get In Touch
                </a>
              </div>
              <div className='mobile-menu'>
                <div className='menu-button-inner'>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='wrap-buttons'>
          <div className='menu-for-mobile'>
            <div className='block-revealer__content block-ref-menu'>
              <div className='menu-header'>
                <div className='logo'>
                  <NumieLogoRed />
                </div>
                <div className='menu-close-cross' onClick={this.toggleMenu}></div>
              </div>
              <div className='home-menu slide-fadein-from-right'>
                <Link href='/'>
                  <a>Home</a>
                </Link>
              </div>
              <div className='what-we-do-menu slide-fadein-from-right'>
                What we do
              </div>
              <div className='out-work-menu slide-fadein-from-right'>
                Our work
              </div>
              <div className='writing-menu slide-fadein-from-right'>
                <Link href='/blog'>
                  <a>Writing</a>
                </Link>
              </div>
              <div className='social-butons slide-fadein-from-right'>
                <SmallInstagram />
                <SmallTwitter />
                <SmallFacebook />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
