import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LoginLayout from "./layouts/LoginLayout";

import ProtectedRoute from "./contexts/auth/ProtectedRoute";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";
import AdminDashboardContent from "./components/dashboard/AdminDashboardContent";

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

      <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
        <Route
          path="/"
          element={
            <AdminDashboardLayout>
              <AdminDashboardContent />
            </AdminDashboardLayout>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
