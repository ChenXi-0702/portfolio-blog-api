import { createContext } from "react";

export const AuthContext = createContext({
  token: null,
  user: null,
  isLoggedIn: false,
  login: async function () {},
  register: async function () {},
  logout: function () {}
});
