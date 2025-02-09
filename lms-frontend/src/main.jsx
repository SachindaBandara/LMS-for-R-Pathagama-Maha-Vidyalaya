import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the use of 'react-dom/client'
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';

const root = ReactDOM.createRoot(document.getElementById('root')); // React 18's createRoot API

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
