import React from 'react'
import Link from 'next/link'

const domain = 'https://numie.ghost.io'
let inlineImageStyle = null

export default class SinglePost extends React.Component {

  constructor (props) {
    super (props)
    inlineImageStyle = {
      backgroundImage: (this.props.image)
        ? ('url(' + domain + this.props.image + ')')
        : 'url(/static/images/blog/fireworks.png)'
    }

    // this.getDate = this.getDate.bind(this)
  }

  getDate = (dateInput) => {
    var date = new Date(dateInput)
    var months = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"]

    var returnDate = months[date.getMonth()] + ' ' + (date.getDate() + 1)
      + ', ' + date.getFullYear()

    return returnDate
  }

  render () {

    return (
      <div>
        <div className='black-block' />
        <div
          className="image column is-half"
          style={ inlineImageStyle }>
          <div className='red-gradient' />
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

          <div className='post-by'>
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
                ? <div>by <b>{this.props.author.name}</b> on {this.getDate(this.props.published)}</div>
                : null
              }
              </div>
            </div>
          </div>

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

            <div className='author-bio'>
              {
                this.props.author.bio !== null
                ? this.props.author.bio
                : 'Freegan tbh keytar copper mug literally marfa selfies organic squid coloring book small batch. Stumptown bicycle rights PBR&B chia hashtag, swag biodiesel letterpress craft beer next level squid 90'
              }
            </div>

          </div>
        </div>
      </div>
    )
  }
}
