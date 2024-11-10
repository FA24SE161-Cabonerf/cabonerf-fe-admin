import ManagerHeader from "@/components/managerDashboard/ManagerHeader";
import ManagerSidebar from "@/components/managerDashboard/ManagerSideBar";
import { useAuth } from "@/contexts/auth/AuthContext";
import React, { useState } from "react";

type ManagerDashboardLayoutProps = {
  children: React.ReactNode;
};

const ManagerDashboardLayout = ({ children }: ManagerDashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { handleLogout, currentUser } = useAuth();
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleUpdateProfile = () => {
    // Implement update profile logic here
    console.log("Updating profile...");
  };
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ManagerSidebar isSidebarOpen={isSidebarOpen} />
      <div
        className={`p-4 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        } transition-margin duration-300 ease-in-out`}
      >
        <ManagerHeader
          toggleSidebar={toggleSidebar}
          userEmail={currentUser?.email}
          userRole={currentUser?.role.name}
          userAvatar="/path/to/avatar.jpg"
          onLogout={handleLogout}
          onUpdateProfile={handleUpdateProfile}
        />
        {children}
      </div>
    </div>
  );
};

export default ManagerDashboardLayout;
