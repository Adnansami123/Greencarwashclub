import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  FaHeart,
  FaShoppingCart,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaArrowLeft,
  FaArrowRight,
  FaStar,
  FaEye,
  FaChevronLeft,
  FaChevronRight,
  FaPinterest,
  FaInstagram,
  FaUser,
  FaExclamationCircle,
} from "react-icons/fa";
import { SlClose, SlSizeFullscreen } from "react-icons/sl";
import Compare from "../../assets/images/compare-nav.png";
import Like from "../../assets/images/heart-outer-black.png";
import LikeFilled from "../../assets/images/heart-filled.png";
import { WishlistContext } from "../../context/WishlistContext";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import ProductCarousel from "../UI/ProductCarousel";
import { useCart } from "../../context/CartContext";
import { useCompare } from "../../context/CompareContext";
import {
  useGetGetItemsByAssetCaetgoryAndCompanyBranchV1Mutation,
  usePostItemRatingByUserMutation,
  usePostTransactionByUserMutation,
} from "../../store/eCommerceAPI/eCommerceAPI";
import ProductInfoTabs from "./ProductInfoTabs";
import RelatedProducts from "./RelatedProducts";
import { color } from "framer-motion";
import { Button, message } from "antd";
import AuthContext from "../../store/authentication/auth-context";
import { setLoadingModalConfiguration } from "../../store/Slices/ModalLoaderSlice";
import { useDispatch, useSelector } from "react-redux";
import { GeteCommerceList } from "../../store/Slices/ECommercesSlice";
import {
  commonValidationsMsg,
  commonValidator,
} from "../../utils/validations/commonValidations";
import { string, number } from "yup";
import { Link } from "lucide-react";

