import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Plus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  useCreateOrganization,
  useDeleteOrganization,
  useOrganizations,
  useUpdateOrganization,
} from "@/api/manageOrganization";
import OrganizationTable from "@/components/manageOrganization/OrganizationTable";
import Pagination from "@/components/pagination/Pagination";
import AddOrganizationModal from "@/forms/manage-Organization/AddOrganizationModal";
import UpdateOrganizationModal from "@/forms/manage-Organization/UpdateOrganizationModal";
import DeleteOrganizationModal from "@/forms/manage-Organization/DeleteOrganizationModal";
import { useToast } from "@/hooks/use-toast";
import { Organization } from "@/types/organization";

const ManageOrganizationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const searchParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedOrganization, setSelectedOrganization] =
    useState<Organization | null>(null);
  const [addError, setAddError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const {
    data: organizationResponse,
    isLoading,
    error,
    refetch,
  } = useOrganizations(page, pageSize, searchTerm);
  const createOrganizationMutation = useCreateOrganization();
  const updateOrganizationMutation = useUpdateOrganization();
  const deleteOrganizationMutation = useDeleteOrganization();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
    params.set("page", page.toString());
    params.set("pageSize", pageSize.toString());
    navigate(`?${params.toString()}`, { replace: true });
  }, [searchTerm, page, pageSize, navigate, location.search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); // Reset to first page when search term changes
  };

  const handleAddOrganization = async (data: {
    name: string;
    email: string;
    contractFile: File;
    logo: File;
  }) => {
    try {
      await createOrganizationMutation.mutateAsync(data);
      refetch();
      setIsAddModalOpen(false);
      setAddError(null);
      toast({
        title: "Success",
        description: "Organization created successfully",
        variant: "default",
      });
    } catch (error) {
      if (error instanceof Error) {
        setAddError(error.message);
      } else {
        setAddError("An unknown error occurred");
      }
    }
  };

  const handleUpdateOrganization = async (
    id: string,
    data: { name: string }
  ) => {
    try {
      await updateOrganizationMutation.mutateAsync({ id, ...data });
      refetch();
      setIsUpdateModalOpen(false);
      setUpdateError(null);
      toast({
        title: "Success",
        description: "Organization updated successfully",
        variant: "default",
      });
    } catch (error) {
      if (error instanceof Error) {
        setUpdateError(error.message);
      } else {
        setUpdateError("An unknown error occurred");
      }
    }
  };

  const handleDeleteOrganization = async (id: string) => {
    try {
      await deleteOrganizationMutation.mutateAsync(id);
      refetch();
      setIsDeleteModalOpen(false);
      setSelectedOrganization(null);
      setDeleteError(null);
      toast({
        title: "Success",
        description: "Organization deleted successfully",
        variant: "default",
      });
    } catch (error) {
      if (error instanceof Error) {
        setDeleteError(error.message);
      } else {
        setDeleteError("An unknown error occurred");
      }
    }
  };

  const handleEdit = (id: string) => {
    const organization = organizationResponse?.list.find(
      (org) => org.id === id
    );
    if (organization) {
      setSelectedOrganization(organization);
      setIsUpdateModalOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    const organization = organizationResponse?.list.find(
      (org) => org.id === id
    );
    if (organization) {
      setSelectedOrganization(organization);
      setIsDeleteModalOpen(true);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1); 
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Organizations Management</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Organization
        </Button>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Search organizations..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="max-w-sm"
        />
      </div>
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
        <ScrollArea className="h-[calc(100vh-200px)]">
          <OrganizationTable
            organizations={organizationResponse?.list}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        </ScrollArea>
      )}
      {organizationResponse && (
        <Pagination
          page={page}
          pageSize={pageSize}
          totalPages={organizationResponse.totalPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
      <AddOrganizationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddOrganization}
        isSubmitting={createOrganizationMutation.isPending}
        error={addError}
      />
      <UpdateOrganizationModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedOrganization(null);
        }}
        onSubmit={handleUpdateOrganization}
        isSubmitting={updateOrganizationMutation.isPending}
        error={updateError}
        organization={selectedOrganization}
      />
      <DeleteOrganizationModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedOrganization(null);
        }}
        onConfirm={() =>
          selectedOrganization &&
          handleDeleteOrganization(selectedOrganization.id)
        }
        isDeleting={deleteOrganizationMutation.isPending}
        error={deleteError}
        organizationName={selectedOrganization?.name || ""}
      />
    </div>
  );
};

export default ManageOrganizationPage;
