import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Plus } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useOrganizations } from "@/api/manageOrganization";
import OrganizationTable from "@/components/manageOrganization/OrganizationTable";
import Pagination from "@/components/pagination/Pagination";

const ManageOrganizationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const { data: organizationResponse, isLoading, error } = useOrganizations(page, pageSize, searchTerm);

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
    setPage(1); // Reset to first page when search term changes
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1); // Reset to first page when page size changes
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Organizations Management</h1>
        <Button onClick={() => console.log("Add new organization")}>
          <Plus className="mr-2 h-4 w-4" /> Add New Organization
        </Button>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Search organizations..."
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
          <OrganizationTable
            organizations={organizationResponse?.list}
            onEdit={(id) => console.log(`Edit organization with id: ${id}`)}
            onDelete={(id) => console.log(`Delete organization with id: ${id}`)}
            isLoading={isLoading}
          />
        </ScrollArea>
      )}
      {organizationResponse && (
        <Pagination
          page={page}
          pageSize={pageSize}
          totalPages={organizationResponse.totalPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
};

export default ManageOrganizationPage;