import { useContext } from "react";
import { AuthContext } from "../providers/auth-provider";

function useAuth() {
  return useContext(AuthContext);
}
export default useAuth;
