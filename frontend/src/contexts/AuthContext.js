import * as React from "react";

export const AuthContext = React.createContext({
  isAuthenticated: false,
  name: "",
  avatar: "",
  setAuth: () => {}
});