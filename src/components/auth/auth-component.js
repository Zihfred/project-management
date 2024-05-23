import React, { useEffect } from "react";
import { Button, Card, Input } from "antd";
import styles from "./auth-component.module.scss";

const AuthComponent = ({ error, handleSubmit, mode, toggleMode }) => {
  const [userData, setUserData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    setUserData({
      name: "",
      email: "",
      password: "",
    });
  }, [mode]);

  const onSubmit = () => {
    if (mode === "login") {
      handleSubmit(mode, {
        email: userData.email,
        password: userData.password,
      });
    } else {
      handleSubmit(mode, { ...userData });
    }
  };

  return (
    <Card
      className={styles.wrapper}
      title={mode === "login" ? "Login" : "Create account"}
    >
      <div className={styles.content}>
        {mode === "register" && (
          <Input
            placeholder="Name"
            name="name"
            value={userData.name}
            onChange={handleChange}
          />
        )}
        <Input
          placeholder="Email"
          name="email"
          value={userData.email}
          onChange={handleChange}
        />
        <Input
          placeholder="Password"
          type="password"
          name="password"
          value={userData.password}
          onChange={handleChange}
        />
        {error?.length > 0 && <div className={styles.error}>{error}</div>}
        <Button type={"primary"} className={styles.button} onClick={onSubmit}>
          {mode === "login" ? "Login" : "Create account"}
        </Button>
        <Button type={"link"} className={styles.button} onClick={toggleMode}>
          {mode === "login"
            ? "Didn't have an account? Register"
            : "Already have an account? Login"}
        </Button>
      </div>
    </Card>
  );
};

export default AuthComponent;
