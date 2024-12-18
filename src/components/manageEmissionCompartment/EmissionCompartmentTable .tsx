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
import { EmissionCompartment } from "@/types/emissionCompartment";
import SkeletonTable from "@/components/sketeton/SkeletonTable";

interface EmissionCompartmentTableProps {
  emissionCompartments: EmissionCompartment[] | undefined;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

const EmissionCompartmentTable = ({
  emissionCompartments,
  onEdit,
  onDelete,
  isLoading,
}: EmissionCompartmentTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-100 dark:bg-gray-800">
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      {isLoading ? (
        <SkeletonTable columns={3} rows={5} />
      ) : (
        <TableBody>
          {emissionCompartments && emissionCompartments.length > 0 ? (
            emissionCompartments.map((compartment) => (
              <TableRow key={compartment.id}>
                <TableCell className="font-medium">{compartment.name}</TableCell>
                <TableCell>{compartment.description || "-"}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(compartment.id)}
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(compartment.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="h-24 text-center">
                No emission compartments found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      )}
    </Table>
  );
};

export default EmissionCompartmentTable;