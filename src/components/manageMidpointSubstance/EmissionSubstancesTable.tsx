import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { EmissionSubstance } from "@/types/emissionSubstance";
import { useEmissionSubstances } from "@/api/manageMidpointSubstance";
import { ScrollArea } from "@/components/ui/scroll-area";

interface EmissionSubstancesTableProps {
  onSelect: (substance: EmissionSubstance) => void;
}

const EmissionSubstancesTable = ({ onSelect }: EmissionSubstancesTableProps) => {
  const [keyword, setKeyword] = useState("");
  const { data: emissionSubstancesData, isLoading, isError, refetch } = useEmissionSubstances(keyword);

  useEffect(() => {
    if (keyword.trim()) {
      const debounce = setTimeout(() => {
        refetch();
      }, 300);
      return () => clearTimeout(debounce);
    }
  }, [keyword, refetch]);

  if (isError) return <p>Error loading emission substances</p>;

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search emission substances..."
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      {isLoading ? (
        <p>Loading...</p>
      ) : emissionSubstancesData && emissionSubstancesData.data && emissionSubstancesData.data.length > 0 ? (
        <ScrollArea className="h-[300px] rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[200px]">Name</TableHead>
                <TableHead>Chemical Name</TableHead>
                <TableHead>Compartment</TableHead>
                <TableHead>Unit</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {emissionSubstancesData.data.map((substance) => (
                <TableRow
                  key={substance.id}
                  onClick={() => onSelect(substance)}
                  className="cursor-pointer "
                >
                  <TableCell className="font-medium">{substance.emissionSubstance?.name || 'N/A'}</TableCell>
                  <TableCell>{substance.emissionSubstance?.chemicalName || 'N/A'}</TableCell>
                  <TableCell>{substance.emissionCompartment?.name || 'N/A'}</TableCell>
                  <TableCell>{substance.unit?.name || 'N/A'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      ) : (
        <p>{keyword.trim() ? "No emission substances found. Try a different search term." : "Start typing to search for emission substances."}</p>
      )}
    </div>
  );
};

export default EmissionSubstancesTable;