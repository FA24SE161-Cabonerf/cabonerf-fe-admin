import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Plus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  useLifeCycleStages,
  useCreateLifeCycleStage,
  useUpdateLifeCycleStage,
  useDeleteLifeCycleStage,
} from "@/api/manageLifeCycleStage";
import LifeCycleStagesTable from "@/components/manageLifeCycleStage/LifeCycleStageTable";
import AddLifeCycleStageModal from "@/forms/manage-life-cycle-stage-form/AddLifeCycleStageModal";
import UpdateLifeCycleStageModal from "@/forms/manage-life-cycle-stage-form/UpdateLifeCycleStageModal";
import DeleteLifeCycleStageModal from "@/forms/manage-life-cycle-stage-form/DeleteLifeCycleStageModal";
import { LifeCycleStage } from "@/types/lifeCycleStage";
import { useToast } from "@/hooks/use-toast";

const ManageLifeCycleStagePage = () => {
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
  const [selectedLifeCycleStage, setSelectedLifeCycleStage] = useState<LifeCycleStage | null>(
    null
  );
  const [addError, setAddError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const { data: lifeCycleStages, isLoading, error, refetch } = useLifeCycleStages();
  const createLifeCycleStageMutation = useCreateLifeCycleStage();
  const updateLifeCycleStageMutation = useUpdateLifeCycleStage();
  const deleteLifeCycleStageMutation = useDeleteLifeCycleStage();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
    navigate(`?${params.toString()}`, { replace: true });
  }, [searchTerm, navigate, location.search]);

  const filteredLifeCycleStages = lifeCycleStages
    ? lifeCycleStages.filter(
        (stage) =>
          stage.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          stage.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddLifeCycleStage = async (data: {
    name: string;
    description: string;
    iconUrl: string;
  }) => {
    try {
      await createLifeCycleStageMutation.mutateAsync(data);
      refetch();
      setIsAddModalOpen(false);
      setAddError(null);
      toast({
        title: "Success",
        description: "Life cycle stage created successfully",
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

  const handleUpdateLifeCycleStage = async (
    id: string,
    data: { name: string; description: string; iconUrl: string }
  ) => {
    try {
      await updateLifeCycleStageMutation.mutateAsync({ id, ...data });
      refetch();
      setIsUpdateModalOpen(false);
      setUpdateError(null);
      toast({
        title: "Success",
        description: "Life cycle stage updated successfully",
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

  const handleDeleteLifeCycleStage = async (id: string) => {
    try {
      await deleteLifeCycleStageMutation.mutateAsync(id);
      refetch();
      setIsDeleteModalOpen(false);
      setSelectedLifeCycleStage(null);
      setDeleteError(null);
      toast({
        title: "Success",
        description: "Life cycle stage deleted successfully",
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
    const lifeCycleStage = lifeCycleStages?.find((lcs) => lcs.id === id);
    if (lifeCycleStage) {
      setSelectedLifeCycleStage(lifeCycleStage);
      setIsUpdateModalOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    const lifeCycleStage = lifeCycleStages?.find((lcs) => lcs.id === id);
    if (lifeCycleStage) {
      setSelectedLifeCycleStage(lifeCycleStage);
      setIsDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedLifeCycleStage) {
      handleDeleteLifeCycleStage(selectedLifeCycleStage.id);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Life Cycle Stages Management</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Stage
        </Button>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Search life cycle stages..."
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
            {error instanceof Error ? error.message : "An unknown error occurred"}
          </AlertDescription>
        </Alert>
      ) : (
        <ScrollArea className="h-[calc(100vh-200px)]">
          <LifeCycleStagesTable
            stages={filteredLifeCycleStages}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        </ScrollArea>
      )}
      <AddLifeCycleStageModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddLifeCycleStage}
        isSubmitting={createLifeCycleStageMutation.isPending}
        error={addError}
      />
      <UpdateLifeCycleStageModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedLifeCycleStage(null);
        }}
        onSubmit={handleUpdateLifeCycleStage}
        isSubmitting={updateLifeCycleStageMutation.isPending}
        error={updateError}
        lifeCycleStage={selectedLifeCycleStage}
      />
      <DeleteLifeCycleStageModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedLifeCycleStage(null);
        }}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteLifeCycleStageMutation.isPending}
        error={deleteError}
        lifeCycleStageName={selectedLifeCycleStage?.name || ""}
      />
    </div>
  );
};

export default ManageLifeCycleStagePage;