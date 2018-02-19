import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';

import './css/style.css';
import App from './components/App';
import StorePicker from './components/storepicker';
import NotFound from './components/not_found';


const Root = () => {
  return (
    <BrowserRouter>
      <div>
        <Match exactly pattern="/" component={StorePicker} />
        <Match pattern="/store/:storeId" component={App} />
        <Miss component={NotFound} />
      </div>
    </BrowserRouter>
  );
}


ReactDom.render(<Root />, document.querySelector('#main'));
