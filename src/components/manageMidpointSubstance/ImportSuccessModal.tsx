import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MidpointSubstance } from "@/types/midpointSubstance";

interface ImportSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  importedData: MidpointSubstance[];
}

export function ImportSuccessModal({
  isOpen,
  onClose,
  importedData,
}: ImportSuccessModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Successfully Imported Data</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow">
          <Table>
            <TableHeader>
              <TableRow>           
                <TableHead>CAS number</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Chemical name</TableHead>
                <TableHead>Molecular formula</TableHead>
                <TableHead>Alternative molecular formula</TableHead>
                <TableHead>Emission compartment</TableHead>
                <TableHead>Individualist</TableHead>
                <TableHead>Hierarchist</TableHead>
                <TableHead>Egalitarian</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {importedData.map((substance) => (
                <TableRow key={substance.id}>
                  <TableCell>{substance.casNumber}</TableCell>
                  <TableCell>{substance.name}</TableCell>
                  <TableCell>{substance.chemicalName}</TableCell>
                  <TableCell>{substance.molecularFormula}</TableCell>
                  <TableCell>{substance.alternativeFormula}</TableCell>
                  <TableCell>{substance.compartmentName}</TableCell>
                  <TableCell>{substance.individualist}</TableCell>
                  <TableCell>{substance.hierarchist}</TableCell>
                  <TableCell>{substance.egalitarian}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
