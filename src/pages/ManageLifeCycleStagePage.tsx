import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, Plus } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useLifeCycleStages } from '@/api/manageLifeCycleStage'
import LifeCycleStagesTable from '@/components/manageLifeCycleStage/LifeCycleStageTable'
import SkeletonTable from '@/components/sketeton/SkeletonTable'

import { LifeCycleStage } from '@/types/lifeCycleStage'
import { AddNewStageModal } from '@/forms/manage-life-cycle-stage-form/AddNewStageModal'

const ManageLifeCycleStagePage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  const { data: lifeCycleStages, isLoading, error, refetch } = useLifeCycleStages()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (searchTerm) {
      params.set('search', searchTerm)
    } else {
      params.delete('search')
    }
    navigate(`?${params.toString()}`, { replace: true })
  }, [searchTerm, navigate, location.search])

  const filteredStages = lifeCycleStages?.filter(stage =>
    stage.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stage.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleEdit = (id: string) => {
    console.log(`Edit life cycle stage with id: ${id}`)
    // Implement edit functionality
  }

  const handleDelete = (id: string) => {
    console.log(`Delete life cycle stage with id: ${id}`)
    // Implement delete functionality
  }

  const handleAddStage = async (newStage: Omit<LifeCycleStage, 'id'>) => {
    // This is a placeholder function. In a real application, you would call an API to add the new stage.
    console.log('Adding new stage:', newStage)
    // After successfully adding the stage, refetch the data
    await refetch()
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Life Cycle Stages Management</h1>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" /> Add New Stage
        </Button>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Search life cycle stages..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="max-w-sm"
        />
      </div>
      {isLoading ? (
        <SkeletonTable />
      ) : error ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error instanceof Error ? error.message : 'An unknown error occurred'}
          </AlertDescription>
        </Alert>
      ) : (
        <ScrollArea className="h-[calc(100vh-200px)]">
          <LifeCycleStagesTable
            stages={filteredStages}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </ScrollArea>
      )}
      <AddNewStageModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddStage={handleAddStage}
      />
    </div>
  )
}

export default ManageLifeCycleStagePage