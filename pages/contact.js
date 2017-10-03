import React from 'react'
import Layout from '../containers/Layout'
import ContactHeader from '../components/ContactHeader'
import ContactFooter from '../components/ContactFooter'
import ContactName from '../components/ContactName'
import ContactInterest from '../components/ContactInterest'
import ContactBudget from '../components/ContactBudget'

export default class ContactPage extends React.Component {
  constructor (props) {
    super (props)
  }

  render () {
    return (
    <Layout>
      <div className='contact-wrapper'>
        <ContactHeader />

        <ContactBudget />

        <ContactFooter />
      </div>
    </Layout>
    )
  }
}
