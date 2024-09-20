import { User } from '@/types/user';
import { useAuth } from './AuthContext';
import { Navigate, Outlet } from "react-router-dom";

type ProtectedRouteProps = {
  allowedRoles?: User['role'][];
};

export default function ProtectedRoute({
  allowedRoles,
}: ProtectedRouteProps) {
  const { currentUser } = useAuth();

  if (currentUser === undefined) {
    return <div>Loading...</div>;
  }

  if (
    currentUser === null ||
    (allowedRoles && !allowedRoles.includes(currentUser.role))
  ) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}