import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [principal, setPrincipal] = useState(null);
  const [rol, setRol] = useState('');

  return (
    <UserContext.Provider value={{ principal, setPrincipal, rol, setRol }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};