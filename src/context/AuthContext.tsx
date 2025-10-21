import React, { createContext, useCallback, useEffect, useState } from "react";
import cookie from "js-cookie";
import { getUser } from "../api/user";

export const AuthContext = createContext({ user: null });

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null);

  const loadUser = useCallback(async () => {
    try {
      const token = cookie.get("userToken");
      if (token) {
        const data = await getUser();
        setUser(data.data);
      }
    } catch (e) {
      console.log(e.message);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <AuthContext.Provider value={{ user: user }}>
      {children}
    </AuthContext.Provider>
  );
};
