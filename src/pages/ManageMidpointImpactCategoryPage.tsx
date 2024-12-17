import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Plus, Search } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  useMidpointImpactCategories,
  useCreateMidpointImpactCategory,
  useUpdateMidpointImpactCategory,
  useDeleteMidpointImpactCategory,
} from "@/api/manageMidpointImpactCategory";
import { useUnits } from "@/api/manageUnit";
import MidpointImpactCategoryTable from "@/components/manageMidpointImpactCategory/MidpointImpactCategoryTable";
import { useToast } from "@/hooks/use-toast";
import { MidpointImpactCategory } from "@/types/midpointImpactCategory";
import AddMidpointImpactCategoryModal from "@/forms/manage-midpoint-impact-category/AddMidpointImpactCategoryModal";
import UpdateMidpointImpactCategoryModal from "@/forms/manage-midpoint-impact-category/UpdateMidpointImpactCategoryModal";
import DeleteMidpointImpactCategoryModal from "@/forms/manage-midpoint-impact-category/DeleteMidpointImpactCategoryModal";

export default function ManageMidpointImpactCategoryPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  const searchParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  );
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<MidpointImpactCategory | null>(null);
  const [addError, setAddError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const {
    data: categories,
    isLoading,
    error,
    refetch,
  } = useMidpointImpactCategories();
  const { data: units } = useUnits();
  const createCategoryMutation = useCreateMidpointImpactCategory();
  const updateCategoryMutation = useUpdateMidpointImpactCategory();
  const deleteCategoryMutation = useDeleteMidpointImpactCategory();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }
    navigate(`?${params.toString()}`, { replace: true });
  }, [searchTerm, navigate, location.search]);

  const filteredCategories = categories?.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.abbr.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleAddCategory = async (data: {
    name: string;
    description: string;
    abbr: string;
    unitId: string;
  }) => {
    try {
      await createCategoryMutation.mutateAsync(data);
      refetch();
      setIsAddModalOpen(false);
      setAddError(null);
      toast({
        title: "Success",
        description: "Midpoint impact category created successfully",
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

  const handleUpdateCategory = async (
    id: string,
    data: {
      name: string;
      description: string;
      abbr: string;
      unitId: string;
    }
  ) => {
    try {
      await updateCategoryMutation.mutateAsync({ id, ...data });
      refetch();
      setIsUpdateModalOpen(false);
      setUpdateError(null);
      toast({
        title: "Success",
        description: "Midpoint impact category updated successfully",
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

  const handleDeleteCategory = async (id: string) => {
    try {
      await deleteCategoryMutation.mutateAsync(id);
      refetch();
      setIsDeleteModalOpen(false);
      setSelectedCategory(null);
      setDeleteError(null);
      toast({
        title: "Success",
        description: "Midpoint impact category deleted successfully",
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
    const category = categories?.find((cat) => cat.id === id);
    if (category) {
      setSelectedCategory(category);
      setIsUpdateModalOpen(true);
    }
  };

  const handleDelete = (id: string) => {
    const category = categories?.find((cat) => cat.id === id);
    if (category) {
      setSelectedCategory(category);
      setIsDeleteModalOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    if (selectedCategory) {
      handleDeleteCategory(selectedCategory.id);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Midpoint Impact Categories</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Category
        </Button>
      </div>
      <div className="relative max-w-sm">
      <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      <Input
        type="text"
        placeholder="Search categories..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="mb-4 pl-8"
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
        <ScrollArea className="h-[calc(100vh-250px)]">
          <MidpointImpactCategoryTable
            categories={filteredCategories}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        </ScrollArea>
      )}
      <AddMidpointImpactCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddCategory}
        isSubmitting={createCategoryMutation.isPending}
        error={addError}
        units={units || []}
      />
      <UpdateMidpointImpactCategoryModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedCategory(null);
        }}
        onSubmit={handleUpdateCategory}
        isSubmitting={updateCategoryMutation.isPending}
        error={updateError}
        category={selectedCategory}
        units={units || []}
      />
      <DeleteMidpointImpactCategoryModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedCategory(null);
        }}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteCategoryMutation.isPending}
        error={deleteError}
        categoryName={selectedCategory?.name || ""}
      />
    </div>
  );
}
