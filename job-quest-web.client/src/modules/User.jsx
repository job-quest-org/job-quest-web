import { useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import UserContext from '../common/context/UserContext';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function User() {
  const query = useQuery();
  const dataStr = query.get('data');
  const {
    setFirstName,
    setLastName,
    setEmail,
    setIsAuthenticated,
  } = useContext(UserContext);
  useEffect(() => {
    if (dataStr) {
      try {
        const dataObj = JSON.parse(decodeURIComponent(dataStr));
        setFirstName(dataObj.FirstName);
        setLastName(dataObj.LastName);
        setEmail(dataObj.Email);
        setIsAuthenticated(dataObj.IsAuthenticated);
      } catch (err) {
        console.error('Error parsing data query parameter', err);
      }
    }
  }, [dataStr]);

  return null;
}

export default User;
