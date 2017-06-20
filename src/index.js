import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import App from './app';
require('./styles/index.sass')

render(
  <App/>,
  document.querySelector("#app")
);

