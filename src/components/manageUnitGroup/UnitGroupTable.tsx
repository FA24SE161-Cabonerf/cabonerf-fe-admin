import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { MoreHorizontal } from "lucide-react"
import { UnitGroup } from '@/types/unitGroup'


interface UnitGroupsTableProps {
  unitGroups: UnitGroup[]
  onEdit: (id: number) => void
  onDelete: (id: number) => void
}

 const UnitGroupTable = ({
  unitGroups,
  onEdit,
  onDelete,
}: UnitGroupsTableProps ) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Unit Group Type</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {unitGroups.map((unitGroup) => (
          <TableRow key={unitGroup.id}>
            <TableCell className="font-medium">{unitGroup.name}</TableCell>
            <TableCell>{unitGroup.unitGroupType}</TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => onEdit(unitGroup.id)}>Edit</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(unitGroup.id)}>Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
export default UnitGroupTable