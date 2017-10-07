import React from 'react'


export default class ContactInterest extends React.Component {
  constructor (props) {
    super (props)
  }

  render () {
    const { interest } = this.props
    return (
      <div className={ this.props.pageIndex === 1 ? 'contact-interest active' : 'contact-interest' }>
        <div className='contact-text'>
          I am interested in
        </div>
        <div className='button-wrapper'>
          <div className='pair-wrapper'>
            <div className={ (interest.branding ? '' : 'disable') + ' interest-btn' }
              onClick={ () => {
                this.props.changeInterestState({branding: !interest.branding})
              } }
            >
              Branding
            </div>
            <div className={ (interest.design ? '' : 'disable') + ' interest-btn' }
              onClick={() => {
                this.props.changeInterestState({ design: !interest.design })
              }}
            >
              Design
            </div>
          </div>
          <div className='pair-wrapper'>
            <div className={ (interest.dev ? '' : 'disable') + ' interest-btn' }
              onClick={() => {
                this.props.changeInterestState({ dev: !interest.dev })
              }}
            >
              Development
            </div>
            <div className={ (interest.marketing ? '' : 'disable') + ' interest-btn' }
              onClick={() => {
                this.props.changeInterestState({ marketing: !interest.marketing })
              }}
            >
              Marketing
            </div>
          </div>
          <div className='pair-wrapper'>
            <div className={ (interest.other ? '' : 'disable') + ' interest-btn' }
              onClick={() => {
              this.props.changeInterestState({ other: !interest.other })
              }}
            >
              Other
            </div>
          </div>
          <div className={ this.props.interestError ? 'error interestError' : 'error interestError disable-err' }>
            This field is required.
          </div>
        </div>
      </div>
    )
  }
}
