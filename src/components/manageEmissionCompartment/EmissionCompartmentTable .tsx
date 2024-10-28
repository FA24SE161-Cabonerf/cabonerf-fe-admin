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

interface EmissionCompartmentTableProps {
  emissionCompartments: EmissionCompartment[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const EmissionCompartmentTable = ({
  emissionCompartments,
  onEdit,
  onDelete,
}: EmissionCompartmentTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {emissionCompartments.map((compartment) => (
          <TableRow key={compartment.id}>
            <TableCell className="font-medium">{compartment.name}</TableCell>
            <TableCell>{compartment.description}</TableCell>
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
        ))}
      </TableBody>
    </Table>
  );
};

export default EmissionCompartmentTable;