import React from 'react';
import Header from './components/Header'
import {Helmet} from "react-helmet";
import './styles/index.sass';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
      </div>
    )
  }
}
