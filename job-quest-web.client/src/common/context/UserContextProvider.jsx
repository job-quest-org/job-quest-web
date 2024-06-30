import React from 'react';
import UserContext from './UserContext';

const UserContextProvider = ({ children }) => {
  const [name, setName] = React.useState(null);
  const [email, setEmail] = React.useState(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  return (
    <UserContext.Provider
      value={{
        name,
        setName,
        email,
        setEmail,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
