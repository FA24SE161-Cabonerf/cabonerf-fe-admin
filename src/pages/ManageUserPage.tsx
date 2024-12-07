import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Plus } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import UserTable from "@/components/manageUser/UserTable";
import { useUsers, useBanUnbanUser } from "@/api/manageUser";
import Pagination from "@/components/pagination/Pagination";
import { useToast } from "@/hooks/use-toast";

const ManageUserPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const searchParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data: userResponse, isLoading, error, refetch } = useUsers(page, pageSize, searchTerm);
  const banUnbanMutation = useBanUnbanUser();

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

  const handleEdit = (id: string) => {
   
    console.log(`Edit user with id: ${id}`);
  };

  const handleToggleStatus = async (id: string, newStatus: boolean) => {
    try {
      await banUnbanMutation.mutateAsync(id);
      refetch(); 
      toast({
        title: "Success",
        description: `User ${newStatus ? "unbanned" : "banned"} successfully`,
        variant: "default",
      });
    } catch (error) {
      console.error("Failed to ban/unban user:", error);
      toast({
        title: "Error",
        description: "Failed to update user status",
        variant: "destructive",
      });
    }
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
        <h1 className="text-2xl font-bold">User Management</h1>
        <Button onClick={() => console.log("Add new user")}>
          <Plus className="mr-2 h-4 w-4" /> Add New User
        </Button>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Search users..."
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
        <ScrollArea className="h-[calc(100vh-250px)]">
          <UserTable
            users={userResponse?.users}
            onEdit={handleEdit}
            onToggleStatus={handleToggleStatus}
            isLoading={isLoading}
          />
        </ScrollArea>
      )}
      {userResponse && (
        <Pagination
          page={page}
          pageSize={pageSize}
          totalPages={userResponse.totalPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </div>
  );
};

export default ManageUserPage;