import React from 'react'
import AutosizeInput from 'react-input-autosize'

export default class ContactName extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      name: ''
    }

    this.handleName = this.handleName.bind(this)
  }

  handleName = (e) => {
    this.setState({
      name: e.target.value
    }, () => {
      console.log(this.state.name)
    })
  }

  render () {
    return (
      <div className='contact-name'>
        <div className='wrapper'>
          <span className='name-text'>My name is </span>
          <AutosizeInput
            name='form-field-name'
            value={this.state.name}
            className='name-input'
            onChange={ this.handleName }
            placeholder='John Doe'
          />
        </div>
      </div>
    )
  }
}
