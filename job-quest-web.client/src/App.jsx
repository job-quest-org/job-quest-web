import React, { createContext, useState, useContext, useEffect } from 'react';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User from './modules/User';
import Home from './modules/Home';
import FetchUser from './common/components/FetchUser';
import UserContextProvider from './common/context/UserContextProvider';

function App() {
  return (
    <UserContextProvider
      value={{
        name: '',
        setName: () => { },
        email: '',
        setEmail: () => { },
        isAuthenticated: false,
        setIsAuthenticated: () => { },
        role: () => { },
        setRole: () => { },
      }}
    >
      <FetchUser />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/User' element={<User />} />
          <Route path='/about' element='#' />
          <Route path='/contact' element='#' />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}
export default App;
