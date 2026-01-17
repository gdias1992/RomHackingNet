import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { cn } from "@/utils/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

/**
 * Pagination component with page navigation.
 */
export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className,
}: PaginationProps) {
  const canGoPrev = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages: (number | "ellipsis")[] = [];
    const showEllipsisStart = currentPage > 3;
    const showEllipsisEnd = currentPage < totalPages - 2;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (showEllipsisStart) {
        pages.push("ellipsis");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (showEllipsisEnd) {
        pages.push("ellipsis");
      }

      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => onPageChange(1)}
        disabled={!canGoPrev}
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!canGoPrev}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <div className="flex items-center gap-1 mx-1">
        {getPageNumbers().map((page, idx) =>
          page === "ellipsis" ? (
            <span
              key={`ellipsis-${idx}`}
              className="px-2 text-muted-foreground"
            >
              ...
            </span>
          ) : (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              className="h-8 w-8 p-0"
              onClick={() => onPageChange(page)}
            >
              {page}
            </Button>
          )
        )}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!canGoNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8"
        onClick={() => onPageChange(totalPages)}
        disabled={!canGoNext}
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  );
}
