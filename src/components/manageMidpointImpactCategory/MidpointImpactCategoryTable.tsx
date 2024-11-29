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
import SkeletonTable from "@/components/sketeton/SkeletonTable";

interface MidpointImpactCategoryTableProps {
  categories: MidpointImpactCategory[] | undefined;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

export default function MidpointImpactCategoryTable({
  categories,
  onEdit,
  onDelete,
  isLoading,
}: MidpointImpactCategoryTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Abbreviation</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Unit Group</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      {isLoading ? (
        <SkeletonTable columns={5} rows={5} />
      ) : (
        <TableBody>
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name || "-"}</TableCell>
                <TableCell>{category.description || "-"}</TableCell>
                <TableCell>{category.abbr || "-"}</TableCell>
                <TableCell>{category.unit.name || "-"}</TableCell>
                <TableCell>{category.unit.unitGroup.name || "-"}</TableCell>
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
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No midpoint impact categories found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      )}
    </Table>
  );
}