import { useEffect, useState } from 'react'
import { baseURL } from '../utils/getServerURL';

function useSingleUserFetch(id) {
  const [userToView, setUserToView] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchById = async() => {
    setLoading(true);
    try{
      const response = await fetch(baseURL + "/api/users/user/" + id);
      const result = await response.json();
      if (result.username) {
        setUserToView(result);
      } else {
        setUserToView({ error: "User not found" });
      }
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
      alert("Problem retrieving user account: " + error);
    }
  }

  useEffect(() => {
    fetchById();
  }, [id])
  

  return ({ userToView, loading, error })
}

export default useSingleUserFetch