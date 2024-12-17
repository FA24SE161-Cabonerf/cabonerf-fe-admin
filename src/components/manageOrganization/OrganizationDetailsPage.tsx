import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, FileText } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useOrganization } from '@/api/manageOrganization';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const OrganizationDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: organization, isLoading, error } = useOrganization(id || '');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : "An unknown error occurred"}
        </AlertDescription>
      </Alert>
    );
  }

  if (!organization) {
    return <div>Organization not found</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Button 
        variant="ghost" 
        onClick={() => navigate('/manage-organization')}
        className="mb-4 hover:bg-transparent hover:text-primary"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Organizations
      </Button>

      <Card>
        <CardContent className="p-6 space-y-8">
          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Organization name</h2>
           
            <div className="flex items-center space-x-4 mt-2">
              {organization.logo && (
                <img 
                  src={organization.logo} 
                  alt={`${organization.name} logo`} 
                  className="w-12 h-12 object-contain"
                />
              )}
              <p className="text-lg">{organization.name}</p>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Organization description</h2>
          
            <p className="mt-2">{organization.description || 'No description provided'}</p>
          </div>

          <div className="space-y-2">
            <h2 className="text-lg font-semibold">Organization industry</h2>
            <p className="text-sm text-muted-foreground">
              All industries associated with this organization
            </p>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">No</TableHead>
                  <TableHead>Industry Name</TableHead>
                  <TableHead>Name</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {organization.industryCodes.map((code, index) => (
                  <TableRow key={code.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{code.name}</TableCell>
                    <TableCell>{code.code}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {organization.contract && organization.contract.url && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Contract</h2>
              <a
                href={organization.contract.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-blue-600 hover:underline"
              >
                <FileText className="h-4 w-4 mr-2" />
                View Contract
              </a>
            </div>
          )}

          {organization.taxCode && (
            <div className="space-y-2">
              <h2 className="text-lg font-semibold">Tax Information</h2>
          
              <p className="mt-2">{organization.taxCode}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationDetailsPage;

