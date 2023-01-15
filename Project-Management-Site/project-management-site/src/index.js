import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>{/**Cookie-urile ce provin din AuthContext vor fi distribuite tuturor componentelor ce sunt nested, in cazul acesta la toata aplicatia(userul curent este cel mai des folosit) */}
    <App />
  </AuthContextProvider>
  </React.StrictMode>
);
