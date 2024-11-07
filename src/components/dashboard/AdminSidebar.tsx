import {
  BoxIcon,
  ChartBarStackedIcon,
  FileText,
  LayoutDashboard,
  LeafyGreenIcon,
  RecycleIcon,
  Settings,
  TelescopeIcon,
  UngroupIcon,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type AdminSidebarProps = {
  isSidebarOpen: boolean;
};

const AdminSidebar = ({ isSidebarOpen }: AdminSidebarProps) => {
  const location = useLocation();

  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/manage-user", icon: Users, label: "Manage Users" },
    { to: "/midpoint-substance", icon: FileText, label: "Manage midpoint substance" },
    { to: "/impact-category", icon: ChartBarStackedIcon, label: "Manage impact category" },
    { to: "/midpoint-impact-category", icon: ChartBarStackedIcon, label: "Manage midpoint impact category" },
    { to: "/impact-method", icon: Settings, label: "Manage impact method" },
    { to: "/unit-group", icon: BoxIcon, label: "Manage unit group" },
    { to: "/unit", icon: UngroupIcon, label: "Manage unit" },
    { to: "/life-cycle-stage", icon: RecycleIcon, label: "Manage Life Cycle Stage" },
    { to: "/emission-compartment", icon: LeafyGreenIcon, label: "Manage Emission Compartment" },
    { to: "/perspective", icon: TelescopeIcon, label: "Manage Perspective" },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 z-40 h-screen w-64 transform transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex h-full flex-col overflow-y-auto border-r bg-card px-3 py-4">
        <Link
          to="/"
          className="mb-5 flex items-center pl-2.5 text-xl font-semibold"
        >
          <LayoutDashboard className="mr-2 h-6 w-6" />
          Admin Dashboard
        </Link>
        <ul className="space-y-2 font-medium">
          {navItems.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className={`flex items-center rounded-lg p-2 ${
                  location.pathname === item.to
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="h-5 w-5" />
                <span className="ml-3">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default AdminSidebar;