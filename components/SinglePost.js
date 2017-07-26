import React from 'react'

const domain = 'https://numie.ghost.io'

export default class SinglePost extends React.Component {
  render () {
    return (
      <div className="post columns">
        <div className="column is-half">
          <img src={domain + (this.props.image !== null ? this.props.image : '/content/images/2017/07/crowd.png') } alt="" />
        </div>
        <div className="column is-half" id="post-container">
          <h2 className="post-title">
            {this.props.title !== null ? this.props.title : 'Loading...' }
          </h2>
          <span className="post-category"># COMPANY</span>
          <div className="post-content"
            dangerouslySetInnerHTML={{__html: this.props.html !== null ? this.props.html : (<p>Loading ...</p>) }}
          />
          <div className="btn-container">
            <a className="read-btn post-btn">
              READ MORE
            </a>
          </div>
        </div>
      </div>
    )
  }
}