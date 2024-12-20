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
import { Download, Trash2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface MidpointSubstancesTableProps {
  substances: MidpointSubstance[] | undefined;
  onDelete: (id: string) => void;
  onExport: () => void;
  isLoading: boolean;
}

const MidpointSubstancesTable = ({
  substances,
  onDelete,
  onExport,
  isLoading,
}: MidpointSubstancesTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-100 dark:bg-gray-800">
          <TableHead>Name</TableHead>       
          <TableHead>Compartment</TableHead>
          <TableHead>CAS number</TableHead>
          <TableHead>Molecular formula</TableHead>  
          <TableHead>Alternative formula</TableHead>      
          <TableHead>Chemical name</TableHead>    
          <TableHead>Individualist</TableHead>
          <TableHead>Hierarchist</TableHead>
          <TableHead>Egalitarian</TableHead>
          <TableHead>
            <div className="flex items-center justify-between">
              <span>Actions</span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={onExport}
                      aria-label="Export midpoint substances"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom">
                    <p>Export</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </TableHead>
        </TableRow>
      </TableHeader>
      {isLoading ? (
        <SkeletonTable columns={10} rows={10} />
      ) : (
        <TableBody>
          {substances && substances.length > 0 ? (
            substances.map((substance) => (
              <TableRow key={substance.id}>
                <TableCell className="font-medium">{substance.name || "-"}</TableCell>                  
                <TableCell>{substance.compartmentName || "-"}</TableCell>
                <TableCell>{substance.casNumber || "-"}</TableCell>
                <TableCell>{substance.molecularFormula || "-"}</TableCell>   
                <TableCell>{substance.alternativeFormula || "-"}</TableCell>    
                <TableCell>{substance.chemicalName || "-"}</TableCell>                            
                <TableCell>{substance.individualist || "-"}</TableCell>
                <TableCell>{substance.hierarchist || "-"}</TableCell>
                <TableCell>{substance.egalitarian || "-"}</TableCell>
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
              <TableCell colSpan={8} className="text-center">
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
