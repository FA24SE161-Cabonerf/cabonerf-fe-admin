import { Menu, Moon, Sun } from "lucide-react"
import { Button } from "../ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu"
import { useState, useEffect } from "react"


type AdminHeaderProps = {
  toggleSidebar: () => void
}


const AdminHeader = ({toggleSidebar}: AdminHeaderProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])
  
  return (
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
  )
}

export default AdminHeader
