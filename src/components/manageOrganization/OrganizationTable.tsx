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
import { Organization } from "@/types/organization";

interface OrganizationTableProps {
  organizations: Organization[] | undefined;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

const OrganizationTable = ({
  organizations,
  onEdit,
  onDelete,
  isLoading,
}: OrganizationTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Contract</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      {isLoading ? (
        <SkeletonTable columns={3} rows={5} />
      ) : (
        <TableBody>
          {organizations && organizations.length > 0 ? (
            organizations.map((organization) => (
              <TableRow key={organization.id}>
                <TableCell className="font-medium">{organization.name}</TableCell>
                <TableCell>{organization.contract || '-'}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(organization.id)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(organization.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center">
                No organizations found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      )}
    </Table>
  );
};

export default OrganizationTable;