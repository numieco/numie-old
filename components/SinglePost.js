import React from 'react'

const domain = 'https://numie.ghost.io'

export default class SinglePost extends React.Component {
  render () {
    return (
      <div className="post columns">
        <div className="image column is-half">
          <img src={ domain + (this.props.image !== null ? this.props.image : '/content/images/2017/07/crowd.png') } alt="" />
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
        </div>
      </div>
    )
  }
}