import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import UserContext from '../common/context/UserContext';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function User() {
  const query = useQuery();
  const dataStr = query.get('data');
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    isAuthenticated,
    setIsAuthenticated,
    role,
    setRole,
  } = useContext(UserContext);
  useEffect(() => {
    if (dataStr) {
      try {
        const dataObj = JSON.parse(decodeURIComponent(dataStr));
        setFirstName(dataObj.FirstName);
        setLastName(dataObj.LastName);
        setEmail(dataObj.Email);
        setIsAuthenticated(dataObj.IsAuthenticated);
      } catch (err) {
        console.error('Error parsing data query parameter', err);
      }
    }
  }, [dataStr]);

  return null;
}

export default User;
