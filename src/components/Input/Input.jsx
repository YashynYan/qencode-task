import React, { useState } from "react";
import "./Input.css";
import { Icons } from "../Icons";

export const Input = ({ className, type, error, label, ...otherProps }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleIconClick = () => {
    setShowPassword((prevState) => !prevState);
  };
  return (
    <>
      <div className={`input-block ${className}`}>
      {label && <label className="label">{label}</label>}
        <div className="input-wrapper">
        <input
          className="input"
          type={showPassword ? "text" : type}
          {...otherProps}
        />
        {type === "password" && <Icons.Eye onClick={handleIconClick} />}
        </div>
        <div className="error-block">{error}</div>
      </div>
    </>
  );
};
