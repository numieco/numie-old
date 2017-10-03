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

  // componentDidMount () {
  //   window.addEventListener('keypress', this.handleName)
  // }
  //
  // componentWillUnmount () {
  //   window.removeEventListener('keypress', this.handleName)
  // }
  //
  handleName = (e) => {
    // console.log(document.getElementById('contact-name').value)
    this.setState({
      name: e.target.value
    }, () => {
      console.log(this.state.name)
    })
  }

  render () {
    return (
      <div className='contact-name'>
        <span className='name-text'>My name is </span>
        {/*<span id='contact-name' className='name-input' contentEditable="true"></span>*/}
        <AutosizeInput
          name='form-field-name'
          value={this.state.name}
          className='name-input'
          onChange={ this.handleName }
          placeholder='John Doe'
        />
      </div>
    )
  }
}
