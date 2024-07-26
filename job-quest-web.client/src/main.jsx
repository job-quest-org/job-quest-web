import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import UserContextProvider from './common/context/UserContextProvider';
import { Provider } from 'react-redux';
import { store } from './common/redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
    <UserContextProvider
      value={{
        firstName: '',
        setFirstName: () => {},
        lastName: '',
        setLastName: () => {},
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
    </Provider>
  </React.StrictMode>,
);
