import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertCircle, Plus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate, useLocation } from "react-router-dom";
import UnitTable from "@/components/manageUnit/UnitTable";
import { UnitGroup } from "@/types/unitGroup";
import { Unit } from "@/types/unit";
import { useUnitGroups } from "@/api/manageUnitGroup";
import { useUnits } from "@/api/manageUnit";
import SkeletonTable from "@/components/sketeton/SkeletonTable";
import UpdateUnitModal from "@/forms/manage-unit-form/UpdateUnitModal";

const ManageUnitPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const [unitGroupId, setUnitGroupId] = useState(
    searchParams.get("unitGroupId") || "all"
  );
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUnitId, setSelectedUnitId] = useState<string | null>(null);

  const { data: unitGroups, isLoading: isLoadingUnitGroups } = useUnitGroups();
  const {
    data: units,
    isLoading: isLoadingUnits,
    error,
    refetch,
  } = useUnits(unitGroupId === "all" ? "" : unitGroupId);

  useEffect(() => {
    const params = new URLSearchParams();
    if (unitGroupId !== "all") params.set("unitGroupId", unitGroupId);
    if (searchTerm) params.set("search", searchTerm);
    navigate(`?${params.toString()}`, { replace: true });
  }, [unitGroupId, searchTerm, navigate]);

  const filteredUnits = units
    ? units.filter(
        (unit) =>
          unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          unit.unitGroup.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleEdit = (id: string) => {
    setSelectedUnitId(id);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = (id: string) => {
    console.log(`Delete unit with id: ${id}`);
    // Implement delete functionality here
  };

  const handleUpdateUnit = async (updatedUnit: Unit) => {
    // Implement the API call to update the unit here
    console.log("Updating unit:", updatedUnit);
    // After successful update, refetch the units data
    await refetch();
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Units Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Unit
        </Button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search units..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select
          value={unitGroupId}
          onValueChange={(value) => setUnitGroupId(value)}
        >
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
      {isLoadingUnits || isLoadingUnitGroups ? (
        <SkeletonTable />
      ) : error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error instanceof Error
              ? error.message
              : "An unknown error occurred"}
          </AlertDescription>
        </Alert>
      ) : (
        <ScrollArea className="h-[calc(100vh-250px)]">
          <UnitTable
            units={filteredUnits}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </ScrollArea>
      )}
      {selectedUnitId && (
        <UpdateUnitModal
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          unitId={selectedUnitId}
          onUpdateUnit={handleUpdateUnit}
        />
      )}
    </div>
  );
};

export default ManageUnitPage;
