import React, { useState, useEffect } from "react";
import { useCompare } from "../../context/CompareContext";
import { motion } from "framer-motion";
import {
  X,
  ShoppingCart,
  ArrowLeft,
  AlertTriangle,
  Loader,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

function ComparePage() {
  const {
    compareItems,
    RemoveCompareItem,
    clearCompare,
    loading,
    error,
    products,
  } = useCompare();
  const { addToCart } = useCart();
  const [hoveredItem, setHoveredItem] = useState(null);

  console.log("my compare", compareItems);
  // For debugging
  useEffect(() => {
    console.log("Compare Items:", compareItems);
  }, [compareItems]);

  // Check if there are items to compare
  const hasItems = compareItems && compareItems.length > 0;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  if (loading) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center">
        <Loader size={48} className="animate-spin text-blue-600 mb-4" />
        <p className="text-lg text-gray-600">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center justify-center bg-red-50 rounded-lg">
        <AlertTriangle size={48} className="text-red-600 mb-4" />
        <h2 className="text-xl font-semibold text-red-700 mb-2">
          Error Loading Products
        </h2>
        <p className="text-gray-700">{error}</p>
        <Link
          to="/shop"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              to="/shop"
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft size={16} className="mr-1" />
              <span>Back to Shopping</span>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-black text-center mt-2 sm:mt-0">
              Product Comparison
            </h1>
          </div>

          {hasItems && (
            <button
              onClick={clearCompare}
              className="flex items-center gap-2 px-4 py-2 text-sm bg-red-50 text-red-600 hover:bg-red-100 transition-colors rounded-lg shadow-sm hover:shadow"
            >
              <X size={16} />
              <span>Clear All</span>
            </button>
          )}
        </div>
        <div className="h-1 w-20 bg-blue-600 rounded-full mt-2 mx-auto sm:mx-0"></div>
      </motion.div>

      {/* Empty State */}
      {!hasItems && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-gray-50 rounded-lg border border-dashed border-gray-300"
        >
          <AlertTriangle size={48} className="mx-auto text-amber-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No Products to Compare
          </h2>
          <p className="text-gray-500 mb-6 px-4">
            Add products to comparison to see how they stack up against each
            other.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            Browse Products
          </Link>
        </motion.div>
      )}

      {/* Compare Table for larger screens */}
      {hasItems && (
        <>
          {/* Desktop/Tablet View */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="hidden sm:block bg-white border rounded-lg shadow-lg overflow-hidden"
          >
            {/* Fixed header with sticky product names */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: `200px repeat(${compareItems.length}, minmax(180px, 1fr))`,
              }}
            >
              <div className="p-4 font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white flex items-center justify-center">
                Compare Items
              </div>
              {compareItems.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  className="p-4 relative flex items-center justify-between bg-gradient-to-r from-blue-600 to-purple-600 text-white"
                >
                  <h3 className="font-sm text-emerald-50 text-base truncate">
                    {product.itemName || product.name}
                  </h3>
                  <button
                    onClick={() => RemoveCompareItem(product.id)}
                    className="text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-1 transition-all"
                  >
                    <X size={14} />
                  </button>
                </motion.div>
              ))}
            </div>
            {/* Product Images */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: `200px repeat(${compareItems.length}, minmax(180px, 1fr))`,
              }}
            >
              <div className="p-4 bg-gray-50 font-medium flex items-center justify-center">
                Product Image
              </div>
              {compareItems.map((product) => (
                <motion.div
                  key={`img-${product.id}`}
                  variants={itemVariants}
                  className="p-6 flex justify-center items-center relative group"
                  onMouseEnter={() => setHoveredItem(product.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="relative transition-transform duration-300 transform group-hover:scale-110">
                    <Link
                      to={`/product/${product.pid || product.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <img
                        src={product.img}
                        alt={product.itemName || "Product Image"}
                        className="w-32 h-32 object-contain rounded-lg"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "/placeholder-image.jpg"; // Fallback image
                        }}
                      />
                    </Link>

                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors rounded-md"></div>
                  </div>

                  {/* Quick actions on hover */}
                  <div
                    className={`absolute bottom-2 left-0 right-0 flex justify-center transition-opacity duration-300 ${hoveredItem === product.id ? "opacity-100" : "opacity-0"
                      }`}
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        const rect = e.currentTarget.getBoundingClientRect();
                        addToCart(product, { top: rect.top, left: rect.left });
                      }}
                      className="bg-green-600 text-white text-sm px-3 py-1 rounded-full flex items-center gap-1 hover:bg-green-700 transition-colors shadow-md"
                    >
                      <ShoppingCart size={14} />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
            {/* Price Row */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: `200px repeat(${compareItems.length}, minmax(180px, 1fr))`,
              }}
            >
              <div className="p-4 bg-gray-50 font-medium flex items-center justify-center">
                Price
              </div>
              {compareItems.map((product) => (
                <motion.div
                  key={`price-${product.id}`}
                  variants={itemVariants}
                  className="p-4 text-center"
                >
                  <span className="text-lg font-semibold text-black">
                    ₹{product.price}
                  </span>
                </motion.div>
              ))}
            </div>
            {/* Original Price Row */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: `200px repeat(${compareItems.length}, minmax(180px, 1fr))`,
              }}
            >
              <div className="p-4 bg-gray-50 font-medium flex items-center justify-center">
                Original Price
              </div>
              {compareItems.map((product) => (
                <motion.div
                  key={`original-price-${product.id}`}
                  variants={itemVariants}
                  className="p-4 text-center"
                >
                  {product.originalPrice ? (
                    <div className="flex flex-col items-center">
                      <span className="text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-xs px-2 py-1 bg-red-100 text-red-600 rounded-full mt-1">
                          {Math.round(
                            (1 - product.price / product.originalPrice) * 100
                          )}
                          % OFF
                        </span>
                      )}
                    </div>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </motion.div>
              ))}
            </div>
            {/* Description Row */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: `200px repeat(${compareItems.length}, minmax(180px, 1fr))`,
              }}
            >
              <div className="p-4 bg-gray-50 font-medium flex items-center justify-center">
                Description
              </div>
              {compareItems.map((product) => (
                <motion.div
                  key={`desc-${product.id}`}
                  variants={itemVariants}
                  className="p-4 text-center text-sm text-gray-600"
                >
                  {product.description || "No description available"}
                </motion.div>
              ))}
            </div>

            {/* Colors Row */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: `200px repeat(${compareItems.length}, minmax(180px, 1fr))`,
              }}
            >
              <div className="p-4 bg-gray-50 font-medium flex items-center justify-center">
                Colors
              </div>
              {compareItems.map((product) => (
                <motion.div
                  key={`desc-${product.id}`}
                  variants={itemVariants}
                  className="p-4 text-center text-sm text-gray-600"
                >
                  {product.selectedColor || "No Color Available"}
                </motion.div>
              ))}
            </div>
            {/* Brand Row */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: `200px repeat(${compareItems.length}, minmax(180px, 1fr))`,
              }}
            >
              <div className="p-4 bg-gray-50 font-medium flex items-center justify-center">
                Brand
              </div>
              {compareItems.map((product) => (
                <motion.div
                  key={`brand-${product.id}`}
                  variants={itemVariants}
                  className="p-4 text-center"
                >
                  {product.brand ? (
                    <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                      {product.brand}
                    </span>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </motion.div>
              ))}
            </div>
            {/* Material Row */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: `200px repeat(${compareItems.length}, minmax(180px, 1fr))`,
              }}
            >
              <div className="p-4 bg-gray-50 font-medium flex items-center justify-center">
                Material
              </div>
              {compareItems.map((product) => (
                <motion.div
                  key={`material-${product.id}`}
                  variants={itemVariants}
                  className="p-4 text-center"
                >
                  {product.material ? (
                    <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
                      {product.material}
                    </span>
                  ) : (
                    <span className="text-gray-400">N/A</span>
                  )}
                </motion.div>
              ))}
            </div>
            {/* Availability Row */}
            <div
              className="grid"
              style={{
                gridTemplateColumns: `200px repeat(${compareItems.length}, minmax(180px, 1fr))`,
              }}
            >
              <div className="p-4 bg-gray-50 font-medium flex items-center justify-center">
                Availability
              </div>
              {compareItems.map((product) => (
                <motion.div
                  key={`stock-${product.id}`}
                  variants={itemVariants}
                  className="p-4 flex justify-center"
                >
                  {product.isOutOfStock ? (
                    <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                      Out of Stock
                    </span>
                  ) : (
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                      In Stock
                    </span>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Mobile View - Card Style */}
          <div className="sm:hidden space-y-6">
            {compareItems.map((product) => (
              <motion.div
                key={`mobile-${product.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 flex justify-between items-center">
                  <h3 className="font-sm text-emerald-50 text-xl truncate">
                    {product.itemName || product.name}
                  </h3>
                  <button
                    onClick={() => RemoveCompareItem(product.id)}
                    className="text-white/70 hover:text-white bg-black/20 hover:bg-black/40 rounded-full p-1 transition-all"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="p-4 flex justify-center">
                  <Link to={`/product/${product.pid || product.id}`}>
                    <img
                      src={product.img || product.image}
                      alt={product.name || "Product Image"}
                      className="w-40 h-40 object-contain rounded-lg"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder-image.jpg"; // Fallback image
                      }}
                    />
                  </Link>
                </div>

                <div className="grid grid-cols-2 gap-2 p-4 border-t">
                  <div className="text-gray-500 font-medium">Price:</div>
                  <div className="text-green-600 font-bold">
                    ₹{product.price}
                  </div>

                  <div className="text-gray-500 font-medium">
                    Original Price:
                  </div>
                  <div>
                    {product.originalPrice ? (
                      <div className="flex flex-col">
                        <span className="text-gray-500 line-through">
                          ₹{product.originalPrice}
                        </span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm px-2 py-1 bg-red-100 text-red-600 rounded-full w-fit mt-1">
                            {Math.round(
                              (1 - product.price / product.originalPrice) * 100
                            )}
                            % OFF
                          </span>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </div>

                  <div className="text-gray-500 font-medium">Description:</div>
                  <div className="text-sm text-gray-600">
                    {product.description || "No description available"}
                  </div>

                  <div className="text-gray-500 font-medium">Brand:</div>
                  <div>
                    {product.brand ? (
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium">
                        {product.brand}
                      </span>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </div>

                  <div className="text-gray-500 font-medium">Material:</div>
                  <div>
                    {product.material ? (
                      <span className="px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium">
                        {product.material}
                      </span>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </div>

                  <div className="text-gray-500 font-medium">Availability:</div>
                  <div>
                    {product.isOutOfStock ? (
                      <span className="px-3 py-1 bg-red-100 text-red-600 rounded-full text-sm font-medium">
                        Out of Stock
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                        In Stock
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-4 border-t flex justify-center">
                  <button
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      addToCart(product, { top: rect.top, left: rect.left });
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-green-700 transition-colors shadow-md w-full justify-center"
                  >
                    <ShoppingCart size={16} />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      )}

      {/* Related Products Suggestion */}
      {hasItems && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 shadow-md"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="h-6 w-1 bg-blue-600 rounded-full"></div>
            <h2 className="text-xl font-bold text-gray-800">
              You might also like
            </h2>
          </div>
          <p className="text-gray-600 mb-6">
            Looking for more options? Check out products similar to the ones
            you're comparing.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
          >
            Explore More
          </Link>
        </motion.div>
      )}
    </div>
  );
}

export default ComparePage;
