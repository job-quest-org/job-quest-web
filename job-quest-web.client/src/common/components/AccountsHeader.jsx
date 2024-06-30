import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import '../../index.css';
import { RiAccountPinCircleFill } from 'react-icons/ri';
function AccountsHeader() {
  const {
    name,
    setName,
    email,
    setEmail,
    isAuthenticated,
    setIsAuthenticated,
  } = useContext(UserContext);
  if (isAuthenticated == true) {
    return (
      <div className='main-header-account'>
        <div>Hi, {name}</div>
        <div>
          <RiAccountPinCircleFill size={40} />
        </div>
      </div>
    );
  }
}

export default AccountsHeader;
