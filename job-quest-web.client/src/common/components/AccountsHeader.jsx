import React, { useContext } from 'react';
import UserContext from '../context/UserContext';
import '../../index.css';
import { RiAccountPinCircleFill } from 'react-icons/ri';
import logout from './logout';
function AccountsHeader() {
  const { name, setName, email, setEmail, isAuthenticated, setIsAuthenticated } =
    useContext(UserContext);
  const [accountButtonDropdown, setAccountButtonDropdown] = React.useState(false);
  const enterAccountButtonDropdown = () => {
    setAccountButtonDropdown(true);
  };
  const leaveAccountButtonDropdown = () => {
    setAccountButtonDropdown(false);
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
        <li>Profile</li>
        <li onClick={() => logout(isAuthenticated, setIsAuthenticated)}>Logout</li>
        </ul>
      )}
      </div>
    );
  }
}

export default AccountsHeader;
