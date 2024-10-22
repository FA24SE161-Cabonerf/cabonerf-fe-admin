import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { useState, useEffect } from "react";

interface PaginationProps {
  page: number;
  pageSize: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  onPageSizeChange: (newPageSize: number) => void;
}

const Pagination = (
  {
    page,
    pageSize,
    totalPages,
    onPageChange,
    onPageSizeChange,
  }: PaginationProps = {
    page: 1,
    pageSize: 10,
    totalPages: 1,
    onPageChange: () => {},
    onPageSizeChange: () => {},
  }
) => {
  const [inputPage, setInputPage] = useState(page.toString());

  useEffect(() => {
    setInputPage(page.toString());
  }, [page]);

  const handleFirstPage = () => onPageChange(1);

  const handlePreviousPage = () => {
    const currentInputPage = parseInt(inputPage);
    if (
      !isNaN(currentInputPage) &&
      currentInputPage > 1 &&
      currentInputPage <= totalPages
    ) {
      onPageChange(currentInputPage - 1);
    } else {
      onPageChange(Math.max(page - 1, 1));
    }
  };

  const handleNextPage = () => {
    const currentInputPage = parseInt(inputPage);
    if (
      !isNaN(currentInputPage) &&
      currentInputPage > page &&
      currentInputPage <= totalPages
    ) {
      onPageChange(currentInputPage);
    } else {
      onPageChange(Math.min(page + 1, totalPages));
    }
  };

  const handleLastPage = () => onPageChange(totalPages);

  const handleInputPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputPage(e.target.value);
  };

  const handleInputPageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPage = parseInt(inputPage);
    if (!isNaN(newPage) && newPage > 0 && newPage <= totalPages) {
      onPageChange(newPage);
    } else {
      setInputPage(page.toString());
    }
  };

  return (
    <div className="flex justify-between items-center mt-4">
      <div className="flex items-center space-x-2 w-48">
        <span>Rows per page:</span>
        <Select
          value={pageSize.toString()}
          onValueChange={(value) => {
            onPageSizeChange(Number(value));
            onPageChange(1);
          }}
        >
          <SelectTrigger className="w-[70px]">
            <SelectValue placeholder="5" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">5</SelectItem>
            <SelectItem value="10">10</SelectItem>
            <SelectItem value="20">20</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex-1 flex justify-center items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          onClick={handleFirstPage}
          disabled={page === 1}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handlePreviousPage}
          disabled={page === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <form onSubmit={handleInputPageSubmit} className="flex items-center">
          <Input
            type="number"
            value={inputPage}
            onChange={handleInputPageChange}
            className="w-16 text-center"
            min={1}
            max={totalPages}
          />
          <span className="mx-2">of {totalPages}</span>
        </form>
        <Button
          variant="outline"
          size="icon"
          onClick={handleNextPage}
          disabled={page === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={handleLastPage}
          disabled={page === totalPages}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default Pagination;
