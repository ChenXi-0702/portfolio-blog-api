import { useState } from "react";
import { AuthContext } from "./AuthContext.js";
import { loginUser, registerUser } from "../api.js";

function readStoredUser() {
  const saved = localStorage.getItem("user");
  if (!saved) {
    return null;
  }
  try {
    return JSON.parse(saved);
  } catch (error) {
    return null;
  }
}

export default function AuthProvider(props) {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(readStoredUser());

  function saveSession(data) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
  }

  async function login(email, password) {
    const data = await loginUser({ email: email, password: password });
    saveSession(data);
    return data;
  }

  async function register(username, email, password) {
    const data = await registerUser({
      username: username, email: email, password: password
    });
    // Registration returns the account only, so sign in straight after it.
    const session = await loginUser({ email: email, password: password });
    saveSession(session);
    return data;
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
  }

  const value = {
    token: token,
    user: user,
    isLoggedIn: Boolean(token && user),
    login: login,
    register: register,
    logout: logout
  };

  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  );
}
