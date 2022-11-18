import React, { useState, useEffect, createContext } from "react";

interface CurrentUserContextType {
  currentUser: null | undefined;
}

export const AuthContext = createContext<string | null | undefined>(undefined);

export const AuthStringContext = createContext<string | undefined>;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}: any) => {
  const [loggedInStatus, setLoggedInStatus] = useState<string | null>(
    "logouted"
  );
  const [user, setUser] = useState({});

  return (
    // eslint-disable-next-line
    <AuthContext.Provider value={loggedInStatus}>
      {children}
    </AuthContext.Provider>
  );
};
