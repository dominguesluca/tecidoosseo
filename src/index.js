import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

// Substitua ReactDOM.render por ReactDOM.createRoot
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);