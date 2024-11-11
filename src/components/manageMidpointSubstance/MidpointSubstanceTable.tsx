import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MidpointSubstance } from "@/types/midpointSubstance";
import SkeletonTable from "@/components/sketeton/SkeletonTable";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";

interface MidpointSubstancesTableProps {
  substances: MidpointSubstance[] | undefined;
  onDelete: (id: string) => void;
  isLoading: boolean;
}

const MidpointSubstancesTable = ({
  substances,
  onDelete,
  isLoading,
}: MidpointSubstancesTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>       
          <TableHead>Compartment</TableHead>
          <TableHead>CAS number</TableHead>
          <TableHead>Molecular formula</TableHead>    
          <TableHead>Individualist</TableHead>
          <TableHead>Hierarchist</TableHead>
          <TableHead>Egalitarian</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      {isLoading ? (
        <SkeletonTable columns={8} rows={10} />
      ) : (
        <TableBody>
          {substances && substances.length > 0 ? (
            substances.map((substance) => (
              <TableRow key={substance.id}>
                <TableCell className="font-medium">{substance.name}</TableCell>                  
                <TableCell>{substance.compartmentName}</TableCell>
                <TableCell>{substance.casNumber}</TableCell>
                <TableCell>{substance.molecularFormula}</TableCell>             
                <TableCell>{substance.individualist}</TableCell>
                <TableCell>{substance.hierarchist}</TableCell>
                <TableCell>{substance.egalitarian}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(substance.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="sr-only">Delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                No midpoint substances found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      )}
    </Table>
  );
};

export default MidpointSubstancesTable;
