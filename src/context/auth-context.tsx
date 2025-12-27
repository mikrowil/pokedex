import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import cookie from "js-cookie";
import { getUser } from "../api/user";
import { User } from "../interfaces/auth";

export const AuthContext = createContext<{ user: User | null } | null>(null);
export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState<User | null>(null);

  const loadUser = useCallback(async () => {
    try {
      const token = cookie.get("userToken");
      if (token) {
        const data = await getUser();
        setUser(data.data);
      }
    } catch (e: unknown) {
      console.log((e as Error).message);
    }
  }, []);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Can't be used outside of Auth Provider.");
  return context;
};
