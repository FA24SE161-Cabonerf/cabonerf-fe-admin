import { User } from '@/types/user'
import { useAuth } from './AuthContext'
import { Navigate, Outlet, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { AlertMessage } from '@/components/alertMessage/AlertMessage'


type ProtectedRouteProps = {
  allowedRoles?: User['role']["name"][];
}

export default function ProtectedRoute({ allowedRoles }: ProtectedRouteProps) {
  const { currentUser } = useAuth()
  const [showAlert, setShowAlert] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (currentUser && allowedRoles && !allowedRoles.includes(currentUser.role.name)) {
      setShowAlert(true)
      const timer = setTimeout(() => {
        setShowAlert(false)
        navigate('/login', { replace: true })
      }, 5000) // Redirect to login after 5 seconds

      return () => clearTimeout(timer)
    }
  }, [currentUser, allowedRoles, navigate])

  if (currentUser === undefined) {
    return <div>Loading...</div>
  }

  if (currentUser === null) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(currentUser.role.name)) {
    return (
      <div className="container mx-auto p-4">
        {showAlert && (
          <AlertMessage 
            title="Access Denied" 
            message="You don't have permission to access this page. Redirecting to login page in 5 seconds..." 
          />
        )}
        <div>Redirecting...</div>
      </div>
    )
  }

  return <Outlet />
}