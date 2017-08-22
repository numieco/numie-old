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
let showOpenAnimation = require('../helpers/pageToPageAnimation')

let NUMIELOGO = <NumieLogoRed />

let pageIndex = ['/', '/whatwedo', '/ourwork', '/blog']
let welcomeMessage = [
  'Message 1',
  'Message 2',
  'Message 3',
  'Message 4'
]

export default class Header extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      toggleMenu: false
    }

    this.toggleMenu = this.toggleMenu.bind(this)
    this.onContactPageNav = this.onContactPageNav.bind(this)
    //this.changePage = this.changePage.bind(this)
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
    window.scrollTo(0, 0)
    document.body.style.overflowY = 'visible'

    if(document.querySelector('.default-reveal__element') === null) {
      let revealBlock = document.createElement('div')
      revealBlock.className = 'default-reveal__element'
      document.querySelector('main').appendChild(revealBlock)
    }

    if (this.props.url !== undefined && this.props.url.query.origin === 'contact') {
      showCloseAnimation({
        type: 'close',
        direction: this.props.url.query.success ? 'bt' : 'tb',
        delay: 0,
        duration: 600,
        bgcolor: this.props.url.query.success ? '#62E17C' : '#e0394a',
        halfway: true
      })
    }

    if (this.props.url !== undefined && this.props.url.query.origin === 'header') {
      let currentPage = window.location.href.slice(window.location.href.lastIndexOf('/'))
      document.querySelector('.default-reveal__element').innerHTML = ''
      document.querySelector('.default-reveal__element').appendChild( this.welcomeMessageEl(welcomeMessage[pageIndex.indexOf(currentPage)]) )

      document.querySelector('.welcome-message').classList.add('welcome-message__active')
      setTimeout (() => {
        document.querySelector('.welcome-message').classList.add('welcome-message__inactive')
        document.querySelector('.welcome-message').classList.remove('welcome-message__active')
      }, 1000)

      showCloseAnimation({
        type: 'close',
        direction: this.props.url.query.dir ? this.props.url.query.dir : 'lr',
        delay: 2000,
        duration: 600,
        bgcolor: this.props.url.query.success ? '#62E17C' : '#e0394a',
        halfway: true
      })
    }

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
  }

  welcomeMessageEl = (message) => {
    let elem = document.createElement('div')
    elem.className = 'welcome-message'
    elem.innerHTML = message
    return elem
  }

  toggleMenu = () => {
    this.setState({
      toggleMenu: !this.state.toggleMenu
    })
  }

  onContactPageNav = () => {
    document.querySelector(".default-reveal__element").innerHTML = ''
    showOpenAnimation({
      type: 'start',
      direction: 'bt',
      delay: 0,
      duration: 600,
      bgcolor: '#e0394a'
    })
    setTimeout(() => Router.push(
      '/contact?origin=' + window.location.href.slice(window.location.href.lastIndexOf('/')),
      '/contact'
    ), 700)
  }

  changePage = (nextPage) => {

    let currentPage = window.location.href.slice(window.location.href.lastIndexOf('/'))
    let dir = 'rl' //default transition

    if (pageIndex.indexOf(currentPage) > pageIndex.indexOf(nextPage)) {
      dir = 'lr'
    }

    document.querySelector(".default-reveal__element").innerHTML = ''
    document.querySelector(".default-reveal__element").appendChild( this.welcomeMessageEl(welcomeMessage[pageIndex.indexOf(nextPage)]) )

    setTimeout(() => {
      document.querySelector('.welcome-message').classList.add('welcome-message__active')
    }, 200)

    if (currentPage !== nextPage) {
      showOpenAnimation({
        type: 'start',
        direction: dir,
        delay: 0,
        duration: 600,
        bgcolor: '#e0394a'
      })
      setTimeout(() => Router.push(
        nextPage + '?origin=header&dir='+dir,
        nextPage
      ), 700)
    }
  }

  render () {
    return (
      <div>
        <div className='header header-ref'>
          <div className='menu-wrapper'>
            <div className='logo' onClick={() => this.changePage('/')}>

                <a>
                  { NUMIELOGO }
                </a>

            </div>
            <div>
              <div className='menu'>
                <div className='home-menu' onClick={() => this.changePage('/')}>

                    <a>Home</a>

                </div>
                <div className='what-we-do-menu' onClick={() => this.changePage('/whatwedo')}>
                  What we do
                </div>
                <div className='out-work-menu' onClick={() => this.changePage('/ourwork')}>
                  Our work
                </div>
                <div className='writing-menu' onClick={() => this.changePage('/blog')}>

                    <a>Writing</a>

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
              <div className='home-menu slide-fadein-from-right'  onClick={() => this.changePage('/')}>

                  <a>Home</a>

              </div>
              <div className='what-we-do-menu slide-fadein-from-right'  onClick={() => this.changePage('/whatwedo')}>
                What we do
              </div>
              <div className='out-work-menu slide-fadein-from-right' onClick={() => this.changePage('/ourwork')}>
                Our work
              </div>
              <div className='writing-menu slide-fadein-from-right' onClick={() => this.changePage('/blog')}>

                  <a>Writing</a>

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
