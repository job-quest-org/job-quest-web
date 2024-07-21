import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import UserContext from './common/context/UserContext';
import UserContextProvider from './common/context/UserContextProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider
      value={{
        name: '',
        setName: () => {},
        email: '',
        setEmail: () => {},
        isAuthenticated: false,
        setIsAuthenticated: () => {},
        role: () => {},
        setRole: () => {},
      }}
    >
      <App />
    </UserContextProvider>
  </React.StrictMode>,
);
