import React, { useEffect, useState, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import UserContext from '../common/context/UserContext';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function User() {
  const query = useQuery();
  const dataStr = query.get('data');
  const { name, setName, email, setEmail, isAuthenticated, setIsAuthenticated, role, setRole } =
    useContext(UserContext);
  useEffect(() => {
    if (dataStr) {
      try {
        const dataObj = JSON.parse(decodeURIComponent(dataStr));
        setName(dataObj.Name);
        setEmail(dataObj.Email);
        setIsAuthenticated(dataObj.IsAuthenticated);
      } catch (err) {
        console.error('Error parsing data query parameter', err);
      }
    }
  }, [dataStr]);

  // Render the data or a loading message
  //window.location.href = "/";
  useEffect(() => {
    if (dataStr) {
      try {
        const dataObj = JSON.parse(decodeURIComponent(dataStr));
        setName(dataObj.Name);
        setEmail(dataObj.Email);
        setIsAuthenticated(dataObj.IsAuthenticated);
        setRole(dataObj.Role);
      } catch (err) {
        console.error('Error parsing data query parameter', err);
      }
    } else {
      window.history.back();
    }
  }, [dataStr]);

  return null;
}

export default User;
