import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, ImportIcon, Plus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate, useLocation } from "react-router-dom";
import MidpointSubstanceTable from "@/components/manageMidpointSubstance/MidpointSubstanceTable";
import {
  useMidpointSubstances,
  useCreateMidpointSubstance,
  useDeleteMidpointSubstance,
} from "@/api/manageMidpointSubstance";
import Pagination from "@/components/pagination/Pagination";
import { useEmissionCompartments } from "@/api/manageEmissionCompartment";
import CompartmentSelect from "@/components/manageMidpointSubstance/CompartmentSelect";
import { useToast } from "@/hooks/use-toast";
import { useImpactMethods } from "@/api/manageImpactMethod";
import { useImpactCategories } from "@/api/manageImpactCategory";
import AddMidpointSubstanceModal from "@/forms/manage-midpoint-substance/AddMidpointSubstanceModal";
import DeleteMidpointSubstanceModal from "@/forms/manage-midpoint-substance/DeleteMidpointSubstanceModal";
import { MidpointSubstance } from "@/types/midpointSubstance";
import { useUnits } from "@/api/manageUnit";

const ManageMidpointSubstancePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const searchParams = new URLSearchParams(location.search);

  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));
  const [pageSize, setPageSize] = useState(
    parseInt(searchParams.get("pageSize") || "10")
  );
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [compartmentId, setCompartmentId] = useState(
    searchParams.get("compartmentId") || "all"
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [addError, setAddError] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedSubstance, setSelectedSubstance] =
    useState<MidpointSubstance | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const {
    data: midpointSubstancesData,
    isLoading: isLoadingSubstances,
    error: substancesError,
    refetch,
  } = useMidpointSubstances(
    page,
    pageSize,
    compartmentId === "all" ? undefined : compartmentId,
    keyword
  );

  const {
    data: emissionCompartments,
    isLoading: isLoadingCompartments,
    error: compartmentsError,
  } = useEmissionCompartments();

  const { data: impactMethods, isLoading: isLoadingMethods } =
    useImpactMethods();
  const { data: impactCategories, isLoading: isLoadingCategories } =
    useImpactCategories();
    const { data: units, isLoading: isLoadingUnits } = useUnits();

  const createMidpointSubstanceMutation = useCreateMidpointSubstance();
  const deleteMidpointSubstanceMutation = useDeleteMidpointSubstance();

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("pageSize", pageSize.toString());
    if (keyword) params.set("keyword", keyword);
    if (compartmentId !== "all") params.set("compartmentId", compartmentId);
    navigate(`?${params.toString()}`, { replace: true });
  }, [page, pageSize, keyword, compartmentId, navigate]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    setPage(1);
  };

  const handleCompartmentChange = (value: string) => {
    setCompartmentId(value);
    setPage(1);
  };


  const handleDelete = (id: string) => {
    const substance = midpointSubstancesData?.listResult.find(
      (s) => s.id === id
    );
    if (substance) {
      setSelectedSubstance(substance);
      setIsDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedSubstance) {
      try {
        await deleteMidpointSubstanceMutation.mutateAsync(selectedSubstance.id);
        setIsDeleteModalOpen(false);
        setSelectedSubstance(null);
        setDeleteError(null);
        toast({
          title: "Success",
          description: "Midpoint substance deleted successfully",
          variant: "default",
        });
        refetch();
      } catch (error) {
        if (error instanceof Error) {
          setDeleteError(error.message);
        } else {
          setDeleteError("An unknown error occurred");
        }
      }
    }
  };

  const handleAddMidpointSubstance = async (data: {
    name: string;
    chemicalName?: string | null;
    molecularFormula?: string | null;
    alternativeFormula?: string | null;
    cas?: string | null;
    value: number;
    emissionCompartmentId: string;
    methodId: string;
    categoryId: string;
    unitId: string;
  }) => {
    try {
      await createMidpointSubstanceMutation.mutateAsync(data);
      setIsAddModalOpen(false);
      setAddError(null);
      toast({
        title: "Success",
        description: "Midpoint substance created successfully",
        variant: "default",
      });
      refetch();
    } catch (error) {
      if (error instanceof Error) {
        setAddError(error.message);
      } else {
        setAddError("An unknown error occurred");
      }
    }
  };

  const error = substancesError || compartmentsError;

  const isLoading =
    isLoadingSubstances ||
    isLoadingCompartments ||
    isLoadingMethods ||
    isLoadingCategories ||
    isLoadingUnits;;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Midpoint Substances Management</h1>
        <div className="space-x-2">
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Midpoint Substance
          </Button>
          <Button>
            <ImportIcon className="mr-2 h-4 w-4" /> Import Midpoint Substance
          </Button>
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search substances..."
          value={keyword}
          onChange={handleKeywordChange}
          className="max-w-sm mr-2"
        />
        <CompartmentSelect
          value={compartmentId}
          onChange={handleCompartmentChange}
          emissionCompartments={emissionCompartments}
          isLoading={isLoadingCompartments}
        />
      </div>
      {error ? (
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
            <MidpointSubstanceTable
              substances={midpointSubstancesData?.listResult || []}
              isLoading={isLoading}
              onDelete={handleDelete}
            />
          </ScrollArea>
          <Pagination
            page={page}
            pageSize={pageSize}
            totalPages={midpointSubstancesData?.totalPage || 1}
            onPageChange={handlePageChange}
            onPageSizeChange={handlePageSizeChange}
          />
        </div>
      )}
      <AddMidpointSubstanceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddMidpointSubstance}
        isSubmitting={createMidpointSubstanceMutation.isPending}
        error={addError}
        emissionCompartments={emissionCompartments || []}
        impactMethods={impactMethods || []}
        impactCategories={impactCategories || []}
        units={units || []}
      />
      <DeleteMidpointSubstanceModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedSubstance(null);
        }}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteMidpointSubstanceMutation.isPending}
        error={deleteError}
        substanceName={selectedSubstance?.name || ""}
      />
    </div>
  );
};

export default ManageMidpointSubstancePage;
