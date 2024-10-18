import { BoxIcon, ChartBarStackedIcon, FileText, LayoutDashboard, RecycleIcon, Settings, UngroupIcon, Users } from "lucide-react";
import { Link } from "react-router-dom";

type AdminSidebarProps = {
  isSidebarOpen: boolean;
};

const AdminSidebar = ({ isSidebarOpen }: AdminSidebarProps) => {
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
          <li>
            <Link
              to="/"
              className="flex items-center rounded-lg p-2 text-primary hover:bg-muted"
            >
              <LayoutDashboard className="h-5 w-5" />
              <span className="ml-3">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/manage-user"
              className="flex items-center rounded-lg p-2 text-muted-foreground hover:bg-muted"
            >
              <Users className="h-5 w-5" />
              <span className="ml-3">Manage Users</span>
            </Link>
          </li>
          <li>
            <Link
              to="/reports"
              className="flex items-center rounded-lg p-2 text-muted-foreground hover:bg-muted"
            >
              <FileText className="h-5 w-5" />
              <span className="ml-3">Manage midpoint factor</span>
            </Link>
          </li>
          <li>
            <Link
              to="/impact-category"
              className="flex items-center rounded-lg p-2 text-muted-foreground hover:bg-muted"
            >
              <ChartBarStackedIcon className="h-5 w-5" />
              <span className="ml-3">Manage impact category</span>
            </Link>
          </li>
          <li>
            <Link
              to="/impact-method"
              className="flex items-center rounded-lg p-2 text-muted-foreground hover:bg-muted"
            >
              <Settings className="h-5 w-5" />
              <span className="ml-3">Manage impact method</span>
            </Link>
          </li>
          <li>
            <Link
              to="/unit-group"
              className="flex items-center rounded-lg p-2 text-muted-foreground hover:bg-muted"
            >
              <BoxIcon className="h-5 w-5" />
              <span className="ml-3">Manage unit group</span>
            </Link>
          </li>
          <li>
            <Link
              to="/unit"
              className="flex items-center rounded-lg p-2 text-muted-foreground hover:bg-muted"
            >
              <UngroupIcon className="h-5 w-5" />
              <span className="ml-3">Manage unit</span>
            </Link>
          </li>
          <li>
            <Link
              to="/life-cycle-stage"
              className="flex items-center rounded-lg p-2 text-muted-foreground hover:bg-muted"
            >
              <RecycleIcon className="h-5 w-5" />
              <span className="ml-3">Manage Life Cycle Stage</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default AdminSidebar;
