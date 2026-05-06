import React, { useContext, useEffect, useMemo, useState } from "react";
import { Eye, Maximize2 } from "lucide-react";
import Compare from "../../assets/images/compare-nav.png";
import Share from "../../assets/images/share.png";
import Like from "../../assets/images/heart-outer-black.png";
import LikeFilled from "../../assets/images/heart-filled.png";
// import BlankImage from "../../assets/images/BlankImage.jpg";
import { WishlistContext } from "../../context/WishlistContext";

import { SlClose, SlSizeFullscreen } from "react-icons/sl";
// import { FaChevronRight, FaChevronLeft } from "react-icons/fa";
// import { useState, useEffect, useMemo } from "react";
import { useCart } from "../../context/CartContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useCompare } from "../../context/CompareContext";
import {
  useGetGetItemsByAssetCaetgoryAndCompanyBranchV1Mutation,
  usePostTransactionByUserMutation,
} from "../../store/eCommerceAPI/eCommerceAPI";
import ProductCarousel from "../UI/ProductCarousel";
import AuthContext from "../../store/authentication/auth-context";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingModalConfiguration } from "../../store/Slices/ModalLoaderSlice";
import { GeteCommerceList } from "../../store/Slices/ECommercesSlice";
import { Button, message } from "antd";
import { FaWhatsapp } from "react-icons/fa";

