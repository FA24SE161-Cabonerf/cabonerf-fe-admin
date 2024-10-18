import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Plus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useImpactCategories } from "@/api/manageImpactCategory";
import ImpactCategoryTable from "@/components/manageImactCatrgory/ImpactCategoryTable";



const ManageImpactCategoryPage = () => {
  const { data: impactCategories, isLoading, error } = useImpactCategories();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = impactCategories
    ? impactCategories.filter(
        (category) =>
          (category.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            category.indicator
              ?.toLowerCase()
              .includes(searchTerm.toLowerCase())) ??
          false
      )
    : [];

  const handleEdit = (id: number) => {
    // Placeholder for edit functionality
    console.log(`Edit category with id: ${id}`);
  };

  const handleDelete = (id: number) => {
    // Placeholder for delete functionality
    console.log(`Delete category with id: ${id}`);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error.status === 404
            ? "Impact categories not found."
            : error.status >= 500
            ? "Server error. Please try again later."
            : error.message}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Impact Categories Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Category
        </Button>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <ScrollArea className="h-[calc(100vh-200px)]">
        <ImpactCategoryTable
          categories={filteredCategories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </ScrollArea>
    </div>
  );
};
export default ManageImpactCategoryPage;
