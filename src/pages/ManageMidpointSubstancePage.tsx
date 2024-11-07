import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, ImportIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate, useLocation } from "react-router-dom";
import MidpointSubstanceTable from "@/components/manageMidpointSubstance/MidpointSubstanceTable";
import { useMidpointSubstances } from "@/api/manageMidpointSubstance";
import Pagination from "@/components/pagination/Pagination";
import { useEmissionCompartments } from "@/api/manageEmissionCompartment";
import CompartmentSelect from "@/components/manageMidpointSubstance/CompartmentSelect";


const ManageMidpointSubstancePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));
  const [pageSize, setPageSize] = useState(
    parseInt(searchParams.get("pageSize") || "10")
  );
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [compartmentId, setCompartmentId] = useState(
    searchParams.get("compartmentId") || "all"
  );

  const {
    data: midpointSubstancesData,
    isLoading: isLoadingSubstances,
    error: substancesError,
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

  const error = substancesError || compartmentsError;

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Midpoint Substances Management</h1>
        <Button>
          <ImportIcon className="mr-2 h-4 w-4" /> Import Midpoint Substance
        </Button>
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
              isLoading={isLoadingSubstances || isLoadingCompartments}
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
    </div>
  );
};

export default ManageMidpointSubstancePage;