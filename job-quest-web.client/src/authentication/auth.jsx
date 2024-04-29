import React from 'react';
import axios from 'axios';

const LoginButton = () => {
  const handleLogin = () => {
    // Make a request to the login endpoint
  //   fetch('https://localhost:44396/login', { 
  //     method: 'GET'
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //     // The response should contain the access token
  //     const token = data.access_token;
  //     console.log(token);
  //     // Store the token in local storage or in a cookie
  //     localStorage.setItem('access_token', token);
  //     })
  //     .catch(error => {
  //     console.error('Error during login', error);
  //     });
  window.location.href = 'https://localhost:44396/login';
   };

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginButton;