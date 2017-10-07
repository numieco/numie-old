import React from 'react'
import Slider from 'react-rangeslider'

export default class ContactBudget extends React.Component {
  constructor (props) {
    super (props)

    this.handleBudget = this.handleBudget.bind(this)
  }

  handleBudget = (value) => {
    this.props.setBudget(value)
  }

  render () {
    return (
      <div className={ this.props.pageIndex === 2 ? 'contact-budget active' : 'contact-budget' }>
        <div className='budget-value'>
          <span>My budget is </span>
          <span>${ this.props.budget.toLocaleString() }</span>
        </div>
        <div className='budget-slider'>
          <Slider
            min={ 5000 }
            max={ 50000 }
            step={ 500 }
            tooltip={ false }
            value={this.props.budget}
            onChange={this.handleBudget}
          />
        </div>
      </div>
    )
  }
}
