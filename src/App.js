import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { CreateNewPassword, Login } from "./domains";
import { LoginProvider, SetNewPasswordProvider } from "./providers";
import { ForgotPassword } from "./domains/ForgotPassword/ForgotPassword";
import { PasswordResetProvider } from "./providers/PasswordResetProvider";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <LoginProvider>
        <Login />
      </LoginProvider>
    ),
  },
  {
    path: "/forgot-password",
    element: (
      <PasswordResetProvider>
        <ForgotPassword />
      </PasswordResetProvider>
    ),
  },
  {
    path: "/create-new-password",
    element: (
      <SetNewPasswordProvider>
        <CreateNewPassword />
      </SetNewPasswordProvider>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} fallbackElement={<p>Loading...</p>} />;
}

export default App;
