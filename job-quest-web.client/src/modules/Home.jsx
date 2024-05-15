import React from 'react'
import '../index.css'
import LoginButton from '../authentication/Auth'
import Header from '../common/components/Header'

function Home() {
  return (
    <div className="main-container">
        <Header/>
        <LoginButton/>
    </div>
  );
};
export default Home
