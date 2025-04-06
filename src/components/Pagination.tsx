
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // If total pages is less than max to show, display all pages
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // Always include first page
      pageNumbers.push(1);
      
      // Calculate range around current page
      let start = Math.max(2, currentPage - 1);
      let end = Math.min(totalPages - 1, currentPage + 1);
      
      // Adjust to show maxPagesToShow - 2 pages (excluding first and last)
      if (end - start < maxPagesToShow - 3) {
        if (start === 2) {
          end = Math.min(totalPages - 1, start + (maxPagesToShow - 3));
        } else if (end === totalPages - 1) {
          start = Math.max(2, end - (maxPagesToShow - 3));
        }
      }
      
      // Add ellipsis after first page if needed
      if (start > 2) {
        pageNumbers.push("...");
      }
      
      // Add pages in range
      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }
      
      // Add ellipsis before last page if needed
      if (end < totalPages - 1) {
        pageNumbers.push("...");
      }
      
      // Always include last page
      pageNumbers.push(totalPages);
    }
    
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      {pageNumbers.map((page, idx) => (
        page === "..." ? 
        <span key={`ellipsis-${idx}`} className="px-2">...</span> : 
        <Button
          key={`page-${page}`}
          variant={currentPage === page ? "default" : "outline"}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          className="min-w-[40px]"
        >
          {page}
        </Button>
      ))}
      
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Pagination;
