import React from 'react'


 export default class ContactInterest extends React.Component {
   constructor (props) {
     super (props)
     this.state = {
       branding: false,
       design: false,
       dev: false,
       marketing: false,
       other: false
     }
   }

   render () {
     return (
       <div className='contact-interest'>
        <div className='contact-text'>
          I am interested in
        </div>
        <div className='button-wrapper'>
          <div className='pair-wrapper'>
            <div className={ (this.state.branding ? '' : 'disable') + ' interest-btn' }
              onClick={() => {
                this.setState({ branding: !this.state.branding })
              }}
            >
              Branding
            </div>
            <div className={ (this.state.design ? '' : 'disable') + ' interest-btn' }
            onClick={() => {
              this.setState({ design: !this.state.design })
            }}
            >
              Design
            </div>
          </div>
          <div className='pair-wrapper'>
            <div className={ (this.state.dev ? '' : 'disable') + ' interest-btn' }
            onClick={() => {
              this.setState({ dev: !this.state.dev })
            }}
            >
              Development
            </div>
            <div className={ (this.state.marketing ? '' : 'disable') + ' interest-btn' }
            onClick={() => {
              this.setState({ marketing: !this.state.marketing })
            }}
            >
              Marketing
            </div>
          </div>
          <div className='pair-wrapper'>
            <div className={ (this.state.other ? '' : 'disable') + ' interest-btn' }
            onClick={() => {
              this.setState({ other: !this.state.other })
            }}
            >
              Other
            </div>
          </div>
        </div>
       </div>
     )
   }
 }
