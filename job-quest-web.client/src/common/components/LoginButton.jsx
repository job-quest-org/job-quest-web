import React from 'react';
import glogo from '../assets/Glogo.png';

const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = 'https://localhost:44396/login';
  };

  return (
    <div>
      <button onClick={handleLogin} className='login-button'>
        <img src={glogo} className='login-img-button' />
        <span>Sign in with Google</span>
      </button>
    </div>
  );
};

export default LoginButton;
