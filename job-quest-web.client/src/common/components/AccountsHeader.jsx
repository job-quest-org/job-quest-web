import React, { useContext, useState, useRef } from 'react';
import UserContext from '../context/UserContext';
import '../../index.css';
import { RiAccountPinCircleFill } from 'react-icons/ri';
import logout from './logout';
function AccountsHeader() {
  const { name, setName, email, setEmail, isAuthenticated, setIsAuthenticated } =
    useContext(UserContext);
  const [accountButtonDropdown, setAccountButtonDropdown] = useState(false);
  const enterTimeoutRef = useRef(null);
  const enterAccountButtonDropdown = () => {
    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current);
    }
    enterTimeoutRef.current = setTimeout(() => {
      setAccountButtonDropdown(true);
    }, 300); 
  };

  const leaveAccountButtonDropdown = () => {
    if (enterTimeoutRef.current) {
      clearTimeout(enterTimeoutRef.current);
    }
    enterTimeoutRef.current = setTimeout(() => {
      setAccountButtonDropdown(false);
    }, 400);
    (false);
  };
  if (isAuthenticated == true) {
    return (
      <div className='main-header-account'>
      Hi, {name}
      <button onMouseEnter={enterAccountButtonDropdown} onMouseLeave={leaveAccountButtonDropdown}>
        <RiAccountPinCircleFill size={40} />
      </button>
      {accountButtonDropdown && (
        <ul
        onMouseEnter={enterAccountButtonDropdown}
        onMouseLeave={leaveAccountButtonDropdown}
        className='main-header-account-ul'
        >
        <li className='main-header-account-ul-item'>Profile</li>
        <li className='main-header-account-ul-item' onClick={() => logout(isAuthenticated, setIsAuthenticated)}>Logout</li>
        </ul>
      )}
      </div>
    );
  }
}

export default AccountsHeader;
