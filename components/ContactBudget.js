import React from 'react'
import Slider from 'react-rangeslider'

export default class ContactBudget extends React.Component {
  constructor (props) {
    super (props)

    this.state = {
      budget: 5000
    }

    this.handleBudget = this.handleBudget.bind(this)
  }

  handleBudget = (value) => {
    this.setState({
      budget: value
    })
  }

  render () {
    return (
      <div className={ this.props.pageIndex === 2 ? 'contact-budget active' : 'contact-budget' }>
        <div className='budget-value'>
          <span>My budget is </span>
          <span>${ this.state.budget }</span>
        </div>
        <div className='budget-slider'>
          <Slider
            min={ 5000 }
            max={ 50000 }
            step={ 500 }
            tooltip={ false }
            value={this.state.budget}
            onChange={this.handleBudget}
          />
        </div>
      </div>
    )
  }
}
