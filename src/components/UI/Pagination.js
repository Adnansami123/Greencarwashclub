import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";

/**
 * Pagination component
 * @param {Object} props
 * @param {number} props.totalItems - Total number of items to paginate
 * @param {number} props.itemsPerPage - Number of items to display per page
 * @param {number} props.currentPage - Current active page (1-based)
 * @param {Function} props.onPageChange - Function to call when page changes
 * @param {number} props.siblingCount - Number of siblings to show on each side of current page (default: 1)
 * @param {string} props.primaryColor - Primary color for selected page (default: "pink")
 */
function Pagination({
  totalItems,
  itemsPerPage = 12,
  currentPage = 1,
  onPageChange,
  siblingCount = 1,
  primaryColor = "pink",
}) {
  // Calculate total pages
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Generate page ranges to display
  const generatePageRange = () => {
    // Always show the first page
    const firstPage = 1;
    // Always show the last page
    const lastPage = totalPages;

    // Calculate range around current page
    let startPage = Math.max(currentPage - siblingCount, 1);
    let endPage = Math.min(currentPage + siblingCount, totalPages);

    // Adjust if range is at the start
    if (startPage <= 3) {
      endPage = Math.min(5, totalPages);
      startPage = 1;
    }

    // Adjust if range is at the end
    if (endPage >= totalPages - 2) {
      startPage = Math.max(totalPages - 4, 1);
      endPage = totalPages;
    }

    // Generate the page numbers array
    const pageNumbers = [];

    // Add first page if needed
    if (startPage > 1) {
      pageNumbers.push(1);
      // Add dots if there's a gap
      if (startPage > 2) {
        pageNumbers.push("dots1");
      }
    }

    // Add pages in the middle
    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    // Add last page if needed
    if (endPage < totalPages) {
      // Add dots if there's a gap
      if (endPage < totalPages - 1) {
        pageNumbers.push("dots2");
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = generatePageRange();

  // Handle page change
  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    onPageChange(page);
  };

  // Get color class based on primary color
  const getColorClass = () => {
    switch (primaryColor) {
      case "pink":
        return "bg-pink-500 hover:bg-pink-600";
      case "blue":
        return "bg-blue-500 hover:bg-blue-600";
      case "green":
        return "bg-green-500 hover:bg-green-600";
      case "purple":
        return "bg-purple-500 hover:bg-purple-600";
      case "red":
        return "bg-red-500 hover:bg-red-600";
      case "black":
        return "bg-black hover:bg-gray-800";
      default:
        return "bg-pink-500 hover:bg-pink-600";
    }
  };

  return (
    <div className="flex justify-center mt-10">
      <div className="flex items-center space-x-2">
        {/* Previous Button */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-2 sm:px-3 py-2 border border-gray-300 rounded-l-md flex items-center justify-center transition-all ${
            currentPage === 1
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gray-50"
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} className="text-gray-600" />
          <span className="hidden sm:inline ml-1">Prev</span>
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => {
          if (page === "dots1" || page === "dots2") {
            return (
              <span
                key={`dots-${index}`}
                className="w-10 h-10 flex items-center justify-center text-gray-500"
              >
                <MoreHorizontal size={16} />
              </span>
            );
          }

          return (
            <button
              key={`page-${page}`}
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 font-medium rounded-md transition-all flex items-center justify-center ${
                currentPage === page
                  ? `${getColorClass()} text-white`
                  : "border border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
              aria-current={currentPage === page ? "page" : undefined}
              aria-label={`Page ${page}`}
            >
              {page}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-2 sm:px-3 py-2 border border-gray-300 rounded-r-md flex items-center justify-center transition-all ${
            currentPage === totalPages
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gray-50"
          }`}
          aria-label="Next page"
        >
          <span className="hidden sm:inline mr-1">Next</span>
          <ChevronRight size={16} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}

export default Pagination;
