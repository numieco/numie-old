import React from 'react'
import Looper from './SVG/Looper'

let blockOffsetTop = 0

export default class ProjectsSection extends React.Component {
  constructor (props) {
    super (props)
  }

  render () {
    return (
      <div className='project-preview'>
        <div className='bg-looper'>
          <Looper />
        </div>
        <div className='my-project'>
        <div className='project clique-meet'>
          <div className='project-showcase'>
            <div className='section image-group-1'>
              <img src='static/images/projects/clique-meet-1.png' />
              <img src='static/images/projects/clique-meet-2.png' />
            </div>
            <div className='section image-group-2'>
              <img src='static/images/projects/clique-meet-3.png' />
              <img src='static/images/projects/clique-meet-4.png' />
            </div>
          </div>
          <div className='project-intro'>
            <div className='title'>
              One: Clique Meet
            </div>
            <span className='tech'>
              UI / UX + BRAND + WEB
            </span>
            <div className='description'>
              Numie is a full service design studio that provides end-to-end design,
              development and marketing for you or your company.
              We’re in this with you until the end.
            </div>
          </div>
        </div>
        </div>

        <div className='my-project'>
        <div className='project clique-meet'>
          <div className='project-showcase'>
            <div className='section image-group-1'>
              <img src='static/images/projects/clique-meet-1.png' />
              <img src='static/images/projects/clique-meet-2.png' />
            </div>
            <div className='section image-group-2'>
              <img src='static/images/projects/clique-meet-3.png' />
              <img src='static/images/projects/clique-meet-4.png' />
            </div>
          </div>
          <div className='project-intro'>
            <div className='title'>
              Two: Clique Meet
            </div>
            <span className='tech'>
              UI / UX + BRAND + WEB
            </span>
            <div className='description'>
              Numie is a full service design studio that provides end-to-end design,
              development and marketing for you or your company.
              We’re in this with you until the end.
            </div>
          </div>
        </div>
        </div>
      </div>
    )
  }
}
