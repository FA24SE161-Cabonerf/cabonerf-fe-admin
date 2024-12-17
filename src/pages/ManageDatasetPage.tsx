import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Search } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useDatasets } from "@/api/manageDataset";
import Pagination from "@/components/pagination/Pagination";
import DatasetTable from "@/components/manageDataset/DatasetTable";
import { Dataset } from "@/types/dataset";
import DatasetDetailModal from "@/components/manageDataset/DatasetDetailModal";

const ManageDatasetPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedDataset, setSelectedDataset] = useState<Dataset | null>(null);

  const {
    data: datasetResponse,
    isLoading,
    error,
  } = useDatasets(page, pageSize, searchTerm);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
    params.set("page", page.toString());
    params.set("pageSize", pageSize.toString());
    navigate(`?${params.toString()}`, { replace: true });
  }, [searchTerm, page, pageSize, navigate, location.search]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1); 
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1);
  };

  const handleViewDetails = (dataset: Dataset) => {
    setSelectedDataset(dataset);
    setIsDetailModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Datasets Management</h1>
      </div>
      <div className="mb-4 relative">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Search datasets..."
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
              : "An unknown error occurred"}
          </AlertDescription>
        </Alert>
      ) : (
        <ScrollArea className="h-[calc(100vh-200px)]">
          <DatasetTable
            datasets={datasetResponse?.data}
            isLoading={isLoading}
            onViewDetails={handleViewDetails}
          />
        </ScrollArea>
      )}
      {datasetResponse && (
        <Pagination
          page={page}
          pageSize={pageSize}
          totalPages={datasetResponse.totalPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
      <DatasetDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        dataset={selectedDataset}
      />
    </div>
  );
};

export default ManageDatasetPage;