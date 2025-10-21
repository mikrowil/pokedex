import axios from "axios";
import cookie from "js-cookie";

export const getUser = async () => {
  return await axios.get("http://localhost:4000/user/data", {
    headers: {
      Authorization: "Bearer " + cookie.get("userToken"),
    },
  });
};
