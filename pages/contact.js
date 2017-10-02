import React from 'react'
import Layout from '../containers/Layout'
import ContactHeader from '../components/ContactHeader'
import ContactFooter from '../components/ContactFooter'
import ContactName from '../components/ContactName'
import ContactInterest from '../components/ContactInterest'

export default class ContactPage extends React.Component {
  constructor (props) {
    super (props)
  }

  render () {
    return (
    <Layout>
      <div className='contact-wrapper'>
        <ContactHeader />

        <ContactInterest />

        <ContactFooter />
      </div>
    </Layout>
    )
  }
}
