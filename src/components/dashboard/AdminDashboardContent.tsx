import { EmissionSubstanceCount, ImpactData, MonthlyUserCount } from "@/api/manageAdminDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Loader2 } from 'lucide-react';
import MonthlyNewUsersChart from "./MonthlyNewUsersChart";
import ImpactSummaryChart from "./ImpactSummaryChart";
import EmissionSubstancePieChart from "./EmissionSubstancePieChart";

interface AdminDashboardContentProps {
  userCount: number | undefined;
  isUserLoading: boolean;
  projectCount: number | undefined;
  isProjectLoading: boolean;
  monthlyNewUsers: MonthlyUserCount[] | undefined;
  isMonthlyNewUsersLoading: boolean;
  sumImpact: ImpactData[] | undefined;
  isSumImpactLoading: boolean;
  emissionSubstanceCount: EmissionSubstanceCount[] | undefined;
  isEmissionSubstanceLoading: boolean;
}

const AdminDashboardContent = ({ 
  userCount, 
  isUserLoading, 
  projectCount, 
  isProjectLoading,
  monthlyNewUsers,
  isMonthlyNewUsersLoading,
  sumImpact,
  isSumImpactLoading,
  emissionSubstanceCount,
  isEmissionSubstanceLoading
}: AdminDashboardContentProps) => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isUserLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <div className="text-2xl font-bold">{userCount}</div>
                <p className="text-xs text-muted-foreground">Total registered users</p>
              </>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {isProjectLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                <div className="text-2xl font-bold">{projectCount}</div>
                <p className="text-xs text-muted-foreground">Total projects</p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
      {isMonthlyNewUsersLoading ? (
        <div className="flex items-center justify-center h-96">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        monthlyNewUsers && <MonthlyNewUsersChart data={monthlyNewUsers} />
      )}
      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        <div className="w-full lg:h-[700px]">
          {isSumImpactLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            sumImpact && <ImpactSummaryChart data={sumImpact} />
          )}
        </div>
        <div className="w-full lg:h-[700px]">
          {isEmissionSubstanceLoading ? (
            <div className="flex items-center justify-center h-full">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : (
            emissionSubstanceCount && <EmissionSubstancePieChart data={emissionSubstanceCount} />
          )}
        </div>
      </div>
    </div>
  )
}

export default AdminDashboardContent

