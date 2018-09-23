import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import {
  Provider
} from 'react-redux'
import configureStore from './store';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

Modal.setAppElement('#root')

ReactDOM.render( 
  <Provider store = {configureStore()}>
    <App/>
  </Provider>, document.getElementById('root'));
registerServiceWorker();
