import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AlertCircle, Plus } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ImpactMethod } from "@/types/impactMethod"
import { useImpactMethods, useImpactMethod } from "@/api/manageImpactMethod"
import { 
  useImpactCategories,
  useImpactCategoriesByMethod, 
  useCreateImpactCategory,
  useUpdateImpactCategory,
  useDeleteImpactCategory
} from "@/api/manageImpactCategory"
import { useEmissionCompartments } from "@/api/manageEmissionCompartment"
import { useMidpointImpactCategories } from "@/api/manageMidpointImpactCategory"
import ImpactCategoryTable from "@/components/manageImpactCategory/ImpactCategoryTable"

import { useToast } from "@/hooks/use-toast"
import { ImpactCategory, CreateImpactCategoryRequest } from "@/types/impactCategory"
import AddImpactCategoryModal from "@/forms/manage-impact-category/AddImpactCategoryModal"
import UpdateImpactCategoryModal from "@/forms/manage-impact-category/UpdateImpactCategoryModal"
import DeleteImpactCategoryModal from "@/forms/manage-impact-category/DeleteImpactCategoryModal"

const ManageImpactCategoryPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { toast } = useToast()

  const searchParams = new URLSearchParams(location.search)

  const [impactMethodId, setImpactMethodId] = useState<string | null>(
    searchParams.get("impactMethodId") || null
  )
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  )
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedImpactCategory, setSelectedImpactCategory] = useState<ImpactCategory | null>(null)
  const [addError, setAddError] = useState<string | null>(null)
  const [updateError, setUpdateError] = useState<string | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)

  const { data: impactMethods, isLoading: isLoadingImpactMethods } = useImpactMethods()
  const { data: selectedMethod, isLoading: isLoadingSelectedMethod } = useImpactMethod(impactMethodId || '')
  const {
    data: impactCategories,
    isLoading: isLoadingCategories,
    error: errorCategories,
    refetch: refetchCategories
  } = useImpactCategoriesByMethod(impactMethodId || '')

  const {
    data: allImpactCategories,
    isLoading: isLoadingAllCategories,
    error: errorAllCategories,
    refetch: refetchAllCategories
  } = useImpactCategories()

  const createImpactCategoryMutation = useCreateImpactCategory()
  const updateImpactCategoryMutation = useUpdateImpactCategory()
  const deleteImpactCategoryMutation = useDeleteImpactCategory()

  const { data: midpointImpactCategories, isLoading: isLoadingMidpointCategories } = useMidpointImpactCategories()
  const { data: emissionCompartments, isLoading: isLoadingEmissionCompartments } = useEmissionCompartments()

  useEffect(() => {
    const params = new URLSearchParams()
    if (impactMethodId !== null) {
      params.set("impactMethodId", impactMethodId)
    }
    if (searchTerm) params.set("search", searchTerm)
    navigate(`?${params.toString()}`, { replace: true })
  }, [impactMethodId, searchTerm, navigate])

  const filteredCategories = ((impactMethodId ? impactCategories : allImpactCategories) || [])
    .filter(category => 
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.indicator.toLowerCase().includes(searchTerm.toLowerCase())
    )

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleAddImpactCategory = async (data: CreateImpactCategoryRequest) => {
    try {
      await createImpactCategoryMutation.mutateAsync(data)
      refetchCategories()
      refetchAllCategories()
      setIsAddModalOpen(false)
      setAddError(null)
      toast({
        title: "Success",
        description: "Impact category created successfully",
        variant: "default",
      })
    } catch (error) {
      if (error instanceof Error) {
        setAddError(error.message)
      } else {
        setAddError("An unknown error occurred")
      }
    }
  }

  const handleUpdateImpactCategory = async (id: string, data: CreateImpactCategoryRequest) => {
    try {
      await updateImpactCategoryMutation.mutateAsync({ id, ...data })
      refetchCategories()
      refetchAllCategories()
      setIsUpdateModalOpen(false)
      setUpdateError(null)
      toast({
        title: "Success",
        description: "Impact category updated successfully",
        variant: "default",
      })
    } catch (error) {
      if (error instanceof Error) {
        setUpdateError(error.message)
      } else {
        setUpdateError("An unknown error occurred")
      }
    }
  }

  const handleDeleteImpactCategory = async (id: string) => {
    try {
      await deleteImpactCategoryMutation.mutateAsync(id)
      refetchCategories()
      refetchAllCategories()
      setIsDeleteModalOpen(false)
      setSelectedImpactCategory(null)
      setDeleteError(null)
      toast({
        title: "Success",
        description: "Impact category deleted successfully",
        variant: "default",
      })
    } catch (error) {
      if (error instanceof Error) {
        setDeleteError(error.message)
      } else {
        setDeleteError("An unknown error occurred")
      }
    }
  }

  const handleEdit = (id: string) => {
    const impactCategory = filteredCategories.find((ic) => ic.id === id)
    if (impactCategory) {
      setSelectedImpactCategory(impactCategory)
      setIsUpdateModalOpen(true)
    }
  }

  const handleDelete = (id: string) => {
    const impactCategory = filteredCategories.find((ic) => ic.id === id)
    if (impactCategory) {
      setSelectedImpactCategory(impactCategory)
      setIsDeleteModalOpen(true)
    }
  }

  const handleConfirmDelete = () => {
    if (selectedImpactCategory) {
      handleDeleteImpactCategory(selectedImpactCategory.id)
    }
  }

  const isLoading = isLoadingImpactMethods || isLoadingSelectedMethod || isLoadingCategories || isLoadingAllCategories || isLoadingMidpointCategories || isLoadingEmissionCompartments

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Impact Categories Management</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Impact Category
        </Button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search impact categories..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="max-w-sm"
        />
        <Select
          value={impactMethodId || "all"}
          onValueChange={(value) => {
            setImpactMethodId(value === "all" ? null : value)
          }}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select Impact Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Methods</SelectItem>
            {impactMethods?.map((method: ImpactMethod) => (
              <SelectItem key={method.id} value={method.id}>
                {method.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      {selectedMethod && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">{selectedMethod.name}</h2>
          <p>Version: {selectedMethod.version}</p>
          <p>Perspective: {selectedMethod.perspective.name}</p>
        </div>
      )}
      {(errorCategories || errorAllCategories) ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {errorCategories instanceof Error
              ? errorCategories.message
              : errorAllCategories instanceof Error
              ? errorAllCategories.message
              : "An unknown error occurred"}
          </AlertDescription>
        </Alert>
      ) : (
        <ScrollArea className="h-[calc(100vh-300px)]">
          <ImpactCategoryTable
            categories={filteredCategories}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        </ScrollArea>
      )}
      <AddImpactCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddImpactCategory}
        isSubmitting={createImpactCategoryMutation.isPending}
        error={addError}
        midpointImpactCategories={midpointImpactCategories || []}
        emissionCompartments={emissionCompartments || []}
      />
      <UpdateImpactCategoryModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false)
          setSelectedImpactCategory(null)
        }}
        onSubmit={handleUpdateImpactCategory}
        isSubmitting={updateImpactCategoryMutation.isPending}
        error={updateError}
        impactCategory={selectedImpactCategory}
        midpointImpactCategories={midpointImpactCategories || []}
        emissionCompartments={emissionCompartments || []}
      />
      <DeleteImpactCategoryModal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false)
          setSelectedImpactCategory(null)
        }}
        onConfirm={handleConfirmDelete}
        isDeleting={deleteImpactCategoryMutation.isPending}
        error={deleteError}
        impactCategoryName={selectedImpactCategory?.name || ""}
      />
    </div>
  )
}

export default ManageImpactCategoryPage