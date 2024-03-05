import React, { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";

export const SetNewPasswordContext = createContext({
  fetchSetNewPassword: async () => {},
  error: null,
  isLoading: false,
  data: null,
});

export const SetNewPasswordProvider = ({ children }) => {
  let [searchParams] = useSearchParams();
  const loginURL = `${process.env.REACT_APP_API_ENDPOINT}/${process.env.REACT_APP_API_VERSION}/auth/password-set`;
  const [resetPassword, setResetPassword] = useState({
    isLoading: false,
    data: null,
    error: null,
  });

  const fetchSetNewPassword = async (data) => {
    setResetPassword((prevState) => ({ ...prevState, isLoading: true }));
    await fetch(loginURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Assume that we wil recieve token and secret from email url
      body: JSON.stringify({
        ...data,
        secret: searchParams.get("secret"),
        token: searchParams.get("token"),
      }),
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
    fetchSetNewPassword,
    data: resetPassword.data,
    error: resetPassword.error,
    isLoading: resetPassword.isLoading,
  };

  return (
    <SetNewPasswordContext.Provider value={value}>
      {children}
    </SetNewPasswordContext.Provider>
  );
};

export const useSetNewPassword = () => useContext(SetNewPasswordContext);
