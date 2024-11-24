import { User } from '@/types/user'
import { useAuth } from './AuthContext'
import { Navigate, Outlet, useLocation } from "react-router-dom"
import { useState, useEffect } from "react"
import { AlertMessage } from '@/components/alertMessage/AlertMessage'

type ProtectedRouteProps = {
  allowedRoles: User['role']["name"][];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { currentUser } = useAuth()
  const [showAlert, setShowAlert] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (currentUser && !allowedRoles.includes(currentUser.role.name)) {
      setShowAlert(true)
      const timer = setTimeout(() => {
        setShowAlert(false)
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [currentUser, allowedRoles])

  if (currentUser === undefined) {
    return <div>Loading...</div>
  }

  if (currentUser === null) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (!allowedRoles.includes(currentUser.role.name)) {
    return (
      <div className="container mx-auto p-4">
        {showAlert && (
          <AlertMessage 
            title="Access Denied" 
            message="You don't have permission to access this page." 
          />
        )}
        <Navigate to={getDefaultRoute(currentUser.role.name)} replace />
      </div>
    )
  }

  return <Outlet />
}

function getDefaultRoute(role: string): string {
  switch (role) {
    case "System Admin":
      return "/"
    case "Manager":
      return "/manage-organization"
    default:
      return "/login"
  }
}