import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LoginLayout from "./layouts/LoginLayout";
import AdminDashboard from "./pages/AdminDashboardPage";

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
        <Route
       path="/" element={<AdminDashboard />}
      />
    </Routes>
  );
};

export default AppRoutes;
