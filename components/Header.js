import React from 'react'
import Link from 'next/link'
import Router from 'next/router'

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

let showCloseAnimation = require('../helpers/pageToPageAnimation')

let NUMIELOGO = <NumieLogoRed />

export default class Header extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      isMobile : true,
      toggleMenu: false
    }

    this.toggleMenu = this.toggleMenu.bind(this)
    this.onContactPageNav = this.onContactPageNav.bind(this)
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
    if (this.props.url !== undefined && this.props.url.query.origin === 'contact') {
      showCloseAnimation({
        type: 'close',
        direction: this.props.url.query.success ? 'bt' : 'tb',
        delay: 0,
        duration: 600,
        bgcolor: this.props.url.query.success ? '#62E17C' : '#e0394a'
      })
    }

    this.listenResizeEvent()
    window.addEventListener('resize', this.listenResizeEvent)

    document.body.style.overflowY = 'visible'

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
          document.body.style.overflowY = 'hidden'
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
          document.body.style.overflowY = 'visible'
        },
        onComplete: function () {
          menu.style.opacity = 0
          menu.style.zIndex = -3
        }
      })
    }

    this.initReveal()
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

  onContactPageNav = () => {
    this.showInitialAnimation()
    setTimeout(() => Router.push(
      '/contact?origin=' + window.location.href.slice(window.location.href.lastIndexOf('/')),
      '/contact'
    ), 700)
  }

  createDOMEl = (type, className, content) => {
    var el = document.createElement(type)
    el.className = className || ''
    el.innerHTML = content || ''
    return el
  }

  transformSettings = {
    val: 'scale3d(1,0,1)',
    origin: '50% 100%',
    halfway: '50% 0'
  }

  revealProps = { // In case revealSettings is incomplete, its properties deafault to:
    duration: 600,
    easing: 'easeInOutQuint',
    delay: 0,
    bgcolor: '#e0394a',
    direction: 'bt',
    coverArea: 0
  }

  initReveal = () => {
    var initialRevealer = this.createDOMEl('div', 'default-reveal__element')
    document.querySelector('main').appendChild(initialRevealer)
  }

  showInitialAnimation = () => {

    let revealBlock = document.querySelector('.default-reveal__element')

    revealBlock.style.WebkitTransform = revealBlock.style.transform = this.transformSettings.val
    revealBlock.style.WebkitTransformOrigin = revealBlock.style.transformOrigin =  this.transformSettings.origin.initial
    revealBlock.style.backgroundColor = this.revealProps.bgcolor
    revealBlock.style.opacity = 1

    let animationSetting = {
      targets: revealBlock,
      delay: 0,
      duration: 600,
      easing: 'easeInOutQuint',
      scaleY: [0,1],
      complete: function () {
        // revealBlock.style.WebkitTransformOrigin = revealBlock.style.transformOrigin = this.transformSettings.origin.halfway
        // document.getElementsByClassName('header-ref')[0].style.opacity = 0
      }
    }

    anime(animationSetting)
  }



  render () {
    return (
      <div>
        <div className='header header-ref'>
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
              <div
                className='secondary hollow get-in-touch'
                onClick={ this.onContactPageNav }>
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
