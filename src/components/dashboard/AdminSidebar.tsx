import { FileText, LayoutDashboard, Settings, Users } from "lucide-react";
import { Link } from "react-router-dom";

type AdminSidebarProps  = {
  isSidebarOpen: boolean
}

const AdminSidebar = ({isSidebarOpen}: AdminSidebarProps) => {
  return(
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
          to="/users"
          className="flex items-center rounded-lg p-2 text-muted-foreground hover:bg-muted"
        >
          <Users className="h-5 w-5" />
          <span className="ml-3">Users</span>
        </Link>
      </li>
      <li>
        <Link
          to="/reports"
          className="flex items-center rounded-lg p-2 text-muted-foreground hover:bg-muted"
        >
          <FileText className="h-5 w-5" />
          <span className="ml-3">Reports</span>
        </Link>
      </li>
      <li>
        <Link
          to="/settings"
          className="flex items-center rounded-lg p-2 text-muted-foreground hover:bg-muted"
        >
          <Settings className="h-5 w-5" />
          <span className="ml-3">Settings</span>
        </Link>
      </li>
    </ul>
  </div>
</aside>
  )
  
}

export default AdminSidebar;