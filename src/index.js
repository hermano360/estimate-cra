import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import {configure, history } from './redux/configureStore'
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const store = configure()



ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App/>
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'));

registerServiceWorker();
