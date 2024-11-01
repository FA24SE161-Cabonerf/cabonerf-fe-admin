import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Plus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useUnits,
  useUnitsByUnitGroup,
  useCreateUnit,
  useUpdateUnit,
  useDeleteUnit,
} from "@/api/manageUnit";
import { useUnitGroups } from "@/api/manageUnitGroup";
import UnitTable from "@/components/manageUnit/UnitTable";

import { Unit } from "@/types/unit";
import { UnitGroup } from "@/types/unitGroup";
import { useToast } from "@/hooks/use-toast";
import SkeletonTable from "@/components/sketeton/SkeletonTable";
import AddUnitModal from "@/forms/manage-unit-form/AddUnitModal";
import UpdateUnitModal from "@/forms/manage-unit-form/UpdateUnitModal";
import DeleteUnitModal from "@/forms/manage-unit-form/DeleteUnitModal ";

const ManageUnitPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const searchParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [unitGroupId, setUnitGroupId] = useState(
    searchParams.get("unitGroupId") || "all"
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<Unit | null>(null);
  const [addError, setAddError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const { data: allUnits, isLoading: isLoadingAllUnits, error: allUnitsError, refetch: refetchAllUnits } = useUnits();
  const { 
    data: unitsByGroup, 
    isLoading: isLoadingUnitsByGroup, 
    error: unitsByGroupError,
    refetch: refetchUnitsByGroup
  } = useUnitsByUnitGroup(unitGroupId !== "all" ? unitGroupId : "");
  const { data: unitGroups, isLoading: isLoadingUnitGroups } = useUnitGroups();
  const createUnitMutation = useCreateUnit();
  const updateUnitMutation = useUpdateUnit();
  const deleteUnitMutation = useDeleteUnit();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (searchTerm) params.set("search", searchTerm);
    else params.delete("search");
    if (unitGroupId !== "all") params.set("unitGroupId", unitGroupId);
    else params.delete("unitGroupId");
    navigate(`?${params.toString()}`, { replace: true });
  }, [searchTerm, unitGroupId, navigate, location.search]);

  const units = unitGroupId === "all" ? allUnits : unitsByGroup;
  const isLoading = unitGroupId === "all" ? isLoadingAllUnits : isLoadingUnitsByGroup;
  const error = unitGroupId === "all" ? allUnitsError : unitsByGroupError;

  const filteredUnits = units
    ? units.filter(
        (unit) =>
          unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          unit.unitGroup.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleUnitGroupChange = (value: string) => {
    setUnitGroupId(value);
  };

  const handleAddUnit = async (data: {
    unitName: string;
    conversionFactor: number;
    isDefault: boolean;
    unitGroupId: string;
  }) => {
    try {
      console.log("Submitting unit data:", data);
      const result = await createUnitMutation.mutateAsync(data);
      console.log("Create unit result:", result);
      await refetchUnits();
      setIsAddModalOpen(false);
      setAddError(null);
      toast({
        title: "Success",
        description: "Unit created successfully",
        variant: "default",
      });
    } catch (error) {
      console.error("Error in handleAddUnit:", error);
      if (error instanceof Error) {
        setAddError(error.message);
      } else {
        setAddError("An unknown error occurred");
      }
    }
  };

  const handleUpdateUnit = async (
    id: string,
    data: {
      unitName: string;
      conversionFactor: number;
      isDefault: boolean;
      unitGroupId: string;
    }
  ) => {
    try {
      await updateUnitMutation.mutateAsync({ id, ...data });
      await refetchUnits();
      setIsUpdateModalOpen(false);
      setUpdateError(null);
      toast({
        title: "Success",
        description: "Unit updated successfully",
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

  const handleDeleteUnit = async (id: string) => {
    try {
      await deleteUnitMutation.mutateAsync(id);
      await refetchUnits();
      setIsDeleteModalOpen(false);
      setSelectedUnit(null);
      setDeleteError(null);
      toast({
        title: "Success",
        description: "Unit deleted successfully",
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
    const unit = units?.find((u) => u.id === id);
    if (unit) {
      setSelectedUnit(unit);
      setIsUpdateModalOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    const unit = units?.find((u) => u.id === id);
    if (unit) {
      setSelectedUnit(unit);
      setIsDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedUnit) {
      handleDeleteUnit(selectedUnit.id);
    }
  };

  const refetchUnits = async () => {
    if (unitGroupId === "all") {
      await refetchAllUnits();
    } else {
      await refetchUnitsByGroup();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Units Management</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Unit
        </Button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search units..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="max-w-sm"
        />
        <Select value={unitGroupId} onValueChange={handleUnitGroupChange}>
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Select Unit Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Unit Groups</SelectItem>
            {unitGroups?.map((group: UnitGroup) => (
              <SelectItem key={group.id} value={group.id}>
                {group.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {isLoading || isLoadingUnitGroups ? (
        <SkeletonTable />
      ) : error ? (
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
          <UnitTable
            units={filteredUnits}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </ScrollArea>
      )}
      <AddUnitModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddUnit}
        isSubmitting={createUnitMutation.isPending}
        error={addError}
        unitGroups={unitGroups || []}
      />
      <UpdateUnitModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedUnit(null);
        }}
        onSubmit={handleUpdateUnit}
        isSubmitting={updateUnitMutation.isPending}
        error={updateError}
        unit={selectedUnit}
        unitGroups={unitGroups || []}
      />
      <DeleteUnitModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedUnit(null);
        }}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteUnitMutation.isPending}
        error={deleteError}
        unitName={selectedUnit?.name || ""}
      />
    </div>
  );
};

export default ManageUnitPage;