import React from 'react'
import Header from '../components/Header'
import ContactPage from './ContactPage'

export default class Home extends React.Component {
  render () {
    return (
      <div>
        <Header />
        <ContactPage />
      </div>
    )
  }
}