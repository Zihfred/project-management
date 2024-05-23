import { createContext, useEffect, useState } from "react";
import { UserApi } from "../services/generated/index.ts";

const API = new UserApi();
let AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = async ({ email, password, name }) => {
    return await API.signupUser({ email, password, name });
  };

  const login = async ({ email, password }) => {
    const result = await API.loginUser({ email, password });

    if (result) {
      localStorage.setItem("access_token", result.data.access_token);
      const user = await API.getUsers();

      setUser({ ...user.data });
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem("access_token");
  };

  useEffect(() => {
    if (user === null && localStorage.getItem("access_token")?.length) {
      setLoading(true);
      API.getUsers().then((user) => {
        setUser(user.data);
        setLoading(false);
      });
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
