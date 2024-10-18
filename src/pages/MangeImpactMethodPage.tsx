import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Plus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useImpactMethods } from "@/api/manageImpactMethod";
import ImpactMethodsTable from "@/components/manageImpactMethod/impactMethodTable";

const ManageImpactMethodPage = () => {
  const { data: impactMethods, isLoading, error } = useImpactMethods();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMethods = impactMethods
    ? impactMethods.filter(
        (method) =>
          method.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          method.perspective.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      )
    : [];

  const handleEdit = (id: number) => {
    console.log(`Edit method with id: ${id}`);
  };

  const handleDelete = (id: number) => {
    console.log(`Delete method with id: ${id}`);
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
            ? "Impact methods not found."
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
        <h1 className="text-2xl font-bold">Impact Methods Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Method
        </Button>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Search methods..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <ScrollArea className="h-[calc(100vh-200px)]">
        <ImpactMethodsTable
          methods={filteredMethods}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </ScrollArea>
    </div>
  );
};

export default ManageImpactMethodPage;
