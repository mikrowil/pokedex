import cookie from "js-cookie";

export const loginUser = (token: string) => {
  cookie.set("userToken", token);
};
