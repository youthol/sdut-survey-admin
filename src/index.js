import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import ConfigureStore from '@/store';
import App from '@/App';
import '@/scss/reset.scss';
import '@/scss/base.scss';
import registerServiceWorker from '@/registerServiceWorker';

const store = ConfigureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();