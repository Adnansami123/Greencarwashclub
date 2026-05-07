import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { Trash2, ArrowLeft, ShoppingBag, X } from "lucide-react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function CartPage() {
  const history = useHistory();
  const { cartItems, setCartItems, clearCart } = useCart();

  console.log("cartItems", cartItems);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const [product, setProductAfterFilter] = useState();

  // Constants
  const SHIPPING_FEE = 0;
  const TAX_RATE = 0.1; // 10% tax

  // Calculate totals
  const subtotal = cartItems.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 1),
    0,
  );

  // tAx totals
  const subtotaltax = cartItems.reduce(
    (total, item) => total + (item.taxPrice || 0) * (item.quantity || 1),
    0,
  );
  //const totalTax = subtotal * TAX_RATE;
  const totalTax = subtotaltax;
  const totalWithTax = subtotal + totalTax;
  //const grandTotal = totalWithTax + SHIPPING_FEE;
  const grandTotal = subtotal;

  // Remove item from cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };
  console.log("cartItem", cartItems);

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const maxStock = item.availableStock || item.openingStock || 0;

          if (newQuantity > maxStock) {
            alert(`⚠️ Only ${maxStock} items available in stock`);
            return item; // ❌ update mat karo
          }

          return { ...item, quantity: newQuantity };
        }
        return item;
      }),
    );
  };

  // Handle checkout process
  const handleCheckout = () => {
    setIsCheckingOut(true);

    // Simulate processing
    setTimeout(() => {
      // setCheckoutMessage("🎉 Your order has been placed successfully!");
      setIsCheckingOut(false);

      // Store the total in localStorage before redirecting
      localStorage.setItem("cartTotal", grandTotal.toFixed(2));
      localStorage.setItem("cartSubtotal", subtotal.toFixed(2));
      localStorage.setItem("cartTax", totalTax.toFixed(2));
      localStorage.setItem("cartShipping", SHIPPING_FEE.toFixed(2));

      //window.location.href = "/CheckoutPage";
      history.push("/CheckoutPage");
      // Clear cart after successful checkout
      // setCartItems([]);
    }, 1500);
  };

  const hasItems = cartItems && cartItems.length > 0;

  return (
    <div className="bg-gradient-to-b from-blue-50 to-gray-50 min-h-screen py-6 sm:py-10 px-3 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with subtle animation */}
        <div className="mb-6 sm:mb-10 text-center sm:text-left">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight">
            Your Shopping Cart
          </h1>
          <p className="text-gray-600 mt-2 font-medium">
            {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in
            your cart
          </p>
        </div>
        {hasItems && (
          <div className="flex justify-end mb-4">
            <button
              onClick={clearCart}
              className="flex items-end gap-2 px-4 py-2 text-sm bg-red-50 text-red-600 hover:bg-red-100 transition-colors rounded-lg shadow-sm hover:shadow"
            >
              <X size={16} />
              <span>Clear All</span>
            </button>
          </div>
        )}

        {cartItems.length > 0 ? (
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                {/* Header */}
                <div className="hidden sm:grid sm:grid-cols-12 bg-gray-50 px-4 sm:px-6 py-4 text-sm font-medium text-gray-600 sticky top-0 z-10 border-b border-gray-100">
                  <div className="col-span-6">Product</div>
                  <div className="col-span-2 text-center">Price</div>
                  <div className="col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 text-right">Subtotal</div>
                </div>

                {/* Scrollable Items Container */}
                <div className="max-h-[450px] overflow-y-auto">
                  {/* Items */}
                  <div className="divide-y divide-gray-100">
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="py-4 sm:py-6 px-4 sm:px-6 grid grid-cols-1 sm:grid-cols-12 gap-4 items-center relative"
                      >
                        {/* Mobile Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="absolute top-3 right-3 text-red-500 hover:text-red-700 sm:hidden"
                          title="Remove item"
                        >
                          <Trash2 size={18} />
                        </button>

                        {/* Product Info */}
                        <div className="sm:col-span-6 flex gap-3 sm:gap-4">
                          <div className="flex-shrink-0 w-20 h-20 bg-gray-100 rounded-md overflow-hidden border border-gray-200">
                            <img
                              src={
                                item.image || "https://via.placeholder.com/80"
                              }
                              alt={item.itemName}
                              className="w-full h-full object-cover object-center"
                            />
                          </div>
                          <div className="flex flex-col pr-8 sm:pr-0">
                            <Link
                              to={`/product/${item.id}`}
                              className="text-lg font-medium text-gray-900 hover:text-blue-600 line-clamp-2"
                            >
                              {item.itemName || item.name}
                            </Link>

                            {/* Display color and size information */}
                            <div className="flex flex-wrap gap-2 mt-2">
                              {/* {item.selectedColor && (
                                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                  Color: {item.selectedColor}
                                </span>
                              )}
                              {item.selectedSize && (
                                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-purple-50 text-purple-700 border border-purple-100">
                                  Size: {item.selectedSize}
                                </span>
                              )} */}
                              {/* {item.ItemSpecficationXID && (
                                <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-100">
                                  Color: {item.ItemSpecficationXID}
                                </span>
                              )} */}
                            </div>

                            <p className="text-sm text-gray-500 mt-1">
                              {item.description || ""}
                            </p>
                            <p className="sm:hidden mt-1 text-sm font-medium text-gray-900">
                              ₹ {item.price?.toFixed(2) || "0.00"}
                            </p>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="hidden sm:block sm:col-span-2 text-center text-gray-700">
                          ₹ {item.price?.toFixed(2) || "0.00"}
                        </div>

                        {/* Quantity */}
                        <div className="sm:col-span-2 flex justify-start sm:justify-center">
                          <div className="flex border border-gray-300 rounded-md">
                            <button
                              className="px-3 py-1 bg-gray-50 hover:bg-gray-100 border-r border-gray-300 text-gray-600 transition"
                              onClick={() =>
                                updateQuantity(
                                  item.id,
                                  (item.quantity || 1) - 1,
                                )
                              }
                              disabled={(item.quantity || 1) <= 1}
                            >
                              -
                            </button>

                            <span className="px-4 py-1 text-center min-w-[40px]">
                              {item.quantity || 1}
                            </span>

                            <button
                              className="px-3 py-1 bg-gray-50 hover:bg-gray-100 border-r border-gray-300 text-gray-600 transition"
                              onClick={() => {
                                const currentQty = item.quantity || 1;
                                const maxStock =
                                  item.availableStock || item.openingStock || 0;

                                if (currentQty >= maxStock) {
                                  alert(`🚫 Max limit reached (${maxStock})`);
                                  return;
                                }

                                updateQuantity(item.id, currentQty + 1);
                              }}
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Subtotal + Remove */}
                        <div className="sm:col-span-2 flex justify-between sm:justify-end items-center">
                          <span className="font-medium text-gray-900">
                            ₹
                            {((item.price || 0) * (item.quantity || 1)).toFixed(
                              2,
                            )}
                          </span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="ml-4 text-red-500 hover:text-red-700 hidden sm:block transition"
                            title="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Continue Shopping Link */}
              <div className="mt-4 sm:mt-6">
                <Link
                  to="/Subscription"
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition"
                >
                  <ArrowLeft size={16} />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
              <div className="bg-white rounded-xl shadow-md p-5 sm:p-6 border border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 pb-4 border-b border-gray-200">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹ {subtotal.toFixed(2)}</span>
                  </div>

                  {/* <div className="flex justify-between">
                    <span className="text-gray-600">Tax (5% inclusive)</span>
                    <span className="font-medium">₹ {totalTax.toFixed(2)}</span>
                  </div> */}

                  {/* <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      ₹ {SHIPPING_FEE.toFixed(2)}
                    </span>
                  </div> */}

                  <div className="border-t border-gray-200 pt-4 flex justify-between items-center">
                    <span className="text-lg font-semibold text-gray-900">
                      Total
                    </span>
                    <span className="text-xl font-bold text-gray-900">
                      ₹ {grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut || cartItems.length === 0}
                  className="w-full mt-6 py-3 px-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-medium rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm hover:shadow"
                >
                  {isCheckingOut ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Processing...
                    </div>
                  ) : (
                    <>
                      <ShoppingBag size={18} />
                      Proceed to Checkout
                    </>
                  )}
                </button>

                {/* Checkout Message */}
                {/* {checkoutMessage && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 animate-fadeIn">
                    {checkoutMessage}
                  </div>
                )} */}

                {/* Security Note */}
                <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-center text-xs text-gray-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                  Secure Checkout
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Empty Cart State
          <div className="bg-white rounded-xl shadow-md p-8 sm:p-12 text-center border border-gray-100">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-50 rounded-full">
                <ShoppingBag size={64} className="text-blue-300" />
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Your cart is empty
            </h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">
              Looks like you haven't added any items to your cart yet. Discover
              our amazing products and start shopping!
            </p>
            <Link
              to="/Subscription"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow transition-all"
            >
             Subscription
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
