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
import Pagination from "@/components/pagination/Pagination";
import UpdateUnitModal from "@/forms/manage-unit-form/UpdateUnitModal";

export default function ManageUnitPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));
  const [pageSize, setPageSize] = useState(
    parseInt(searchParams.get("pageSize") || "10")
  );
  const [unitGroupId, setUnitGroupId] = useState(
    parseInt(searchParams.get("unitGroupId") || "0")
  );
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedUnitId, setSelectedUnitId] = useState<number | null>(null);

  const { data: unitGroups, isLoading: isLoadingUnitGroups } = useUnitGroups();
  const {
    data: unitsData,
    isLoading: isLoadingUnits,
    error,
    refetch,
  } = useUnits(page, pageSize, unitGroupId);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("pageSize", pageSize.toString());
    params.set("unitGroupId", unitGroupId.toString());
    if (searchTerm) params.set("search", searchTerm);
    navigate(`?${params.toString()}`, { replace: true });
  }, [page, pageSize, unitGroupId, searchTerm, navigate]);

  const filteredUnits = unitsData?.data.listResult
    ? unitsData.data.listResult.filter(
        (unit) =>
          unit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          unit.unitGroup.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  const handleEdit = (id: number) => {
    setSelectedUnitId(id);
    setIsUpdateModalOpen(true);
  };

  const handleDelete = (id: number) => {
    console.log(`Delete unit with id: ${id}`);
    // Implement delete functionality here
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const handleUpdateUnit = async (updatedUnit: Unit) => {
    // Implement the API call to update the unit here
    console.log('Updating unit:', updatedUnit);
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
          value={unitGroupId.toString()}
          onValueChange={(value) => setUnitGroupId(Number(value))}
        >
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Select Unit Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">All Unit Groups</SelectItem>
            {unitGroups?.map((group: UnitGroup) => (
              <SelectItem key={group.id} value={group.id.toString()}>
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
        <div>
          <ScrollArea className="h-[calc(100vh-250px)]">
            <UnitTable
              units={filteredUnits}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </ScrollArea>
          <Pagination
            page={page}
            pageSize={pageSize}
            totalPages={unitsData?.data.totalPage || 1}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
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
}