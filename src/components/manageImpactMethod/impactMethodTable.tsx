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
import SkeletonTable from "@/components/sketeton/SkeletonTable";

interface ImpactMethodsTableProps {
  methods: ImpactMethod[] | undefined;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

const ImpactMethodsTable = ({
  methods,
  onEdit,
  onDelete,
  isLoading,
}: ImpactMethodsTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-100 dark:bg-gray-800">
          <TableHead>Name</TableHead>
          <TableHead>Version</TableHead>
          <TableHead>Perspective</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Reference</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      {isLoading ? (
        <SkeletonTable columns={6} rows={5} />
      ) : (
        <TableBody>
          {methods && methods.length > 0 ? (
            methods.map((method) => (
              <TableRow key={method.id}>
                <TableCell className="font-medium">{method.name}</TableCell>
                <TableCell>{method.version}</TableCell>
                <TableCell>{`${method.perspective.name} (${method.perspective.abbr})`}</TableCell>
                <TableCell>{`${method.description}` || "-"}</TableCell>
                <TableCell>{method.reference || "-"}</TableCell>
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
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                No impact methods found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      )}
    </Table>
  );
};

export default ImpactMethodsTable;