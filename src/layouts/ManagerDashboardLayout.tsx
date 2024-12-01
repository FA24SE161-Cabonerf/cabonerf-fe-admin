import { useCurrentUser } from "@/api/manageUserProfile";
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
  const { data: userData} = useCurrentUser(currentUser?.id);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
          userAvatar={userData?.profilePictureUrl || "/path/to/avatar.jpg"}
          onLogout={handleLogout}
        />
        {children}
      </div>
    </div>
  );
};

export default ManagerDashboardLayout;
