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
import { ImpactCategory } from "@/types/impactCategory";
import SkeletonTable from "@/components/sketeton/SkeletonTable";

interface ImpactCategoriesTableProps {
  categories: ImpactCategory[] | undefined;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

const ImpactCategoryTable = ({
  categories,
  onEdit,
  onDelete,
  isLoading,
}: ImpactCategoriesTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Indicator</TableHead>
          <TableHead>Unit</TableHead>
          <TableHead>Midpoint Impact</TableHead>
          <TableHead>Emission Compartment</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      {isLoading ? (
        <SkeletonTable columns={6} rows={5} />
      ) : (
        <TableBody>
          {categories && categories.length > 0 ? (
            categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">
                  {category.name || "N/A"}
                </TableCell>
                <TableCell>{category.indicator || "N/A"}</TableCell>
                <TableCell>{category.unit || "N/A"}</TableCell>
                <TableCell>
                  {category.midpointImpactCategory
                    ? `${category.midpointImpactCategory.name || "N/A"} (${
                        category.midpointImpactCategory.abbr || "N/A"
                      })`
                    : "N/A"}
                </TableCell>
                <TableCell>{category.emissionCompartment?.name || "N/A"}</TableCell>
                <TableCell>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEdit(category.id)}
                      className="h-8 w-8 p-0"
                    >
                      <span className="sr-only">Edit</span>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onDelete(category.id)}
                      className="h-8 w-8 p-0"
                    >
                      <span className="sr-only">Delete</span>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No impact categories found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      )}
    </Table>
  );
};

export default ImpactCategoryTable;