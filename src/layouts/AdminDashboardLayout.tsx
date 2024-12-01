import { useCurrentUser } from "@/api/manageUserProfile";
import AdminHeader from "@/components/dashboard/AdminHeader";
import AdminSidebar from "@/components/dashboard/AdminSidebar";
import { useAuth } from "@/contexts/auth/AuthContext";
import React, { useState } from "react";

type AdminDashboardLayoutProps = {
  children: React.ReactNode;
};

const AdminDashboardLayout = ({ children }: AdminDashboardLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { handleLogout, currentUser } = useAuth();
  const { data: userData} = useCurrentUser(currentUser?.id);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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

export default AdminDashboardLayout;
