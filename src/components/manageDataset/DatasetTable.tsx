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

  const renderSystemBoundary = (from: string, to: string) => (
    <div className="inline-flex items-center px-3 py-1 rounded-lg">
      <span className="text-purple-600 font-medium">{from}</span>
      <span className="mx-2 text-gray-500">to</span>
      <span className="text-blue-600 font-medium">{to}</span>
    </div>
  );

  return (
    <Table>
      <TableHeader>
        <TableRow className="bg-gray-100 dark:bg-gray-800">
          <TableHead>Name</TableHead>
          <TableHead>System boundary</TableHead>
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
                <TableCell> {renderSystemBoundary(
                    dataset.systemBoundary.boundaryFrom,
                    dataset.systemBoundary.boundaryTo
                  )}</TableCell>
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
