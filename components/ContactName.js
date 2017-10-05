import React from 'react'
import AutosizeInput from 'react-input-autosize'

export default class ContactName extends React.Component {
  constructor (props) {
    super (props)

    this.handleName = this.handleName.bind(this)
  }

  handleName = (e) => {
    this.props.setName(e.target.value)
  }

  render () {
    return (
      <div className={ this.props.pageIndex === 0 ? 'contact-name active' : 'contact-name' }>
        <div className='wrapper'>
          <span className='name-text'>My name is </span>
          <AutosizeInput
            name='form-field-name'
            value={this.props.name}
            className='name-input'
            onChange={ this.handleName }
            placeholder='John Doe'
          />
        </div>
        <div className={ this.props.nameError ? 'error nameError' : 'error nameError disable-err' }>
          This field is required.
        </div>
      </div>
    )
  }
}
