import {  Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import LoginLayout from "./layouts/LoginLayout";

import ProtectedRoute from "./contexts/auth/ProtectedRoute";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";

import AdminDashboardPage from "./pages/AdminDashboardPage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import ManageUserPage from "./pages/ManageUserPage";
import ManageImpactCategoryPage from "./pages/ManageImpactCategoryPage";
import ManageImpactMethodPage from "./pages/MangeImpactMethodPage";
import ManageUnitGroupPage from "./pages/MangeUnitGroupPage";
import ManageUnitPage from "./pages/ManageUnitPage";
import ManageLifeCycleStagePage from "./pages/ManageLifeCycleStagePage";
import ManageMidpointSubstancePage from "./pages/ManageMidpointSubstancePage";
import ManageEmissionCompartmentPage from "./pages/ManageEmissionCompartmentPage ";
import ManagePerspectivePage from "./pages/ManagePerspectivePage ";
import ManageMidpointImpactCategoryPage from "./pages/ManageMidpointImpactCategoryPage";
import ManagerDashboardLayout from "./layouts/ManagerDashboardLayout";
import ManageOrganizationPage from "./pages/ManageOrganizationPage";

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

      <Route element={<ProtectedRoute allowedRoles={["System Admin"]} />}>
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
        <Route
          path="/midpoint-substance"
          element={
            <AdminDashboardLayout>
              <ManageMidpointSubstancePage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/impact-category"
          element={
            <AdminDashboardLayout>
              <ManageImpactCategoryPage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/midpoint-impact-category"
          element={
            <AdminDashboardLayout>
              <ManageMidpointImpactCategoryPage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/impact-method"
          element={
            <AdminDashboardLayout>
              <ManageImpactMethodPage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/unit-group"
          element={
            <AdminDashboardLayout>
              <ManageUnitGroupPage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/unit"
          element={
            <AdminDashboardLayout>
              <ManageUnitPage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/life-cycle-stage"
          element={
            <AdminDashboardLayout>
              <ManageLifeCycleStagePage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/emission-compartment"
          element={
            <AdminDashboardLayout>
              <ManageEmissionCompartmentPage />
            </AdminDashboardLayout>
          }
        />
        <Route
          path="/perspective"
          element={
            <AdminDashboardLayout>
              <ManagePerspectivePage />
            </AdminDashboardLayout>
          }
        />
      </Route>
      <Route element={<ProtectedRoute allowedRoles={["Manager"]} />}>
        <Route
          path="/manager"
          element={
            <ManagerDashboardLayout>
              <AdminDashboardPage />
            </ManagerDashboardLayout>
          }
        />
        <Route
          path="/update-manager-profile"
          element={
            <ManagerDashboardLayout>
              <UpdateProfilePage />
            </ManagerDashboardLayout>
          }
        />
        <Route
          path="/manage-organization"
          element={
            <ManagerDashboardLayout>
              <ManageOrganizationPage />
            </ManagerDashboardLayout>
          }
        />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
