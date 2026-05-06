import React, { createContext, useState, useEffect, useContext } from "react";

// Create the cart context
export const CartContext = createContext({
  cartItems: [],
  cartCount: 0,
  notification: { show: false, message: "", position: null },
  addToCart: () => {},
  updateCartItem: () => {},
  removeCartItem: () => {},
  clearCart: () => {},
});

// Custom hook for using the cart context
export const useCart = () => useContext(CartContext);

// Cart provider component
export const CartProvider = ({ children }) => {
  // Cart items state with localStorage persistence
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    try {
      const parsedCart = storedCart ? JSON.parse(storedCart) : [];
      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (error) {
      console.error("Error parsing cartItems from localStorage:", error);
      return [];
    }
  });

  // Cart count derived from cart items
  const [cartCount, setCartCount] = useState(0);

  // Notification state for cart actions
  const [notification, setNotification] = useState({
    show: false,
    message: "",
    position: null,
  });

  // Update cartCount whenever cartItems changes
  useEffect(() => {
    if (!Array.isArray(cartItems)) {
      setCartItems([]);
      return;
    }
    const count = cartItems.reduce(
      (acc, item) => acc + (item.quantity || 0),
      0
    );
    setCartCount(count);
  }, [cartItems]);

  // Persist cartItems to localStorage
  useEffect(() => {
    if (Array.isArray(cartItems)) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Add item to cart
  const addToCart = (product, position = null) => {
    if (!product) return;

    setCartItems((prevItems) => {
      if (!Array.isArray(prevItems)) return [{ ...product, quantity: 1 }];

      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex !== -1) {
        // Item exists, update quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: (updatedItems[existingItemIndex].quantity || 0) + 1,
        };
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });

    // Show notification
    setNotification({
      show: true,
      message: `${product.name || "Item"} added to cart!`,
      position,
    });

    // Hide notification after 3 seconds
    setTimeout(() => {
      setNotification({ show: false, message: "", position: null });
    }, 3000);
  };

  // Update cart item (e.g., change quantity)
  const updateCartItem = (productId, updateData) => {
    setCartItems((prevItems) => {
      if (!Array.isArray(prevItems)) return [];

      return prevItems.map((item) =>
        item.id === productId ? { ...item, ...updateData } : item
      );
    });
  };

  // Remove item from cart
  const removeCartItem = (productId) => {
    setCartItems((prevItems) => {
      if (!Array.isArray(prevItems)) return [];
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
  };

  // Context value
  const contextValue = {
    cartItems,
    cartCount,
    notification,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart,
    setCartItems, // Expose this if you need direct access to set cart items
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
};

export default CartProvider;
