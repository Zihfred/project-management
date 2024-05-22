import React from "react";
import useAuth from "../../hooks/useAuth";
import AuthComponent from "../../components/auth/auth-component";
import styles from "./auth.module.scss";
import { routes } from "../../App";
import { Navigate } from "react-router-dom";

const Auth = () => {
  const { user, createUser, login } = useAuth();
  const [error, setError] = React.useState("");

  if (user) {
    return <Navigate to={routes.main} />;
  }

  const handleSubmit = async (mode, userData) => {
    if (mode === "login") {
      try {
        await login(userData);
      } catch (error) {
        setError(error.message);
      }
    } else {
      try {
        await createUser(userData);
      } catch (error) {
        setError(error.message);
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <AuthComponent handleSubmit={handleSubmit} error={error} />
    </div>
  );
};

export default Auth;
