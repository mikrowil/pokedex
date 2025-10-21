import axios from "axios";

export const register_user = async (data: any) => {
  return await axios.post("http://localhost:4000/auth/register", data);
};

export const login = async (data: any) => {
  return await axios.post("http://localhost:4000/auth/login", data);
};
