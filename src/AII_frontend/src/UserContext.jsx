import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [principal, setPrincipal] = useState(null);

  return (
    <UserContext.Provider value={{ principal, setPrincipal }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
