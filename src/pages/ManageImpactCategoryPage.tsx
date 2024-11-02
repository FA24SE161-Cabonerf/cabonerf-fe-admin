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
import ImpactCategoryTable from "@/components/manageImpactCategory/ImpactCategoryTable"

const ManageImpactCategoryPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)

  const [impactMethodId, setImpactMethodId] = useState<string | null>(
    searchParams.get("impactMethodId") || null
  )
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || ""
  )

  const { data: impactMethods, isLoading: isLoadingImpactMethods } = useImpactMethods()
  
  useEffect(() => {
    if (impactMethods && impactMethods.length > 0 && !impactMethodId) {
      setImpactMethodId(impactMethods[0].id)
    }
  }, [impactMethods, impactMethodId])

  const { data: selectedMethod, isLoading: isLoadingSelectedMethod } = useImpactMethod(impactMethodId || '')
  const {
    data: impactCategories,
    isLoading: isLoadingCategories,
    error,
  } = useImpactCategoriesByMethod(impactMethodId || '')

  useEffect(() => {
    const params = new URLSearchParams()
    if (impactMethodId !== null) {
      params.set("impactMethodId", impactMethodId)
    }
    if (searchTerm) params.set("search", searchTerm)
    navigate(`?${params.toString()}`, { replace: true })
  }, [impactMethodId, searchTerm, navigate])

  const filteredCategories = impactCategories?.filter(
    (category) =>
      category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      category.indicator.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const handleEdit = (id: string) => {
    console.log(`Edit impact category with id: ${id}`)
  }

  const handleDelete = (id: string) => {
    console.log(`Delete impact category with id: ${id}`)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const isLoading = isLoadingImpactMethods || isLoadingSelectedMethod || isLoadingCategories

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
          value={impactMethodId || ""}
          onValueChange={(value) => setImpactMethodId(value)}
        >
          <SelectTrigger className="w-fit">
            <SelectValue placeholder="Select Impact Method" />
          </SelectTrigger>
          <SelectContent>
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
        <ScrollArea className="h-[calc(100vh-300px)]">
          <ImpactCategoryTable
            categories={filteredCategories}
            onEdit={handleEdit}
            onDelete={handleDelete}
            isLoading={isLoading}
          />
        </ScrollArea>
      )}
    </div>
  )
}

export default ManageImpactCategoryPage