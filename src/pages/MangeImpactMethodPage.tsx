import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Plus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useImpactMethods } from "@/api/manageImpactMethod";
import ImpactMethodsTable from "@/components/manageImpactMethod/impactMethodTable";
import SkeletonTable from "@/components/sketeton/SkeletonTable";

const ManageImpactMethodPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("search") || "");

  const { data: impactMethods, isLoading, error } = useImpactMethods();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
    navigate(`?${params.toString()}`, { replace: true });
  }, [searchTerm, navigate, location.search]);

  const filteredMethods = impactMethods
    ? impactMethods.filter(
        (method) =>
          method.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          method.perspective.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      )
    : [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = (id: number) => {
    console.log(`Edit method with id: ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Delete method with id: ${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Impact Methods Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Method
        </Button>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Search methods..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="max-w-sm"
        />
      </div>
      {isLoading ? (
        <SkeletonTable />
      ) : error ? (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error.status === 404
              ? "Impact methods not found."
              : error.status >= 500
              ? "Server error. Please try again later."
              : error.message}
          </AlertDescription>
        </Alert>
      ) : (
        <ScrollArea className="h-[calc(100vh-200px)]">
          <ImpactMethodsTable
            methods={filteredMethods}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </ScrollArea>
      )}
    </div>
  );
};

export default ManageImpactMethodPage;