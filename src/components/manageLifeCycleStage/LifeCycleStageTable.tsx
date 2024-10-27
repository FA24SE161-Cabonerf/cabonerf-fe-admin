
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { LifeCycleStage } from '@/types/lifeCycleStage'

interface LifeCycleStagesTableProps {
  stages: LifeCycleStage[]
  onEdit: (id: string) => void
  onDelete: (id: string) => void
}

const LifeCycleStagesTable = ({ stages, onEdit, onDelete }: LifeCycleStagesTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {stages.map((stage: LifeCycleStage) => (
          <TableRow key={stage.id}>
            <TableCell className="font-medium">{stage.name}</TableCell>
            <TableCell>{stage.description}</TableCell>
            <TableCell>
              <Button variant="ghost" size="icon" onClick={() => onEdit(stage.id)}>
                <Pencil className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => onDelete(stage.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default LifeCycleStagesTable