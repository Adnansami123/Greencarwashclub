import { createContext, useEffect, useState } from "react";

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const storedWishlist = localStorage.getItem("wishlist");
    return storedWishlist ? JSON.parse(storedWishlist) : [];
  });

  // The key fix is here - always update localStorage, even when empty
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (item) => {
    setWishlist((prevWishlist) => {
      // Check if item already exists (to prevent duplicates)
      if (prevWishlist.some((wishlistItem) => wishlistItem.id === item.id)) {
        console.log("Item already in wishlist:", item);
        return prevWishlist;
      }
      return [...prevWishlist, item];
    });
  };

  const removeFromWishlist = (id) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item.id !== id)
    );
  };

  // Clear all compare items
  const clearWishlist = () => {
    setWishlist([]);
  };

  const value = { wishlist, addToWishlist, removeFromWishlist, clearWishlist };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
