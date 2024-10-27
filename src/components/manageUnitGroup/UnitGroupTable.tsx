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

interface UnitGroupsTableProps {
  unitGroups: UnitGroup[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const UnitGroupTable = ({
  unitGroups,
  onEdit,
  onDelete,
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
      <TableBody>
        {unitGroups.map((unitGroup) => (
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
        ))}
      </TableBody>
    </Table>
  );
};
export default UnitGroupTable;
