import { Skeleton } from "@/components/ui/skeleton";

const SkeletonTable = () => {
  return (
    <div className="w-full">
      {/* Table Header */}
      <div className="mb-4 border-b pb-2">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>

      {/* Table Body */}
      <div className="space-y-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <div className="flex space-x-2">
              <Skeleton className="h-6 w-[80px]" />
              <Skeleton className="h-6 w-[80px]" />
            </div>
          </div>
        ))}
      </div>

      {/* Table Footer */}
      <div className="mt-6 flex justify-between items-center">
        <Skeleton className="h-8 w-[200px]" />
        <div className="flex space-x-2">
          <Skeleton className="h-8 w-[32px]" />
          <Skeleton className="h-8 w-[32px]" />
          <Skeleton className="h-8 w-[32px]" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonTable;
