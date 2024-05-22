import React from "react";
import { Outlet } from "react-router-dom";
import { Button, Layout } from "antd";
import styles from "./main-layout.module.scss";
import useAuth from "../../hooks/useAuth";

const { Header, Footer, Content } = Layout;

const MainLayout = () => {
  const { user, logout } = useAuth();
  return (
    <Layout className={styles.wrapper}>
      <Header className={styles.header}>
        Hi {user?.displayName}{" "}
        {user && <Button onClick={logout}>Logout</Button>}
      </Header>
      <Content className={styles.content}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>Leansquad 2024</Footer>
    </Layout>
  );
};

export default MainLayout;
