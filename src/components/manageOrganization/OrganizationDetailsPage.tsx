import { useParams, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, ArrowLeft, FileText, Plus } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useOrganization, useOrganizationMembers, useRemoveMemberFromOrganization } from '@/api/manageOrganization';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import InviteUsersModal from '@/forms/manage-Organization/InviteUsersModal';
import { useState } from 'react';
import { useAuth } from '@/contexts/auth/AuthContext';
import { useCurrentUser } from '@/api/manageUserProfile';
import { toast } from '@/hooks/use-toast';

const OrganizationDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: organization, isLoading, error } = useOrganization(id || '');
  const { data: members, refetch: refetchMembers } = useOrganizationMembers(id || '');
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const { currentUser } = useAuth();
  const { data: userData } = useCurrentUser(currentUser?.id);
  const removeMemberMutation = useRemoveMemberFromOrganization();
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
  const handleInviteModalClose = () => {
    setIsInviteModalOpen(false);
    refetchMembers();
  };

  const handleRemoveMember = async (userOrganizationId: string) => {
    if (!userData?.id) {
      toast({
        title: "Error",
        description: "Unable to remove member. User ID not found.",
        variant: "destructive",
      });
      return;
    }

    try {
      await removeMemberMutation.mutateAsync({ userOrganizationId, currentUserId: userData.id });
      toast({
        title: "Success",
        description: "Member removed successfully.",
      });
      refetchMembers();
    } catch (error) {
      toast({
        title: "Error",
        description: `${error}`,
        variant: "destructive",
      });
    }
  };



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
           <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold">Organization member</h2>
                <p className="text-sm text-muted-foreground">
                  Members inside this organization
                </p>
              </div>
              <Button className="bg-green-500 hover:bg-green-600" onClick={() => setIsInviteModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Invite
              </Button>
            </div>

            <div className="space-y-4">
              {members?.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={member.user.profilePictureUrl} />
                      <AvatarFallback>
                        {member.user.fullName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{member.user.fullName}</span>                    
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {member.user.email}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                  <span className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                      {member.role.name}
                    </span>
                    <Button 
                      variant="ghost" 
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => handleRemoveMember(member.id)}
                      disabled={removeMemberMutation.isPending}
                    >
                      {removeMemberMutation.isPending ? 'Removing...' : 'Remove'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      {isInviteModalOpen && (
        <InviteUsersModal
          isOpen={isInviteModalOpen}
          onClose={handleInviteModalClose}
          organizationId={id || ''}
          currentUserId={userData?.id || ''}
        />
      )}
    </div>
  );
};

export default OrganizationDetailsPage;

