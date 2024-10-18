import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { ImpactCategory } from "@/types/impactCategory";

interface ImpactCategoriesTableProps {
  categories: ImpactCategory[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const ImpactCategoryTable = ({
  categories,
  onEdit,
  onDelete,
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
      <TableBody>
        {categories.map((category) => (
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
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => onEdit(category.id)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(category.id)}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
export default ImpactCategoryTable;
