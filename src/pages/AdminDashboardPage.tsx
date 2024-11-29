import { useEmissionSubstanceCount, useMonthlyNewUsers, useProjectCount, useSumImpact, useUserCount } from "@/api/manageAdminDashboard";
import AdminDashboardContent from "@/components/dashboard/AdminDashboardContent";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";


const AdminDashboardPage = () => {
  const {
    data: userCount,
    isLoading: isUserLoading,
    error: userError,
  } = useUserCount();
  const {
    data: projectCount,
    isLoading: isProjectLoading,
    error: projectError,
  } = useProjectCount();
  const { data: monthlyNewUsers, isLoading: isMonthlyNewUsersLoading, error: monthlyNewUsersError } = useMonthlyNewUsers();
  const { data: sumImpact, isLoading: isSumImpactLoading, error: sumImpactError } = useSumImpact();
  const { data: emissionSubstanceCount, isLoading: isEmissionSubstanceLoading, error: emissionSubstanceError } = useEmissionSubstanceCount();

  const error = userError || projectError || monthlyNewUsersError || sumImpactError || emissionSubstanceError;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-7">Dashboard Overview</h1>
      {error ? (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error instanceof Error
              ? error.message
              : "An unknown error occurred"}
          </AlertDescription>
        </Alert>
      ) : (
        <AdminDashboardContent
          userCount={userCount}
          isUserLoading={isUserLoading}
          projectCount={projectCount}
          isProjectLoading={isProjectLoading}
          monthlyNewUsers={monthlyNewUsers}
          isMonthlyNewUsersLoading={isMonthlyNewUsersLoading}
          sumImpact={sumImpact}
          isSumImpactLoading={isSumImpactLoading}
          emissionSubstanceCount={emissionSubstanceCount}
          isEmissionSubstanceLoading={isEmissionSubstanceLoading}
        />
      )}
    </div>
  );
};

export default AdminDashboardPage;
