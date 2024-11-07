import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import { LifeCycleStage } from '@/types/lifeCycleStage'
import SkeletonTable from "@/components/sketeton/SkeletonTable"

interface LifeCycleStagesTableProps {
  stages: LifeCycleStage[] | undefined
  onEdit: (id: string) => void
  onDelete: (id: string) => void
  isLoading: boolean
}

const LifeCycleStagesTable = ({ stages, onEdit, onDelete, isLoading }: LifeCycleStagesTableProps) => {
  const renderIcon = (iconUrl: string) => {
    if (iconUrl.startsWith('<svg')) {
      return <span dangerouslySetInnerHTML={{ __html: iconUrl }} />;
    } else {
      return <img src={iconUrl} alt="Icon" className="w-5 h-5 object-contain" />;
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      {isLoading ? (
        <SkeletonTable columns={3} rows={5} />
      ) : (
        <TableBody>
          {stages && stages.length > 0 ? (
            stages.map((stage: LifeCycleStage) => (
              <TableRow key={stage.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 flex items-center justify-center mr-3">
                      {renderIcon(stage.iconUrl)}
                    </div>
                    <span>{stage.name}</span>
                  </div>
                </TableCell>
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
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No life cycle stages found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      )}
    </Table>
  )
}

export default LifeCycleStagesTable