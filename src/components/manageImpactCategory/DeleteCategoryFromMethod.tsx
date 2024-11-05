import { Button } from "@/components/ui/button"
import { useRemoveImpactCategoryFromMethod } from '@/api/manageImpactCategory'
import { useToast } from "@/hooks/use-toast"

interface DeleteCategoryFromMethodComponentProps {
  categoryId: string
  methodId: string
  methodName: string
  onDelete: () => void
}

const DeleteCategoryFromMethod = ({ 
  categoryId, 
  methodId, 
  methodName,
  onDelete 
}: DeleteCategoryFromMethodComponentProps) => {
  const removeCategoryFromMethod = useRemoveImpactCategoryFromMethod()
  const { toast } = useToast()

  const handleRemoveFromMethod = async () => {
    try {
      await removeCategoryFromMethod.mutateAsync({ categoryId, methodId })
      toast({
        title: "Success",
        description: `Category removed from ${methodName} successfully`,
      })
      onDelete()
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    }
  }

  return (
    <Button 
      onClick={handleRemoveFromMethod} 
      disabled={removeCategoryFromMethod.isPending}
      variant="destructive"
      size="sm"
    >
      {removeCategoryFromMethod.isPending ? `Removing from ${methodName}...` : `Remove from ${methodName}`}
    </Button>
  )
}

export default DeleteCategoryFromMethod