export const CartItem = ({
  pid,
  itemName,
  description,
  discount,
  salePrice,
  availableStock,
  itemImages,
  rating,
  Trends = [],
  index,
  gstPercentage,

  itemSpecification = [],
  ItemSpecficationXID = itemSpecification?.length > 0
    ? itemSpecification[0].pid
    : null,
}) => {
  console.log("itemSpecification", itemSpecification);
  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);
  const authCtx = useContext(AuthContext);
  const { addToCart, updateCartItem, removeCartItem, cartItems } = useCart();
  const { compareItems, toggleCompare } = useCompare();
  const isInCompare = compareItems.some((item) => item.id === pid);
  const isWishlisted = wishlist.some((item) => item.id === pid);
  const [showQuickView, setShowQuickView] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cartFeedback, setCartFeedback] = useState(false);
  const [wishlistFeedback, setWishlistFeedback] = useState(false);
  const [showZoom, setShowZoom] = useState(false);
  const [zoomSlide, setZoomSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const history = useHistory();

  // Get product image with fallback
  const productImage =
    itemSpecification && itemSpecification.length > 0
      ? `https://amsfilecontainercc.blob.core.windows.net/uatfilecontainer/${itemSpecification[0]?.itemSpecImages[0]?.savedName}`
      : "";

  // Create an array of all available images from itemImages / this is for

  ///here I am getting specification images...
  const baseUrl =
    "https://amsfilecontainercc.blob.core.windows.net/uatfilecontainer/";

  // 1. Get images from itemSpecification
  const specImages =
    itemSpecification?.flatMap((spec) =>
      (spec.itemSpecImages || []).map((img) => ({
        original: `${baseUrl}${img.savedName}`,
        thumbnail: `${baseUrl}${img.savedName}`,
        alt: `${itemName} ${spec.nameEng} ${spec.sizeName}`,
      })),
    ) || [];

  //end here...

  // 2. Get main item images
  const mainImages =
    itemImages?.map((img) => ({
      original: `${baseUrl}${img.savedName}`,
      thumbnail: `${baseUrl}${img.savedName}`,
      alt: `${itemName} image`,
    })) || [];

  // carousal in home page
  // const allProductImages =
  //   itemImages && itemImages.length > 0
  //     ? itemImages.map((img) => ({
  //       original: `https://amsfilecontainercc.blob.core.windows.net/uatfilecontainer/${img.savedName}`,
  //       thumbnail: `https://amsfilecontainercc.blob.core.windows.net/uatfilecontainer/${img.savedName}`,
  //       alt: `${itemName} image`,
  //     }))
  //     : [
  //       {
  //         original: BlankImage,
  //         thumbnail: BlankImage,
  //         alt: `${itemName} fallback image`,
  //       },
  //     ];

  // 3. Combine both
  const allProductImages =
    [...mainImages, ...specImages].length > 0
      ? [...mainImages, ...specImages]
      : [
          {
            original: "",
            thumbnail: "",
            alt: `${itemName} fallback image`,
          },
        ];

  console.log("allProductImages", allProductImages);
  console.log("allProductImages", mainImages);
  console.log("allProductImages", specImages);
  // Get hover image from second image in itemImages array or fall back to main image
  const hoverImage =
    itemImages && itemImages.length > 1
      ? `https://amsfilecontainercc.blob.core.windows.net/uatfilecontainer/${itemImages[1]?.savedName}`
      : productImage;

  ///here I am binding the item specification iamgs....

  //end here..
  const formattedPrice = salePrice ? `₹${salePrice}` : "Price not available";
  // Calculate discounted price if applicable
  const originalPrice =
    discount && salePrice
      ? salePrice + (salePrice * parseInt(discount)) / 100
      : null;
  const formattedOriginalPrice = originalPrice
    ? `₹${originalPrice.toFixed(2)}`
    : null;
  // Extract unique colors and sizes from itemSpecification
  const uniqueColors = useMemo(() => {
    if (!itemSpecification || !Array.isArray(itemSpecification)) {
      return [];
    }

    // Get unique color names from itemSpecification
    const colorNames = [
      ...new Set(itemSpecification.map((spec) => spec.nameEng)),
    ];

    // Create color objects with name and hex
    return colorNames.map((colorName) => {
      // Assign a reasonable hex color based on the color name
      let hex = "#000000"; // Default black

      const colorMap = {
        Blue: "#3b82f6",
        Green: "#10b981",
        Pink: "#ec4899",
        Red: "#ef4444",
        Black: "#1f2937",
        Maroon: "#7f1d1d",
        Yellow: "#f59e0b",
        Purple: "#8b5cf6",
        Orange: "#f97316",
        Brown: "#92400e",
        Grey: "#6b7280",
        White: "#f9fafb",
      };

      // Try to match the color name (case insensitive)
      Object.keys(colorMap).forEach((key) => {
        if (colorName && colorName.toLowerCase().includes(key.toLowerCase())) {
          hex = colorMap[key];
        }
      });

      return { name: colorName, hex };
    });
  }, [itemSpecification]);

  const uniqueSizes = useMemo(() => {
    // Predefined standard sizes to match against
    const standardSizes = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];

    // First try to extract from itemSpecification if available
    if (itemSpecification && Array.isArray(itemSpecification)) {
      const specSizes = itemSpecification
        .filter((spec) => spec.sizeName)
        .map((spec) => spec.sizeName);

      if (specSizes.length > 0) {
        return [...new Set(specSizes)];
      }
    }

    // If no sizes found in specs, try to extract from the item name
    if (itemName) {
      const matchedSizes = standardSizes.filter(
        (size) =>
          itemName.toUpperCase().includes(` ${size}`) ||
          itemName.toUpperCase().includes(`-${size}`) ||
          itemName.toUpperCase().includes(`(${size})`) ||
          itemName.toUpperCase().includes(`SIZE ${size}`),
      );

      if (matchedSizes.length > 0) {
        return matchedSizes;
      }
    }

    // Return default sizes if nothing matched
    return ["M"];
  }, [itemSpecification, itemName]);

  const ItemSpecficationX = useMemo(() => {
    if (!Array.isArray(itemSpecification)) return [];

    const colorMap = {
      blue: "#3b82f6",
      green: "#10b981",
      pink: "#ec4899",
      red: "#ef4444",
      black: "#1f2937",
      maroon: "#7f1d1d",
      yellow: "#f59e0b",
      purple: "#8b5cf6",
      orange: "#f97316",
      brown: "#92400e",
      grey: "#6b7280",
      white: "#f9fafb",
    };

    // Remove duplicates by ItemSpecficationXID
    const uniqueSpecs = [
      ...new Map(
        itemSpecification.map((s) => [s.itemSpecficationXID, s]),
      ).values(),
    ];

    return uniqueSpecs.map((spec) => {
      const name = spec.nameEng || "";
      const lower = name.toLowerCase();

      const match = Object.keys(colorMap).find((key) => lower.includes(key));

      return {
        id: spec.itemSpecficationXID, // ✅ REAL ID
        name: name,
        hex: match ? colorMap[match] : "#000000",
      };
    });
  }, [itemSpecification]);

  // Set initial selected color and size from the first available options
  const [selectedColor, setSelectedColor] = useState(
    uniqueColors.length > 0 ? uniqueColors[0]?.name : "",
  );
  const [selectedItemSpecficationXID, setSelectedItemSpecficationXID] =
    useState(uniqueColors.length > 0 ? uniqueColors[0].itemSpecficationXID : 1);

  console.log("selectedItemSpecficationXID", selectedItemSpecficationXID);
  console.log("selectedItemSpecficationXID", selectedColor);
  console.log("selectedItemSpecficationXID", uniqueColors);

  const [selectedSize, setSelectedSize] = useState(
    uniqueSizes.length > 0 ? uniqueSizes[0] : "",
  );

  const [Add, { data: getAddData, isSuccess: isAddSuccess }] =
    usePostTransactionByUserMutation();

  const toggleWishlist = (e) => {
    e.stopPropagation();
    const product = {
      id: pid,
      img: productImage,
      name: itemName, // Using itemName for the name field
      itemName: itemName, // Ensure this is also set for consistency
      description,
      price: salePrice,
      selectedColor: selectedColor, // Add the selected color
      selectedSize: selectedSize,
      selectedItemSpecficationXID: selectedItemSpecficationXID, // Add the selected size
    };

    if (isWishlisted) {
      removeFromWishlist(pid);
    } else {
      addToWishlist(product);

      console.log("product", product);

      //we should call the post api......
      if (authCtx.isLoggedIn) {
        let data = {
          userXid: authCtx.clientID,
          itemXID: product.id,
          transactionTypeXID: 1,
          lastEditByXid: authCtx.clientID,
          selectedColor: selectedColor, // Adding color to API data
          selectedSize: selectedSize,
          selectedItemSpecficationXID: selectedItemSpecficationXID, // Add the selected size
          // Adding size to API data
          //  pid: !!item.pid === true ? item.pid : null
        };
        Add({ data: data });
        /// end...
      }
    }

    // Show wishlist feedback
    setWishlistFeedback(true);
    setTimeout(() => setWishlistFeedback(false), 2000);
  };
  const existingItem = cartItems.find((item) => item.id === pid);
  const existingQty = existingItem ? existingItem.quantity : 0;
  const isMaxReached = availableStock && existingQty >= availableStock;

  // Handle view product details
  const handleViewProduct = () => {
    history.push({
      pathname: `/product/${pid}`,
      state: {
        pid,
        image: productImage,
        itemName,
        description,
        price: salePrice,
        isOutOfStock: availableStock <= 0,
        selectedColor, // Pass the selected color
        selectedSize,
        selectedItemSpecficationXID, // Add the selected size
        // Pass the selected size
      },
    });
  };

  // Handler for adding to cart using the context
  const handleAddToCart = (e) => {
    e.stopPropagation();

    if (!availableStock || availableStock <= 0) return;

    // ✅ Get existing item from cart

    // const isMaxReached = existingQty >= availableStock;
    // ✅ Calculate total quantity after adding
    const totalQty = existingQty + quantity;

    // ❌ Block if exceeds stock
    if (totalQty > availableStock) {
      message.warning(`Only ${availableStock} items available in stock`);
      return;
    }

    const rect = e.currentTarget.getBoundingClientRect();
    const position = {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    };
    // const isMaxReached = availableStock && existingQty >= availableStock;
    const cartItem = {
      id: pid,
      image: productImage,
      itemName,
      description,
      taxPrice: (salePrice * gstPercentage) / 100,
      gstPercentage,
      price: salePrice,
      quantity: quantity,
      selectedColor,
      selectedSize,
      ItemSpecficationXID,
      availableStock,
      openingStock: availableStock,
    };

    addToCart(cartItem, position);

    // API call
    if (authCtx.isLoggedIn) {
      let data = {
        userXid: authCtx.clientID,
        itemXID: pid,
        transactionTypeXID: 4,
        lastEditByXid: authCtx.clientID,
        quantity: quantity,
        selectedColor,
        selectedSize,
        selectedItemSpecficationXID,
      };
      Add({ data });
    }

    setCartFeedback(true);
    setTimeout(() => setCartFeedback(false), 2000);
  };
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      setQuantity(1);
      return;
    }

    if (availableStock && newQuantity > availableStock) {
      message.warning(`Only ${availableStock} items available in stock`);
      setQuantity(availableStock);
      return;
    }

    setQuantity(newQuantity);
  };

  // Check if item is already in cart to update UI accordingly
  const isItemInCart = () => {
    return (
      cartItems &&
      Array.isArray(cartItems) &&
      cartItems.some((item) => item.id === pid)
    );
  };

  // Quick view handler
  const openQuickView = (e) => {
    e.stopPropagation();
    setShowQuickView(true);
  };

  // Function to render star ratings
  const renderStars = (count) => {
    return [...Array(5)].map((_, i) => (
      <span key={i} className={i < count ? "text-yellow-400" : "text-gray-300"}>
        ★
      </span>
    ));
  };
  const handleSendWhatsApp = (e) => {
    e.stopPropagation();
    const productLink = `https://app.vijayasarees.com/product/${pid}`; // link with product id
    const phoneNumber = "919390766350"; // replace with your WhatsApp number
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
      `Check this product: ${productLink}`,
    )}`;
    window.open(url, "_blank");
  };

  return (
    <div
      className="group relative flex flex-col rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Badge indicators - made more responsive */}
      <div className="absolute top-2 sm:top-3 left-2 sm:left-3 z-20 flex flex-col gap-1 sm:gap-2">
        {discount > 0 && (
          <div className="bg-red-500 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm">
            -{discount} OFF
          </div>
        )}
        {Trends.includes("New Arrival") && (
          <div className="bg-blue-500 text-white text-xs font-bold px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-sm">
            NEW
          </div>
        )}
      </div>

      {/* Image container with hover effect - aspect ratio maintained */}
      <div
        className="relative overflow-hidden cursor-pointer aspect-[3/4]"
        onClick={handleViewProduct}
      >
        {/* Main image */}
        <img
          src={productImage}
          alt={itemName}
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
        />

        {/* Hover overlay image - fades in on hover */}
        <div
          className="absolute inset-0 w-full h-full transition-opacity duration-500"
          style={{ opacity: isHovered ? 1 : 0 }}
        >
          <img
            src={hoverImage}
            alt={`${itemName} hover`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="absolute inset-x-0 bottom-0 transition-transform duration-300 transform translate-y-full group-hover:translate-y-0">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 opacity-50"></div>

          <div className="relative flex justify-center items-center py-2 sm:py-3 gap-1 sm:gap-2">
            <button
              onClick={openQuickView}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
              title="Quick view"
            >
              <Eye size={16} className="text-gray-700" />
            </button>
            {/* 
            <button
              onClick={toggleWishlist}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${
                isWishlisted ? "bg-red-100" : "bg-white"
              } flex items-center justify-center hover:bg-gray-100 transition-colors border border-gray-200`}
              title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <img
                src={isWishlisted ? LikeFilled : Like}
                alt="Wishlist"
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
            </button> */}

            {/* Compare button */}
            {/* <button
              onClick={(e) => {
                e.stopPropagation();
                toggleCompare({
                  id: pid,
                  img: productImage,
                  itemName,
                  description,
                  price: salePrice,
                  originalPrice: originalPrice,
                  isOutOfStock: availableStock <= 0,
                  selectedColor: selectedColor, // Add the selected color
                  selectedSize: selectedSize,
                  selectedItemSpecficationXID: selectedItemSpecficationXID, // Add the selected size
                });

                if (authCtx.isLoggedIn) {
                  let data = {
                    userXid: authCtx.clientID,
                    itemXID: pid,
                    transactionTypeXID: 2,
                    lastEditByXid: authCtx.clientID,
                  };

                  if (!isInCompare) {
                    Add({ data: data });
                  } else {
                  }
                }
              }}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full ${
                isInCompare ? "bg-yellow-100" : "bg-white"
              } flex items-center justify-center hover:bg-gray-100 transition-colors`}
              title={isInCompare ? "Remove from compare" : "Add to compare"}
            >
              <img
                src={Compare}
                alt="Compare"
                className="w-4 h-4 sm:w-5 sm:h-5"
              />
            </button> */}

            {/* Share button */}
            <button
              onClick={(e) => e.stopPropagation()}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
              title="Share"
            >
              <img src={Share} alt="Share" className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Product info section - improved padding for different screens */}
      <div className="p-3 sm:p-4 flex flex-col gap-1 sm:gap-2">
        {/* Product title - improved font sizing */}
        <h3
          className="font-medium text-sm sm:text-base text-gray-800 hover:text-black cursor-pointer transition-colors truncate"
          onClick={handleViewProduct}
        >
          {itemName}
        </h3>

        {/* Product description - limited to one line */}
        <p className="text-xs sm:text-sm text-gray-600 truncate">
          {description}
        </p>

        {/* Rating stars - made responsive */}
        <div className="flex text-xs sm:text-sm">{renderStars(rating)}</div>

        {/* Price display - responsive font sizes */}
        <div className="flex items-center gap-1 sm:gap-2 mt-0.5 sm:mt-1">
          <span className="text-base sm:text-lg font-semibold text-black">
            {formattedPrice}
          </span>
          {formattedOriginalPrice && (
            <span className="text-xs sm:text-sm text-gray-500 line-through">
              {formattedOriginalPrice}
            </span>
          )}
        </div>

        {/* Add to cart button - responsive padding */}
        <div className="flex gap-2 sm:gap-3 mt-3">
          {/* <Button
            type="primary"
            onClick={handleAddToCart}
            disabled={!availableStock || availableStock <= 0 || isMaxReached}
            className={`flex-1 py-2 sm:py-3 text- sm:text-base flex items-center justify-center ${
              !availableStock || availableStock <= 0
                ? "!bg-grey !text-black !border-black cursor-not-allowed"
                : ""
            }`}
          >
            {!availableStock || availableStock <= 0
              ? "Out of Stock"
              : isMaxReached
                ? "Stock Limit Reached"
                : isItemInCart()
                  ? "Update Cart"
                  : "Add to Cart"}
          </Button> */}

          <Button
            onClick={handleSendWhatsApp}
            className="flex-1 py-2 sm:py-3 bg-green-500 hover:bg-green-600 text-white font-medium text-sm sm:text-base flex items-center justify-center gap-2 rounded-lg"
          >
            <FaWhatsapp className="text-lg" />
            Send via WhatsApp
          </Button>
        </div>

        {/* Feedback messages - responsive positioning and sizing */}
        {cartFeedback && (
          <div className="absolute top-2 right-2 bg-green-100 text-green-700 p-1.5 sm:p-2 rounded-md text-xs sm:text-sm shadow-md animate-fadeIn z-30">
            Added to cart!
          </div>
        )}

        {wishlistFeedback && (
          <div className="absolute top-2 right-2 bg-red-100 text-red-700 p-1.5 sm:p-2 rounded-md text-xs sm:text-sm shadow-md animate-fadeIn z-30">
            {isWishlisted ? "Added to" : "Removed from"} wishlist!
          </div>
        )}
      </div>

      {/* QuickView Modal - Improved responsive layout */}
      {showQuickView && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-2 sm:p-4"
          onClick={() => setShowQuickView(false)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Close button - improved positioning */}
              <button
                className="absolute top-2 sm:top-4 right-2 sm:right-4 z-10 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
                onClick={() => setShowQuickView(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              <div className="flex flex-col md:flex-row">
                {/* Product images section */}
                <div className="md:w-1/2 p-3 sm:p-6 relative">
                  <ProductCarousel
                    images={allProductImages}
                    initialIndex={activeSlide}
                    onImagechange={(index) => setActiveSlide(index)}
                    className="w-full h-full object-contain"
                    onClick={() => setShowZoom(true)}
                  />
                  {/* // Replace the SlSizeFullscreen icon with this */}
                  <Maximize2
                    size={28}
                    className="absolute top-12 right-12 cursor-pointer bg-white bg-opacity-75 rounded-full p-1.5 text-gray-800 hover:bg-opacity-100 hover:text-black shadow-sm transition-all duration-200 border border-gray-200"
                    onClick={() => setShowZoom(true)}
                  />
                  {/* Zoom functionality */}
                  {/* {showZoom && (
                    <ProductCarousel
                      // images={allProductImages}
                      initialIndex={zoomSlide}
                      onClose={() => setShowZoom(false)}
                      isZoomed={true}
                      onImagechange={(index) => setZoomSlide(index)}
                      className="w-full h-full object-contain"
                    />
                  )} */}
                </div>

                {/* Product info section - improved responsive spacing */}
                <div className="md:w-1/2 p-3 sm:p-6 border-t md:border-t-0 md:border-l border-gray-200">
                  {/* Title and rating - responsive font sizes */}
                  <h2 className=" text-black text-xl sm:text-2xl font-bold mb-1 sm:mb-2 ">
                    {itemName}
                  </h2>
                  <div className="flex mb-1 sm:mb-2">{renderStars(rating)}</div>
                  {/* Price - responsive font sizes */}
                  <div className="mb-2 sm:mb-4">
                    <span className="text-lg sm:text-xl font-semibold text-black mr-1 sm:mr-2">
                      {formattedPrice}
                    </span>
                    {formattedOriginalPrice && (
                      <span className="text-gray-500 line-through">
                        {formattedOriginalPrice}
                      </span>
                    )}
                    {discount > 0 && (
                      <span className="ml-1 sm:ml-2 text-red-500 font-medium">
                        ({discount} OFF)
                      </span>
                    )}
                  </div>
                  {/* Description - responsive spacing */}
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-6">
                    {description}
                  </p>
                  {/* Color selection - responsive spacing */}
                  <div className="mb-2 sm:mb-4">
                
                  </div>
                  {/* Size selection - responsive button sizes */}
                  <div className="mb-3 sm:mb-6">
                    <h3 className="font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                      Color
                    </h3>
                    <div className="flex gap-1 sm:gap-2">
                      {uniqueSizes.map((size) => (
                        <button
                          key={size}
                          className={`sm:w-10 md:px-6 md:py-2 px-2 py-1 sm:h-10 flex items-center justify-center border transition-colors ${
                            selectedSize === size
                              ? "bg-black text-white border-black"
                              : "border-gray-300 hover:border-gray-500"
                          } rounded text-xs sm:text-sm`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* // For the quantity section, update your buttons to explicitly
                  use the new values: */}
                
                  {/* Action buttons - responsive padding */}
                  <div className="flex flex-col gap-2 sm:gap-3">
                    {/* {!availableStock || availableStock <= 0 ? (
                      <button
                        disabled
                        className="w-full py-2 sm:py-3 bg-gray-200 text-gray-600 font-medium rounded cursor-not-allowed text-sm sm:text-base"
                      >
                        Out of Stock
                      </button>
                    ) : (
                      <button
                        onClick={handleAddToCart}
                        className="w-full py-2 sm:py-3 bg-black hover:bg-gray-800 text-white font-medium rounded transition-colors text-sm sm:text-base"
                      >
                        {isItemInCart() ? "Update Cart" : "Add to Cart"}
                      </button>
                    )} */}
                    <Button
                      onClick={handleSendWhatsApp}
                      className="flex-1 py-2 sm:py-3 bg-green-500 hover:bg-green-600 text-white font-medium text-sm sm:text-base flex items-center justify-center gap-2 rounded-lg"
                    >
                      <FaWhatsapp className="text-lg" />
                      Send via WhatsApp
                    </Button>
                  </div>
                  {/* Feedback messages */}
                  {cartFeedback && (
                    <div className="mt-3 sm:mt-4 bg-green-50 border border-green-200 text-green-700 p-2 sm:p-3 rounded text-xs sm:text-sm animate-fadeIn">
                      Product added to cart successfully!
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Zoom Modal with Dynamic Thumbnails */}
      {showZoom && (
        <div
          className="fixed inset-0 bg-black z-50 flex flex-col justify-center items-center"
          onClick={() => setShowZoom(false)}
        >
          {/* Close button */}
          <button
            className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white hover:text-gray-300 z-10"
            onClick={(e) => {
              e.stopPropagation();
              setShowZoom(false);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Main image container */}
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={
                itemImages && itemImages.length > 0
                  ? `https://amsfilecontainercc.blob.core.windows.net/uatfilecontainer/${itemImages[zoomSlide]?.savedName}`
                  : ""
              }
              alt={`${itemName} enlarged view`}
              className="max-h-full max-w-full object-contain px-2 sm:px-0 rounded-md"
            />

            {/* Navigation buttons - only show if there's more than one image */}
            {itemImages && itemImages.length > 1 && (
              <>
                <button
                  className="absolute top-1/2 left-1 sm:left-4 transform -translate-y-1/2 bg-white bg-opacity-70 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomSlide((prev) =>
                      prev === 0 ? itemImages.length - 1 : prev - 1,
                    );
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>

                <button
                  className="absolute top-1/2 right-1 sm:right-4 transform -translate-y-1/2 bg-white bg-opacity-70 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomSlide((prev) =>
                      prev === itemImages.length - 1 ? 0 : prev + 1,
                    );
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Thumbnail Gallery - responsive and scrollable for many images */}
          {itemImages && itemImages.length > 1 && (
            <div className="flex gap-2 sm:gap-3 bg-black bg-opacity-50 p-2 sm:p-3 rounded-lg absolute bottom-4 sm:bottom-6 overflow-x-auto max-w-full">
              {itemImages.map((img, i) => (
                <div
                  key={i}
                  className={`border-2 ${
                    zoomSlide === i ? "border-white" : "border-transparent"
                  } cursor-pointer overflow-hidden rounded-md flex-shrink-0`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomSlide(i);
                  }}
                >
                  <img
                    src={`https://amsfilecontainercc.blob.core.windows.net/uatfilecontainer/${img.savedName}`}
                    alt={`Thumbnail ${i + 1}`}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default function DisplayVechile() {
  const dispatch = useDispatch();
  const { cartCount } = useCart();
  const [selectedTrend, setSelectedTrend] = useState("All");
  const [productsData, setProductsData] = useState([]);
  console.log("productsData", productsData);
  const [categories, setCategories] = useState(["All Categories"]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [products, setProducts] = useState([]);

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
  useEffect(() => {
    if (productsData && productsData.length > 0) {
      const unique = ["All Categories"];

      productsData.forEach((product) => {
        if (product.nameEng && !unique.includes(product.nameEng)) {
          unique.push(product.nameEng);
        }
      });

      setCategories(unique);
      setProducts(productsData); // also sync products
    }
  }, [productsData]);

  const [fetch, { data: getFetchData, isSuccess: isFetchDataSuccess }] =
    useGetGetItemsByAssetCaetgoryAndCompanyBranchV1Mutation();
  const {
    data: CompanyBranchData,
    code: CompanyBranchCode,
    error: CompanyBranchError,
    loading: CompanyBranchLoading,
  } = useSelector((state) => state.ECommerceSlice);

  console.log("CompanyBranchData", CompanyBranchData);
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
      setProductsData(CompanyBranchData);
    }
  }, [CompanyBranchData]);
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

  // useEffect(() => {
  //   if (!!getFetchData && getFetchData?.length > 0) {
  //     dispatch(setLoadingModalConfiguration({ isVisible: false }));
  //     // productsData = getFetchData;
  //     setProductsData(getFetchData);
  //   } else {
  //     //dispatch(setLoadingModalConfiguration({ isVisible: false }));
  //   }
  // }, [getFetchData]);

  // useEffect(() => {

  // }, [productsData])

  // Filter products based on selected category
  const filteredProducts = useMemo(() => {
    let filtered = productsData;

    // ✅ Step 1: Filter by assetCategoryXid
    filtered = filtered.filter((product) => product.assetCategoryXid === 616);

    // ✅ Step 2: Existing category filter
    if (
      selectedCategories.length === 0 ||
      selectedCategories.includes("All Categories")
    ) {
      return filtered;
    }

    return filtered.filter((product) =>
      selectedCategories.includes(product.nameEng),
    );
  }, [selectedCategories, productsData]);

  return (
    <>
      <div className="mb-6 sm:mb-8 text-center mt-8 sm:mt-12">
        <div className="flex items-center justify-center mb-4 sm:mb-8">
          <div className="w-8 sm:w-16 h-px bg-black"></div>
          <h3 className="px-2 sm:px-4 text-base sm:text-lg md:text-xl font-extrabold uppercase text-black">
            Daily Deals!
          </h3>
          <div className="w-8 sm:w-16 h-px bg-black"></div>
        </div>

        {/* <div className="flex flex-wrap justify-center gap-2 max-h-60 overflow-y-auto custom-scrollbar px-1">
          {categories.map((category, index) => {
            const isActive = selectedCategories.includes(category);

            return (
              <button
                key={index}
                onClick={() => handleCategoryChange(category)}
                className={`
          px-3 py-1.5 rounded-full text-sm border transition-all
          ${
            isActive
              ? "bg-black text-white border-black"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }
        `}
              >
                {category}

                <span className="ml-1 text-xs opacity-70">
                  (
                  {category === "All Categories"
                    ? products.length
                    : products.filter((p) => p.nameEng === category).length}
                  )
                </span>
              </button>
            );
          })}
        </div> */}
      </div>

      {filteredProducts?.length === 0 ? (
        <div className="text-center py-6 sm:py-10">
          <p className="text-lg sm:text-xl text-gray-500">
            No products found for {selectedTrend} category.
          </p>
        </div>
      ) : (
        <div className="flex justify-center mt-8 sm:mt-10 md:mt-14">
          <div
            className="grid 
    grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3
    gap-6
    max-w-[68rem] w-full"
          >
            {filteredProducts.slice(0, 3).map((product, index) => (
              <CartItem key={product.pid} {...product} index={index} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
