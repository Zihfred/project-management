import { createContext, useEffect, useState } from "react";
import { createUserRequest, getUser, loginUser } from "../services/userService";

let AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async ({ email, password, name }) => {
    const response = await createUserRequest({ email, password, name });

    if (response) {
      localStorage.setItem("access_token", response.jwt);
      setUser(response.user);
      setLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    const response = await loginUser({ email, password });

    if (response) {
      localStorage.setItem("access_token", response.jwt);

      setUser(response.user);
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("access_token");
  };

  const getUserProfile = async () => {
    const user = await getUser();
    setUser(user);
    setLoading(false);
  };

  useEffect(() => {
    if (user === null && localStorage.getItem("access_token")?.length) {
      getUserProfile();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, isLoading: loading, createUser, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;
