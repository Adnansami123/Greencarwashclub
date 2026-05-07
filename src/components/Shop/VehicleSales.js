import React, { useContext, useEffect, useState } from "react";
import {
  Eye,
  Search,
  Heart,
  Share2,
  ChevronDown,
  Filter,
  Grid,
  List,
  Grid3X3,
  // Share,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  useGetGetItemsByAssetCaetgoryAndCompanyBranchV1Mutation,
  usePostTransactionByUserMutation,
} from "../../store/eCommerceAPI/eCommerceAPI";
import SearchFunctionality from "./SearchFuntionality";
import Compare from "../../assets/images/compare-nav.png";
import { useCart } from "../../context/CartContext";
import { useCompare } from "../../context/CompareContext";
import { WishlistContext } from "../../context/WishlistContext";
import Like from "../../assets/images/heart-outer-black.png";
import LikeFilled from "../../assets/images/heart-filled.png";
import Share from "../../assets/images/share.png";
import Pagination from "../UI/Pagination";
import AuthContext from "../../store/authentication/auth-context";
import { setLoadingModalConfiguration } from "../../store/Slices/ModalLoaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { GeteCommerceList } from "../../store/Slices/ECommercesSlice";
// import BlankImage from "../../assets/images/BlankImage.jpg";
import { Button } from "antd";
import { FaWhatsapp } from "react-icons/fa";

