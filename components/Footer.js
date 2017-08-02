import React from 'react'
import Dip from './SVG/Dip'
import { Facebook, Twitter, Github, Instagram } from './SVG/Socials'
import { NumieLogoWhite } from './SVG/NumieLogo'

const Footer = ({white}) => (
  <footer>

    <div className='dip'>
      <Dip className='dip' white={ white } />
    </div>
    <div className='numie-logo'>
      <NumieLogoWhite />
    </div>
    <div id="subscribe">
      <h3 className="sub-tagline">
        Fresh articles of fascinating
        things delivered to your inbox.
      </h3>
      <form className="box field" id="sub-btn">
        <p className="control">
          <input className="input" type="email" placeholder="Your email" />
        </p>
        <div className="subscribe-button button is-white">
          SUBSCRIBE
        </div>
      </form>
      <div className="sub-promise">
        No spam. No ads. No selfies. We promise.
      </div>
    </div>
    <div className="social">
      <div className='want-to-work'>
        Want to work on something great together?
      </div>
      <div className="numie-title">NUMIE STUDIO</div>
      <div className="numie-email"><a href='mailto:yo@numie.co?subject=Howdy!'>yo@numie.co</a></div>
      <div className='social-buttons'>
        <a href='https://instagram.com/numieco'><Instagram/></a>
        <a href='https://twitter.com/numieco'><Twitter/></a>
        <a href='https://facebook.com/numieco'><Facebook/></a>
        <a href='https://github.com/numieco'><Github/></a>
      </div>
      <div className='go-up'>GO UP</div>
    </div>
  </footer>
)

export default Footer
