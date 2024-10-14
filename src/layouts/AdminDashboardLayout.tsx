import AdminHeader from "@/components/dashboard/AdminHeader";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import React, { useState } from "react";

type AdminDashboardLayoutProps = {
  children: React.ReactNode;
};

const AdminDashboardLayout = ({ children }: AdminDashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logging out...");
  };

  const handleUpdateProfile = () => {
    // Implement update profile logic here
    console.log("Updating profile...");
  };
  return (
    <div className="min-h-screen bg-background text-foreground">
      <AdminSidebar isSidebarOpen={isSidebarOpen} />
      <div
        className={`p-4 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } transition-margin duration-300 ease-in-out`}
      >
        <AdminHeader
          toggleSidebar={toggleSidebar}
          userEmail="admin@example.com"
          userAvatar="/path/to/avatar.jpg"
          onLogout={handleLogout}
          onUpdateProfile={handleUpdateProfile}
        />
        {children}
      </div>
    </div>
  );
};

export default AdminDashboardLayout;
