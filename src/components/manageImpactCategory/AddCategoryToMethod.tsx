import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAddImpactCategoryToMethod } from '@/api/manageImpactCategory'
import { useImpactMethods } from '@/api/manageImpactMethod'
import { useToast } from "@/hooks/use-toast"

interface AddCategoryToMethodComponentProps {
  categoryId: string
  onAddSuccess: () => void
}

const AddCategoryToMethod = ({ categoryId, onAddSuccess }: AddCategoryToMethodComponentProps) => {
  const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null)
  const { data: impactMethods, isLoading: isLoadingMethods } = useImpactMethods()
  const addCategoryToMethod = useAddImpactCategoryToMethod()
  const { toast } = useToast()

  const handleAddToMethod = async () => {
    if (!selectedMethodId) {
      toast({
        title: "Error",
        description: "Please select a method",
        variant: "destructive",
      })
      return
    }

    try {
      await addCategoryToMethod.mutateAsync({ methodId: selectedMethodId, categoryId })
      toast({
        title: "Success",
        description: "Category added to method successfully",
      })
      onAddSuccess()
      setSelectedMethodId(null)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    }
  }

  if (isLoadingMethods) {
    return <div>Loading methods...</div>
  }

  return (
    <div className="flex flex-col space-y-4">
      <Select onValueChange={(value) => setSelectedMethodId(value)} value={selectedMethodId || undefined}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Select a method" />
        </SelectTrigger>
        <SelectContent>
          {impactMethods?.map((method) => (
            <SelectItem key={method.id} value={method.id}>
              {method.name} ({method.perspective.abbr})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button onClick={handleAddToMethod} disabled={!selectedMethodId || addCategoryToMethod.isPending}>
        {addCategoryToMethod.isPending ? "Adding..." : "Add to Method"}
      </Button>
    </div>
  )
}

export default AddCategoryToMethod