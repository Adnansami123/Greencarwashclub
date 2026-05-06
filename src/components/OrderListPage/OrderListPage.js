import React, { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Package,
  ChevronDown,
  ChevronUp,
  Search,
  Filter,
  Download,
  Eye,
  Clock,
  CheckCircle,
  Truck,
  XCircle,
  Calendar,
  CreditCard,
  ShoppingBag,
  ArrowUpDown,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useGeteCommerceInvoicesByUserMutation } from "../../store/eCommerceAPI/eCommerceAPI";
import AuthContext from "../../store/authentication/auth-context";
import { setLoadingModalConfiguration } from "../../store/Slices/ModalLoaderSlice";
import { useDispatch } from "react-redux";

function OrderListPage() {
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);
  const [expandedOrder, setExpandedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [invoicesData, setInvoicesData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(1);

  // Fetch data using mutation hook
  const [fetch, { data: getFetchData, isSuccess: isFetchDataSuccess }] =
    useGeteCommerceInvoicesByUserMutation();

  // Update invoices data when fetch is successful
  useEffect(() => {
    if (!!getFetchData && getFetchData?.length > 0) {
      dispatch(setLoadingModalConfiguration({ isVisible: false }));
      setInvoicesData(getFetchData);
    } else if (isFetchDataSuccess) {
      dispatch(setLoadingModalConfiguration({ isVisible: false }));
    }
  }, [getFetchData, isFetchDataSuccess, dispatch]);

  // Fetch data on component mount
  useEffect(() => {
    dispatch(setLoadingModalConfiguration({ isVisible: true }));
    fetch({
      CBXID: process.env.REACT_APP_CBXID,
      CompanyXID: process.env.REACT_APP_CompanyXID,
      UserXID: authCtx.clientID,
    });
  }, [fetch, dispatch, authCtx.clientID]);

  // Map transaction status to order status
  const getOrderStatus = (statusXid) => {
    switch (statusXid) {
      case 1:
        return "Processing";
      case 2:
        return "Shipped";
      case 3:
        return "Delivered";
      case 4:
        return "Cancelled";
      default:
        return "Processing";
    }
  };

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

  // Status configuration with icons and vibrant colors
  const statusConfig = {
    Delivered: {
      bg: "bg-gradient-to-r from-green-500 to-emerald-600",
      text: "text-white",
      icon: <CheckCircle size={16} className="mr-1" />,
    },
    Processing: {
      bg: "bg-gradient-to-r from-blue-500 to-indigo-600",
      text: "text-white",
      icon: <Clock size={16} className="mr-1" />,
    },
    Shipped: {
      bg: "bg-gradient-to-r from-purple-500 to-violet-600",
      text: "text-white",
      icon: <Truck size={16} className="mr-1" />,
    },
    Cancelled: {
      bg: "bg-gradient-to-r from-red-500 to-rose-600",
      text: "text-white",
      icon: <XCircle size={16} className="mr-1" />,
    },
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  // Process the orders with sorting and filtering
  const processedOrders = () => {
    if (!invoicesData || invoicesData.length === 0) return [];

    // First sort the orders
    const sorted = [...invoicesData].sort((a, b) => {
      let comparison = 0;

      if (sortBy === "date") {
        comparison =
          new Date(a.invoiceCreatedOn) - new Date(b.invoiceCreatedOn);
      } else if (sortBy === "total") {
        comparison = a.sumOfInvoice - b.sumOfInvoice;
      } else if (sortBy === "items") {
        comparison =
          (a.invoiceProductDetails?.length || 0) -
          (b.invoiceProductDetails?.length || 0);
      }

      return sortOrder === "asc" ? comparison : -comparison;
    });

    // Then filter the orders
    return sorted.filter((order) => {
      const status = getOrderStatus(order.transactionStatusXid);
      const matchesSearch =
        order.refID.toString().includes(searchTerm.toLowerCase()) ||
        order.purchaseOrder.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.invoiceProductDetails?.some((product) =>
          product.description?.toLowerCase().includes(searchTerm.toLowerCase())
        ) ||
        false;
      const matchesFilter = filterStatus === "All" || status === filterStatus;
      return matchesSearch && matchesFilter;
    });
  };

  // Then add pagination logic after getting filtered orders
  const paginateOrders = (orders) => {
    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    return orders.slice(indexOfFirstOrder, indexOfLastOrder);
  };

  const filteredOrders = processedOrders();
  const paginatedOrders = paginateOrders(filteredOrders);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  // Toggle sort order and field
  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  // Handle order expansion
  const toggleOrderExpansion = (orderId) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null);
    } else {
      setExpandedOrder(orderId);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50">
      {/* Header Section with enhanced styling */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            <Link
              to="/"
              className="flex items-center text-gray-600 hover:text-blue-600 transition-colors"
            >
              <ArrowLeft size={16} className="mr-1" />
              <span>Back to Home</span>
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 text-center mt-2 sm:mt-0">
              My Orders
            </h1>
          </div>

          <div className="bg-white px-4 py-2 rounded-full shadow-md flex items-center gap-2 text-sm text-gray-600">
            <ShoppingBag size={16} className="text-blue-500" />
            <span>
              Total Orders:{" "}
              <span className="font-bold text-blue-600">
                {invoicesData?.length || 0}
              </span>
            </span>
          </div>
        </div>
        <div className="h-1.5 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mt-2 mx-auto sm:mx-0"></div>
      </motion.div>
      {/* Enhanced Filter & Search Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="bg-white rounded-xl shadow-md p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search orders or products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 w-full rounded-lg border-2 border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              />
              <Search
                className="absolute left-3 top-3.5 text-blue-500"
                size={18}
              />
            </div>

            <div className="flex gap-2 flex-wrap md:flex-nowrap">
              <div className="relative">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="pl-10 pr-8 py-3 rounded-lg border-2 border-gray-200 appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                >
                  <option value="All">All Status</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Processing">Processing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <Filter
                  className="absolute left-3 top-3.5 text-blue-500"
                  size={18}
                />
                <div className="absolute right-3 top-3.5 pointer-events-none">
                  <ChevronDown size={18} className="text-gray-400" />
                </div>
              </div>

              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all shadow-md hover:shadow-lg">
                <Download size={18} />
                <span className="hidden sm:inline">Export Orders</span>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      {/* Orders List - Empty State */}
      {filteredOrders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-300 shadow-sm"
        >
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <Package size={40} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No Orders Found
          </h2>
          <p className="text-gray-500 mb-6 px-4 max-w-md mx-auto">
            We couldn't find any orders matching your search criteria. Try
            adjusting your filters or search term.
          </p>
          <button
            onClick={() => {
              setSearchTerm("");
              setFilterStatus("All");
            }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all shadow-md hover:shadow-lg"
          >
            Clear Filters
          </button>
        </motion.div>
      ) : (
        <div>
          {/* Sorting Controls */}
          <div className="flex flex-wrap gap-2 mb-4 px-2">
            <button
              onClick={() => toggleSort("date")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${sortBy === "date"
                ? "bg-blue-100 text-blue-700"
                : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
            >
              <Calendar size={14} />
              Date
              {sortBy === "date" && (
                <ArrowUpDown
                  size={14}
                  className={sortOrder === "asc" ? "rotate-180" : ""}
                />
              )}
            </button>
            <button
              onClick={() => toggleSort("total")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${sortBy === "total"
                ? "bg-blue-100 text-blue-700"
                : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
            >
              <CreditCard size={14} />
              Total
              {sortBy === "total" && (
                <ArrowUpDown
                  size={14}
                  className={sortOrder === "asc" ? "rotate-180" : ""}
                />
              )}
            </button>
            <button
              onClick={() => toggleSort("items")}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${sortBy === "items"
                ? "bg-blue-100 text-blue-700"
                : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
            >
              <ShoppingBag size={14} />
              Items
              {sortBy === "items" && (
                <ArrowUpDown
                  size={14}
                  className={sortOrder === "asc" ? "rotate-180" : ""}
                />
              )}
            </button>
          </div>

          {/* Enhanced Orders List */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            {filteredOrders.map((order) => {
              const orderStatus = getOrderStatus(order.transactionStatusXid);
              const orderItems = order.invoiceProductDetails?.length || 0;
              const orderId = `ORD-${order.refID}`;
              const orderDate = formatDate(order.invoiceCreatedOn);

              return (
                <motion.div
                  key={order.pid}
                  variants={itemVariants}
                  className="border border-gray-200 rounded-xl overflow-hidden bg-white shadow-md hover:shadow-lg transition-all"
                >
                  {/* Enhanced Order Header */}
                  <div
                    className={`grid grid-cols-1 md:grid-cols-5 gap-4 px-4 py-4 cursor-pointer ${expandedOrder === order.pid
                      ? "bg-blue-50"
                      : "hover:bg-blue-50"
                      }`}
                    onClick={() => toggleOrderExpansion(order.pid)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-2.5 rounded-lg flex items-center justify-center shadow-md">
                        <Package size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-gray-800">{orderId}</p>
                        <p className="text-sm text-gray-500 flex items-center">
                          <Calendar size={12} className="mr-1" />
                          {orderDate}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <span
                        className={`px-3 py-1.5 rounded-full text-sm font-medium flex items-center shadow-sm ${statusConfig[orderStatus].bg} ${statusConfig[orderStatus].text}`}
                      >
                        {statusConfig[orderStatus].icon}
                        {orderStatus}
                      </span>
                    </div>

                    <div className="hidden md:flex flex-col">
                      <span className="text-xs uppercase text-gray-500 font-medium">
                        Items
                      </span>
                      <span className="font-medium text-gray-800 flex items-center">
                        <ShoppingBag size={14} className="mr-1 text-blue-500" />
                        {orderItems}
                      </span>
                    </div>

                    <div className="hidden md:flex flex-col">
                      <span className="text-xs uppercase text-gray-500 font-medium">
                        Total
                      </span>
                      <span className="font-bold text-gray-800">
                        <span className="text-green-600">
                          ₹{order.sumOfInvoice.toFixed(2)}
                        </span>
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="md:hidden flex flex-col">
                        <span className="text-xs uppercase text-gray-500 font-medium">
                          Total
                        </span>
                        <span className="font-bold text-green-600">
                          ${order.sumOfInvoice.toFixed(2)}
                        </span>
                      </div>
                      <button
                        className={`${expandedOrder === order.pid
                          ? "bg-blue-100 text-blue-700"
                          : "bg-gray-100 text-gray-600"
                          } hover:bg-blue-200 hover:text-blue-800 transition-all p-2 rounded-full`}
                      >
                        {expandedOrder === order.pid ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Enhanced Order Details (Expanded) */}
                  {expandedOrder === order.pid && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="border-t border-gray-200 px-4 py-6 bg-gradient-to-b from-blue-50 to-white"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                          <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                            <CreditCard
                              size={16}
                              className="mr-2 text-blue-500"
                            />
                            Order Details
                          </h4>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <p className="text-gray-500 font-medium">
                              Client Company:
                            </p>
                            <p className="text-gray-800">
                              {order.clientCompanyName || "N/A"}
                            </p>
                            <p className="text-gray-500 font-medium">
                              Purchase Order:
                            </p>
                            <p className="text-gray-800">
                              {order.purchaseOrder || "N/A"}
                            </p>
                            <p className="text-gray-500 font-medium">
                              Order Date:
                            </p>
                            <p className="text-gray-800">{orderDate}</p>
                            <p className="text-gray-500 font-medium">
                              Payment Status:
                            </p>
                            <p className="text-gray-800">
                              {order.paymentStatusXid === 4
                                ? "Pending"
                                : "Paid"}
                            </p>
                            <p className="text-gray-500 font-medium">
                              Payment Amount:
                            </p>
                            <p className="text-gray-800">
                              ₹
                              {(
                                order.paymentTransactions?.[0]
                                  ?.amountReceived || 0
                              ).toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-start md:justify-end items-center gap-3 flex-wrap">
                          <button className="px-4 py-2.5 bg-white border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all flex items-center gap-2 shadow-sm">
                            <Eye size={18} />
                            <span>View Details</span>
                          </button>
                          <button className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all flex items-center gap-2 shadow-md">
                            <Truck size={18} />
                            <span>Track Order</span>
                          </button>
                        </div>
                      </div>

                      <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                        <ShoppingBag size={16} className="mr-2 text-blue-500" />
                        Products
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {order.invoiceProductDetails &&
                          order.invoiceProductDetails.map((product, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-4 bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all hover:border-blue-200"
                            >
                              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                                <img
                                  src={`https://amsfilecontainercc.blob.core.windows.net/uatfilecontainer/${product.itemImages[0]?.savedName}`}
                                  alt={product.description}
                                  className="w-14 h-14 object-cover"
                                />
                              </div>
                              <div className="flex-grow">
                                <p className="font-medium text-gray-800">
                                  {product.description || "Product"}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">
                                  {product.brandName || "Brand"}
                                </p>
                                <div className="flex justify-between items-center mt-1">
                                  <p className="text-sm text-gray-500">
                                    Qty:{" "}
                                    <span className="font-medium">
                                      {product.quantity}
                                    </span>
                                  </p>
                                  <p className="font-bold text-green-600">
                                    ₹{product.quantityAmount.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>

                      <div className="mt-4 pt-4 border-t border-gray-200 flex justify-between items-center">
                        <p className="text-gray-500 text-sm">
                          Need help with this order?
                        </p>
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors">
                          Contact Support
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      )}
      {/* // Update your pagination UI with real functionality */}
      {filteredOrders.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex justify-center"
        >
          <div className="bg-white rounded-full shadow-md flex items-center p-1">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className={`px-4 py-2 rounded-full text-gray-500 hover:bg-gray-100 transition-all ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {/* Generate page numbers dynamically */}
            {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
              // Logic to display pages around current page
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 flex items-center justify-center rounded-full ${currentPage === pageNum
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium shadow-sm"
                    : "hover:bg-gray-100 transition-all"
                    }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className={`px-4 py-2 rounded-full text-gray-700 hover:bg-gray-100 transition-all ${currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : ""
                }`}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default OrderListPage;
