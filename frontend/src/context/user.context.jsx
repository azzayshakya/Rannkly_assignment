import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("raUser")) || null;
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("raUser"));
    const token = localStorage.getItem("raUserToken");

    if (!token || !storedUser) {
      setUser(null);
      localStorage.removeItem("raUser");
      localStorage.removeItem("raUserToken");
    }
  }, []);

  const updateUser = (userData, token) => {
    setUser(userData);
    localStorage.setItem("raUser", JSON.stringify(userData));
    if (token) localStorage.setItem("raUserToken", token);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("raUser");
    localStorage.removeItem("raUserToken");
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

