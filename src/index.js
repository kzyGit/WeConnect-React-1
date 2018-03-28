import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Register from './Auth/Register.jsx';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route } from 'react-router-dom';

ReactDOM.render(
	<BrowserRouter>
	    <div>			
            <Route exact path="/" component={App} />
            <Route path="/signup" component={Register} />
        </div>
  </BrowserRouter>,
  document.getElementById('root'));
registerServiceWorker();
