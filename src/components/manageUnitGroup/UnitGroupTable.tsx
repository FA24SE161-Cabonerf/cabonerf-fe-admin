import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { UnitGroup } from "@/types/unitGroup";
import SkeletonTable from "@/components/sketeton/SkeletonTable";

interface UnitGroupsTableProps {
  unitGroups: UnitGroup[] | undefined;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

const UnitGroupTable = ({
  unitGroups,
  onEdit,
  onDelete,
  isLoading,
}: UnitGroupsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Unit Group Type</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      {isLoading ? (
        <SkeletonTable columns={3} rows={5} />
      ) : (
        <TableBody>
          {unitGroups && unitGroups.length > 0 ? (
            unitGroups.map((unitGroup) => (
              <TableRow key={unitGroup.id}>
                <TableCell className="font-medium">{unitGroup.name}</TableCell>
                <TableCell>{unitGroup.unitGroupType}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(unitGroup.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(unitGroup.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No unit groups found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      )}
    </Table>
  );
};

export default UnitGroupTable;