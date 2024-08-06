import React, { useContext, useEffect } from 'react';
import UserContext from '../context/UserContext';

import axios from 'axios';

function FetchUser() {
  const {
    setFirstName,
    setLastName,
    setEmail,
    isAuthenticated,
    setIsAuthenticated,
    setRole,
  } = useContext(UserContext);

  useEffect(() => {
    if (isAuthenticated == false || isAuthenticated == null) {
      axios
        .get('https://localhost:44396/user', { withCredentials: true })
        .then(({ data }) => {
          setFirstName(data.FirstName);
          setLastName(data.LastName);
          setEmail(data.Email);
          setIsAuthenticated(data.Email == null || data.Email == undefined ? false : true); 
          setRole(data.Role);
        })
        .catch((error) => {
          console.error('Error fetching claims', error);
        });
    }
  }, []); //leaving empty to run only once at the start

  return null;
}

export default FetchUser;
