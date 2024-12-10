import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useImpactMethodsByCategory } from '@/api/manageImpactCategory'
import { ImpactCategory } from '@/types/impactCategory'
import AddCategoryToMethod from './AddCategoryToMethod'
import DeleteCategoryFromMethod from './DeleteCategoryFromMethod'
import { Button } from "@/components/ui/button"

interface ImpactCategoryDetailModalProps {
  isOpen: boolean
  onClose: () => void
  impactCategory: ImpactCategory | null
}

export function ImpactCategoryDetailModal({ isOpen, onClose, impactCategory }: ImpactCategoryDetailModalProps) {
  const { data: impactMethods, isLoading: isLoadingMethods, refetch: refetchMethods } = useImpactMethodsByCategory(impactCategory?.id || '')
  const [showAddToMethod, setShowAddToMethod] = useState(false)

  if (!impactCategory) return null

  const handleAddSuccess = () => {
    refetchMethods()
    setShowAddToMethod(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[95vw] h-[90vh] max-h-[900px] p-0" aria-describedby="Impact Category Detail" aria-description="Impact Category Detail">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl md:text-3xl font-bold flex items-center gap-2">
            <span dangerouslySetInnerHTML={{ __html: impactCategory.iconUrl }} />
            {impactCategory.name}
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow px-6 pb-6">
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Indicator</h3>
                <p>{impactCategory.indicator}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Unit</h3>
                <p>{impactCategory.unit}</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Indicator Description</h3>
              <p>{impactCategory.indicatorDescription}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Midpoint Impact Category</h3>
                <p>{impactCategory.midpointImpactCategory.name} ({impactCategory.midpointImpactCategory.abbr})</p>
                <p>Unit: {impactCategory.midpointImpactCategory.unit.name}</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">Emission Compartment</h3>
                {impactCategory.emissionCompartment ? (
    <>
      <p>{impactCategory.emissionCompartment.name}</p>
      {impactCategory.emissionCompartment.description && (
        <p className="text-sm text-gray-500 mt-1">{impactCategory.emissionCompartment.description}</p>
      )}
    </>
  ) : (
    <p>No emission compartment specified</p>
  )}
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Impact Methods</h3>
              {isLoadingMethods ? (
                <p>Loading impact methods...</p>
              ) : (
                <>
                  <p className="font-medium mb-2">This impact category belongs to {impactMethods?.length || 0} method(s):</p>
                  <ul className="space-y-2">
                    {impactMethods?.map(method => (
                      <li key={method.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-2 border-b last:border-b-0">
                        <span className="mb-2 sm:mb-0">{method.name} - {method.version} ({method.perspective.name})</span>
                        <DeleteCategoryFromMethod
                          categoryId={impactCategory.id}
                          methodId={method.id}
                          methodName={method.name}
                          onDelete={refetchMethods}
                        />
                      </li>
                    ))}
                  </ul>
                  {showAddToMethod ? (
                    <div className="mt-4">
                      <AddCategoryToMethod categoryId={impactCategory.id} onAddSuccess={handleAddSuccess} />
                      <Button 
                        onClick={() => setShowAddToMethod(false)} 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => setShowAddToMethod(true)}
                      variant="outline"
                      size="sm"
                      className="mt-4"
                    >
                      Add to another method
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}