import './utils/preload';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import './index.css';
import { AssetProvider } from './contexts/AssetContext';

const container = document.getElementById('root') as HTMLElement;

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AssetProvider>
        <App />
      </AssetProvider>
    </Provider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
