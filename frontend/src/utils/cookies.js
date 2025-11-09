import Cookies from "js-cookie";

export const setAuthToken = (token) => {
  Cookies.set("token", token, { expires: 1 / 24 });
};

export const getAuthToken = () => Cookies.get("token");

export const clearAuthToken = () => {
  Cookies.remove("token");
};