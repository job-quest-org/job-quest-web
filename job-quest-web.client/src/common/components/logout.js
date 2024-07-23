import axios from 'axios';

const logout = async (setFirstName, setLastName, setEmail, isAuthenticated, setIsAuthenticated, setRole) => {
  try {
    if (isAuthenticated === true) {
      const response = await axios.post('https://localhost:44396/logout');
      if (response.status === 200) {
        setIsAuthenticated(false);
        setEmail(null);
        setFirstName(null);
        setLastName(null);
        setRole(null);
        return true;
      }
    }
  } catch (error) {
    console.error('Logout error', error);
    return false;
  }
};
export default logout;
