import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

import { useMidpointImpactCategories } from "@/api/manageMidpointImpactCategory";
import SkeletonTable from "@/components/sketeton/SkeletonTable";
import MidpointImpactCategoryTable from "@/components/manageMidpointImpactCategory/MidpointImpactCategoryTable";

export default function ManageMidpointImpactCategoryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: categories, isLoading, error } = useMidpointImpactCategories();

  const filteredCategories = categories?.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.abbr.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (id: string) => {
    console.log(`Edit category with id: ${id}`);
    // Implement edit functionality
  };

  const handleDelete = (id: string) => {
    console.log(`Delete category with id: ${id}`);
    // Implement delete functionality
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Midpoint Impact Categories</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Category
        </Button>
      </div>
      <Input
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-4"
      />
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
        <ScrollArea className="h-[calc(100vh-250px)]">
          <MidpointImpactCategoryTable
            categories={filteredCategories || []}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </ScrollArea>
      )}
    </div>
  );
}
