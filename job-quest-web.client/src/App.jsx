import React, { createContext, useState, useContext, useEffect } from 'react';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import User from './modules/User';
import Home from './modules/Home';
import FetchUser from './common/components/FetchUser';
import UserContextProvider from './common/context/UserContextProvider';
import CandidateProfile from './modules/CandidateProfile';
import RecruiterProfile from './modules/RecruiterProfile';
import UserContext from './common/context/UserContext';
import JobsBrowse from './modules/JobsBrowse';

function App() {
  const {
    isAuthenticated,
    role,
  } = useContext(UserContext);

  return (
    <>
      <FetchUser />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/User' element={isAuthenticated == true ? <User /> : null} />
          <Route
            path='/User/profile'
            element={
              isAuthenticated == true && role == 'Candidate' ? <CandidateProfile /> : <RecruiterProfile />
            }
          />
          <Route path='/Jobs/browse' element={<JobsBrowse />} />
          <Route path='/contact' element='#' />
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;
