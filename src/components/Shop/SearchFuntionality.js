import { Button } from "antd";
import { useState } from "react";

function SearchFunctionality({ allProducts, onSearchResults }) {
  const [searchTerm, setSearchTerm] = useState("");

  // Handle search input changes
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle search submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      // If search is empty, return all products
      onSearchResults(allProducts);
      return;
    }

    // Filter products based on search term
    const filteredProducts = searchProducts(searchTerm);
    onSearchResults(filteredProducts);
  };

  // Search logic - filter products based on search term
  const searchProducts = (term) => {
    const searchTermLower = term.toLowerCase().trim();

    return allProducts.filter((product) => {
      return (
        product.itemName?.toLowerCase().includes(searchTermLower) ||
        product.description?.toLowerCase().includes(searchTermLower) ||
        product.material?.toLowerCase().includes(searchTermLower) ||
        product.brand?.toLowerCase().includes(searchTermLower) ||
        product.nameEng?.toLowerCase().includes(searchTermLower) ||
        product.itemSpecification?.some((spec) =>
          spec.nameEng?.toLowerCase().includes(searchTermLower)
        ) ||
        product.categories?.some((category) =>
          category.toLowerCase().includes(searchTermLower)
        )
      );
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row items-center gap-2 mb-4"
    >
      <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-2 w-full sm:w-auto">
        <div className="flex w-full gap-2">
          <div className="relative flex-grow">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-pink-500 focus:ring-1 focus:gradient-to-r from-purple-500 via-blue-500 to-indigo-500 transition-all"
            />
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
          <Button
    type="primary"
className="flex-1 py-2 sm:py-3 text-white font-medium rounded transition-colors text-sm sm:text-base flex items-center justify-center"
          >
            Search
          </Button>
        </div>
      </div>
    </form>
  );
}

export default SearchFunctionality;
