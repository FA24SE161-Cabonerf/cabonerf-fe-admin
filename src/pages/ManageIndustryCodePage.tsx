import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Plus, Search } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Pagination from "@/components/pagination/Pagination";
import AddIndustryCodeModal from "@/forms/manage-industry-code/AddIndustryCodeModal";
import UpdateIndustryCodeModal from "@/forms/manage-industry-code/UpdateIndustryCodeModal";
import DeleteIndustryCodeModal from "@/forms/manage-industry-code/DeleteIndustryCodeModal";
import { useToast } from "@/hooks/use-toast";
import { IndustryCode } from "@/types/industryCode";
import IndustryCodeTable from "@/components/manageIndustryCode/IndustryCodeTable";
import { useCreateIndustryCode, useDeleteIndustryCode, useIndustryCodes, useUpdateIndustryCode } from "@/api/manageIndustryCode";

const ManageIndustryCodePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  const searchParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedIndustryCode, setSelectedIndustryCode] =
    useState<IndustryCode | null>(null);
  const [addError, setAddError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const {
    data: industryCodeResponse,
    isLoading,
    error,
    refetch,
  } = useIndustryCodes(page, pageSize, searchTerm);
  const createIndustryCodeMutation = useCreateIndustryCode();
  const updateIndustryCodeMutation = useUpdateIndustryCode();
  const deleteIndustryCodeMutation = useDeleteIndustryCode();

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

  const handleAddIndustryCode = async (data: { code: string; name: string }) => {
    try {
      await createIndustryCodeMutation.mutateAsync(data);
      refetch();
      setIsAddModalOpen(false);
      setAddError(null);
      toast({
        title: "Success",
        description: "Industry code created successfully",
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

  const handleUpdateIndustryCode = async (
    id: string,
    data: { code: string; name: string }
  ) => {
    try {
      await updateIndustryCodeMutation.mutateAsync({ id, ...data });
      refetch();
      setIsUpdateModalOpen(false);
      setUpdateError(null);
      toast({
        title: "Success",
        description: "Industry code updated successfully",
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

  const handleDeleteIndustryCode = async (id: string) => {
    try {
      await deleteIndustryCodeMutation.mutateAsync(id);
      refetch();
      setIsDeleteModalOpen(false);
      setSelectedIndustryCode(null);
      setDeleteError(null);
      toast({
        title: "Success",
        description: "Industry code deleted successfully",
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
    const industryCode = industryCodeResponse?.industryCodes.find(
      (code) => code.id === id
    );
    if (industryCode) {
      setSelectedIndustryCode(industryCode);
      setIsUpdateModalOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    const industryCode = industryCodeResponse?.industryCodes.find(
      (code) => code.id === id
    );
    if (industryCode) {
      setSelectedIndustryCode(industryCode);
      setIsDeleteModalOpen(true);
    }
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setPage(1); 
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Industry Codes Management</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Industry Code
        </Button>
      </div>
      <div className="mb-4 relative">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          placeholder="Search industry codes..."
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
          <IndustryCodeTable
            industryCodes={industryCodeResponse?.industryCodes}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        </ScrollArea>
      )}
      {industryCodeResponse && (
        <Pagination
          page={page}
          pageSize={pageSize}
          totalPages={industryCodeResponse.totalPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
      <AddIndustryCodeModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddIndustryCode}
        isSubmitting={createIndustryCodeMutation.isPending}
        error={addError}
      />
      <UpdateIndustryCodeModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedIndustryCode(null);
        }}
        onSubmit={handleUpdateIndustryCode}
        isSubmitting={updateIndustryCodeMutation.isPending}
        error={updateError}
        industryCode={selectedIndustryCode}
      />
      <DeleteIndustryCodeModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedIndustryCode(null);
        }}
        onConfirm={() =>
          selectedIndustryCode &&
          handleDeleteIndustryCode(selectedIndustryCode.id)
        }
        isDeleting={deleteIndustryCodeMutation.isPending}
        error={deleteError}
        industryCodeName={selectedIndustryCode?.name || ""}
      />
    </div>
  );
};

export default ManageIndustryCodePage;

