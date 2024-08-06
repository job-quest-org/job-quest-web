import React, { useState, useContext } from 'react';
import UserContext from '../context/UserContext'; // Adjust the import path according to your project structure

const RoleToggle = () => {
  const {
    role,
    setRole,
  } = useContext(UserContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const onButtonClickCandidate = () => {
    setRole('Candidate');
    setIsDropdownOpen(false);
  };
  const onButtonClickRecruiter = () => {
    setRole('Recuriter');
    setIsDropdownOpen(false);
  };
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <>
      <button
        id='dropdownDefaultButton'
        data-dropdown-toggle='dropdown'
        className='text-white bg-gray-500 hover:bg-white-800 focus:ring-1 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex bg-opacity-50 items-center'
        type='button'
        onClick={toggleDropdown}
      >
        Role : {role}
        <svg
          className='w-2.5 h-2.5 ml-2'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 10 6'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            d='m1 1 4 4 4-4'
          />
        </svg>
      </button>

      <div
        id='dropdown'
        className={`${
          isDropdownOpen ? 'block' : 'hidden'
        } absolute z-10 mt-2 w-38 rounded-lg bg-gray-700 bg-opacity-50 shadow-lg ring-1 ring-black ring-opacity-5 backdrop-blur-sm `}
      >
        <ul className='block px-4 py-2 text-sm text-white font-maven-pro bg-gray-700 bg-opacity-10 rounded-md'>
          <li>
            <button className='block px-4 py-2 hover:font-semibold' onClick={onButtonClickCandidate}>
              Candidate
            </button>
          </li>
          <li>
            <button className='block px-4 py-2 hover:font-semibold' onClick={onButtonClickRecruiter}>
              Recuriter
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default RoleToggle;
