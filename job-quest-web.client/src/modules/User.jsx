import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import UserContext from "../common/context/UserContext";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function User() {
  const query = useQuery();
  const dataStr = query.get("data");
  const {
    name,
    setName,
    email,
    setEmail,
    isAuthenticated,
    setIsAuthenticated,
    issuer,
    setIssuer,
    userType,
    setUserType,
    updateUserData,
  } = useContext(UserContext);
  useEffect(() => {
    if (dataStr) {
      try {
        const dataObj = JSON.parse(decodeURIComponent(dataStr));
        setName(dataObj.Name);
        setEmail(dataObj.Email);
        setIsAuthenticated(dataObj.IsAuthenticated);
      } catch (err) {
        console.error("Error parsing data query parameter", err);
      }
    }
  }, [dataStr]);

  // Render the data or a loading message
  //window.location.href = "/";
  return (
    <div>
      <h1>User Data</h1>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
    </div>
  );
}

export default User;
