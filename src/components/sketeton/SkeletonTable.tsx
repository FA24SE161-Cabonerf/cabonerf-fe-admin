import { Skeleton } from "@/components/ui/skeleton";
import {
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

interface SkeletonTableProps {
  columns: number;
  rows: number;
  showHeader?: boolean;
}

const SkeletonTable = ({ columns, rows, showHeader = false }: SkeletonTableProps) => {
  return (
    <TableBody>
      {showHeader && (
        <TableRow>
          {Array.from({ length: columns }).map((_, index) => (
            <TableCell key={index}>
              <Skeleton className="h-8 w-full" />
            </TableCell>
          ))}
        </TableRow>
      )}
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <TableRow key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <TableCell key={colIndex}>
              <Skeleton className="h-6 w-full" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
};

export default SkeletonTable;