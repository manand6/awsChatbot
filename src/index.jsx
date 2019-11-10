import React from 'react';
import ReactDOM from 'react-dom';
import config from './aws-exports' // new
import Amplify from 'aws-amplify' // new
import './index.css';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
Amplify.configure(config) // new
ReactDOM.render(<App />, document.getElementById('root'));


serviceWorker.unregister();
