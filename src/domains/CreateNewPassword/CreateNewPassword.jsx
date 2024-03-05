import React, { useState } from "react";
import "./CreateNewPassword.css";
import { Button, Icons, Input } from "../../components";
import { useSetNewPassword } from "../../providers";
import { AuthLayout } from "../../layouts";

export const CreateNewPassword = () => {
  const [formData, setFormData] = useState({
    password: null,
    password_confirm: null,
  });
  const [formError, setFormError] = useState(null);
  const { fetchSetNewPassword } = useSetNewPassword();
  const handleFormDataChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (formError) {
      setFormError(null);
    }
  };

  const handleSubmitClick = async () => {
    if (formData.password !== formData.password_confirm) {
      setFormError("Passwords don't match");
      return;
    }
    if (formData.password?.length < 8) {
      setFormError("Password should have at least 8 characters");
      return;
    }
    await fetchSetNewPassword(formData);
  };
  return (
    <AuthLayout>
        <Icons.Logo />
        <h2 className="title">Create new Password?</h2>
        <div className="form">
          <Input
            placeholder="Password"
            name="password"
            type="password"
            label="Password"
            onChange={handleFormDataChange}
          />
          <Input
            placeholder="Password"
            name="password_confirm"
            type="password"
            label="Confirm Password"
            onChange={handleFormDataChange}
          />
        </div>
        <div className="buttons-block">
          <Button onClick={handleSubmitClick} isFullWidth variant="primary">
            Send
          </Button>
          {formError && <p>{formError}</p>}
        </div>
      </AuthLayout>
  );
};
