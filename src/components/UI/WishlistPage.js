import { useContext } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "../../context/WishlistContext";
import { X } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist, clearWishlist } =
    useContext(WishlistContext);
  console.log("Wishlist items:", wishlist);

  const hasItems = wishlist && wishlist.length > 0;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-blue-50 w-full pt-8 pb-16 md:pt-12 md:pb-20">
      {/* Page Title with decorative elements */}
      <div className="text-center mb-8 md:mb-12 px-4">
        <div className="inline-block">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 relative">
            Your Wishlist
            <div className="absolute -bottom-2 left-0 right-0 h-1 bg-blue-600 rounded-full transform scale-x-75"></div>
          </h1>
        </div>
        <div>
          <p className="text-gray-600 mt-3 max-w-lg mx-auto">
            Items you've saved for later to revisit and explore
          </p>
        </div>
      </div>

      {/* Clear All Button - Added here, right after the title and before the content */}
      {hasItems && (
        <div className="container mx-auto px-3 md:px-6 max-w-7xl flex justify-end mb-4">
          <button
            onClick={clearWishlist}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-red-50 text-red-600 hover:bg-red-100 transition-colors rounded-lg shadow-sm hover:shadow"
          >
            <X size={16} />
            <span>Clear All</span>
          </button>
        </div>
      )}

      <div className="container mx-auto px-3 md:px-6 max-w-7xl">
        {wishlist.length === 0 ? (
          <div className="text-center py-12 md:py-16 bg-white rounded-lg shadow-md border border-gray-100 max-w-2xl mx-auto">
            <div className="mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 mx-auto text-gray-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <p className="text-gray-700 text-lg mb-6">
              Your wishlist is currently empty.
            </p>
            <p className="text-gray-500 mb-8 max-w-sm mx-auto">
              Browse our collection and add items you love to your wishlist for
              easy access later.
            </p>
            <Link
              to="/"
              className="bg-blue-600 text-white py-3 px-8 rounded-md hover:bg-blue-700 transition shadow-md hover:shadow-lg inline-flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              Start Shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Desktop and tablet view - Table layout */}
            <div className="hidden md:block bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <div className="max-h-[700px] overflow-y-auto">
                  <table className="w-full">
                    <thead className="sticky top-0 bg-gradient-to-r from-blue-600 to-indigo-600 text-white z-10">
                      <tr>
                        <th className="py-4 px-6 text-left font-bold">Image</th>
                        <th className="py-4 px-6 text-left font-bold">
                          Product Name
                        </th>
                        <th className="py-4 px-6 text-left font-bold">
                          Description
                        </th>
                        <th className="py-4 px-6 text-left font-bold">Price</th>
                        <th className="py-4 px-6 text-center font-bold">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {wishlist.map((item) => (
                        <tr
                          key={item.id}
                          className="border-b hover:bg-blue-50 transition-colors"
                        >
                          {/* Product Image */}
                          <td className="py-6 px-6">
                            <Link
                              to={`/product/${item.id}`}
                              className="block w-24 h-24 overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow"
                            >
                              <img
                                src={item.img || item.image}
                                alt={item.name || item.itemName}
                                className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                              />
                            </Link>
                          </td>

                          {/* Product Name with Color and Size */}
                          <td className="py-6 px-6">
                            <Link
                              to={`/product/${item.id}`}
                              className="text-blue-600 hover:text-blue-800 transition font-medium text-lg"
                            >
                              {item.name || item.itemName}
                            </Link>
                            {/* Color and Size tags */}
                            <div className="flex flex-wrap gap-2 mt-2">
                              {item.selectedColor && (
                                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                  Color: {item.selectedColor}
                                </span>
                              )}
                              {item.selectedSize && (
                                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
                                  Size: {item.selectedSize}
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Description */}
                          <td className="py-6 px-6 text-gray-600 max-w-md">
                            {item.description && item.description.length > 100
                              ? item.description.substring(0, 100) + "..."
                              : item.description || "No description available"}
                          </td>

                          {/* Unit Price */}
                          <td className="py-6 px-6 font-bold text-lg">
                            <span className="bg-green-100 text-green-800 py-1 px-3 rounded-full">
                              ₹{item.price ? item.price.toFixed(2) : "0.00"}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="py-6 px-6 text-center">
                            <button
                              onClick={() => removeFromWishlist(item.id)}
                              className="text-white bg-red-500 hover:bg-red-600 p-2 rounded-full transition-colors shadow hover:shadow-md"
                              aria-label="Remove from wishlist"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Mobile view - Card layout */}
            <div className="md:hidden space-y-4">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-xl shadow-md border border-gray-200 overflow-hidden"
                >
                  <div className="flex items-center p-4 border-b border-gray-100">
                    <Link
                      to={`/product/${item.id}`}
                      className="block w-20 h-20 overflow-hidden rounded-lg shadow-sm mr-4"
                    >
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/product/${item.id}`}
                        className="text-blue-600 hover:text-blue-800 transition font-medium block truncate"
                      >
                        {item.name || `Product ${item.id}`}
                      </Link>
                      <div className="mt-1 text-green-600 font-bold">
                        ₹{item.price ? item.price.toFixed(2) : "0.00"}
                      </div>
                      {/* Color and Size tags for mobile */}
                      <div className="flex flex-wrap gap-2 mt-2">
                        {item.selectedColor && (
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                            Color: {item.selectedColor}
                          </span>
                        )}
                        {item.selectedSize && (
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
                            Size: {item.selectedSize}
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      className="text-red-500 hover:text-red-700 p-2"
                      aria-label="Remove from wishlist"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4 text-sm text-gray-600">
                    {(item.description && item.description.length > 80
                      ? item.description.substring(0, 80) + "..."
                      : item.description) || "No description available"}
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping Button */}
            <div className="mt-8 flex justify-center">
              <Link
                to="/"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-8 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-lg flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Continue Shopping
              </Link>
            </div>
          </>
        )}
      </div>

      {/* Wishlist Summary - Only show when items exist */}
      {wishlist.length > 0 && (
        <div className="mt-10 container mx-auto px-3 md:px-6 max-w-7xl">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 shadow-md border border-blue-100">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <h2 className="text-lg font-semibold text-gray-800">
                  Wishlist Summary
                </h2>
                <p className="text-gray-600 mt-1">
                  You have {wishlist.length} item
                  {wishlist.length !== 1 ? "s" : ""} in your wishlist
                </p>
              </div>
              <div className="flex gap-4">
                <Link
                  to="/shop"
                  className="bg-white text-blue-600 border border-blue-200 px-4 py-2 rounded-lg hover:bg-blue-50 transition shadow-sm"
                >
                  Explore More
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
