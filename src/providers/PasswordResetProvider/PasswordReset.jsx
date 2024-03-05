import React, { createContext, useContext, useState } from "react";

export const PasswordResetContext = createContext({
  fetchPasswordReset: async () => {},
  error: null,
  isLoading: false,
  data: null,
});

export const PasswordResetProvider = ({ children }) => {
  const loginURL = `${process.env.REACT_APP_API_ENDPOINT}/${process.env.REACT_APP_API_VERSION}/auth/password-reset`;
  const [resetPassword, setResetPassword] = useState({
    isLoading: false,
    data: null,
    error: null,
  });

  const fetchPasswordReset = async (email) => {
    setResetPassword((prevState) => ({ ...prevState, isLoading: true }));
    await fetch(loginURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((data) => data.json())
      .then((data) => {
        if (data.error > 0) {
          setResetPassword({
            data: null,
            error: data.detail,
            isLoading: false,
          });
        } else {
          setResetPassword({ data, error: null, isLoading: false });
        }
      });
  };

  const value = {
    fetchPasswordReset,
    data: resetPassword.data,
    error: resetPassword.error,
    isLoading: resetPassword.isLoading,
  };

  return (
    <PasswordResetContext.Provider value={value}>
      {children}
    </PasswordResetContext.Provider>
  );
};

export const usePasswordReset = () => useContext(PasswordResetContext);
