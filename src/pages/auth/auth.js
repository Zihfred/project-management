import React from "react";
import useAuth from "../../hooks/useAuth";
import AuthComponent from "../../components/auth/auth-component";
import styles from "./auth.module.scss";
import { routes } from "../../App";
import { Navigate } from "react-router-dom";

const Auth = () => {
  const [mode, setMode] = React.useState("login");
  const { user, createUser, login } = useAuth();
  const [error, setError] = React.useState("");

  const toggleMode = () => {
    setMode(mode === "login" ? "register" : "login");
  };

  if (user) {
    return <Navigate to={routes.main} />;
  }

  const handleSubmit = async (mode, userData) => {
    if (mode === "login") {
      try {
        await login(userData);
      } catch (error) {
        setError(error.response.data.message);
      }
    } else {
      try {
        await createUser(userData).then(() => {
          setMode("login");
        });
      } catch (error) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <AuthComponent
        handleSubmit={handleSubmit}
        error={error}
        mode={mode}
        toggleMode={toggleMode}
      />
    </div>
  );
};

export default Auth;
