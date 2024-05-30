import axios from "axios";

export const loginUser = async ({ email, password }) => {
  const res = await axios.post("/auth/local", { identifier: email, password });
  return res.data;
};

export const getUser = async () => {
  const res = await axios.get("/users/me");
  return res.data;
};

export const createUserRequest = async ({ email, password, name }) => {
  const res = await axios.post("/auth/local/register", {
    email,
    password,
    username: email,
    fullName: name,
  });
  return res.data;
};
