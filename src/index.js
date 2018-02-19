import React from 'react';
import ReactDom from 'react-dom';

import './css/style.css';
import App from './components/App';
import StorePicker from './components/storepicker';

ReactDom.render(<StorePicker />, document.querySelector('#main'));
ReactDom.render(<App />, document.querySelector('#main'));
