import React, { useContext, useEffect, useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
//import Logo from "../../assets/images/matress logo.png";
import Logo from "../../assets/images/GreenCar Wsh.png";
import Profile from "../../assets/images/profile.png";
import Search_icon from "../../assets/images/search_icon.png";
import Wishlist_icon from "../../assets/images/wishlist_icon.png";
import Shopping_cart from "../../assets/images/shopping_cart.png";
import LoginRegister from "../../assets/images/LoginRegister.png";
import Compare from "../../assets/images/compare-nav.png";
import { WishlistContext } from "../../context/WishlistContext";
import { CartContext, useCart } from "../../context/CartContext";
import { useCompare } from "../../context/CompareContext"; // Add this import
import {
  ClipboardList,
  LogIn,
  LogOut,
  UserCircle,
  UserPlus,
} from "lucide-react";
import AuthContext from "../../store/authentication/auth-context";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { Button } from "antd";

export default function Navbar({ onNavClick, setCurrentView }) {
  const { wishlist } = useContext(WishlistContext);
  const { cartCount } = useCart(CartContext);
  const { compareItems } = useCompare(); // Add this to get compare count
  const compareCount = compareItems.length;
  const wishlistCount = wishlist.length;
  const [menuOpen, setMenuOpen] = useState(false);
  const [showIcons, setShowIcons] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const BTFSAuthCtx = useContext(AuthContext);

  const handleNavigation = (path, breadcrumb, view) => {
    history.push(path);

    if (view && typeof onNavClick === "function") {
      onNavClick(view);
    }

    if (view && typeof setCurrentView === "function") {
      setCurrentView(view);
    }

    setMenuOpen(false);
    setShowIcons(false);
  };

  // Handle clicks outside to close the dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const onClickLogout = () => {
    BTFSAuthCtx.logout();
    history.push("/Sign-In");
  };

  // Toggle dropdown on icon click
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  function getFirstWordFromUsername(username) {
    // Handle null, undefined or empty usernames
    if (!username) {
      return "Guest";
    }

    // Trim any leading/trailing whitespace and split by spaces
    const words = username.trim().split(/\s+/);

    // Return the first word only
    return words[0];
  }

  const onClickDownloadImage = ({ key }) => {
    history.push(key);
  };

  return (
    <nav className="sticky top-0 bg-white flex justify-between items-center md:px-14 px-6 py-4 cursor-pointer relative z-50">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <Link
          className="flex gap-2 items-center text-black no-underline"
          to="/"
          onClick={() => handleNavigation("/", "Home", "cart")}
        >
          <img src={Logo} alt="Logo" className="h-12" />
          {/* <div className="font-bold text-2xl no-underline" style={{ fontFamily: 'Times New Roman', color: 'red' , textDecoration: 'none'}}>
          Vijaya Sarees
           </div> */}
        </Link>
      </div>

      {/* Dropdown for Icons in Mobile Menu */}
      <div className="lg:hidden relative z-50">
        {showIcons && (
          <div className="absolute left-0 sm:left-40 md:left-52 top-full mt-14 sm:mt-14 shadow-md w-full flex flex-row flex-wrap rounded-lg px-12 py-6 bg-gradient-to-r from-purple-100 via-blue-200 to-indigo-200">
            <div className="flex flex-col gap-3 mr-12 -translate-x-8">
              <Link
                to="/wishlist"
                className="text-black"
                onClick={() => {
                  setShowIcons(false);
                }}
              >
                <div className="flex items-center gap-1">
                  <img src={Wishlist_icon} className="w-6 h-6" alt="Wishlist" />
                  <span>({wishlistCount})</span>
                </div>
              </Link>
              <Link
                to="/CartPage"
                className="text-black"
                onClick={() => {
                  setShowIcons(false);
                }}
              >
                <div className="flex items-center gap-1">
                  <img src={Shopping_cart} className="w-6 h-6" alt="Cart" />
                  <span>({cartCount})</span>
                </div>
              </Link>
              <Link to="/ComparePage" className="text-black">
                {/* Compare Icon */}
                <div className="flex items-center gap-1">
                  <img src={Compare} className="w-6 h-6" alt="Compare" />
                  <span>({compareCount})</span>
                </div>
              </Link>
              <div className="relative inline-block" ref={dropdownRef}>
                {/* The icon that triggers the dropdown */}
                {LoginRegister ? (
                  <img
                    src={LoginRegister}
                    className="w-7 h-7 cursor-pointer"
                    alt="Login/Register"
                    onClick={toggleDropdown}
                  />
                ) : (
                  <UserCircle
                    className="w-6 h-6 cursor-pointer text-gray-700"
                    onClick={toggleDropdown}
                  />
                )}

                {/* Dropdown menu */}
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 overflow-hidden">
                    {/* Dropdown arrow */}
                    <div className="absolute top-0 right-2 -mt-2 w-3 h-3 bg-white transform rotate-45"></div>

                    {/* Menu items with hover effect */}
                    <div className="relative z-10">
                      {/* Login option */}
                      <a
                        href="/SignIn"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex items-center group transition-all duration-200"
                      >
                        <LogIn className="w-4 h-4 mr-3 text-blue-500 group-hover:text-blue-600" />
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          Login
                        </span>
                      </a>

                      {/* Register option */}
                      <a
                        href="/Register"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex items-center group transition-all duration-200"
                      >
                        <UserPlus className="w-4 h-4 mr-3 text-green-500 group-hover:text-green-600" />
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          Register
                        </span>
                      </a>

                      {/* Divider */}
                      <div className="border-t border-gray-100 my-1"></div>

                      {/* Logout option */}
                      <a
                        href="/"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex items-center group transition-all duration-200"
                      >
                        <LogOut
                          className="w-4 h-4 mr-3 text-red-500 group-hover:text-red-600"
                          onClick={onClickLogout}
                        />
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          Logout
                        </span>
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Mobile Toggle & More Button Container */}
      <div className="lg:hidden flex items-center gap-4 z-50">
        {/* More Button */}
        <div className="flex flex-col sm:flex-row sm:gap-3">
          <div className=" text-md font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 drop-shadow-sm tracking-wide hover:scale-150 transition-all duration-700">
            {getFirstWordFromUsername(BTFSAuthCtx.userName)}
          </div>
          <button
            className="text-left flex justify-end text-sm"
            onClick={() => setShowIcons(!showIcons)}
          >
            More {showIcons ? "▼" : "▲"}
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          className="text-black focus:outline-none text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✖" : "☰"}
        </button>
      </div>
      <ul
        className={`absolute text-center lg:static top-16 left-0 w-full lg:w-auto bg-white lg:bg-transparent text-base shadow-md md:shadow-none flex flex-col lg:flex-row gap-6 lg:gap-12 p-6 lg:p-0 transition-all ${
          menuOpen ? "block" : "hidden"
        } lg:flex z-40`}
      >
        <li className="relative group">
          <Link
            to="/"
            onClick={() => handleNavigation("/", "Home", "cart")}
            className={`inline-block relative text-black text-decoration-none ${
              isActive("/") ? "font-medium" : ""
            }`}
          >
            Home
            {isActive("/") && (
              <span className="absolute left-0 -bottom-1 w-full h-[2px]  bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"></span>
            )}
            {!isActive("/") && (
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-500 ease-in-out group-hover:w-full"></span>
            )}
          </Link>
        </li>
        {/* <li className="relative group">
          <Link
            to="/Shop"
            onClick={(e) => {
              console.log("Shop link clicked");
              handleNavigation("/Shop", "Home > Shop", "shop");
            }}
            className={`inline-block relative text-black text-decoration-none ${isActive("/Shop") ? "font-medium" : ""
              }`}
          >
            Shop
            {isActive("/Shop") && (
              <span className="absolute left-0 -bottom-1 w-full h-[2px]  bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"></span>
            )}
            {!isActive("/Shop") && (
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-500 ease-in-out group-hover:w-full"></span>
            )}
          </Link>
        </li> */}
        <li className="relative group">
          <Link
            to="/AboutUs"
            onClick={() => handleNavigation("/AboutUs", "Home > About")}
            className={`inline-block relative text-black text-decoration-none ${
              isActive("/AboutUs") ? "font-medium" : ""
            }`}
          >
            About
            {isActive("/AboutUs") && (
              <span className="absolute left-0 -bottom-1 w-full h-[2px]  bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"></span>
            )}
            {!isActive("/AboutUs") && (
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-500 ease-in-out group-hover:w-full"></span>
            )}
          </Link>
        </li>

        <li className="relative group">
          <Link
            to="/ContactUs"
            onClick={() =>
              handleNavigation("/ContactUs", "Home > Contact", "contact")
            }
            className={`inline-block relative text-black text-decoration-none ${
              isActive("/ContactUs") ? "font-medium" : ""
            }`}
          >
            Contact
            {isActive("/ContactUs") && (
              <span className="absolute left-0 -bottom-1 w-full h-[2px]  bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"></span>
            )}
            {!isActive("/ContactUs") && (
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-500 ease-in-out group-hover:w-full"></span>
            )}
          </Link>
        </li>
        <li className="relative group">
          <Link
            to="/Services"
            onClick={() =>
              handleNavigation("/Services", "Home > Contact", "contact")
            }
            className={`inline-block relative text-black text-decoration-none ${
              isActive("/Services") ? "font-medium" : ""
            }`}
          >
            Services{" "}
            {isActive("/Services") && (
              <span className="absolute left-0 -bottom-1 w-full h-[2px]  bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"></span>
            )}
            {!isActive("/Services") && (
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-500 ease-in-out group-hover:w-full"></span>
            )}
          </Link>
        </li>
        <li className="relative group">
          <Link
            to="/FAQS"
            onClick={() =>
              handleNavigation("/FAQS", "Home > Contact", "contact")
            }
            className={`inline-block relative text-black text-decoration-none ${
              isActive("/FAQS") ? "font-medium" : ""
            }`}
          >
            FAQS
            {isActive("/FAQS") && (
              <span className="absolute left-0 -bottom-1 w-full h-[2px]  bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"></span>
            )}
            {!isActive("/FAQS") && (
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-500 ease-in-out group-hover:w-full"></span>
            )}
          </Link>
        </li>
        <li className="relative group">
          <Link
            to="/VehicleSales"
            onClick={() =>
              handleNavigation("/VehicleSales", "Home > Contact", "contact")
            }
            className={`inline-block relative text-black text-decoration-none ${
              isActive("/VehicleSales") ? "font-medium" : ""
            }`}
          >
            Vehicle Sales
            {isActive("/VehicleSales") && (
              <span className="absolute left-0 -bottom-1 w-full h-[2px]  bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"></span>
            )}
            {!isActive("/VehicleSales") && (
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-500 ease-in-out group-hover:w-full"></span>
            )}
          </Link>
        </li>
        <li className="relative group">
          <Link
            to="/Subscription"
            onClick={() =>
              handleNavigation("/Subscription", "Home > Contact", "contact")
            }
            className={`inline-block relative text-black text-decoration-none ${
              isActive("/Subscription") ? "font-medium" : ""
            }`}
          >
            Membership
            {isActive("/Subscription") && (
              <span className="absolute left-0 -bottom-1 w-full h-[2px]  bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"></span>
            )}
            {!isActive("/Subscription") && (
              <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-black transition-all duration-500 ease-in-out group-hover:w-full"></span>
            )}
          </Link>
        </li>
      </ul>
      {/* Desktop Icons */}
      <div className="hidden lg:flex gap-4 items-center">
        <div
          className="text-md font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 drop-shadow-sm tracking-wide hover:scale-150 transition-all duration-[3000ms] border-[1px] p-1 border-transparent rounded-lg"
          style={{
            borderImage:
              "linear-gradient(to right, #a855f7, #3b82f6, #6366f1) 1",
          }}
        >
          {BTFSAuthCtx.userName || "Guest"}
        </div>

        <div className="relative inline-block" ref={dropdownRef}>
          {/* The icon that triggers the dropdown */}
          {LoginRegister ? (
            <img
              src={LoginRegister}
              className="w-7 h-7 cursor-pointer"
              alt="Login/Register"
              onClick={toggleDropdown}
            />
          ) : (
            <UserCircle
              className="w-6 h-6 cursor-pointer text-gray-700"
              onClick={toggleDropdown}
            />
          )}

          {/* Dropdown menu */}
          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 overflow-hidden">
              {/* Dropdown arrow */}
              <div className="absolute top-0 right-2 -mt-2 w-3 h-3 bg-white transform rotate-45"></div>

              {/* Menu items with hover effect */}
              <div className="relative z-10">
                {/* Conditional rendering based on login status */}
                {!BTFSAuthCtx.isLoggedIn ? (
                  <>
                    {/* Login option */}
                    <a
                      href="/SignIn"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex items-center group transition-all duration-200"
                    >
                      <LogIn className="w-4 h-4 mr-3 text-blue-500 group-hover:text-blue-600" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        Login
                      </span>
                    </a>

                    {/* Register option */}
                    <a
                      href="/Register"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex items-center group transition-all duration-200"
                    >
                      <UserPlus className="w-4 h-4 mr-3 text-green-500 group-hover:text-green-600" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        Register
                      </span>
                    </a>
                  </>
                ) : (
                  <>
                    <p>
                      <Button
                        onClick={() => onClickDownloadImage({ key: "profile" })}
                        type="link"
                      >
                        Profile
                      </Button>
                    </p>
                    <p>
                      <Button
                        onClick={() =>
                          onClickDownloadImage({ key: "OrderList" })
                        }
                        type="link"
                      >
                        <ClipboardList className="w-4 h-4 mr-3 text-blue-500 group-hover:text-blue-600" />
                        <span className="group-hover:translate-x-1 transition-transform duration-200">
                          Order History
                        </span>
                      </Button>
                    </p>
                    {/* <a
                      href="/OrderList"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex items-center group transition-all duration-200"
                    >
                      <ClipboardList className="w-4 h-4 mr-3 text-blue-500 group-hover:text-blue-600" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        
                      </span>
                    </a> */}

                    <p>
                      <Button
                        onClick={() =>
                          onClickDownloadImage({ key: "ChangePassword" })
                        }
                        type="link"
                      >
                        Change Password
                      </Button>
                    </p>

                    {/* Logout option */}
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        onClickLogout();
                      }}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 flex items-center group transition-all duration-200"
                    >
                      <LogOut className="w-4 h-4 mr-3 text-red-500 group-hover:text-red-600" />
                      <span className="group-hover:translate-x-1 transition-transform duration-200">
                        Logout
                      </span>
                    </a>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Compare Icon - FIXED */}
        {/* <div className="relative">
          <Link
            to="/ComparePage"
            onClick={() =>
              handleNavigation("/ComparePage", "Home > Compare", "compare")
            }
          >
            <img src={Compare} className="w-6 h-6" alt="Compare" />
          </Link>
          {compareCount > 0 && (
            <span className="absolute -right-1 -top-1 bg-black p-1 w-4 h-4 text-white text-[10px] rounded-full flex items-center justify-center text-center">
              {compareCount}
            </span>
          )}
        </div> */}

        {/* Wishlist Icon */}
        {/* <div className="relative">
          <Link to="/Wishlist">
            <img src={Wishlist_icon} className="w-6 h-6" alt="Wishlist" />
          </Link>
          {wishlistCount > 0 && (
            <span className="absolute -right-1 -top-1 bg-black p-1 w-4 h-4 text-white text-[10px] rounded-full flex items-center justify-center text-center">
              {wishlistCount}
            </span>
          )}
        </div> */}

        {/* Shopping Cart Icon */}
        <div className="relative">
          <Link to="/CartPage">
            <img src={Shopping_cart} className="w-6 h-6" alt="Shopping Cart" />
          </Link>
          {cartCount > 0 && (
            <span className="absolute -right-3 -top-1 bg-black p-1 w-4 h-4 text-white text-[10px] rounded-full flex items-center justify-center text-center">
              {cartCount}
            </span>
          )}
        </div>
      </div>
      {/* WhatsApp */}
      <div className="flex items-center justify-center fixed bottom-5 right-5 z-[1000]">
        <div className="w-[60px] h-[60px] bg-[#25d366] rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center">
          <a
            href="https://wa.me/+919989267226"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://cdn-icons-png.flaticon.com/512/124/124034.png"
              alt="WhatsApp"
              className="w-[40px] h-[40px]"
            />
          </a>
        </div>
      </div>
    </nav>
  );
}
