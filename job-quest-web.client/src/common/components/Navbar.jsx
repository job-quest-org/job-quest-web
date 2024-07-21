import React, { useContext } from 'react'; // Add import statement for useContext
import { NavLink } from 'react-router-dom';
import '../../index.css';

const Navbar = () => {
  return (
    <nav className='main-navbar'>
      <NavLink to='/' className='main-navbar-item'>
        Home
      </NavLink>
      <NavLink to='/User/profile' className='main-navbar-item'>
        Profile
      </NavLink>
      <NavLink to='/about' className='main-navbar-item'>
        About
      </NavLink>
      <NavLink to='/contact' className='main-navbar-item'>
        Contact
      </NavLink>
    </nav>
  );
};

export default Navbar;
