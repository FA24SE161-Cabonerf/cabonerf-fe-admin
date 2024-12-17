import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Plus, Search } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate, useLocation } from "react-router-dom";
import MidpointSubstanceTable from "@/components/manageMidpointSubstance/MidpointSubstanceTable";
import {
  useMidpointSubstances,
  useCreateMidpointSubstance,
  useDeleteMidpointSubstance,
  useDownloadMidpointFactorTemplate,
  useExportMidpointFactors,
  useImportMidpointFactors,
  useDownloadErrorLog,
} from "@/api/manageMidpointSubstance";
import Pagination from "@/components/pagination/Pagination";
import { useEmissionCompartments } from "@/api/manageEmissionCompartment";
import CompartmentSelect from "@/components/manageMidpointSubstance/CompartmentSelect";
import { useToast } from "@/hooks/use-toast";
import {
  useImpactMethodNames,
  useImpactMethods,
} from "@/api/manageImpactMethod";
import { useImpactCategories } from "@/api/manageImpactCategory";
import AddMidpointSubstanceModal from "@/forms/manage-midpoint-substance/AddMidpointSubstanceModal";
import DeleteMidpointSubstanceModal from "@/forms/manage-midpoint-substance/DeleteMidpointSubstanceModal";
import { MidpointSubstance } from "@/types/midpointSubstance";
import { useUnits } from "@/api/manageUnit";
import ImportDownloadDropdown from "@/components/manageMidpointSubstance/ImportDownloadDropdown";
import ExportModal from "@/forms/manage-midpoint-substance/ExportModal";
import ImportMethodModal from "@/forms/manage-midpoint-substance/ImportMethodModal";
import ErrorLogModal from "@/forms/manage-midpoint-substance/ErrorLogModal";
import { ImportSuccessModal } from "@/components/manageMidpointSubstance/ImportSuccessModal";

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
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isImportSuccessModalOpen, setIsImportSuccessModalOpen] = useState(false)
  const [importedData, setImportedData] = useState<MidpointSubstance[]>([])
  const [isErrorLogModalOpen, setIsErrorLogModalOpen] = useState(false);
  const [errorLogFile, setErrorLogFile] = useState<string | null>(null);
  const [selectedSubstance, setSelectedSubstance] =
    useState<MidpointSubstance | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const {
    data: midpointSubstancesData,
    isLoading,
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

  const { data: impactMethods } = useImpactMethods();
  const { data: impactCategories } = useImpactCategories();
  const { data: units } = useUnits();

  const { refetch: downloadTemplate, isLoading: isDownloading } =
    useDownloadMidpointFactorTemplate();
  const exportMidpointFactorsMutation = useExportMidpointFactors();
  const createMidpointSubstanceMutation = useCreateMidpointSubstance();
  const deleteMidpointSubstanceMutation = useDeleteMidpointSubstance();
  const { data: impactMethodNames } = useImpactMethodNames();
  const importMidpointFactorsMutation = useImportMidpointFactors();
  const downloadErrorLogMutation = useDownloadErrorLog();
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
  const handleDownloadTemplate = async () => {
    const result = await downloadTemplate();
    if (result.data) {
      const url = window.URL.createObjectURL(result.data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "midpoint-factor-template.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    }
  };

  const handleExport = async (
    methodId: string,
    categoryId: string,
    methodName: string
  ) => {
    try {
      const result = await exportMidpointFactorsMutation.mutateAsync({
        methodId,
        impactCategoryId: categoryId,
      });
      const url = window.URL.createObjectURL(result);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${methodName}.xlsx`);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
      toast({
        title: "Success",
        description: "Midpoint factors exported successfully",
        variant: "default",
      });
    } catch (error) {
      console.error("Export failed:", error);
      toast({
        title: "Error",
        description: "Failed to export midpoint factors",
        variant: "destructive",
      });
    }
  };

  const handleImport = () => {
    setIsImportModalOpen(true);
  };
  const handleImportConfirm = async (methodName: string, file: File) => {
    try {
      const result = await importMidpointFactorsMutation.mutateAsync({
        methodName,
        file,
      });
      if (result.importData.length > 0) {
        setImportedData(result.importData)
        setIsImportSuccessModalOpen(true)
        toast({
          title: "Success",
          description: `Successfully imported ${result.importData.length} midpoint substances`,
          variant: "default",
        });
        refetch();
      } else if (result.filePath) {
        setErrorLogFile(result.filePath);
        setIsErrorLogModalOpen(true);
      } else {
        toast({
          title: "Warning",
          description: "No data was imported and no error log was generated.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Import Error",
        description:
          error instanceof Error
            ? error.message
            : "An unknown error occurred during import",
        variant: "destructive",
      });
    } finally {
      setIsImportModalOpen(false);
    }
  };

  const handleDownloadErrorLog = async () => {
    if (errorLogFile) {
      try {
        const result = await downloadErrorLogMutation.mutateAsync(errorLogFile);
        const url = window.URL.createObjectURL(result);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", errorLogFile);
        document.body.appendChild(link);
        link.click();
        link.parentNode?.removeChild(link);
      } catch (error) {
        console.error("Error downloading error log:", error);
        toast({
          title: "Error",
          description: "Failed to download error log",
          variant: "destructive",
        });
      } finally {
        setIsErrorLogModalOpen(false);
      }
    }
  };

  const error = substancesError || compartmentsError;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Midpoint Substances Management</h1>
        <div className="space-x-2">
          <Button onClick={() => setIsAddModalOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Midpoint Substance
          </Button>
          <ImportDownloadDropdown
            onImport={handleImport}
            onDownload={handleDownloadTemplate}
            isDownloading={isDownloading}
          />
        </div>
      </div>
      <div className="flex justify-between items-center mb-4 relative">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Search substances..."
          value={keyword}
          onChange={handleKeywordChange}
          className="max-w-sm mr-2 pl-8"
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
              onExport={() => setIsExportModalOpen(true)}
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
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
        impactMethods={impactMethods || []}
        impactCategories={impactCategories || []}
      />
    <ImportMethodModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={handleImportConfirm}
        impactMethodNames={impactMethodNames || []}
        isImporting={importMidpointFactorsMutation.isPending}
      />
      <ErrorLogModal
        isOpen={isErrorLogModalOpen}
        onClose={() => setIsErrorLogModalOpen(false)}
        onDownload={handleDownloadErrorLog}
        fileName={errorLogFile || ""}
      />
        <ImportSuccessModal
        isOpen={isImportSuccessModalOpen}
        onClose={() => setIsImportSuccessModalOpen(false)}
        importedData={importedData}
      />
    </div>
  );
};

export default ManageMidpointSubstancePage;
