import React, { useContext, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../context/UserContext';
import '../../index.css';
import { RiAccountPinCircleFill } from 'react-icons/ri';
import logout from './logout';
import RoleToggle from './RoleToggle';
function AccountsHeader() {
  const {
    firstName,
    setFirstName,
    setLastName,
    setEmail,
    isAuthenticated,
    setIsAuthenticated,
    setRole,s
  } = useContext(UserContext);
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
    }, 300);
    false;
  };
  if (isAuthenticated == true) {
    return (
      <div>
        <RoleToggle />
        <div className='main-header-account'>
          Hi, {firstName}
          <button onMouseEnter={enterAccountButtonDropdown} onMouseLeave={leaveAccountButtonDropdown}>
            <RiAccountPinCircleFill size={40} />
          </button>
          {accountButtonDropdown && (
            <ul
              onMouseEnter={enterAccountButtonDropdown}
              onMouseLeave={leaveAccountButtonDropdown}
              className='main-header-account-ul'
            >
              <li className='main-header-account-ul-item'>
                <Link to='/User/profile'>Profile</Link>
              </li>
              <li
                className='main-header-account-ul-item'
                onClick={() =>
                  logout(setFirstName, setLastName, setEmail, isAuthenticated, setIsAuthenticated, setRole)
                }
              >
                Logout
              </li>
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default AccountsHeader;
