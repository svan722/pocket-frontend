import axios from 'axios';
import React, { useContext, useState, useEffect } from 'react';
import WebApp from '@twa-dev/sdk';
import { useLocalStorage } from "./useLocalStorage";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
	const tgUser = WebApp.initDataUnsafe.user;
  // const tgUser = { id: 7449972885, username: 'supercool912', first_name: 'Marco', last_name: 'Wong' };
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useLocalStorage("user", null);

  const saveUser = (user) => {
    setUser(user);
  };

  const removeUser = () => {
    setUser(null);
  };

  const fetchUser = async () => {
    try {
      const { data } = await axios.get(`/api/v1/users/showMe`);
      saveUser(data.user);
    } catch (error) {
      removeUser();
    }
    setIsLoading(false);
  };

  const logoutUser = async () => {
    try {
      await axios.delete('/api/v1/auth/logout');
      removeUser();
    } catch (error) {
      console.log(error);
    }
  };

  const onSignUp = async (where = '') => {
		try {
			const { data } = await axios.post(`/api/v1/auth/login`, {
				username: tgUser.id,
				fullname: tgUser.first_name + ' ' + tgUser.last_name, 
				premium: tgUser.is_premium,
				invitor: WebApp.initDataUnsafe.start_param || '',
				where: where
			});
			saveUser(data.user);
      return true;
		} catch (error) {
			console.log("login error=", error);
		}
    return false;
	};

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AppContext.Provider
      value={{
        isLoading,
        saveUser,
        user,
        onSignUp,
        logoutUser,
        fetchUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// make sure use
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
