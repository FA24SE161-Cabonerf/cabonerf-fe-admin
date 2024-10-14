import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LoginLayout from "./layouts/LoginLayout";

import ProtectedRoute from "./contexts/auth/ProtectedRoute";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";

import AdminDashboardPage from "./pages/AdminDashboardPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import ManageUserPage from "./pages/ManageUserPage";

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
              <AdminDashboardPage />
            </AdminDashboardLayout>
          }
        />
          <Route
          path="/update-profile"
          element={
            <AdminDashboardLayout>
              <UpdateProfilePage />
            </AdminDashboardLayout>
          }
        />
          <Route
          path="/manage-user"
          element={
            <AdminDashboardLayout>
              <ManageUserPage />
            </AdminDashboardLayout>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