export default function ProductDetails({
  itemImages,
  itemName,
  pid,
  description,
  discount,
  salePrice,
  availableStock,
  rating,
  allProducts, // This would come from your API or context
  // other props
}) {
  const dispatch = useDispatch();
  const { id } = useParams();

  const [products, setProducts] = useState([]);

  // const [fetch, { data: getFetchData, isSuccess: isFetchDataSuccess }] =
  //   useGetGetItemsByAssetCaetgoryAndCompanyBranchV1Mutation();

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
  //     setProducts(getFetchData);
  //   } else {
  //   }
  // }, [getFetchData]);

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
    }
  }, [CompanyBranchData]);

  const location = useLocation();
  const history = useHistory();
  const [zoomedProduct, setZoomedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedTab, setSelectedTab] = useState("additional");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showZoomedCarousel, setShowZoomedCarousel] = useState(false);
  const [wishlistFeedback, setWishlistFeedback] = useState(false);
  const [cartFeedback, setCartFeedback] = useState(false);
  const [compareFeedback, setCompareFeedback] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const [errors, setErrors] = useState({});

  const { wishlist, addToWishlist, removeFromWishlist } =
    useContext(WishlistContext);
  const authCtx = useContext(AuthContext);

  const { addToCart, cartItems, removeCartItem, updateCartItem } = useCart();
  const { compareItems, toggleCompare, RemoveCompareItem } = useCompare();
  const [product, setProductAfterFilter] = useState();
  const [Add, { data: getAddData, isSuccess: isAddSuccess }] =
    usePostTransactionByUserMutation();
  const [AddRating, { data: getAddRating, isSuccess: isAddRatingSuccess }] =
    usePostItemRatingByUserMutation();
  const [review, setReview] = useState({
    UserName: "",
    email: "",
    rating: 0,
    Comments: "",
  });

  // console.log("review", review);

  // Add this effect to handle API response and update UI
  useEffect(() => {
    if (isAddRatingSuccess && getAddRating) {
      // Update the local product state to include the new review
      if (product && product.userReviews) {
        const updatedProduct = {
          ...product,
          userReviews: [
            ...product.userReviews,
            {
              UserName: review.UserName,
              email: review.email,
              Rating: review.rating,
              Comments: review.Comments,
              // Add any other fields from the API response
            },
          ],
        };
        setProductAfterFilter(updatedProduct);
      }

      // Clear form after successful submission
      setReview({
        UserName: "",
        email: "",
        rating: 0,
        Comments: "",
      });

      message.success("Review submitted successfully!");
    }
  }, [isAddRatingSuccess, getAddRating]);

  // Update selected size if product changes
  useEffect(() => {
    const sizes = extractSizes();
    setSelectedSize(sizes[0] || "");
  }, [product]);

  // const sizeOptions = ["Free Size", "Small", "Medium", "Large", "XL"];

  const colorOptions =
    product?.itemSpecification?.map((item) => ({
      name: item.nameEng,
      // We'll use a color mapping or default to a placeholder color
      code: item.nameEng,
      ItemSpecficationXID: item.pid, // getting pid of speciication.
    })) || [];

  const [selectedColor, setSelectedColor] = useState(
    colorOptions.length > 0 ? colorOptions[0].name : "",
  );

  const [selectItemSpecficationXID, setSelectedItemSpecficationXID] = useState(
    colorOptions.length > 0 ? colorOptions[0].ItemSpecficationXID : 1,
  );

  console.log("colorOptions", colorOptions);
  console.log("selectItemSpecficationXID", selectItemSpecficationXID);

  const [itemSpecficationXID, setItemSpecficationXID] = useState(
    colorOptions.length > 0 ? colorOptions[0].ItemSpecficationXID : null,
  );

  // Helper function to map color names to hex codes
  function getColorCode(colorName) {
    const colorMap = {
      Pink: "#FFC0CB",
      Black: "#000000",
      "Navy Blue": "#000080",
      Maroon: "#800000",
      Green: "#008000",
      Red: "#FF0000",
      Blue: "#0000FF",
      Yellow: "#FFFF00",
      Purple: "#800080",
      Orange: "#FFA500",
      Brown: "#A52A2A",
      Grey: "#808080",
      White: "#FFFFFF",
      // Add more colors as needed
    };

    return colorMap[colorName] || "#CCCCCC"; // Default to gray if not found
  }

  // const [selectedSize, setSelectedSize] = useState(sizeOptions[0]);

  // const product = products.find((p) => p.pid.toString() === id);

  //if (!products) return <div>Product not found!</div>;

  console.log("products", products);
  console.log("products", id);

  useEffect(() => {
    if (!!id && products?.length > 0) {
      setProductAfterFilter(products.find((p) => p.pid.toString() === id));
    }
  }, [id, products]);

  console.log("products", setProductAfterFilter);

  const productData = products.find((item) => item.pid === Number(id));

  // if (!product.colorOptions || product.colorOptions.length === 0) {
  //   return null;
  // }

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    const cartItem = cartItems.find((item) => item.id === product.pid);
    if (cartItem) {
      updateCartItem(product.pid, { quantity: cartItem.quantity + 1 });
    }
  };
  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
    const cartItem = cartItems.find((item) => item.id === product.pid);
    if (cartItem) {
      updateCartItem(product.pid, { quantity: cartItem.quantity - 1 });
    }
  };

  const toggleWishlist = (e) => {
    e.stopPropagation();
    const productToToggle = {
      id: product.pid,
      name: product.itemName,
      description: product.description,
      price: product.salePrice,
      image: productImage,
      quantity: quantity,
      taxPrice: (product.salePrice * product.gstPercentage) / 100,
      gstPercentage: product.gstPercentage,
      selectedColor: selectedColor,
      selectedSize: selectedSize,
      ItemSpecficationXID: itemSpecficationXID,
    };

    const productInWishlist = wishlist.some((item) => item.id === product.pid);

    // Use isWishlisted to determine whether to add or remove
    if (productInWishlist) {
      removeFromWishlist(product.pid);
    } else {
      addToWishlist(productToToggle);
    }
    console.log("wishlist nagetive:", !!authCtx.isLoggedIn);
    console.log("wishlist nagetive:", authCtx.isLoggedIn);
    if (authCtx.isLoggedIn) {
      let data = {
        userXid: authCtx.clientID,
        itemXID: product.pid,
        transactionTypeXID: 1,
        lastEditByXid: authCtx.clientID,
      };
      Add({ data: data });
    }

    // Show wishlist feedback
    setWishlistFeedback(true);
    setTimeout(() => setWishlistFeedback(false), 3000);
  };

  const handleToggleCompare = (e) => {
    e.stopPropagation();
    const CompareToToggle = {
      id: product.pid,
      name: product.itemName,
      description: product.description,
      price: product.salePrice,
      image: productImage,
      img: productImage,
      itemName,
      // originalPrice: originalPrice,
      isOutOfStock: availableStock <= 0,
      selectedColor: selectedColor, // Add the selected color
      selectedSize: selectedSize,
      ItemSpecficationXID: itemSpecficationXID,
      // Add the selected size
    };

    const productInCompare = compareItems.some(
      (item) => item.id === product.pid,
    );

    // The issue is here - just use toggleCompare which already handles both add and remove
    toggleCompare(CompareToToggle);

    if (authCtx.isLoggedIn) {
      let data = {
        userXid: authCtx.clientID,
        itemXID: product.pid,
        transactionTypeXID: 2,
        lastEditByXid: authCtx.clientID,
      };
      Add({ data: data });
    }

    // Show wishlist feedback
    setCompareFeedback(true);
    setTimeout(() => setCompareFeedback(false), 3000);
  };

  // Handler for adding to cart using the context
  const handleAddToCart = (e) => {
    e.stopPropagation();

    // Check if product is already in cart
    const productInCart = cartItems.find((item) => item.id === product.pid);

    // Only proceed if product is not already in cart
    if (!productInCart && product.availableStock > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const position = {
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
      };

      // Add product to cart with selected quantity
      console.log("productinDetails", product);
      addToCart(
        {
          id: product.pid,
          name: product.itemName,
          description: product.description || product.itemName,
          price: product.salePrice,
          image: productImage,
          quantity: quantity,
          taxPrice: (product.salePrice * product.gstPercentage) / 100,
          gstPercentage: product.gstPercentage,
          selectedColor: selectedColor,
          selectedSize: selectedSize,
          ItemSpecficationXID: selectItemSpecficationXID,
        },
        position,
      );

      console.log("authCtx is loggedin", !!authCtx.isLoggedIn);
      console.log("authCtx is loggedin", authCtx.isLoggedIn);
      if (authCtx.isLoggedIn) {
        let data = {
          userXid: authCtx.clientID,
          itemXID: product.pid,
          transactionTypeXID: 4, // Use appropriate transaction type for wishlist addition
          lastEditByXid: authCtx.clientID,
          // Add any other required fields
        };
        Add({ data: data });
      }

      // Show cart feedback
      setCartFeedback(true);
      setTimeout(() => setCartFeedback(false), 3000);
    } else if (productInCart) {
      // If product is already in cart, show message or do nothing
      alert(
        "This product is already in your cart. Use the quantity controls to adjust the amount.",
      );
      // Alternatively, you could navigate to cart or highlight the quantity controls
    } else {
      // If product is out of stock
      alert("Sorry, this product is out of stock.");
    }
  };
  // //Format Product images for carousel
  // const formatProductImages = () => {
  //   let formattedImages = [];

  //   if (
  //     !!product?.itemImages &&
  //     product?.itemImages &&
  //     product?.itemImages?.length > 0
  //   ) {
  //     formattedImages = product.itemImages.map((img) => ({
  //       original: `https://amsfilecontainercc.blob.core.windows.net/uatfilecontainer/${img.savedName}`,
  //       thumbnail: `https://amsfilecontainercc.blob.core.windows.net/uatfilecontainer/${img.savedName}`,
  //       description: img.originalName,
  //       alt: img.originalName || product.itemName,
  //     }));
  //   } else {
  //     //Add placeholder if no images
  //     formattedImages = [
  //       {
  //         original: "/api/placeholder/400/500",
  //         thumbnail: "/api/placeholder/400/500",
  //         description: "Placeholder Image",
  //         alt: product?.itemName,
  //       },
  //     ];
  //   }

  //   return formattedImages;
  // };

  const formatProductImages = () => {
    const baseUrl =
      "https://amsfilecontainercc.blob.core.windows.net/uatfilecontainer/";

    // // 1. Main item images
    // const mainImages =
    //   product?.itemImages?.map((img) => ({
    //     original: `${baseUrl}${img.savedName}`,
    //     thumbnail: `${baseUrl}${img.savedName}`,
    //     description: img.originalName,
    //     alt: img.originalName || product?.itemName,
    //   })) || [];

    // 2. Spec images (flatten all specs)
    const specImages =
      product?.itemSpecification?.flatMap((spec) =>
        (spec.itemSpecImages || []).map((img) => ({
          original: `${baseUrl}${img.savedName}`,
          thumbnail: `${baseUrl}${img.savedName}`,
          description: img.originalName,
          alt: `${product?.itemName} ${spec.nameEng} ${spec.sizeName}`,
          specId: spec.pid, // ✅ ADD THIS LINE (VERY IMPORTANT)
        })),
      ) || [];

    // 3. Combine both
    const formattedImages = [...specImages];

    // 4. Fallback if empty
    if (formattedImages.length === 0) {
      return [
        {
          original: "/api/placeholder/400/500",
          thumbnail: "/api/placeholder/400/500",
          description: "Placeholder Image",
          alt: product?.itemName,
        },
      ];
    }

    return formattedImages;
  };

  const productImages = formatProductImages();

  console.log("productImages", product);
  // Get product image with fallback
  const productImage =
    !!product?.itemImages &&
    product?.itemImages &&
    product.itemImages.length > 0
      ? `https://amsfilecontainercc.blob.core.windows.net/uatfilecontainer/${product.itemImages[0]?.savedName}`
      : "/api/placeholder/400/500";

  // Get hover image from second image in itemImages array or fall back to main image
  const hoverImage =
    itemImages && itemImages.length > 1
      ? `https://amsfilecontainercc.blob.core.windows.net/uatfilecontainer/${itemImages[1]?.savedName}`
      : productImage;

  const extractSizes = () => {
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

  const sizeOptions = extractSizes();
  // const [selectedSize, setSelectedSize] = useState(sizeOptions[0] || "");
  const [selectedSize, setSelectedSize] = useState(
    sizeOptions[0] || "Free Size",
  );

  // if (sizeOptions.length === 0) {
  //   return null;
  // }

  const onClickSubmit = () => {
    alert("Review Submitted Succesffuly!");
  };

  const billingFields = (isAddToCart = false) => {
    let billing;

    const commonBillingObj = {
      firstName: string().required(),
      lastName: string().required(),
      companyName: string().required(),
    };
    return commonBillingObj;
  };

  const handleSubmitReview = () => {
    // Initialize validation errors
    let newFormErrors = {};

    // Validate each field
    if (!review.UserName || review.UserName.trim() === "") {
      newFormErrors.UserName = "Name is required";
    }

    if (!review.email || review.email.trim() === "") {
      newFormErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(review.email)) {
      newFormErrors.email = "Please enter a valid email address";
    }

    if (!review.rating || review.rating === 0) {
      newFormErrors.rating = "Please select a rating";
    }

    if (!review.Comments || review.Comments.trim() === "") {
      newFormErrors.Comments = "Please write your review";
    }

    // Update form errors state
    setFormErrors(newFormErrors);

    // Only proceed if there are no errors
    if (Object.keys(newFormErrors).length === 0) {
      // Prepare data for API call
      const ratingData = {
        userXid: authCtx.isLoggedIn ? authCtx.clientID : 0,
        itemXID: product.pid,
        Rating: review.rating,
        Comments: review.Comments,
        UserName: review.UserName,
        email: review.email,
        lastEditByXid: authCtx.isLoggedIn ? authCtx.clientID : 0,
      };

      // Call the API to post the rating
      AddRating({ data: ratingData });

      // Update the product with the new review locally
      const updatedProduct = {
        ...product,
        userReviews: [...(product.userReviews || []), ratingData],
      };

      setProductAfterFilter(updatedProduct);

      // Reset form after submission
      setReview({
        UserName: "",
        email: "",
        rating: 0,
        Comments: "",
      });

      message.success("Review submitted successfully!");
    }
  };
  const handleImageChange = (index) => {
    setSelectedImageIndex(index);

    const selectedImg = productImages[index];

    if (selectedImg?.specId) {
      // find matching color
      const matchedColor = colorOptions.find(
        (c) => Number(c.ItemSpecficationXID) === Number(selectedImg.specId),
      );

      if (matchedColor) {
        setSelectedColor(matchedColor.name);
        setSelectedItemSpecficationXID(matchedColor.ItemSpecficationXID);
      }
    }
  };
  return (
    <div className="container px-2">
      <div className="bg-gray-50 py-3 border-b border-gray-100">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center text-xs sm:text-sm">
            <span
              onClick={() => history.push("/")}
              className="text-gray-500 hover:text-gray-700 cursor-pointer"
            >
              Home 1
            </span>
            <span className="mx-2 text-gray-400">/</span>
            <span className="font-medium text-gray-800">Product Details</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 lg:gap-6 justify-center mt-3">
        {/* Left column - Product Images */}
        <div className="w-full lg:w-1/2 relative px-2 sm:px-3 lg:px-8">
          <div className="relative w-auto max-w-[450px] mx-auto">
            {" "}
            <div className="relative">
              {productImages.length > 1 ? (
                <ProductCarousel
                  images={productImages}
                  initialIndex={selectedImageIndex}
                  onClick={() => setShowZoomedCarousel(true)}
                  onImagechange={(index) => handleImageChange(index)}
                />
              ) : (
                <img
                  src={productImages[0].original}
                  alt="product"
                  className="w-full cursor-pointer"
                  onClick={() => setShowZoomedCarousel(true)}
                />
              )}
              <SlSizeFullscreen
                size={24}
                className="absolute top-6 right-3 sm:right-4 cursor-pointer bg-white bg-opacity-50 rounded-full p-1 hover:bg-opacity-80"
                onClick={() => setShowZoomedCarousel(true)}
              />
            </div>
            {showZoomedCarousel && (
              <ProductCarousel
                images={productImages}
                initialIndex={selectedImageIndex}
                isZoomed={true}
                onClose={() => setShowZoomedCarousel(false)}
                onImagechange={(index) => setSelectedImageIndex(index)}
              />
            )}
          </div>
        </div>

        {/* Right column - Product Details */}
        <div className="w-full lg:w-1/2 sm:mx-2 flex flex-col justify-between text-black p-2 sm:p-4">
          <div className="font-semibold text-black text-lg sm:text-xl">
            {product?.itemName}
          </div>
          <div className="text-lg sm:text-xl font-medium mt-1 sm:mt-2">
            ₹{product?.salePrice}
          </div>
          <div className="flex items-center space-x-1 mt-1 sm:mt-2">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar
                key={i}
                className={
                  i < product?.rating ? "text-yellow-400" : "text-gray-500"
                }
                size={16}
              />
            ))}
          </div>
          <div className="mt-2 sm:mt-3 text-sm sm:text-base">
            {product?.Comments}
          </div>

          {/* Color Selection */}
          {colorOptions.length > 0 && (
            <div className="mt-3 sm:mt-4 flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-medium text-black-900">Color:</h3>

              {colorOptions.map((color) => {
                const isSelected = selectedColor === color.name;

                return (
                  <span
                    key={color.name}
                    onClick={() => {
                      setSelectedColor(color.name);
                      setSelectedItemSpecficationXID(color.ItemSpecficationXID);

                      // 🔥 Find image for selected color
                      const index = productImages.findIndex(
                        (img) =>
                          img.specId &&
                          Number(img.specId) ===
                            Number(color.ItemSpecficationXID),
                      );

                      if (index !== -1) {
                        setSelectedImageIndex(index);
                      } else {
                        setSelectedImageIndex(0); // fallback
                      }
                    }}
                    className={`cursor-pointer text-sm px-3 py-1.5 rounded-md border transition-all
  ${
    isSelected
      ? "bg-black text-white border-black"
      : "bg-white text-black border-black hover:bg-black hover:text-white"
  }
`}
                  >
                    {color.name}
                  </span>
                );
              })}
            </div>
          )}
          {/* Size Options */}
          <div className="mt-3 sm:mt-4">
            <div className="flex flex-wrap gap-2">
              {sizeOptions.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium rounded-md ${
                    selectedSize === size
                      ? "bg-gray-900 text-white"
                      : "bg-gray-200 text-gray-900 hover:bg-gray-300"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart, Wishlist, Compare */}
          {/* <div className="flex flex-wrap items-center gap-2 sm:gap-3 relative mt-3 sm:mt-4">
            <Button
              type="primary"
              onClick={handleAddToCart}
              className="relative overflow-hidden font-bold uppercase w-full sm:w-auto group"
            >
              <span className="relative z-10">Add to Cart</span>

              <span className="absolute top-0 left-0 w-0 h-full bg-custom-pink transition-all duration-1000 group-hover:w-full z-0"></span>
            </Button>

            {cartFeedback && (
              <span className="absolute top-12 left-2 sm:left-14 text-xs sm:text-sm text-green-600 font-medium">
                {cartItems.some((item) => item.id === product.pid)
                  ? "Added to Cart!"
                  : "Item Removed!"}
              </span>
            )}

            <div className="flex items-center gap-3 mt-6 sm:mt-0">
              <img
                src={
                  wishlist.some((item) => item.id === product?.pid)
                    ? LikeFilled
                    : Like
                }
                alt="Wishlist"
                className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer"
                onClick={toggleWishlist}
              />
              <img
                src={
                  compareItems.some((item) => item.id === product.pid)
                    ? Compare
                    : Compare
                }
                alt="Compare"
                className="w-5 h-5 sm:w-6 sm:h-6 cursor-pointer"
                onClick={handleToggleCompare}
              />
            </div>
          </div> */}

          {/* Feedback Messages */}
          <div className="h-6 mt-1">
            {wishlistFeedback && (
              <span className="text-xs sm:text-sm text-green-600 font-medium">
                {wishlist.some((item) => item.id === product.pid)
                  ? "Added to wishlist!"
                  : "Item Removed!"}
              </span>
            )}
            {compareFeedback && (
              <span className="text-xs sm:text-sm text-green-600 font-medium ml-10">
                {compareItems.some((item) => item.id === product.pid)
                  ? "Added to Compare!"
                  : "Item Removed!"}
              </span>
            )}
          </div>

          {/* Quantity Controls */}
          {/* <div className="flex flex-wrap items-center gap-3 mt-3 sm:mt-4">
            <div className="flex items-center space-x-2 sm:space-x-3 bg-gray-100 p-2 rounded-md shadow-md">
              <button
                onClick={decreaseQuantity}
                disabled={quantity <= 1}
                className="w-6 h-6 sm:w-8 sm:h-8 bg-red-500 text-white rounded-full flex items-center justify-center text-sm sm:text-lg hover:bg-red-600 transition"
              >
                –
              </button>

              <span className="text-base sm:text-lg font-semibold">
                {quantity}
              </span>

              <button
                onClick={increaseQuantity}
                disabled={quantity >= product?.availableStock}
                className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm sm:text-lg hover:bg-green-600 transition"
              >
                +
              </button>
            </div>

            <div className="text-xs sm:text-sm font-semibold text-gray-700 border-2 rounded-md border-pink-500 p-2">
              Available Stock: {product?.openingStock}
            </div>
          </div> */}

          {/* Social Media Icons */}
          <div className="mt-3 sm:mt-4">
            <p className="text-xs sm:text-sm font-medium mb-1 sm:mb-2">
              Share this product:
            </p>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <a
                href="#"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                <FaFacebook size={18} />
              </a>
              <a
                href="#"
                className="text-blue-400 hover:text-blue-600 transition-colors"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="#"
                className="text-pink-600 hover:text-pink-800 transition-colors"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="#"
                className="text-red-600 hover:text-red-800 transition-colors"
              >
                <FaPinterest size={18} />
              </a>
              <a
                href="#"
                className="text-blue-800 hover:text-blue-900 transition-colors"
              >
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
      {/* Product Info Tabs */}
      {productData ? (
        <div className="mt-6 sm:mt-8">
          <ProductInfoTabs
            tabContents={{
              "Additional information": (
                <div className="p-2 sm:p-4">
                  <p>Dimensions: {productData.dimensions}</p>
                  <p>Material: {productData.material}</p>
                  <p>Brand: {productData.brand}</p>
                </div>
              ),
              Description: (
                <div className="p-2 sm:p-4">
                  {productData.description || "No description available."}
                </div>
              ),
              Reviews: (
                <div className="flex flex-col lg:flex-row gap-4 lg:gap-8 p-2 sm:p-4">
                  {/* Left Section - Reviews */}
                  <div className="w-full lg:w-3/5 max-h-[400px] sm:max-h-[500px] overflow-y-auto space-y-4 sm:space-y-6 px-8 py-2 sm:p-4 rounded-xl sm:rounded-2xl shadow-lg bg-white scroll-smooth scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-100">
                    {productData &&
                    Array.isArray(productData.userReviews) &&
                    productData.userReviews.length > 0 ? (
                      productData.userReviews.map((review, index) => (
                        <div
                          key={index}
                          className="flex gap-2 sm:gap-4 p-3 sm:p-4 border rounded-lg bg-rose-200 hover:bg-white transition-all duration-700 ease-in-out transform hover:scale-105 shadow hover:shadow-md bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700"
                        >
                          {/* Avatar */}
                          <div className="flex-shrink-0">
                            <FaUser className="text-gray-500 text-2xl" />
                          </div>

                          {/* Review Content */}
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <p className="font-bold text-gray-800 text-sm sm:text-base">
                                {review.userName || "Anonymous"}
                              </p>
                              <button className="text-xs sm:text-sm text-rose-500 hover:underline">
                                Reply
                              </button>
                            </div>
                            <div className="flex items-center text-yellow-500 mt-1">
                              {Array.from({ length: 5 }, (_, i) => (
                                <span
                                  key={i}
                                  className={`text-base sm:text-lg ${
                                    i < (review.rating || 0)
                                      ? "text-yellow-400"
                                      : "text-gray-300"
                                  }`}
                                >
                                  {i < (review.rating || 0) ? "★" : "☆"}
                                </span>
                              ))}

                              <span className="ml-2 text-xs sm:text-sm text-gray-500">
                                {review.tating || 0}/5
                              </span>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-600 mt-2">
                              {review.comments || "No comment provided"}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p>No reviews yet</p>
                    )}
                  </div>
                  {/* Right Section - Add a Review Form */}
                  <div className="w-full lg:w-2/5 mt-4 lg:mt-0">
                    <div className="p-3 sm:p-6 border rounded-lg bg-white shadow hover:shadow-lg transition-all duration-500 ease-in-out">
                      <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-rose-600">
                        Add a Review
                      </h3>
                      <form
                        className="space-y-3 sm:space-y-4"
                        onSubmit={(e) => e.preventDefault()}
                      >
                        <div>
                          <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
                            Your rating:
                          </label>
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <button
                                key={star}
                                type="button"
                                className={`text-lg sm:text-xl ${
                                  review.rating >= star
                                    ? "text-yellow-500"
                                    : "text-gray-300"
                                } hover:text-yellow-500 transition-colors`}
                                onClick={() =>
                                  setReview({ ...review, rating: star })
                                }
                              >
                                ★
                              </button>
                            ))}
                          </div>
                          {formErrors.rating && (
                            <p className="text-red-600 text-xs mt-1 font-semibold flex items-center animate-pulse">
                              <FaExclamationCircle className="mr-1" />{" "}
                              {formErrors.rating}
                            </p>
                          )}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div>
                            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
                              Name
                            </label>
                            {/* // Fix all other review state updates to use
                            setReview instead of setReviews */}
                            <input
                              type="text"
                              className={`w-full p-2 border ${
                                formErrors.UserName
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } border-gray-300 rounded-md bg-white placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-400 transition text-sm sm:text-base`}
                              placeholder="Your Name"
                              value={review.UserName}
                              onChange={(e) =>
                                setReview({
                                  ...review,
                                  UserName: e.target.value,
                                })
                              }
                            />
                            {formErrors.UserName && (
                              <p className="text-red-600 text-xs mt-1 font-semibold flex items-center animate-pulse">
                                <FaExclamationCircle className="mr-1" />{" "}
                                {formErrors.UserName}
                              </p>
                            )}
                          </div>
                          <div>
                            <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
                              Email
                            </label>
                            <input
                              type="email"
                              className={`w-full p-2 border ${
                                formErrors.email
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } rounded-md bg-white placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-400 transition text-sm sm:text-base`}
                              placeholder="your@email.com"
                              value={review.email}
                              onChange={(e) =>
                                setReview({ ...review, email: e.target.value })
                              }
                            />
                            {formErrors.email && (
                              <p className="text-red-600 text-xs mt-1 font-semibold flex items-center animate-pulse">
                                <FaExclamationCircle className="mr-1" />{" "}
                                {formErrors.email}
                              </p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="block text-gray-700 font-medium mb-1 text-sm sm:text-base">
                            Message
                          </label>
                          <textarea
                            rows="3"
                            className={`w-full p-2 border ${
                              formErrors.Comments
                                ? "border-red-500"
                                : "border-gray-300"
                            } rounded-md bg-white placeholder-gray-400 text-gray-900 focus:outline-none focus:ring-2 focus:ring-rose-400 transition text-sm sm:text-base`}
                            placeholder="Write your review..."
                            value={review.Comments}
                            onChange={(e) =>
                              setReview({ ...review, Comments: e.target.value })
                            }
                          ></textarea>
                          {formErrors.Comments && (
                            <p className=" text-red-500 text-xs mt-1 font-semibold flex items-center animate-pulse">
                              <FaExclamationCircle className="mr-1" />{" "}
                              {formErrors.Comments}
                            </p>
                          )}
                        </div>

                        <Button
                          onClick={handleSubmitReview}
                          type="button"
                          className="bg-purple-500 text-white px-3 sm:px-5 py-1.5 sm:py-2 rounded text-sm sm:text-base hover:bg-purple-600 transition-all duration-300"
                        >
                          SUBMIT
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              ),
            }}
          />
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
      {Array.isArray(products) && products.length > 1 && (
        <RelatedProducts
          currentProductId={product?.pid}
          productCategory={product?.nameEng}
          products={products.filter((p) => p.pid !== product?.pid)}
          title="Related Products"
        />
      )}
    </div>
  );
}
