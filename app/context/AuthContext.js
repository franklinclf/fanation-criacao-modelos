"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData ] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (username, password) => {
    setLoading(true);

    let data;

    await axios.post("/api/auth/login", { username, password })
    .then((response) => {
      data = response.data;
      if(data.success) {
        setUser(data.user);
        setIsAuthenticated(true);
      }
    })
    .catch((error) => {
      data = error.response.data;
      console.log(error);
    })
    .finally(() => {
      setLoading(false);
    });

    return data;
  }

  const signup = async (username, password) => {
    setLoading(true);

    let data;

    await axios.post("/api/auth/signup", { username, password })
    .then((response) => {
      console.log(response);
      
      data = response.data;
    })
    .catch((error) => { 
      data = error.response.data;
    })
    .finally(() => {
      setLoading(false);
    });

    return data;
  };
  
  const logout = async () => {
    let data;

    await axios.post("/api/auth/logout")
    .then((response) => {
      data = response.data;
      setUser(null);
      setUserData(null);
      setIsAuthenticated(false);
    })
    .catch((error) => {
      data = error.response.data.message;
    })
    .finally(() => {
      setLoading(false);
    });

    return data;
  };

  async function fetchData() {
    setLoading(true);

    let data;

    await axios.get("/api/auth/verify")
    .then((response) => {
      data = response.data;
      if(data.success) {
        setUser(data.user);
        setIsAuthenticated(true);
      }
    })
    .catch((error) => {
      data = error.response.data;
    })
    .finally(() => {
      setLoading(false);
    });

    return data;
  }

  useEffect(() => {
    fetchData();
  }, []);

  const value = {
    login,
    signup,
    logout,
    user,
    isAuthenticated,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
