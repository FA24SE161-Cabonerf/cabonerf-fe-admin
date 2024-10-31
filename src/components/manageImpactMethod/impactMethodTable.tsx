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
import { ImpactMethod } from "@/types/impactMethod";

interface ImpactMethodsTableProps {
  methods: ImpactMethod[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ImpactMethodsTable = ({
  methods,
  onEdit,
  onDelete,
}: ImpactMethodsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Version</TableHead>
          <TableHead>Perspective</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Reference</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {methods.map((method) => (
          <TableRow key={method.id}>
            <TableCell className="font-medium">{method.name}</TableCell>
            <TableCell>{method.version}</TableCell>
            <TableCell>{`${method.perspective.name} (${method.perspective.abbr})`}</TableCell>
            <TableCell>{`${method.description}`}</TableCell>
            <TableCell>{method.reference || "N/A"}</TableCell>
            <TableCell>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(method.id)}
              >
                <Pencil className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(method.id)}
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
export default ImpactMethodsTable;
