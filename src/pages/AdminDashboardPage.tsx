import React, { useState, useEffect } from "react"
import { Moon, Sun, LayoutDashboard, Users, FileText, Settings, Menu } from "lucide-react"
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const AdminDashboard: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sidebar */}
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

      {/* Main Content */}
      <div className={`p-4 ${isSidebarOpen ? "ml-64" : "ml-0"} transition-margin duration-300 ease-in-out`}>
        {/* Header */}
        <header className="mb-4 flex items-center justify-between">
          <Button variant="ghost" size="icon" onClick={toggleSidebar}>
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-semibold">Dashboard Overview</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                {theme === "light" ? (
                  <Sun className="h-[1.2rem] w-[1.2rem]" />
                ) : (
                  <Moon className="h-[1.2rem] w-[1.2rem]" />
                )}
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                Dark
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>

        {/* Dashboard Content */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-muted-foreground">+10% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">789</div>
              <p className="text-xs text-muted-foreground">+5% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,345</div>
              <p className="text-xs text-muted-foreground">+20% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">42</div>
              <p className="text-xs text-muted-foreground">+2 from last week</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard