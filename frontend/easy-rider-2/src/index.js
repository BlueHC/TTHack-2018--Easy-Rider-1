//React
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'

//Bootstrap
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//Font-Awesome
import '../node_modules/font-awesome/css/font-awesome.min.css'

import App from './App';

ReactDOM.render((<BrowserRouter><App/></BrowserRouter>), document.getElementById('root'));
