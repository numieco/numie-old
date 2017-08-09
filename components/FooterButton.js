import React from 'react'

const FooterButton = (props) => (
  <div className={'footer-button ' + props.className}>
    {props.content}
  </div>
)

export default FooterButton
