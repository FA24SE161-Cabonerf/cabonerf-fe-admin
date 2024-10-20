import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { AlertCircle, Plus } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useUnitGroups } from '@/api/manageUnitGroup'
import UnitGroupTable from '@/components/manageUnitGroup/UnitGroupTable'
import SkeletonTable from '@/components/sketeton/SkeletonTable'

const ManageUnitGroupPage = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const searchParams = new URLSearchParams(location.search)
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')

  const { data: unitGroups, isLoading, error } = useUnitGroups()

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    if (searchTerm) {
      params.set('search', searchTerm)
    } else {
      params.delete('search')
    }
    navigate(`?${params.toString()}`, { replace: true })
  }, [searchTerm, navigate, location.search])

  const filteredUnitGroups = unitGroups
    ? unitGroups.filter(unitGroup =>
        unitGroup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        unitGroup.unitGroupType.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : []

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleEdit = (id: number) => {
    console.log(`Edit unit group with id: ${id}`)
  }

  const handleDelete = (id: number) => {
    console.log(`Delete unit group with id: ${id}`)
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
          onChange={handleSearchChange}
          className="max-w-sm"
        />
      </div>
      {isLoading ? (
        <SkeletonTable />
      ) : error ? (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error.status === 404 ? 'Unit groups not found.' : 
             error.status >= 500 ? 'Server error. Please try again later.' : 
             error.message}
          </AlertDescription>
        </Alert>
      ) : (
        <ScrollArea className="h-[calc(100vh-200px)]">
          <UnitGroupTable
            unitGroups={filteredUnitGroups}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </ScrollArea>
      )}
    </div>
  )
}

export default ManageUnitGroupPage