'use client'

import { useState } from 'react'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, Plus } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useUnitGroups } from '@/api/manageUnitGroup'
import UnitGroupTable from '@/components/manageUnitGroup/UnitGroupTable'


const ManageUnitGroupPage = () => {
  const { data: unitGroups, isLoading, error } = useUnitGroups()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredUnitGroups = unitGroups
    ? unitGroups.filter(unitGroup =>
        unitGroup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unitGroup.unitGroupType.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  const handleEdit = (id: number) => {
    console.log(`Edit unit group with id: ${id}`)
  }

  const handleDelete = (id: number) => {
    console.log(`Delete unit group with id: ${id}`)
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
          {error.status === 404 ? 'Unit groups not found.' : 
           error.status >= 500 ? 'Server error. Please try again later.' : 
           error.message}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Unit Groups Management</h1>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Add New Unit Group
        </Button>
      </div>
      <div className="mb-4">
        <Input
          placeholder="Search unit groups..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      <ScrollArea className="h-[calc(100vh-200px)]">
        <UnitGroupTable
          unitGroups={filteredUnitGroups}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </ScrollArea>
    </div>
  )
}

export default ManageUnitGroupPage