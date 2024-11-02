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
import { Perspective } from "@/types/perspective";
import SkeletonTable from "@/components/sketeton/SkeletonTable";

interface PerspectiveTableProps {
  perspectives: Perspective[] | undefined;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

const PerspectiveTable = ({
  perspectives,
  onEdit,
  onDelete,
  isLoading,
}: PerspectiveTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Abbreviation</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      {isLoading ? (
        <SkeletonTable columns={4} rows={5} />
      ) : (
        <TableBody>
          {perspectives && perspectives.length > 0 ? (
            perspectives.map((perspective) => (
              <TableRow key={perspective.id}>
                <TableCell className="font-medium">
                  {perspective.name || "N/A"}
                </TableCell>
                <TableCell>{perspective.description || "N/A"}</TableCell>
                <TableCell>{perspective.abbr || "N/A"}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(perspective.id)}
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(perspective.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No perspectives found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      )}
    </Table>
  );
};

export default PerspectiveTable;