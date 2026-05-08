import { useEffect } from "react";
import "../../App.css";
import {
  FaCar,
  FaSprayCan,
  FaCogs,
  FaGem,
  FaStar,
  FaDollarSign,
  FaShieldAlt,
  FaSmile,
  FaOilCan,
  FaTools,
  FaExchangeAlt,
} from "react-icons/fa";
import { useHistory } from "react-router-dom";
import React, { useContext, useMemo, useState } from "react";
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
// import { useHistory } from "react-router-dom/cjs/react-router-dom";
import { useCompare } from "../../context/CompareContext";
import {
  // useGetGetItemsByAssetCaetgoryAndCompanyBranchV1Mutation,
  usePostTransactionByUserMutation,
} from "../../store/eCommerceAPI/eCommerceAPI";
import ProductCarousel from "../UI/ProductCarousel";
import AuthContext from "../../store/authentication/auth-context";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingModalConfiguration } from "../../store/Slices/ModalLoaderSlice";
import { GeteCommerceList } from "../../store/Slices/ECommercesSlice";
import { Button, message } from "antd";
import { FaWhatsapp } from "react-icons/fa";
import video1 from "../../assets/Videos/Video1.mp4";
import video2 from "../../assets/Videos/Video2.mp4";
import DisplayVechile from "./DisplayVechile";
// import video3 from "../../assets/Videos/Video3.mp4";

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
  const { addToCart, updateCartItem, removeCartItem } = useCart();
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
  // const existingItem = cartItems.find((item) => item.id === pid);
  // const existingQty = existingItem ? existingItem.quantity : 0;
  // const isMaxReached = availableStock && existingQty >= availableStock;

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

    const rect = e.currentTarget.getBoundingClientRect();
    const position = {
      top: rect.top + window.scrollY,
      left: rect.left + window.scrollX,
    };

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

    // ✅ API call (same as before)
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

    // ✅ Redirect to cart page
    history.push("/CartPage");

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
  // const isItemInCart = () => {
  //   return (
  //     cartItems &&
  //     Array.isArray(cartItems) &&
  //     cartItems.some((item) => item.id === pid)
  //   );
  // };

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
    const productLink = `https://greencarwashclub.calibrecue.in/product/${pid}`;
    const phoneNumber = "919989267226"; // replace with your WhatsApp number
    const url = `https://wa.me/${phoneNumber}?text=${
      encodeURIComponent()
      // `Check this product: ${productLink}`,
    }`;
    window.open(url, "_blank");
  };

  return (
    <div
      className={`group relative flex flex-col rounded-2xl overflow-hidden
  shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2
  border text-white
  ${
    index === 0
      ? // BASIC
        "bg-gradient-to-br from-[#e9fbcf] via-[#c8f7a6] to-[#8fd694] border-[#d9f99d]"
      : index === 1
        ? // PRIME - Soft Premium Gray
          "bg-gradient-to-br from-[#5f5f5f] via-[#3f3f46] to-[#18181b] border-[#71717a]"
        : // PRO (Golden Premium)
          "bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-700 border-yellow-300"
  }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
        {discount > 0 && (
          <div className="bg-gradient-to-r from-green-600 to-green-400 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
            -{discount} OFF
          </div>
        )}
        {Trends.includes("New Arrival") && (
          <div className="bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-md shadow">
            NEW
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col items-center text-center gap-2">
        <h3
          className="font-semibold text-white text-lg hover:text-green-700 truncate cursor-pointer"
          // onClick={handleViewProduct}
        >
          {itemName}
        </h3>

        <p className="text-sm text-white/80 truncate">{description}</p>

        <div className="flex justify-center text-sm">{renderStars(rating)}</div>

        <div className="flex justify-center items-center gap-2">
          <span className="text-2xl font-bold text-white">
            {formattedPrice}
          </span>
          {formattedOriginalPrice && (
            <span className="text-sm text-white/70 line-through">
              {formattedOriginalPrice}
            </span>
          )}
        </div>

        <div className="flex justify-center gap-2 mt-3 w-full">
          <Button
            type="primary"
            onClick={handleAddToCart}
            className="flex-1 !bg-white !text-black hover:!bg-gray-200 border-0 rounded-xl font-semibold"
          >
            Subscribe
          </Button>

          <Button
            onClick={handleSendWhatsApp}
            className="flex-1 !bg-black/20 hover:!bg-black/30 !text-white border border-white/30 rounded-xl flex items-center justify-center gap-2"
          >
            Contact With <FaWhatsapp />
          </Button>
        </div>
      </div>
    </div>
  );
};
export default function Subscription() {
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
      if (category === "All Categories") {
        if (prev.includes("All Categories")) {
          return [];
        }
        return ["All Categories"];
      } else {
        const newCategories = prev.filter((cat) => cat !== "All Categories");

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

  // const [fetch, { data: getFetchData, isSuccess: isFetchDataSuccess }] =
  //   useGetGetItemsByAssetCaetgoryAndCompanyBranchV1Mutation();
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

  const filteredProducts = useMemo(() => {
    let filtered = productsData;

    // ✅ Step 1: Filter by assetCategoryXid
    filtered = filtered.filter((product) => product.assetCategoryXid === 615);

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
  useEffect(() => {
    const cards = document.querySelectorAll(".card");

    const handleScroll = () => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
          card.classList.add("show");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
  }, []);
  const history = useHistory();
  const [current, setCurrent] = useState(0);
  const videos = [video1, video2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % videos.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [videos.length]);

  return (
    <>
      <div className="mb-6 sm:mb-8 text-center mt-8 sm:mt-12">
        <div className="flex items-center justify-center mb-4 sm:mb-8">
          <div className="w-8 sm:w-16 h-px bg-black"></div>
          <h3 className="px-2 sm:px-4 text-base sm:text-lg md:text-xl font-extrabold uppercase text-black">
            Membership Plan
          </h3>
          <div className="w-8 sm:w-16 h-px bg-black"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-2 max-h-60 overflow-y-auto custom-scrollbar px-1">
          {categories.map((category, index) => {
            const isActive = selectedCategories.includes(category);

            //     return (
            //       <button
            //         key={index}
            //         onClick={() => handleCategoryChange(category)}
            //         className={`
            //   px-3 py-1.5 rounded-full text-sm border transition-all
            //   ${
            //     isActive
            //       ? "bg-black text-white border-black"
            //       : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
            //   }
            // `}
            //       >
            //         {category}

            //         <span className="ml-1 text-xs opacity-70">
            //           (
            //           {category === "All Categories"
            //             ? products.length
            //             : products.filter((p) => p.nameEng === category).length}
            //           )
            //         </span>
            //       </button>
            //     );
          })}
        </div>
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
    justify-items-center
    w-fit"
          >
            {filteredProducts.map((product, index) => (
              <div key={product.pid} className="w-[350px]">
                <CartItem {...product} index={index} />
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
