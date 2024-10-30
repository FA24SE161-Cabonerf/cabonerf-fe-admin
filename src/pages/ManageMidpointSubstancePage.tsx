import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, ImportIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate, useLocation } from "react-router-dom";
import MidpointSubstanceTable from "@/components/manageMidpointSubstance/MidpointSubstanceTable";
import { useMidpointSubstances } from "@/api/manageMidpointSubstance";
import SkeletonTable from "@/components/sketeton/SkeletonTable";
import Pagination from "@/components/pagination/Pagination";

const ManageMidpointSubstancePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));
  const [pageSize, setPageSize] = useState(
    parseInt(searchParams.get("pageSize") || "10")
  );
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );

  const {
    data: midpointSubstancesData,
    isLoading,
    error,
  } = useMidpointSubstances(page, pageSize);

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("pageSize", pageSize.toString());
    if (searchTerm) params.set("search", searchTerm);
    navigate(`?${params.toString()}`, { replace: true });
  }, [page, pageSize, searchTerm, navigate]);

  const filteredSubstances =
    midpointSubstancesData?.listResult.filter(
      (substance) =>
        substance.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        substance.casNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        substance.compartmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        substance.molecularFormula.toLowerCase().includes(searchTerm.toLowerCase()) 
    ) || [];

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1); // Reset to first page when changing page size
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Midpoint Substances Management</h1>
        <Button>
          <ImportIcon className="mr-2 h-4 w-4" /> Import midpoint Substance
        </Button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search substances..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      {isLoading ? (
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
            <MidpointSubstanceTable substances={filteredSubstances} />
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
    </div>
  );
};

export default ManageMidpointSubstancePage;