import React from "react";
import { Outlet } from "react-router-dom";
import { Avatar, Dropdown, Layout } from "antd";
import styles from "./main-layout.module.scss";
import useAuth from "../../hooks/useAuth";

const { Header, Content } = Layout;

const MainLayout = () => {
  const { user, logout } = useAuth();

  const items = [
    {
      key: "1",
      disabled: true,
      label: `Hi ${user?.displayName || "User"}`,
    },
    {
      key: "2",
      label: "Logout",
      onClick: logout,
    },
  ];

  return (
    <Layout className={styles.wrapper}>
      <Header className={styles.header}>
        <Dropdown menu={{ items }} placement="bottom" arrow>
          <Avatar />
        </Dropdown>
        {/*Hi {user?.displayName}{" "}*/}
        {/*{user && <Button onClick={logout}>Logout</Button>}*/}
      </Header>
      <Content className={styles.content}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default MainLayout;
