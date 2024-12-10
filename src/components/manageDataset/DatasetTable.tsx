import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Info } from "lucide-react";
import SkeletonTable from "@/components/sketeton/SkeletonTable";
import { Dataset } from "@/types/dataset";

interface DatasetTableProps {
  datasets: Dataset[] | undefined;
  isLoading: boolean;
  onViewDetails: (dataset: Dataset) => void;
}

const DatasetTable = ({
  datasets,
  isLoading,
  onViewDetails,
}: DatasetTableProps) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Boundary From</TableHead>
          <TableHead>Boundary To</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      {isLoading ? (
        <SkeletonTable columns={4} rows={5} />
      ) : (
        <TableBody>
          {datasets && datasets.length > 0 ? (
            datasets.map((dataset) => (
              <TableRow
                key={dataset.id}
                onClick={() => onViewDetails(dataset)}
                className="cursor-pointer"
              >
                <TableCell className="font-medium">{dataset.name}</TableCell>
                <TableCell>{dataset.systemBoundary.boundaryFrom}</TableCell>
                <TableCell>{dataset.systemBoundary.boundaryTo}</TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onViewDetails(dataset)}
                  >
                    <Info className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No datasets found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      )}
    </Table>
  );
};

export default DatasetTable;
