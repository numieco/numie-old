import React from 'react'
import Router from 'next/router'
import FooterButton from './FooterButton'

import Circular from './SVG/Circular'
import { NewFacebook, NewTwitter, Github, NewInstagram } from './SVG/Socials'
import { NumieLogoWhite } from './SVG/NumieLogo'

let showOpenAnimation = require('../helpers/pageToPageAnimation')

const Footer  = (props) => (
  <footer>
    <div className='circular'>
      <Circular />
    </div>
    <div className='numie-logo'>
      <NumieLogoWhite />
    </div>
    <div className='footer-text'>
      <div className='small-text'>
        GET ENOUGH TO READ?
      </div>
      <div className='large-text'>
        LET’S WORK TOGETHER.
      </div>

      <FooterButton
        smallClassName='medium-text get-in-touch'
        footerSmallText='GET IN TOUCH'
        footerLargeText={ null }
        largeClassName=''
        onClick={ () => {
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
        } }
      />

    </div>
    <div className='footer-bottom'>
      <div className="social">
        <div className='social-buttons'>
          <a href='https://instagram.com/numieco'><NewInstagram/></a>
          <a href='https://twitter.com/numieco'><NewTwitter/></a>
          <a href='https://facebook.com/numieco'><NewFacebook/></a>
        </div>
      </div>
      <div className='contact-company'>2017 Numie, LLC. 888-888-8888</div>
    </div>
  </footer>
)

export default Footer
