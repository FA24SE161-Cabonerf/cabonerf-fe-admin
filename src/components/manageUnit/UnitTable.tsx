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
import { Unit } from "@/types/unit";

interface UnitsTableProps {
  units: Unit[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const UnitTable = ({ units, onEdit, onDelete }: UnitsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Conversion Factor</TableHead>
          <TableHead>Unit Group</TableHead>
          <TableHead>Default</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {units.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="h-24 text-center">
              No units found.
            </TableCell>
          </TableRow>
        ) : (
          units.map((unit) => (
            <TableRow key={unit.id}>
              <TableCell className="font-medium">{unit.name}</TableCell>
              <TableCell>{unit.conversionFactor}</TableCell>
              <TableCell>{unit.unitGroup.name}</TableCell>
              <TableCell>{unit.isDefault ? "Yes" : "No"}</TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onEdit(unit.id)}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onDelete(unit.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default UnitTable;