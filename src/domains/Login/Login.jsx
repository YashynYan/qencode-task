import React, { useState } from "react";
import "./Login.css";
import { Button, Icons, Input, Link } from "../../components";
import { useLogin } from "../../providers";
import { AuthLayout } from "../../layouts";

export const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [formError, setFormError] = useState(null);
  const { fetchLogin, error } = useLogin();

  const handleSubmitClick = async () => {
    const isEmail = formData.email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (formData.password.length < 8 || !isEmail) {
      const error = []
        .concat(
          formData.password.length < 8
            ? [
              {
                field_name: "password",
                error: "Password should have at least 8 characters",
              },
            ]
            : []
        )
        .concat(
          isEmail
            ? []
            : [
                {
                  field_name: "email",
                  error: "The email address is not valid.",
                },
              ]
        );
      setFormError(error);
      return;
    }
    await fetchLogin(formData);
  };

  const handleFormDataChange = (e) => {
    const { value, name } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if(formError) {
      setFormError(null)
    }
  };

  return (
    <AuthLayout>
        <Icons.Logo />
        <h2 className="title">Log in to your account</h2>
        <div className="sso-button-block">
          <Button isFullWidth variant="light">
            <Icons.GoogleIcon /> Google
          </Button>
          <Button isFullWidth variant="light">
            <Icons.GitHubIcon /> Github
          </Button>
        </div>
        <div className="or">
          <hr />
          <span>or</span>
          <hr />
        </div>
        <Input
          className="email-input"
          onChange={handleFormDataChange}
          value={formData.email}
          error={
            formError &&
            formError.find((item) => item.field_name === "email").error
          }
          placeholder="Work email"
          name="email"
        />
        <Input
          className="password-input"
          onChange={handleFormDataChange}
          value={formData.password}
          error={
            formError &&
            formError.find((item) => item.field_name === "password")?.error
          }
          placeholder="Password"
          name="password"
          type="password"
        />
        <Link className="forgot-password-link" to='/forgot-password'>Forgot your password?</Link>
        <Button onClick={handleSubmitClick} isFullWidth variant="primary">
          Log in to Qencode
        </Button>
        {error && !Array.isArray(error) && <p className="error-block">{error}</p>}
        <p className="sign-up-block">
          Is your company new to Qencode? <Link to="/sign-up">Sign up</Link>
        </p>
      </AuthLayout>
  );
};
