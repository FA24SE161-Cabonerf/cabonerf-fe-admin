import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Plus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import SkeletonTable from "@/components/sketeton/SkeletonTable";
import { useToast } from "@/hooks/use-toast";

import { Perspective } from "@/types/perspective";
import PerspectiveTable from "@/components/managePerspective/PerspectiveTable ";
import AddPerspectiveModal from "@/forms/manage-perspective/AddPerspectiveModal ";
import UpdatePerspectiveModal from "@/forms/manage-perspective/UpdatePerspectiveModal ";
import DeletePerspectiveModal from "@/forms/manage-perspective/DeletePerspectiveModal ";
import { useCreatePerspective, useDeletePerspective, usePerspectives, useUpdatePerspective } from "@/api/managePerspective";

const ManagePerspectivePage = () => {
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
  const [selectedPerspective, setSelectedPerspective] = useState<Perspective | null>(null);
  const [addError, setAddError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const { data: perspectives, isLoading, error, refetch } = usePerspectives();
  const createPerspectiveMutation = useCreatePerspective();
  const updatePerspectiveMutation = useUpdatePerspective();
  const deletePerspectiveMutation = useDeletePerspective();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
    navigate(`?${params.toString()}`, { replace: true });
  }, [searchTerm, navigate, location.search]);

  const filteredPerspectives = perspectives
    ? perspectives.filter(
        (perspective) =>
          perspective.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          perspective.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          perspective.abbr.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddPerspective = async (data: { name: string; description: string; abbr: string }) => {
    try {
      await createPerspectiveMutation.mutateAsync(data);
      refetch();
      setIsAddModalOpen(false);
      setAddError(null);
      toast({
        title: "Success",
        description: "Perspective created successfully",
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

  const handleUpdatePerspective = async (
    id: string,
    data: { name: string; description: string; abbr: string }
  ) => {
    try {
      await updatePerspectiveMutation.mutateAsync({ id, ...data });
      refetch();
      setIsUpdateModalOpen(false);
      setUpdateError(null);
      toast({
        title: "Success",
        description: "Perspective updated successfully",
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

  const handleDeletePerspective = async (id: string) => {
    try {
      await deletePerspectiveMutation.mutateAsync(id);
      refetch();
      setIsDeleteModalOpen(false);
      setSelectedPerspective(null);
      setDeleteError(null);
      toast({
        title: "Success",
        description: "Perspective deleted successfully",
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
    const perspective = perspectives?.find((p) => p.id === id);
    if (perspective) {
      setSelectedPerspective(perspective);
      setIsUpdateModalOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    const perspective = perspectives?.find((p) => p.id === id);
    if (perspective) {
      setSelectedPerspective(perspective);
      setIsDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedPerspective) {
      handleDeletePerspective(selectedPerspective.id);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Perspectives Management</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Perspective
        </Button>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Search perspectives..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="max-w-sm"
        />
      </div>
      {isLoading ? (
        <SkeletonTable />
      ) : error ? (
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
          <PerspectiveTable
            perspectives={filteredPerspectives}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </ScrollArea>
      )}
      <AddPerspectiveModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddPerspective}
        isSubmitting={createPerspectiveMutation.isPending}
        error={addError}
      />
      <UpdatePerspectiveModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedPerspective(null);
        }}
        onSubmit={handleUpdatePerspective}
        isSubmitting={updatePerspectiveMutation.isPending}
        error={updateError}
        perspective={selectedPerspective}
      />
      <DeletePerspectiveModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedPerspective(null);
        }}
        onConfirm={handleConfirmDelete}
        isDeleting={deletePerspectiveMutation.isPending}
        error={deleteError}
        perspectiveName={selectedPerspective?.name || ""}
      />
    </div>
  );
};

export default ManagePerspectivePage;