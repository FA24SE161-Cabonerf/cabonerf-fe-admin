import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Plus, Search } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  useImpactMethods,
  useCreateImpactMethod,
  useUpdateImpactMethod,
  useDeleteImpactMethod,
} from "@/api/manageImpactMethod";
import ImpactMethodsTable from "@/components/manageImpactMethod/impactMethodTable";
import { useToast } from "@/hooks/use-toast";
import { ImpactMethod } from "@/types/impactMethod";
import { usePerspectives } from "@/api/managePerspective";
import AddImpactMethodModal from "@/forms/manage-impact-method/AddImpactMethodModal ";
import UpdateImpactMethodModal from "@/forms/manage-impact-method/UpdateImpactMethodModal ";
import DeleteImpactMethodModal from "@/forms/manage-impact-method/DeleteImpactMethodModal ";

const ManageImpactMethodPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const searchParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedImpactMethod, setSelectedImpactMethod] =
    useState<ImpactMethod | null>(null);
  const [addError, setAddError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const { data: impactMethods, isLoading, error, refetch } = useImpactMethods();
  const { data: perspectives } = usePerspectives();
  const createImpactMethodMutation = useCreateImpactMethod();
  const updateImpactMethodMutation = useUpdateImpactMethod();
  const deleteImpactMethodMutation = useDeleteImpactMethod();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
    navigate(`?${params.toString()}`, { replace: true });
  }, [searchTerm, navigate, location.search]);

  const filteredMethods = impactMethods
    ? impactMethods.filter(
        (method) =>
          method.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          method.perspective.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddImpactMethod = async (data: {
    name: string;
    description: string;
    version: string;
    reference?: string | null;
    perspectiveId: string;
  }) => {
    try {
      await createImpactMethodMutation.mutateAsync(data);
      refetch();
      setIsAddModalOpen(false);
      setAddError(null);
      toast({
        title: "Success",
        description: "Impact method created successfully",
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

  const handleUpdateImpactMethod = async (
    id: string,
    data: {
      name: string;
      description: string;
      version: string;
      reference?: string | null;
      perspectiveId: string;
    }
  ) => {
    try {
      await updateImpactMethodMutation.mutateAsync({ id, ...data });
      refetch();
      setIsUpdateModalOpen(false);
      setUpdateError(null);
      toast({
        title: "Success",
        description: "Impact method updated successfully",
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

  const handleDeleteImpactMethod = async (id: string) => {
    try {
      await deleteImpactMethodMutation.mutateAsync(id);
      refetch();
      setIsDeleteModalOpen(false);
      setSelectedImpactMethod(null);
      setDeleteError(null);
      toast({
        title: "Success",
        description: "Impact method deleted successfully",
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
    const impactMethod = impactMethods?.find((m) => m.id === id);
    if (impactMethod) {
      setSelectedImpactMethod(impactMethod);
      setIsUpdateModalOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    const impactMethod = impactMethods?.find((m) => m.id === id);
    if (impactMethod) {
      setSelectedImpactMethod(impactMethod);
      setIsDeleteModalOpen(true);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Impact Methods Management</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Method
        </Button>
      </div>
      <div className="relative max-w-sm">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <Input
          placeholder="Search methods..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="pl-8"
        />
    </div>
      {error ? (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error instanceof Error
              ? error.message
              : "An unexpected error occurred"}
          </AlertDescription>
        </Alert>
      ) : (
        <ScrollArea className="h-[calc(100vh-200px)]">
          <ImpactMethodsTable
            methods={filteredMethods}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        </ScrollArea>
      )}
      {perspectives && (
        <AddImpactMethodModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSubmit={handleAddImpactMethod}
          isSubmitting={createImpactMethodMutation.isPending}
          error={addError}
          perspectives={perspectives}
        />
      )}
      {perspectives && selectedImpactMethod && (
        <UpdateImpactMethodModal
          isOpen={isUpdateModalOpen}
          onClose={() => {
            setIsUpdateModalOpen(false);
            setSelectedImpactMethod(null);
          }}
          onSubmit={handleUpdateImpactMethod}
          isSubmitting={updateImpactMethodMutation.isPending}
          error={updateError}
          perspectives={perspectives}
          impactMethod={selectedImpactMethod}
        />
      )}
      {selectedImpactMethod && (
        <DeleteImpactMethodModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedImpactMethod(null);
          }}
          onConfirm={() => handleDeleteImpactMethod(selectedImpactMethod.id)}
          isDeleting={deleteImpactMethodMutation.isPending}
          error={deleteError}
          impactMethodName={selectedImpactMethod.name}
        />
      )}
    </div>
  );
};

export default ManageImpactMethodPage;
