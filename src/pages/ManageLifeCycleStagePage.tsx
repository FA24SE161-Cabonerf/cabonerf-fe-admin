import { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, Plus } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useLifeCycleStages } from '@/api/manageLifeCycleStage'
import LifeCycleStagesTable from '@/components/manageLifeCycleStage/LifeCycleStageTable'


 const ManageLifeCycleStagePage = () => {
  const { data: lifeCycleStages, isLoading, error } = useLifeCycleStages()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredStages = lifeCycleStages?.filter(stage =>
    stage.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    stage.description.toLowerCase().includes(searchTerm.toLowerCase())
  ) || []

  const handleEdit = (id: number) => {
    console.log(`Edit life cycle stage with id: ${id}`)
    // Implement edit functionality
  }

  const handleDelete = (id: number) => {
    console.log(`Delete life cycle stage with id: ${id}`)
    // Implement delete functionality
  }

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error instanceof Error ? error.message : 'An unknown error occurred'}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Life Cycle Stages Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Stage
        </Button>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Search life cycle stages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <ScrollArea className="h-[calc(100vh-200px)]">
        <LifeCycleStagesTable
          stages={filteredStages}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </ScrollArea>
    </div>
  )
}
export default ManageLifeCycleStagePage