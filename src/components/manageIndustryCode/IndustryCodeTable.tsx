import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from 'lucide-react';
import SkeletonTable from "@/components/sketeton/SkeletonTable";
import { IndustryCode } from "@/types/industryCode";

interface IndustryCodeTableProps {
  industryCodes: IndustryCode[] | undefined;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

const IndustryCodeTable = ({
  industryCodes,
  onEdit,
  onDelete,
  isLoading,
}: IndustryCodeTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-100 dark:bg-gray-800">
          <TableHead>Code</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      {isLoading ? (
        <SkeletonTable columns={3} rows={5} />
      ) : (
        <TableBody>
          {industryCodes && industryCodes.length > 0 ? (
            industryCodes.map((industryCode) => (
              <TableRow key={industryCode.id}>
                <TableCell>{industryCode.code}</TableCell>
                <TableCell>{industryCode.name}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(industryCode.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(industryCode.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No industry codes found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      )}
    </Table>
  );
};

export default IndustryCodeTable;

