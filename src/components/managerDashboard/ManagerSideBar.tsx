import {
  ChartBarStackedIcon,
  FileText,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

type ManagerSidebarProps = {
  isSidebarOpen: boolean;
};

const ManagerSidebar = ({ isSidebarOpen }: ManagerSidebarProps) => {
  const location = useLocation();

  const navItems = [
    { to: "/", icon: LayoutDashboard, label: "Dashboard" },
    { to: "/manage-user", icon: Users, label: "Manage users" },
    { to: "/midpoint-substance", icon: FileText, label: "Manage midpoint substance" },
    { to: "/impact-category", icon: ChartBarStackedIcon, label: "Manage impact category" },
    { to: "/midpoint-impact-category", icon: ChartBarStackedIcon, label: "Manage midpoint impact category" },
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
          Manager Dashboard
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

export default ManagerSidebar;