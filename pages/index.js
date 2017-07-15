import React from 'react'
import Header from '../components/Header'
import ContactPage from './contact'
import Layout from '../containers/Layout'

export default class Home extends React.Component {
  render () {
    return (
      <div>
        <Layout>
          <main>
            <Header />
            <ContactPage />
          </main>
        </Layout>

      </div>
    )
  }
}
