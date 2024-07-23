import React from 'react';
import UserContext from './UserContext';

const UserContextProvider = ({ children }) => {
  const [firstName, setFirstName] = React.useState(null);
  const [lastName, setLastName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [role, setRole] = React.useState(null);
  return (
    <UserContext.Provider
      value={{
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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
