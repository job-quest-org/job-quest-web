import React, { useContext, useEffect } from 'react';
import '../index.css';
import Header from '../common/components/Header';
import LoginButton from '../common/components/LoginButton';
import UserContext from '../common/context/UserContext';

function Home() {
  const {
    name,
    setName,
    email,
    setEmail,
    isAuthenticated,
    setIsAuthenticated,
  } = useContext(UserContext);

  return (
    <div className='main-container'>
      <Header />
      <div className='welcome-content'>
        <p className='p-home-welcome'>Welcome,</p>
        <p className='p-home-welcome'>Make your dream come true</p>
        <p className='p-home-welcome'>Find jobs of your preference </p>
        {isAuthenticated ? null : (
          <p className='p-home-welcome'>login to continue ➠</p>
        )}
      </div>
      <div className='center-content'>
        {isAuthenticated ? null : <LoginButton />}
      </div>
    </div>
  );
}
export default Home;
