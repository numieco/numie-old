import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import {Helmet} from "react-helmet"

import Home from './pages/Home'
import ContactPage from './pages/ContactPage'

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={ Home } />
          <Route path='/contact' component={ ContactPage } />
        </Switch>
      </Router>
    )
  }
}
