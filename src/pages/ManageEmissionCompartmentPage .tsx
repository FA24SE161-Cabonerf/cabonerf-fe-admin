import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Plus, Search } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { EmissionCompartment } from "@/types/emissionCompartment";
import AddEmissionCompartmentModal from "@/forms/manage-emission-compartment/AddEmissionCompartmentModal";
import UpdateEmissionCompartmentModal from "@/forms/manage-emission-compartment/UpdateEmissionCompartmentModal";
import DeleteEmissionCompartmentModal from "@/forms/manage-emission-compartment/DeleteEmissionCompartmentModal";
import {
  useCreateEmissionCompartment,
  useDeleteEmissionCompartment,
  useEmissionCompartments,
  useUpdateEmissionCompartment,
} from "@/api/manageEmissionCompartment";
import EmissionCompartmentTable from "@/components/manageEmissionCompartment/EmissionCompartmentTable ";

const ManageEmissionCompartmentPage = () => {
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
  const [selectedEmissionCompartment, setSelectedEmissionCompartment] =
    useState<EmissionCompartment | null>(null);
  const [addError, setAddError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const { data: emissionCompartments, isLoading, error, refetch } = useEmissionCompartments();
  const createEmissionCompartmentMutation = useCreateEmissionCompartment();
  const updateEmissionCompartmentMutation = useUpdateEmissionCompartment();
  const deleteEmissionCompartmentMutation = useDeleteEmissionCompartment();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
    navigate(`?${params.toString()}`, { replace: true });
  }, [searchTerm, navigate, location.search]);

  const filteredEmissionCompartments = emissionCompartments
    ? emissionCompartments.filter(
        (compartment) =>
          compartment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (compartment.description &&
            compartment.description.toLowerCase().includes(searchTerm.toLowerCase()))
      )
    : [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddEmissionCompartment = async (data: {
    name: string;
    description: string ;
  }) => {
    try {
      await createEmissionCompartmentMutation.mutateAsync(data);
      refetch();
      setIsAddModalOpen(false);
      setAddError(null);
      toast({
        title: "Success",
        description: "Emission compartment created successfully",
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

  const handleUpdateEmissionCompartment = async (
    id: string,
    data: { name: string; description: string }
  ) => {
    try {
      await updateEmissionCompartmentMutation.mutateAsync({ id, ...data });
      refetch();
      setIsUpdateModalOpen(false);
      setUpdateError(null);
      toast({
        title: "Success",
        description: "Emission compartment updated successfully",
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

  const handleDeleteEmissionCompartment = async (id: string) => {
    try {
      await deleteEmissionCompartmentMutation.mutateAsync(id);
      refetch();
      setIsDeleteModalOpen(false);
      setSelectedEmissionCompartment(null);
      setDeleteError(null);
      toast({
        title: "Success",
        description: "Emission compartment deleted successfully",
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
    const compartment = emissionCompartments?.find((c) => c.id === id);
    if (compartment) {
      setSelectedEmissionCompartment(compartment);
      setIsUpdateModalOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    const compartment = emissionCompartments?.find((c) => c.id === id);
    if (compartment) {
      setSelectedEmissionCompartment(compartment);
      setIsDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedEmissionCompartment) {
      handleDeleteEmissionCompartment(selectedEmissionCompartment.id);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Emission Compartments Management</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Emission Compartment
        </Button>
      </div>
      <div className="mb-4 relative">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Search emission compartments..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="max-w-sm pl-8"
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
          <EmissionCompartmentTable
            emissionCompartments={filteredEmissionCompartments}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        </ScrollArea>
      )}
      <AddEmissionCompartmentModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddEmissionCompartment}
        isSubmitting={createEmissionCompartmentMutation.isPending}
        error={addError}
      />
      <UpdateEmissionCompartmentModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedEmissionCompartment(null);
        }}
        onSubmit={handleUpdateEmissionCompartment}
        isSubmitting={updateEmissionCompartmentMutation.isPending}
        error={updateError}
        emissionCompartment={selectedEmissionCompartment}
      />
      <DeleteEmissionCompartmentModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedEmissionCompartment(null);
        }}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteEmissionCompartmentMutation.isPending}
        error={deleteError}
        emissionCompartmentName={selectedEmissionCompartment?.name || ""}
      />
    </div>
  );
};

export default ManageEmissionCompartmentPage;