'use client';

import { useState, useCallback, useEffect } from 'react';

type PaginationProps = {
  /** Total number of pages available */
  totalPages: number;
  /** Current active page (controlled mode) */
  currentPage?: number;
  /** Initial page (uncontrolled mode) */
  initialPage?: number;
  /** Callback when page changes */
  onPageChange?: (page: number) => void;
  /** Additional class names */
  className?: string;
  /** Show quick jump input */
  showQuickJump?: boolean;
  /** Show page info text */
  showPageInfo?: boolean;
};

export default function Pagination({
  totalPages,
  currentPage: controlledPage,
  initialPage = 1,
  onPageChange,
  className = '',
  showQuickJump = false,
  showPageInfo = false,
}: PaginationProps) {
  // State for uncontrolled mode
  const [uncontrolledPage, setUncontrolledPage] = useState(initialPage);
  
  // Determine if component is controlled
  const isControlled = controlledPage !== undefined;
  const currentPage = isControlled ? controlledPage : uncontrolledPage;

  // State for quick jump input
  const [quickJumpPage, setQuickJumpPage] = useState('');

  // Reset quick jump input when page changes
  useEffect(() => {
    setQuickJumpPage('');
  }, [currentPage]);

  // Handle page change
  const goToPage = useCallback((page: number) => {
    const newPage = Math.max(1, Math.min(page, totalPages));
    
    if (!isControlled) {
      setUncontrolledPage(newPage);
    }
    
    onPageChange?.(newPage);
  }, [isControlled, totalPages, onPageChange]);

  const nextPage = useCallback(() => goToPage(currentPage + 1), [currentPage, goToPage]);
  const prevPage = useCallback(() => goToPage(currentPage - 1), [currentPage, goToPage]);

  // Handle quick jump submission
  const handleQuickJump = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    const page = parseInt(quickJumpPage);
    if (!isNaN(page)) goToPage(page);
  }, [quickJumpPage, goToPage]);

  // Don't render if only one page
  if (totalPages <= 1) return null;

  // Generate page range with ellipsis
  const getPageRange = () => {
    const delta = 1;
    const range: (number | string)[] = [];

    // Middle range around current page
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    // Add ellipsis if needed
    if (currentPage - delta > 2) range.unshift('...');
    if (currentPage + delta < totalPages - 1) range.push('...');

    // Always include first and last page
    range.unshift(1);
    if (totalPages > 1) range.push(totalPages);

    return range;
  };

  const pages = getPageRange();

  return (
    <div className={`flex flex-col items-center gap-4 ${className}`}>
      <div className="flex flex-wrap justify-center items-center gap-2">
        <button
          onClick={prevPage}
          disabled={currentPage <= 1}
          className="px-3 py-1 rounded border text-sm bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Previous page"
        >
          Previous
        </button>

        {pages.map((page, idx) =>
          typeof page === 'number' ? (
            <button
              key={`page-${page}`}
              onClick={() => goToPage(page)}
              className={`px-3 py-1 rounded border text-sm min-w-[40px] transition-colors ${
                currentPage === page
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
              aria-current={currentPage === page ? 'page' : undefined}
            >
              {page}
            </button>
          ) : (
            <span key={`ellipsis-${idx}`} className="px-2 text-gray-500">
              {page}
            </span>
          )
        )}

        <button
          onClick={nextPage}
          disabled={currentPage >= totalPages}
          className="px-3 py-1 rounded border text-sm bg-gray-50 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          aria-label="Next page"
        >
          Next
        </button>
      </div>

      {(showQuickJump || showPageInfo) && (
        <div className="flex flex-wrap justify-center items-center gap-4 mt-2">
          {showPageInfo && (
            <div className="text-sm text-gray-600">
              Page {currentPage} of {totalPages}
            </div>
          )}

          {showQuickJump && (
            <form onSubmit={handleQuickJump} className="flex items-center gap-2">
              <span className="text-sm text-gray-600">Go to:</span>
              <input
                type="number"
                min={1}
                max={totalPages}
                value={quickJumpPage}
                onChange={(e) => setQuickJumpPage(e.target.value)}
                className="w-16 px-2 py-1 border rounded text-sm"
                aria-label="Page number"
              />
              <button
                type="submit"
                className="px-2 py-1 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors"
              >
                Go
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}