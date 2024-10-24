
import { useState, useEffect } from "react"
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
import { useNavigate, useLocation } from "react-router-dom"

import { ImpactMethod } from "@/types/impactMethod"
import { useImpactMethods, useImpactMethod } from "@/api/manageImpactMethod"
import { useImpactCategoriesByMethod } from "@/api/manageImpactCategory"
import SkeletonTable from "@/components/sketeton/SkeletonTable"
import ImpactCategoryTable from "@/components/manageImpactCategory/ImpactCategoryTable"

const ManageImpactCategoryPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)

  const [impactMethodId, setImpactMethodId] = useState<number | null>(
    parseInt(searchParams.get("impactMethodId") || "1")
  )
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  )

  const { data: impactMethods, isLoading: isLoadingImpactMethods } = useImpactMethods()
  const { data: selectedMethod, isLoading: isLoadingSelectedMethod } = useImpactMethod(impactMethodId || 1)
  const {
    data: impactCategories,
    isLoading: isLoadingCategories,
    error,
  } = useImpactCategoriesByMethod(impactMethodId || 1)

  useEffect(() => {
    const params = new URLSearchParams()
    if (impactMethodId !== null) {
      params.set("impactMethodId", impactMethodId.toString())
    }
    if (searchTerm) params.set("search", searchTerm)
    navigate(`?${params.toString()}`, { replace: true })
  }, [impactMethodId, searchTerm, navigate])

  const filteredCategories = impactCategories?.filter(
    (category) =>
      (category.name?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false) ||
      (category.indicator?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
  ) || []

  const handleEdit = (id: number) => {
    console.log(`Edit impact category with id: ${id}`)
  }

  const handleDelete = (id: number) => {
    console.log(`Delete impact category with id: ${id}`)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const isLoading = isLoadingImpactMethods || isLoadingSelectedMethod || isLoadingCategories

  if (isLoading) return <SkeletonTable />

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error instanceof Error
            ? error.message
            : "An unknown error occurred"}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Impact Categories Management</h1>
        <Button>
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
          value={impactMethodId?.toString() || ""}
          onValueChange={(value) => setImpactMethodId(Number(value))}
        >
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Select Impact Method" />
          </SelectTrigger>
          <SelectContent>
            {impactMethods?.map((method: ImpactMethod) => (
              <SelectItem key={method.id} value={method.id.toString()}>
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
      <ScrollArea className="h-[calc(100vh-300px)]">
        <ImpactCategoryTable
          categories={filteredCategories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </ScrollArea>
    </div>
  )
}

export default ManageImpactCategoryPage