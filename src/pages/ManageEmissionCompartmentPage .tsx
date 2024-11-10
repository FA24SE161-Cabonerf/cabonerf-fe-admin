
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Plus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import EmissionCompartmentTable from "@/components/manageEmissionCompartment/EmissionCompartmentTable ";
import { useEmissionCompartments } from "@/api/manageEmissionCompartment";

const ManageEmissionCompartmentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const searchParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );


  const { data: emissionCompartments, isLoading, error, refetch } = useEmissionCompartments();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
    navigate(`?${params.toString()}`, { replace: true });
  }, [searchTerm, navigate, location.search]);

  const filteredCompartments = emissionCompartments
  ? emissionCompartments.filter(
      (compartment) =>
        compartment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (compartment.description && compartment.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  : [];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleEdit = async (id: string) => {
    console.log(`Edit emission compartment with id: ${id}`)
    await refetch();
  };

  const handleDelete = (id: string) => {
    console.log(`Delete emission compartment with id: ${id}`)
    
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Emission Compartments Management</h1>
        <Button onClick={() => {
          // TODO: Implement add functionality when available
          toast({
            title: "Add",
            description: "Add functionality is not yet implemented.",
            variant: "default",
          });
        }}>
          <Plus className="mr-2 h-4 w-4" /> Add New Emission Compartment
        </Button>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Search emission compartments..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="max-w-sm"
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
        <ScrollArea className="h-[calc(100vh-200px)]">
          <EmissionCompartmentTable
            emissionCompartments={filteredCompartments}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        </ScrollArea>
      )}
    </div>
  );
};

export default ManageEmissionCompartmentPage;