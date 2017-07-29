import React from 'react'

const domain = 'https://numie.ghost.io'
let inlineImageStyle = null
export default class SinglePost extends React.Component {

  constructor (props) {
    super (props)

    inlineImageStyle = {
      backgroundImage: 'url(' + domain + this.props.image + ')'
    }
  }

  render () {
    return (
      <div className="post columns">
        <div
          className="image column is-half"
          style={ inlineImageStyle }
        >
        </div>
        <div className="column is-half post-container">
          {
            this.props.tag.length > 0
            ? (
                <span className= { "general " + this.props.tag[0].name } >
                  { this.props.tag[0].name }
                </span>
              )
            : (
                <span className="general">
                  General
                </span>
              )
          }

          <h2 className="post-title">
            {this.props.title !== null ? this.props.title : 'Loading...' }
          </h2>

          <div className="post-content"
            dangerouslySetInnerHTML={{ __html: this.props.html !== null ? this.props.html : (<p>Loading ...</p>) }}
          />

          <div className='author'>
            {
              ( this.props.author.image !== null)
              ? (
                  <div className='author-image'>
                    <img
                      src={ this.props.author.image }
                      alt={ this.props.author.name } 
                    />
                  </div>
                )
              : <div className='author-image blank-image' />

            }
            
            <div className='author-name'>
              {
                ( this.props.author.name !== null )
                ? this.props.author.name
                : null
              }
            </div>

          </div>
        </div>
      </div>
    )
  }
}