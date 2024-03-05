import React from "react";
import './AuthLayout.css'

export const AuthLayout = ({ children }) => {
  return (
    <div className="auth-wrapper">
      <div className="auth-content">{children}</div>
    </div>
  );
};