export default function VehicleSales({
  pid,
  itemName,
  description,
  discount,
  salePrice,
  availableStock,
  itemImages,
  rating,
  gstPercentage,
}) {
  const dispatch = useDispatch();

  const [view, setView] = useState("grid"); // grid, list, grid-large
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(2500);
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState(["All Categories"]);
  // const [cart, setCart] = useState([]);
  const { addToCart, cartItems } = useCart();
  const { compareItems, toggleCompare } = useCompare();
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);
  const authCtx = useContext(AuthContext);
  const isInCompare = compareItems.some((item) => item.id === pid);

  const [products, setProducts] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setselectedColors] = useState([]);

  // State for search results
  const [displayedProducts, setDisplayedProducts] = useState([]);
  console.log("displayedProducts", displayedProducts);
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // const [fetch, { data: getFetchData, isSuccess: isFetchDataSuccess }] =
  //   useGetGetItemsByAssetCaetgoryAndCompanyBranchV1Mutation();
  const {
    data: CompanyBranchData,
    code: CompanyBranchCode,
    error: CompanyBranchError,
    loading: CompanyBranchLoading,
  } = useSelector((state) => state.ECommerceSlice);

  if (
    !!CompanyBranchLoading &&
    ["loaded", "error"].includes(CompanyBranchLoading)
  ) {
    dispatch(setLoadingModalConfiguration({ isVisible: false }));
  } else {
    dispatch(setLoadingModalConfiguration({ isVisible: true }));
  }

  // this is Project
  useEffect(() => {
    if (!!CompanyBranchData === false && !!CompanyBranchLoading === false) {
      const data1 = {
        CBXID: process.env.REACT_APP_CBXID,
        CompanyXID: process.env.REACT_APP_CompanyXID,
      };
      dispatch(
        GeteCommerceList({
          data: data1,
        }),
      );
    } else if (CompanyBranchData?.length > 0) {
      setProducts(CompanyBranchData);
      setDisplayedProducts(CompanyBranchData);
    }
  }, [CompanyBranchData]);
  useEffect(() => {
    if (CompanyBranchData?.length > 0) {
      // ✅ Filter only assetCategoryXid = 616
      const filteredData = CompanyBranchData.filter(
        (item) => item.assetCategoryXid === 616,
      );

      setProducts(filteredData);
      setDisplayedProducts(filteredData);
    }
  }, [CompanyBranchData]);
  const [Add, { data: getAddData, isSuccess: isAddSuccess }] =
    usePostTransactionByUserMutation();

  // useEffect(
  //   function Assets() {
  //     dispatch(setLoadingModalConfiguration({ isVisible: true }));

  //     fetch({
  //       CBXID: process.env.REACT_APP_CBXID,
  //       CompanyXID: process.env.REACT_APP_CompanyXID,
  //     });
  //   },
  //   [fetch]
  // );

  useEffect(() => {
    if (!!products && products?.length > 0) {
      // productsData = getFetchData;
      dispatch(setLoadingModalConfiguration({ isVisible: false }));
      // setProducts(getFetchData);
      // setDisplayedProducts(getFetchData);

      // Extract unique categories from products' nameEng field
      const uniqueCategories = ["All Categories"];
      displayedProducts.forEach((product) => {
        if (product.nameEng && !uniqueCategories.includes(product.nameEng)) {
          uniqueCategories.push(product.nameEng);
        }
      });

      setCategories(uniqueCategories);
    }
  }, [products]);

  useEffect(() => {
    if (products?.length > 0) {
      const amounts = products.map((t) => t.salePrice);
      console.log("amounts", amounts);
      const minAmount = Math.min(...amounts);
      console.log("amounts", minAmount);

      const maxAmount = Math.max(...amounts);
      console.log("amounts", maxAmount);

      setMinPrice(minAmount);
      setMaxPrice(maxAmount);

      setPriceRange([minAmount, maxAmount]);
    }
  }, [products]);

  // Add this function to handle color selection
  const handleSizeChange = (size) => {
    setSelectedSizes((prev) => {
      if (size === "All Sizes") {
        return prev.includes("All Sizes") ? [] : ["All Sizes"];
      } else {
        const newSizes = prev.filter((s) => s !== "All Sizes");

        if (newSizes.includes(size)) {
          return newSizes.filter((s) => s !== size);
        } else {
          return [...newSizes, size];
        }
      }
    });
  };

  // Pagination handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // First, I need to fix the handleAddToCart function to properly add the product to the cart
  const handleAddToCart = (e, product) => {
    e.stopPropagation();

    const existingItem = cartItems.find((item) => item.id === product.pid);

    const existingQty = existingItem ? existingItem.quantity : 0;
    const isMaxReached = existingQty >= product.availableStock;
    // Since here quantity is always 1
    const totalQty = existingQty + 1;

    if (totalQty > product.availableStock) {
      alert(`Only ${product.availableStock} items available in stock`);
      return;
    }

    addToCart({
      id: product.pid,
      itemName: product.itemName,
      price: product.salePrice,
      taxPrice: (product.salePrice * product.gstPercentage) / 100,
      image: getProductImage(product),
      quantity: 1,
      availableStock: product.availableStock,
      description: product.description,
      gstPercentage: product.gstPercentage,
      selectedColor: product.itemSpecification?.[0]?.nameEng || "",
      selectedSize: product.itemSpecification?.[0]?.sizeName || "",
    });

    if (authCtx.isLoggedIn) {
      let data = {
        userXid: authCtx.clientID,
        itemXID: product.pid,
        transactionTypeXID: 4,
        lastEditByXid: authCtx.clientID,
      };
      Add({ data });
    }
  };

  const openQuickView = (e, product) => {
    e.stopPropagation();
    console.log("Quick view opened for:", product.itemName);
    // Add to recently viewed when quick view is opened
  };

  const toggleWishlist = (e, product) => {
    console.log("productproduct", product);
    e.stopPropagation();

    // Check if product is already in wishlist
    const isProductWishlisted = wishlist.some(
      (item) => item.id === product.pid,
    );

    if (isProductWishlisted) {
      removeFromWishlist(product.pid);
    } else {
      // Create image URL properly
      // const image = getProductImage(product);
      const image = getProductImage(product);

      addToWishlist({
        id: product.pid,
        itemName: product.itemName,
        price: product.salePrice,
        image: image,
        rating: product.rating,
        availableStock: product.availableStock,
        description: product.description,
        selectedColor: selectedColor, // Adding color to API data
        selectedSize: selectedSize, // Adding size to API data
      });
      console.log("my item Name");
      if (authCtx.isLoggedIn) {
        let data = {
          userXid: authCtx.clientID,
          itemXID: product.pid,
          transactionTypeXID: 1, // Use appropriate transaction type for wishlist addition
          lastEditByXid: authCtx.clientID,
          // Add any other required fields
        };
        Add({ data: data });
      }
    }
  };

  const isInWishlist = (productId) =>
    wishlist.some((item) => item.id === productId);

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) => {
      // If "All Categories" is clicked
      if (category === "All Categories") {
        // If "All Categories" is already selected, deselect it
        if (prev.includes("All Categories")) {
          return [];
        }
        // Otherwise, select only "All Categories" and deselect everything else
        return ["All Categories"];
      } else {
        // If anything else is clicked, we first remove "All Categories" from selection
        const newCategories = prev.filter((cat) => cat !== "All Categories");

        // Then toggle the clicked category
        if (newCategories.includes(category)) {
          return newCategories.filter((cat) => cat !== category);
        } else {
          return [...newCategories, category];
        }
      }
    });
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  const handlePriceChange = (e, index) => {
    const newPriceRange = [...priceRange];
    newPriceRange[index] = parseInt(e.target.value);
    setPriceRange(newPriceRange);
  };

  // Handler for search results from SearchFunctionality component
  const handleSearchResults = (results) => {
    setDisplayedProducts(results);
  };

  // Update this in the filteredProducts calculation
  const filteredProducts = displayedProducts?.filter((product) => {
    const passesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes("All Categories") ||
      selectedCategories.includes(product.nameEng);

    const passesPrice =
      product.salePrice >= priceRange[0] && product.salePrice <= priceRange[1];

    const passesColor =
      selectedColors.length === 0 ||
      selectedColors.includes("All Colors") ||
      (product.itemSpecification &&
        product.itemSpecification.some((spec) =>
          selectedColors.includes(spec.nameEng),
        ));

    // ✅ FIX: move passesSize here
    const passesSize =
      selectedSizes.length === 0 ||
      selectedSizes.includes("All Sizes") ||
      (product.itemSpecification &&
        product.itemSpecification.some((spec) =>
          selectedSizes.includes(spec.sizeName),
        ));

    return passesCategory && passesPrice && passesColor && passesSize;
  });

  // Sort the filtered products based on the selected sort option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortOption) {
      case "price-low-high":
        return a.salePrice - b.salePrice;
      case "price-high-low":
        return b.salePrice - a.salePrice;
      case "name-a-z":
        return a.itemName.localeCompare(b.itemName);
      case "rating":
        return b.rating - a.rating;
      default:
        return 0; // Default sort (no sorting)
    }
  });

  // Pagination logic
  const totalItems = sortedProducts.length;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedProducts.slice(indexOfFirstItem, indexOfLastItem);

  const sizes = React.useMemo(() => {
    if (!products || products.length === 0) return ["All Sizes"];

    const sizeSet = new Set();

    products.forEach((product) => {
      product?.itemSpecification?.forEach((spec) => {
        if (spec?.sizeName && spec.sizeName !== "N/A") {
          sizeSet.add(spec.sizeName);
        }
      });
    });

    return ["All Colors", ...Array.from(sizeSet)];
  }, [products]);

  // Dynamic image handling for any product
  const getProductImage = (product, isHover = false) => {
    if (
      !product ||
      !product.itemSpecification ||
      product.itemSpecification.length === 0
    ) {
    }

    // For hover, use second image if available, otherwise use first image
    const imageIndex = isHover && product.itemSpecification.length > 1 ? 1 : 0;
    return `https://amsfilecontainercc.blob.core.windows.net/uatfilecontainer/${product.itemSpecification[0]?.itemSpecImages[0]?.savedName}`;
  };

  // Helper function to convert color names to hex codes
  const getColorCode = (colorName) => {
    const colorMap = {
      Black: "#000000",
      White: "#FFFFFF",
      Red: "#FF0000",
      Blue: "#0000FF",
      Green: "#008000",
      Yellow: "#FFFF00",
      Pink: "#FFC0CB",
      Purple: "#800080",
      Orange: "#FFA500",
      Brown: "#A52A2A",
      Gray: "#808080",
      Maroon: "#800000",
      // Add more colors as needed
    };

    return colorMap[colorName] || "#CCCCCC"; // Default gray if color not found
  };

  // Update the extractSizes function to take a product parameter
  const extractSizes = (product) => {
    if (!product?.itemSpecification || product.itemSpecification.length === 0) {
      return [];
    }

    // Get all unique size names from the product specifications
    const sizes = product.itemSpecification
      .map((item) => item.sizeName)
      .filter((size) => size && size !== "N/A") // Filter out null, undefined, and N/A values
      .filter((size, index, self) => self.indexOf(size) === index); // Remove duplicates

    // If no valid sizes found, provide a default
    return sizes.length > 0 ? sizes : ["Free Size"];
  };

  // Move these lines outside of the conditional statements to avoid the React Hooks rule violation
  // and also pass the current product to extractSizes
  const [selectedSize, setSelectedSize] = useState("");

  // Use useEffect to update selectedSize when needed
  useEffect(() => {
    // Update for displayed products if needed
    if (displayedProducts?.length > 0) {
      const firstProduct = displayedProducts[0];
      const sizes = extractSizes(firstProduct);
      setSelectedSize(sizes[0] || "");
    }
  }, [displayedProducts]);

  // For the colorOptions, define a default value or move this logic
  const colorOptions = [];
  const [selectedColor, setSelectedColor] = useState("");

  // Update color options based on selected product
  useEffect(() => {
    if (displayedProducts?.length > 0) {
      const firstProduct = displayedProducts[0];
      const colorOpts =
        firstProduct?.itemSpecification?.map((item) => ({
          name: item.nameEng,
          code: getColorCode(item.nameEng),
        })) || [];

      // Update selected color if options are available
      if (colorOpts.length > 0) {
        setSelectedColor(colorOpts[0].name);
      }
    }
  }, [displayedProducts]);
  const handleSendWhatsApp = (e) => {
    e.stopPropagation();
    const productLink = `https://greencarwashclub.calibrecue.in/product/${pid}`;
    const phoneNumber = "919989267226"; // replace with your WhatsApp number
    const url = `https://wa.me/${phoneNumber}?text=${
      encodeURIComponent()
      // `Check this product: ${productLink}`,
    }`;
    window.open(url, "_blank");
  };
  // Remove the conditional check around sizeOptions to avoid the hook error
  // Instead, handle it in useEffect above

  return (
    <div className="bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3 border-b border-gray-100">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center text-xs sm:text-sm">
            <Link
              to="/"
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              HOME
            </Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="font-medium text-gray-800">SHOP</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Mobile Filter Button */}
        <div className="md:hidden mb-4">
          <button
            className="w-full flex items-center justify-center gap-2 bg-gray-100 py-2 px-4 rounded-md font-medium text-sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={16} />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>
        </div>

        <div className="flex flex-col md:flex-row md:gap-6 lg:gap-8">
          {/* Left Sidebar */}
          <div
            className={`${
              showFilters || window.innerWidth >= 768 ? "block" : "hidden"
            } w-full md:w-1/3 lg:w-1/4 md:block transition-all duration-300 mb-6 md:mb-0`}
          >
            {/* Search */}
            <div className="mb-6">
              <h3 className="font-medium text-base lg:text-lg mb-3 border-b pb-2">
                Search
              </h3>
              <SearchFunctionality
                allProducts={products}
                onSearchResults={handleSearchResults}
              />
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <h3 className="font-medium text-base lg:text-lg mb-3 border-b pb-2 flex justify-between items-center">
                Price Range
                <ChevronDown size={18} className="text-gray-500" />
              </h3>
              <div className="mt-3 px-1">
                <div className="flex justify-between mb-2 text-xs sm:text-sm text-gray-600">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}</span>
                </div>
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[0]}
                  onChange={(e) => handlePriceChange(e, 0)}
                  className="w-full accent-pink-500 mb-2"
                />
                <input
                  type="range"
                  min={minPrice}
                  max={maxPrice}
                  value={priceRange[1]}
                  onChange={(e) => handlePriceChange(e, 1)}
                  className="w-full accent-pink-500"
                />
              </div>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h3 className="font-medium text-base lg:text-lg mb-3 border-b pb-2 flex justify-between items-center">
                Categories
                <ChevronDown size={18} className="text-gray-500" />
              </h3>
              <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar px-1">
                {categories.map((category, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`cat-${index}`}
                      className="mr-2 h-4 w-4 accent-pink-500 cursor-pointer"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryChange(category)}
                    />
                    <label
                      htmlFor={`cat-${index}`}
                      className="text-gray-700 hover:text-pink-500 cursor-pointer flex-1 text-sm"
                    >
                      {category}
                    </label>
                    <span className="text-gray-400 text-xs">
                      (
                      {category === "All Categories"
                        ? products.length
                        : products.filter((p) => p.nameEng === category).length}
                      )
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Colors */}
            {/* Sizes */}
            <div className="mb-6">
              <h3 className="font-medium text-base lg:text-lg mb-3 border-b pb-2 flex justify-between items-center">
                Colors
                <ChevronDown size={18} className="text-gray-500" />
              </h3>

              <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar px-1">
                {sizes.map((size, index) => (
                  <div key={index} className="flex items-center">
                    <input
                      type="checkbox"
                      id={`size-${index}`}
                      className="mr-2 h-4 w-4 accent-pink-500 cursor-pointer"
                      checked={selectedSizes.includes(size)}
                      onChange={() => handleSizeChange(size)}
                    />

                    <label
                      htmlFor={`size-${index}`}
                      className="text-gray-700 hover:text-pink-500 cursor-pointer flex-1 text-sm"
                    >
                      {size}
                    </label>

                    <span className="text-gray-400 text-xs">
                      (
                      {size === "All Colors"
                        ? products.length
                        : products.filter(
                            (p) =>
                              p.itemSpecification &&
                              p.itemSpecification.some(
                                (spec) => spec.sizeName === size,
                              ),
                          ).length}
                      )
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            {/* Banner */}
            <div className="mb-6 sm:mb-8 bg-gray-400 rounded-lg p-4 sm:p-6 lg:p-8 text-center relative overflow-hidden">
              <div className="relative z-10">
                <h2
                  className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2 
                  text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500
                  drop-shadow-sm transition-all duration-300 ease-in-out
                  ${isHovered ? "scale-105 drop-shadow-md" : ""}`}
                  style={{
                    backgroundSize: isHovered ? "200% 200%" : "100% 100%",
                    animation: isHovered
                      ? "gradient-shift 3s ease infinite"
                      : "none",
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Cars Collection{" "}
                </h2>
                <style jsx>{`
                  @keyframes gradient-shift {
                    0% {
                      background-position: 0% 50%;
                    }
                    50% {
                      background-position: 100% 50%;
                    }
                    100% {
                      background-position: 0% 50%;
                    }
                  }
                `}</style>

                <p className="text-xs sm:text-sm font-semibold drop-shadow-md mb-3 sm:mb-4 hover:text-purple-600 hover:scale-110 transition-all duration-500 ease-in-out tracking-wide"></p>

                {/* <div className="flex justify-center mt-4">
  <Button
    type="primary"
    className="py-2 sm:py-3 text-white font-medium rounded transition-colors text-sm sm:text-base flex items-center justify-center"
  >
    Shop Now
  </Button>
</div> */}
              </div>
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-pink-100 to-pink-50 opacity-40"></div>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 py-3 border-b border-gray-100">
              <p className="text-xs sm:text-sm text-gray-600 mb-3 sm:mb-0">
                Showing{" "}
                <span className="font-medium">{sortedProducts.length}</span> of{" "}
                <span className="font-medium">{products.length}</span> products
              </p>

              <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <div className="relative flex-1 sm:flex-none">
                  <select
                    className="w-full sm:w-auto border border-gray-300 rounded-md p-1.5 pr-8 text-sm appearance-none focus:outline-none focus:ring-1 focus:ring-black focus:border-black bg-white"
                    value={sortOption}
                    onChange={handleSortChange}
                  >
                    <option value="default">Sort by: Default</option>
                    <option value="price-low-high">Price: Low to High</option>
                    <option value="price-high-low">Price: High to Low</option>
                    <option value="name-a-z">Name: A to Z</option>
                    <option value="rating">Best Rating</option>
                  </select>
                  <ChevronDown
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none"
                    size={16}
                  />
                </div>

                <div className="hidden sm:flex items-center space-x-1 border border-gray-200 rounded-md">
                  {/* Grid layout options */}
                  <button
                    onClick={() => setView("grid-large")}
                    className={`p-1.5 transition-colors ${
                      view === "grid-large"
                        ? "text-pink-500 bg-pink-50"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                    aria-label="Large grid view"
                  >
                    <Grid3X3 size={16} />
                  </button>
                  <button
                    onClick={() => setView("grid")}
                    className={`p-1.5 transition-colors ${
                      view === "grid"
                        ? "text-pink-500 bg-pink-50"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                    aria-label="Medium grid view"
                  >
                    <Grid size={16} />
                  </button>
                  <button
                    onClick={() => setView("list")}
                    className={`p-1.5 transition-colors ${
                      view === "list"
                        ? "text-pink-500 bg-pink-50"
                        : "text-gray-500 hover:bg-gray-50"
                    }`}
                    aria-label="List view"
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div
              className={`grid ${
                view === "grid-large"
                  ? "grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6"
                  : view === "grid"
                    ? "grid-cols-1 sm:grid-cols-2 gap-2 lg:grid-cols-3 sm:gap-3 lg:gap-4"
                    : "grid-cols-1 gap-4 sm:gap-6"
              }`}
            >
              {currentItems.map((product) => (
                <div
                  key={product.pid}
                  className={`bg-white group relative rounded-lg overflow-hidden transition-all duration-300 ${
                    view === "list" ? "flex flex-col sm:flex-row" : ""
                  } hover:shadow-lg border border-gray-100`}
                  onMouseEnter={() => setHoveredProduct(product.pid)}
                  onMouseLeave={() => setHoveredProduct(null)}
                >
                  {/* Product Image Container */}
                  <div
                    className={`relative overflow-hidden ${
                      view === "list" ? "w-full sm:w-1/3" : "w-full"
                    }`}
                    style={{ height: view === "list" ? "" : "320px" }}
                  >
                    {/* Default image */}
                    <Link
                      to={`/product/${product.pid}`}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <img
                        src={getProductImage(product)}
                        alt={product.itemName}
                        className="w-full h-full object-cover transition-all duration-500 absolute top-0 left-0 group-hover:scale-105"
                        style={{
                          opacity: hoveredProduct === product.pid ? 0 : 1,
                        }}
                      />

                      {/* Hover image */}
                      <img
                        src={getProductImage(product, true)}
                        alt={`${product.itemName} hover`}
                        className="w-full h-full object-cover absolute top-0 left-0 transition-all duration-500 group-hover:scale-105"
                        style={{
                          opacity: hoveredProduct === product.pid ? 1 : 0,
                        }}
                      />
                    </Link>

                    {/* Labels container */}
                    <div className="absolute left-2 top-2 z-10 flex flex-col gap-1 sm:gap-2">
                      {/* Discount Label */}
                      {/* {product.discount && (
                        <div className="bg-pink-500 text-white text-xs font-medium px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-sm">
                          -{product.discount}
                        </div>
                      )} */}

                      {/* New Label */}
                      {product.Trends &&
                        product.Trends.includes("New Arrival") && (
                          <div className="bg-blue-500 text-white text-xs font-medium px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-sm">
                            New
                          </div>
                        )}

                      {/* Best Seller Label */}
                      {product.Trends &&
                        product.Trends.includes("Best Seller") && (
                          <div className="bg-green-500 text-white text-xs font-medium px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-sm">
                            Best Seller
                          </div>
                        )}
                    </div>

                    {/* Actions Overlay */}
                    <div className="absolute inset-0 bg-opacity-20 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end z-20 pointer-events-none">
                      {/* Main Button (Add to Cart) */}
                      <div className="px-2 py-2 sm:py-3 bg-white bg-opacity-90 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col gap-2 relative z-30 pointer-events-auto">
                        <Button
                          onClick={handleSendWhatsApp}
                          className="flex-1 !bg-green-500 hover:!bg-green-600 text-white rounded-lg flex items-center justify-center gap-2"
                        >
                          Contact With <FaWhatsapp />
                        </Button>

                        {/* Quick actions */}
                        <div className="flex justify-center gap-2 sm:gap-3 py-1">
                          {/* Quick view button */}
                          {/* <button
                            onClick={openQuickView}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
                            title="Quick view"
                          >
                            <Eye size={16} className="text-gray-700" />
                          </button> */}
                          {/* Wishlist button */}
                          {/* <button
                            onClick={(e) => toggleWishlist(e, product)}
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${
                              isInWishlist(product.pid)
                                ? "bg-red-100"
                                : "bg-white"
                            } flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-200`}
                            title={
                              isInWishlist(product.pid)
                                ? "Remove from wishlist"
                                : "Add to wishlist"
                            }
                          >
                            <img
                              src={
                                isInWishlist(product.pid) ? LikeFilled : Like
                              }
                              alt="Wishlist"
                              className="w-4 h-4 sm:w-5 sm:h-5"
                            />
                          </button> */}

                          {/* Compare button */}
                          {/* <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleCompare({
                                id: product.pid,
                                img: getProductImage(product),
                                itemName: product.itemName,
                                description: product.description,
                                price: product.salePrice,
                                isOutOfStock: product.availableStock <= 0,
                                selectedColor: selectedColor,
                                selectedSize: selectedSize,
                              });
                              if (authCtx.isLoggedIn) {
                                let data = {
                                  userXid: authCtx.clientID,
                                  itemXID: product.pid,
                                  transactionTypeXID: 2,
                                  lastEditByXid: authCtx.clientID,
                                };
                                Add({ data: data });
                              }
                            }}
                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${
                              compareItems.some(
                                (item) => item.id === product.pid,
                              )
                                ? "bg-yellow-100"
                                : "bg-white"
                            } flex items-center justify-center hover:bg-gray-100 transition-colors`}
                            title={
                              compareItems.some(
                                (item) => item.id === product.pid,
                              )
                                ? "Remove from compare"
                                : "Add to compare"
                            }
                          >
                            <img
                              src={Compare}
                              alt="Compare"
                              className="w-4 h-4 sm:w-5 sm:h-5"
                            />
                          </button> */}
                          {/* Share button */}
                          {/* <a
                            href={
                              "https://web.whatsapp.com/send?text= Referral Link URL " +
                              `${process.env.REACT_APP_PUblic}` +
                              product.pid
                            }
                            rel="nofollow noopener"
                            className="share-icon flex items-center"
                          >
                            <img src={Share} className="w-5 h-5" alt={Share} />
                          </a> */}
                          {/* <button
                            onClick={(e) => e.stopPropagation()}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
                            title="Share"
                          >
                            <img
                              src={Share}
                              alt="Share"
                              className="w-4 h-4 sm:w-5 sm:h-5"
                            />
                          </button> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div
                    className={`p-2 sm:p-3 lg:p-4 rounded 
                   ${view === "list" ? "w-full sm:w-2/3 text-left" : ""} 
                 bg-gradient-to-r from-indigo-100 via-purple-100 to-indigo-100
                 `}
                  >
                    {/* Product Name */}
                    <h3 className="text-gray-800 font-medium mb-1 hover:text-pink-500 transition-colors text-xs sm:text-sm truncate">
                      <Link
                        to={`/product/${product.pid}`}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        {product.itemName}
                      </Link>
                    </h3>

                    {/* Rating */}
                    {/* <div
                      className={`flex my-1 sm:my-2 ${
                        view === "list" ? "" : ""
                      }`}
                    >
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${
                            i < product.rating
                              ? "text-yellow-400"
                              : "text-gray-300"
                          }`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-xs text-gray-500 ml-1">
                        ({product.rating})
                      </span>
                    </div> */}
                    {/* Price */}
                    <div
                      className={`flex items-center gap-1 sm:gap-2 ${
                        view === "list" ? "" : ""
                      }`}
                    >
                      <span className="text-pink-500 font-medium text-xs sm:text-sm">
                        ₹{product?.salePrice?.toFixed(2) || ""}
                      </span>
                      {product.oldPrice && (
                        <span className="text-gray-400 line-through text-xs">
                          ₹{product.oldPrice?.toFixed(2) || ""}
                        </span>
                      )}
                    </div>
                    {view === "list" && (
                      <div className="mt-2 sm:mt-3">
                        <p className="text-gray-600 text-xs sm:text-sm leading-relaxed mb-3 line-clamp-3">
                          {product.description || "No description available."}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {/* <div className="px-2 py-2 sm:py-3 bg-white bg-opacity-90 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col gap-2 relative z-30 pointer-events-auto">
                            <Button
                              onClick={handleSendWhatsApp}
                              className="flex-1 !bg-green-500 hover:!bg-green-600 text-white rounded-lg flex items-center justify-center gap-2"
                            >
                              Contact With <FaWhatsapp />
                            </Button>

                          </div> */}

                        <button className="rounded-full bg-white p-2">
  <a
    href={
      "https://web.whatsapp.com/send?text=Referral Link URL " +
      `${process.env.REACT_APP_PUblic}` +
      product.pid
    }
    target="_blank"
    rel="nofollow noopener noreferrer"
    className="share-icon flex items-center"
  >
    <img
      src={Share}
      className="w-5 h-5"
      alt="share"
    />
  </a>
</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Pagination */}
        {sortedProducts.length > 0 && (
          <div className="mt-6 sm:mt-8">
            <Pagination
              totalItems={sortedProducts.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={handlePageChange}
              siblingCount={1}
              primaryColor="pink"
            />
          </div>
        )}
      </div>

      {/* Extra styles for custom scrollbar */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ddd;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #ccc;
        }

        @media (max-width: 350px) {
          .container {
            padding-left: 0.5rem;
            padding-right: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
}
