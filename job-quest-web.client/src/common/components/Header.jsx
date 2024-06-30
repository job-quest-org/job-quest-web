import React from 'react';
import '../../index.css';
import Logo from './Logo';
import Navbar from './Navbar';
import AccountsHeader from './AccountsHeader';

const Header = () => {
  return (
    <div>
      <header className='main-header'>
        <Logo />
        <h1 className='h1-title'>Job Quest</h1>
        <Navbar />
        <AccountsHeader />
      </header>
    </div>
  );
};

export default Header;
