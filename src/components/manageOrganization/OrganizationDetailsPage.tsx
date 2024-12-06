import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, FileText } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useOrganization } from '@/api/manageOrganization';

const OrganizationDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: organization, isLoading, error } = useOrganization(id || '');

  if (isLoading) {
    return <div>Loading...</div>;
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
    <div className="container mx-auto p-4">
      <Button onClick={() => navigate('/manage-organization')} className="mb-4">
        <ArrowLeft className="mr-2 h-4 w-4 hover:text-white " />
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">{organization.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="flex items-center space-x-4">
              {organization.logo && (
                <img 
                  src={organization.logo} 
                  alt={`${organization.name} logo`} 
                  className="w-16 h-16 object-contain"
                />
              )}
              <div>          
                <p><strong>Tax Code:</strong> {organization.taxCode}</p>
              </div>
            </div>
            <div>
              <strong>Description:</strong>
              <p>{organization.description}</p>
            </div>
            <div>
              <strong>Industry Codes:</strong>
              <ul>
                {organization.industryCodes.map((code) => (
                  <li key={code.id}>{code.name} ({code.code})</li>
                ))}
              </ul>
            </div>
            {organization.contract && organization.contract.url && (
              <div>
                <a
                  href={organization.contract.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-600 hover:underline"
                >
                  <FileText className="h-4 w-4 mr-1" />
                  View Contract
                </a>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrganizationDetailsPage;

