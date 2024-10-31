import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MidpointImpactCategory } from "@/types/midpointImpactCategory";
import { Button } from "../ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface MidpointImpactCategoryTableProps {
  categories: MidpointImpactCategory[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function MidpointImpactCategoryTable({
  categories,
  onEdit,
  onDelete,
}: MidpointImpactCategoryTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Abbreviation</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Unit Group</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {categories.map((category) => (
          <TableRow key={category.id}>
            <TableCell>{category.name}</TableCell>
            <TableCell>{category.abbr}</TableCell>
            <TableCell>{category.unit.name}</TableCell>
            <TableCell>{category.unit.unitGroup.name}</TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(category.id)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(category.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
