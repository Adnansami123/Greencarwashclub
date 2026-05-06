import { Button, Card } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Home } from "lucide-react";
import { useCart } from "../../context/CartContext";

const PaymentSuccess = () => {
  const history = useHistory();
  const [showCheckmark, setShowCheckmark] = useState(false);
  const { setCartItems } = useCart();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCheckmark(true);
    }, 500);

    // ✅ Clear cart (state + storage)
    setCartItems([]);
    localStorage.removeItem("cartItems");
    localStorage.removeItem("cartTotal");
    localStorage.removeItem("cartSubtotal");
    localStorage.removeItem("cartTax");
    localStorage.removeItem("cartShipping");

    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    // Animate checkmark after component mounts
    const timer = setTimeout(() => {
      setShowCheckmark(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const onClickLoginPage = () => {
    history.push("/OrderList");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.3,
        duration: 0.8,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const checkmarkVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        duration: 0.8,
      },
    },
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: { repeat: Infinity, duration: 2 },
  };

  return (
    <div
      className="container-fluid py-5"
      style={{
        minHeight: "80vh",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(135deg, #f5f7ff 0%, #e9f0ff 100%)",
      }}
    >
      <div className="row justify-content-center w-100">
        <div className="col-lg-6 col-md-8 col-sm-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <Card
              bordered={false}
              className="rounded-xl shadow-lg overflow-hidden"
              bodyStyle={{ padding: 0 }}
            >
              {/* Gradient header */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-5 px-6 text-center relative overflow-hidden">
                <motion.div
                  className="absolute inset-0"
                  animate={{
                    background: [
                      "linear-gradient(45deg, rgba(37,99,235,0.7) 0%, rgba(124,58,237,0.7) 100%)",
                      "linear-gradient(45deg, rgba(37,99,235,0.8) 0%, rgba(124,58,237,0.8) 100%)",
                      "linear-gradient(45deg, rgba(37,99,235,0.7) 0%, rgba(124,58,237,0.7) 100%)",
                    ],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 20%)",
                  }}
                />

                <motion.div
                  className="relative z-10 mb-4 mt-2"
                  variants={checkmarkVariants}
                  initial="hidden"
                  animate={showCheckmark ? "visible" : "hidden"}
                >
                  <div className="mx-auto bg-white rounded-full w-20 h-20 flex items-center justify-center shadow-xl">
                    <CheckCircle size={50} className="text-green-500" />
                  </div>
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="text-white text-2xl font-bold mb-1 relative z-10"
                >
                  Order has been placed Successfully!
                </motion.h1>
                <motion.div
                  variants={itemVariants}
                  className="bg-white opacity-20 h-1 w-24 mx-auto my-3 rounded-full"
                />
                <motion.p
                  variants={itemVariants}
                  className="text-white text-opacity-90 mb-0 relative z-10"
                >
                  Transaction completed successfully
                </motion.p>
              </div>

              {/* Content */}
              <div className="py-5 px-6">
                <motion.div
                  variants={itemVariants}
                  className="mb-6 text-center"
                >
                  <div className="mb-4">
                    <motion.div
                      className="inline-block p-3 rounded-lg bg-green-50 text-green-500 mb-3"
                      animate={pulseAnimation}
                    >
                      <CheckCircle size={24} />
                    </motion.div>
                    <h2 className="text-xl font-semibold text-gray-800">
                      Thank You for Your Purchase!
                    </h2>
                  </div>
                  <p className="text-gray-600 mb-3">
                    Congratulations! Your payment has been successfully
                    processed and your order is now confirmed.
                  </p>
                  <p className="text-gray-600">
                    If you have any questions or need further assistance, please
                    contact our support team at{" "}
                    <a
                      href="mailto:admin@syebros.com"
                      className="text-blue-600 hover:text-purple-600 font-medium transition-colors duration-300"
                    >
                      {/* admin@syebros.com */}
                    </a>
                    .
                  </p>
                </motion.div>

                {/* Order Summary Hint */}
                <motion.div
                  variants={itemVariants}
                  className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-6"
                >
                  <div className="flex items-center">
                    <div className="mr-3 text-blue-500">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ repeat: 2, duration: 0.5, delay: 1.5 }}
                      >
                        <Home size={20} />
                      </motion.div>
                    </div>
                    <div>
                      <p className="text-sm text-blue-800 font-medium mb-0">
                        You'll find your complete order details in your
                        dashboard
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Button */}
                <motion.div variants={itemVariants} className="text-right">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="primary"
                      size="large"
                      onClick={onClickLoginPage}
                      className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 hover:opacity-90 font-medium"
                      style={{
                        borderRadius: "8px",
                        boxShadow: "0 4px 14px rgba(59, 130, 246, 0.3)",
                        height: "45px",
                      }}
                    >
                      <div className="flex items-center">
                        <span>Continue to Dashboard</span>
                        <motion.span
                          animate={{ x: [0, 5, 0] }}
                          transition={{ repeat: Infinity, duration: 1.5 }}
                          className="ml-2"
                        >
                          <ArrowRight size={16} />
                        </motion.span>
                      </div>
                    </Button>
                  </motion.div>
                </motion.div>
              </div>

              {/* Footer */}
              <motion.div
                variants={itemVariants}
                className="bg-gray-50 px-6 py-4 text-center border-t border-gray-100"
              >
                <p className="text-sm text-gray-500 mb-0">
                  Order confirmation details have been sent to your registered
                  email
                </p>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
