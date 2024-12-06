import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, FileText, Info } from 'lucide-react';
import SkeletonTable from "@/components/sketeton/SkeletonTable";
import { Organization } from "@/types/organization";
import { useNavigate } from "react-router-dom";


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
  const navigate = useNavigate();
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
               <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    {organization.logo && (
                      <img 
                        src={organization.logo} 
                        alt={`${organization.name} logo`} 
                        style={{ width: '32px', height: '32px', objectFit: 'contain' }}
                      />
                    )}
                    <span>{organization.name}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {organization.contract && organization.contract.url ? (
                    <a
                      href={organization.contract.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-blue-600 hover:underline"
                    >
                      <FileText className="h-4 w-4 mr-1" />
                      View Contract
                    </a>
                  ) : (
                    '-'
                  )}
                </TableCell>
                <TableCell>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => navigate(`/organizations/${organization.id}`)}
                  >
                    <Info className="h-4 w-4" />
                  </Button>
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