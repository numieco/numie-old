import React from 'react'
import Header from '../components/Header'
import HomeComponent from '../components/HomeComponent'
import ContactPage from './contact'
import Layout from '../containers/Layout'

export default class Home extends React.Component {
  render () {
    return (
      <div>
        <Layout>
            <HomeComponent />
        </Layout>
      </div>
    )
  }
}
