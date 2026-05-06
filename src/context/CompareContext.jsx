import { createContext, useContext, useEffect, useState } from "react";
import { setLoadingModalConfiguration } from "../store/Slices/ModalLoaderSlice";
// import { useGetGetItemsByAssetCaetgoryAndCompanyBranchV1Mutation } from "../store/eCommerceAPI/eCommerceAPI";
import { useDispatch } from "react-redux";

const CompareContext = createContext();

const CompareProvider = ({ children }) => {
  const [compareItems, setCompareItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  // Fetch products from API

  // const [fetch, { data: getFetchData, isSuccess: isFetchDataSuccess }] =
  //   useGetGetItemsByAssetCaetgoryAndCompanyBranchV1Mutation();


  useEffect(
    function Assets() {
      dispatch(setLoadingModalConfiguration({ isVisible: true }));
      fetch({
        CBXID: process.env.REACT_APP_CBXID,
        CompanyXID: process.env.REACT_APP_CompanyXID,
      });
    },
    [fetch]
  );


  // useEffect(() => {
  //   if (!!getFetchData && getFetchData?.length > 0) {
  //     dispatch(setLoadingModalConfiguration({ isVisible: false }));

  //     const transformedProducts = getFetchData.map((item) => ({
  //       id: item.pid,
  //       pid: item.pid,
  //       name: item.itemName.trim(),
  //       img:
  //         item.itemImages && item.itemImages[0]
  //           ? `https://ams.calibrecue.com/uploads/${item.itemImages[0].savedName}`
  //           : "/placeholder-image.jpg",
  //       description: item.description || "No description available",
  //       price: item.salePrice || 0,
  //       originalPrice: item.purchasePrice || 0,
  //       isOutOfStock: item.availableStock <= 0,
  //       category: item.nameEng || "",
  //       brand: item.brand || "",
  //       material: item.material || "",
  //       dimensions: item.dimensions || "",
  //       color: item.nameEng,
  //       size: item.sizeName,
  //       // Add other properties needed from the API response
  //     }));
  //     setProducts(transformedProducts);
  //     setLoading(false);
  //   } else {
  //     //dispatch(setLoadingModalConfiguration({ isVisible: false }));
  //   }
  // }, [getFetchData]);


  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch(
  //         "https://ams.calibrecue.com/api/eCommerce/GetItemsByAssetCaetgoryAndCompanyBranchV1/87/48/-1"
  //       );

  //       if (!response.ok) {
  //         throw new Error(`API error: ${response.status}`);
  //       }

  //       const data = await response.json();

  //       // Transform API data to match our application's product structure
  //       const transformedProducts = data.map((item) => ({
  //         id: item.pid,
  //         pid: item.pid,
  //         name: item.itemName.trim(),
  //         img:
  //           item.itemImages && item.itemImages[0]
  //             ? `https://ams.calibrecue.com/uploads/${item.itemImages[0].savedName}`
  //             : "/placeholder-image.jpg",
  //         description: item.description || "No description available",
  //         price: item.salePrice || 0,
  //         originalPrice: item.purchasePrice || 0,
  //         isOutOfStock: item.availableStock <= 0,
  //         category: item.nameEng || "",
  //         brand: item.brand || "",
  //         material: item.material || "",
  //         dimensions: item.dimensions || "",
  //         color: item.nameEng,
  //         size: item.sizeName,
  //         // Add other properties needed from the API response
  //       }));

  //       console.log("colors", products);
  //       console.log("size", products);

  //       setProducts(transformedProducts);
  //       setLoading(false);
  //     } catch (error) {
  //       console.error("Error fetching products:", error);
  //       setError(error.message);
  //       setLoading(false);
  //     }
  //   };

  //   fetchProducts();
  // }, []);

  // Toggle compare functionality
  const toggleCompare = (product) => {
    setCompareItems((prevItems) => {
      const alreadyExists = prevItems.find((item) => item.id === product.id);

      if (alreadyExists) {
        return prevItems.filter((item) => item.id !== product.id);
      } else if (prevItems.length < 4) {
        return [...prevItems, product];
      } else {
        alert("You can only compare 4 products at a time.");
        return prevItems;
      }
    });
  };

  // Load compare items from localStorage on mount
  useEffect(() => {
    const storedCompareItems = localStorage.getItem("compareItems");
    if (storedCompareItems) {
      try {
        const parsedItems = JSON.parse(storedCompareItems);
        setCompareItems(parsedItems);
      } catch (error) {
        console.error("Error parsing stored compare items:", error);
        localStorage.removeItem("compareItems");
      }
    }
  }, []);

  // Save compare items to localStorage when they change
  useEffect(() => {
    localStorage.setItem("compareItems", JSON.stringify(compareItems));
  }, [compareItems]);

  // Remove a single item from compare
  const RemoveCompareItem = (productId) => {
    setCompareItems((prevItems) => {
      return prevItems.filter((item) => item.id !== productId);
    });
  };

  // Clear all compare items
  const clearCompare = () => {
    setCompareItems([]);
  };

  const value = {
    compareItems,
    toggleCompare,
    clearCompare,
    RemoveCompareItem,
    products,
    loading,
    error,
  };

  return (
    <CompareContext.Provider value={value}>{children}</CompareContext.Provider>
  );
};

export const useCompare = () => useContext(CompareContext);

export { CompareProvider };
export default CompareContext;
