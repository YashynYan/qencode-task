import React, { useState } from "react";
import { Button, Icons, Input, Link } from "../../components";
import './ForgotPassword.css'
import { usePasswordReset } from "../../providers";
import { AuthLayout } from "../../layouts";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [formError, setFormError] = useState(null);
  const {fetchPasswordReset, error} = usePasswordReset()

  const handleEmailChange = (e) => {
    const { value } = e.target;
    setEmail(value);

    if (formError) {
      setFormError(null);
    }
  };

  const handleSubmitClick = async () => {
    const isEmail = email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

    if (!isEmail) {
      setFormError("The email address is not valid.");
      return;
    }
    await fetchPasswordReset(email);
  };
  return (
    <AuthLayout>
        <Icons.Logo />
        <h2 className="title">Forgot Password?</h2>
        <Input
          onChange={handleEmailChange}
          error={formError}
          value={email}
          placeholder="Enter your email"
          name="email"
        />
        {error && !Array.isArray(error) && <p className="error-block">{error}</p>}
        <div className="buttons-block">
          <Button onClick={handleSubmitClick} isFullWidth variant="primary">
            Send
          </Button>
          <Link to='/'>
          <Button isFullWidth variant="light">
            Cancel
          </Button>
          </Link>
        </div>
      </AuthLayout>
  );
};
