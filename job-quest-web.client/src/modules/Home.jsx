import React from 'react'
import '../index.css'
import Header from '../common/components/Header'
import LoginButton from '../common/components/LoginButton'

function Home() {
  return (
    <div className="main-container">
        <Header/>
        <div className="welcome-content">
        <p className='p-home-welcome'>Welcome,</p>
        <p className='p-home-welcome'>Make your dream come true</p>
        <p className='p-home-welcome'>Find jobs of your preference </p>
        <p className='p-home-welcome'>login to continue ➠</p>
        </div>
      <div className="center-content">
        <LoginButton/>
      </div> 
    </div>
  );
};
export default Home
