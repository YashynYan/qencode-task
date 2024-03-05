import React, { createContext, useContext, useState } from "react";

export const LoginContext = createContext({
  fetchLogin: async () => {},
  error: null,
  isLoading: false,
  data: null,
});

export const LoginProvider = ({ children }) => {
  const loginURL = `${process.env.REACT_APP_API_ENDPOINT}/${process.env.REACT_APP_API_VERSION}/auth/login`;
  const [login, setLogin] = useState({
    isLoading: false,
    data: null,
    error: null,
  });

  const fetchLogin = async (data) => {
    setLogin((prevState) => ({ ...prevState, isLoading: true }));
    await fetch(loginURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.error > 0) {
          setLogin({ data: null, error: data.detail, isLoading: false });
        } else {
          setLogin({ data, error: null, isLoading: false });
        }
      });
  };

  const value = {
    fetchLogin,
    data: login.data,
    error: login.error,
    isLoading: login.isLoading,
  };

  return (
    <LoginContext.Provider value={value}>{children}</LoginContext.Provider>
  );
};

export const useLogin = () => useContext(LoginContext);
