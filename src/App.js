import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "./components/layout/main-layout";
import AuthProvider from "./providers/auth-provider";
import Auth from "./pages/auth/auth";
import RequireAuth from "./components/require-auth/require-auth";
import Main from "./pages/main/main";
import Project from "./pages/project/project";

export const routes = {
  main: "/",
  auth: "/auth",
  project: "/project/:id",
  notFound: "*",
};

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path={routes.auth} element={<Auth />} />
        <Route element={<MainLayout />}>
          <Route element={<RequireAuth />}>
            <Route path={"/"} element={<Main />} />
            <Route path={routes.project} element={<Project />} />
          </Route>
        </Route>
        <Route path={routes.notFound} element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
