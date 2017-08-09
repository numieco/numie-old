import React from 'react'

const FooterButton = (props) => {
  if (props.footerSmallText !== null) {
    return (
        <div className={'footer-button footer-small-text ' + props.smallClassName}>
          <span>{props.footerSmallText}</span>
        </div>
      )
  }
  if (props.footerLargeText !== null) {
    return (
        <div className={'footer-button footer-large-text ' + props.largeClassName}>
          <span>{props.footerLargeText}</span>
        </div>
      )
  }
}

export default FooterButton
