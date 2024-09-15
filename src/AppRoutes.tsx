import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LoginLayout from "./layouts/LoginLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <LoginLayout>
            <LoginPage />
          </LoginLayout>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
