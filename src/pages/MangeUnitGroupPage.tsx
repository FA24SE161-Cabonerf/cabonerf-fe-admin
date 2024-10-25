import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Plus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  useUnitGroups,
  useCreateUnitGroup,
  useUpdateUnitGroup,
  useDeleteUnitGroup,
} from "@/api/manageUnitGroup";
import UnitGroupTable from "@/components/manageUnitGroup/UnitGroupTable";
import SkeletonTable from "@/components/sketeton/SkeletonTable";
import AddUnitGroupModal from "@/forms/manage-unit-group-form/AddUnitGroupModal";
import UpdateUnitGroupModal from "@/forms/manage-unit-group-form/UpdateUnitGroupModal";
import { UnitGroup } from "@/types/unitGroup";

import DeleteUnitGroupModal from "@/forms/manage-unit-group-form/DeleteUniGroupModal";
import { useToast } from "@/hooks/use-toast";

const ManageUnitGroupPage = () => {
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
  const [selectedUnitGroup, setSelectedUnitGroup] = useState<UnitGroup | null>(
    null
  );
  const [addError, setAddError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const { data: unitGroups, isLoading, error, refetch } = useUnitGroups();
  const createUnitGroupMutation = useCreateUnitGroup();
  const updateUnitGroupMutation = useUpdateUnitGroup();
  const deleteUnitGroupMutation = useDeleteUnitGroup();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
    navigate(`?${params.toString()}`, { replace: true });
  }, [searchTerm, navigate, location.search]);

  const filteredUnitGroups = unitGroups
    ? unitGroups.filter(
        (unitGroup) =>
          unitGroup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          unitGroup.unitGroupType
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddUnitGroup = async (data: {
    unitGroupName: string;
    unitGroupType: string;
  }) => {
    try {
      await createUnitGroupMutation.mutateAsync(data);
      refetch();
      setIsAddModalOpen(false);
      setAddError(null);
      toast({
        title: "Success",
        description: "Unit group created successfully",
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

  const handleUpdateUnitGroup = async (
    id: number,
    data: { unitGroupName: string; unitGroupType: string }
  ) => {
    try {
      await updateUnitGroupMutation.mutateAsync({ id, ...data });
      refetch();
      setIsUpdateModalOpen(false);
      setUpdateError(null);
      toast({
        title: "Success",
        description: "Unit group updated successfully",
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

  const handleDeleteUnitGroup = async (id: number) => {
    try {
      await deleteUnitGroupMutation.mutateAsync(id);
      refetch();
      setIsDeleteModalOpen(false);
      setSelectedUnitGroup(null);
      setDeleteError(null);
      toast({
        title: "Success",
        description: "Unit group deleted successfully",
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

  const handleEdit = (id: number) => {
    const unitGroup = unitGroups?.find((ug) => ug.id === id);
    if (unitGroup) {
      setSelectedUnitGroup(unitGroup);
      setIsUpdateModalOpen(true);
    }
  };

  const handleDelete = (id: number) => {
    const unitGroup = unitGroups?.find((ug) => ug.id === id);
    if (unitGroup) {
      setSelectedUnitGroup(unitGroup);
      setIsDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedUnitGroup) {
      handleDeleteUnitGroup(selectedUnitGroup.id);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Unit Groups Management</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Unit Group
        </Button>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Search unit groups..."
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
            {error.status === 404
              ? "Unit groups not found."
              : error.status >= 500
              ? "Server error. Please try again later."
              : error.message}
          </AlertDescription>
        </Alert>
      ) : (
        <ScrollArea className="h-[calc(100vh-200px)]">
          <UnitGroupTable
            unitGroups={filteredUnitGroups}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </ScrollArea>
      )}
      <AddUnitGroupModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddUnitGroup}
        isSubmitting={createUnitGroupMutation.isPending}
        error={addError}
      />
      <UpdateUnitGroupModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedUnitGroup(null);
        }}
        onSubmit={handleUpdateUnitGroup}
        isSubmitting={updateUnitGroupMutation.isPending}
        error={updateError}
        unitGroup={selectedUnitGroup}
      />
      <DeleteUnitGroupModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedUnitGroup(null);
        }}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteUnitGroupMutation.isPending}
        error={deleteError}
        unitGroupName={selectedUnitGroup?.name || ""}
      />
    </div>
  );
};

export default ManageUnitGroupPage;
