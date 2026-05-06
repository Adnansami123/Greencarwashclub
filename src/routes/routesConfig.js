import SignIn from "../components/SignIn/SignIn";
import RegisterSuccessPage from "../components/SignIn/RegisterSuccess";
import SignInPage from "../pages/SignIn/SignInPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPasswordPage";
import { useSelector } from "react-redux";
import ProfilePage from "../pages/profilePage";
import ChangePasswordPage from "../pages/ChangePassword/ChangePasswordPage";
import RegisterPage from "../pages/SignIn/RegisterPage";
import TreeViewPage from "../pages/TreeViewPage/indexjs";
import OrgChartTree from "../components/TreeView/OrgChartTree";
import LevelMatriz from "../components/LevelMatrix/LevelMatriz";
import MyProfit from "../components/MyProfit/MyProfit";
import Home from "../components/Dashboard/Home";
import UserDashboard from "../components/Dashboard/UserDashboard";
import ReferralCodeVerificationSuccess from "../components/SignIn/ReferralCodeVerificationSuccess";
import ShareReferrals from "../components/Referrals/ShareReferrals";
import ReferralCodeVerificationFail from "../components/SignIn/ReferralCodeVerificationFail";
import MyDirectMembers from "../components/MyDirectMembers/MyDirectMembers";
import PayoutRequest from "../components/Payouts/PayoutRequest";
import PayoutRequestModal from "../components/Payouts/PayoutRequestModal";
import PayoutRequestAdmin from "../components/Payouts/PayoutRequestAdmin";
import Products from "../components/SignIn/Products";
import Payments from "../components/SignIn/Payments";
import KYCVerification from "../components/Users/KYCVerification";
import PaymentSuccess from "../components/SignIn/PaymentSuccess";
import ViewKYC from "../components/Users/ViewKYC";
import ViewBank from "../components/Users/ViewBank";
import PurchaseVerification from "../components/Users/PurchaseVerification";
import SessionExpiredPage from "../pages/ErrorPages/SessionExpired";
import WishlistPage from "../components/UI/WishlistPage";
import AllProducts from "../components/MyProducts/AllProducts";
import AboutUsPage from "../components/UI/AboutUs";
import ContactPage from "../components/UI/ContactUs";
import Shop from "../components/Shop/shop";
import ProductDetails from "../components/ProductDetails/ProductDetails";
import CartPage from "../components/UI/cartPage";
import ComparePage from "../components/UI/ComparePage";
import CheckoutPage from "../components/CheckoutPage/CheckoutPage";
import FAQS from "../components/UI/Faq";
import OrderListPage from "../components/OrderListPage/OrderListPage";
import Membership from "../components/MyProducts/Membership";
import Services from "../components/UI/Services";
import VehicleSales from "../components/Shop/VehicleSales";

//import InvoicePage from "../pages/InvoicePage/InvoicePage";

const authAppRoutes = [
  {
    path: "/KYCVerification",
    component: () => <KYCVerification />,
    menuText: "KYCVerification",
  },
  {
    path: "/PurchaseVerification",
    component: () => <PurchaseVerification />,
    menuText: "Pur. Pay. Verfification",
  },
  {
    path: "/Dashboard",
    component: () => <Home />,
    menuText: "Dashboard",
  },
  {
    path: "/UserDashboard",
    component: () => <UserDashboard />,
    menuText: "Dashboard",
  },
  {
    path: "/profile",
    component: () => <ProfilePage />,
    menuText: "profile",
  },

  {
    path: "/client/profile",
    component: () => <ProfilePage />,
  },
  {
    path: "/Client/profile",
    component: () => <ProfilePage />,
  },

  {
    path: "/demo",
    component: () => <demo />,
    menuText: "",
  },

  {
    path: "/ChangePassword",
    component: () => <ChangePasswordPage />,
    menuText: "Change Password",
  },
  {
    path: "/TreeView1",
    component: () => <OrgChartTree />,
    menuText: "Tree View",
  },
  {
    path: "/Levels",
    component: () => <LevelMatriz />,
    menuText: "Levels",
  },
  {
    path: "/MyProfit",
    component: () => <MyProfit />,
    menuText: "MyProfit",
  },

  {
    path: "/PayoutRequest",
    component: () => <PayoutRequest />,
    menuText: "Payout Request",
  },
  {
    path: "/PayoutRequestAdmin",
    component: () => <PayoutRequestAdmin />,
    menuText: "Payout Request",
  },
  {
    path: "/PayoutRequestHistoryAdmin",
    component: () => <PayoutRequestAdmin />,
    menuText: "Payout Request",
  },
  {
    path: "/AddPayoutRequest",
    component: () => <PayoutRequestModal />,
    menuText: "Add Payout Request",
  },
  {
    path: "/OrderList",
    component: () => <OrderListPage />,
    menuText: "Order List Page",
  },
];

const commonAppRoutes = [
  {
    path: "/sign-in",
    component: () => <SignInPage />,
    menuText: "Sign In",
  },
  {
    path: "/SessionExpired",
    component: () => <SessionExpiredPage />,
    menuText: "Sign In",
  },
  {
    path: "/Products",
    component: () => <Products />,
    menuText: "Products",
  },
  {
    path: "/AllProducts",
    component: () => <AllProducts />,
    menuText: "All Products",
  },
  //  {
  //   path: "/PrivacyPolicy",
  //   component: () => <PrivacyPolicy />,
  //   menuText: "PrivacyPolicy",
  // },
  {
    path: "/Shop",
    component: () => <Shop />,
    menuText: "Shop",
  },

  {
    path: "/AboutUs",
    component: () => <AboutUsPage />,
    menuText: "All Products",
  },
  {
    path: "/ContactUs",
    component: () => <ContactPage />,
    menuText: "All Products",
  },
  {
    path: "/Faqs",
    component: () => <FAQS />,
    menuText: "All Products",
  },

  {
    path: "/Product/:id",
    component: () => <ProductDetails />,
    menuText: "Product Details",
  },
  {
    path: "/ComparePage",
    component: () => <ComparePage />,
    menuText: "Compare",
  },
  {
    path: "/Wishlist",
    component: () => <WishlistPage />,
    menuText: "Products",
  },
  {
    path: "/CartPage",
    component: () => <CartPage />,
    menuText: "CartPage",
  },
  {
    path: "/CheckoutPage",
    component: () => <CheckoutPage />,
    menuText: "Shop",
  },
  

  {
    path: "/ForgotPassword",
    component: () => <ForgotPasswordPage />,
    menuText: "Forgot Password",
  },

  {
    path: "/",
    component: () => <AllProducts />,
    menuText: "Home Page",
  },
  {
    path: "/SignIn",
    component: () => <SignIn />,
    menuText: "Sign In",
  },
  {
    path: "/Register",
    component: () => <RegisterPage />,
    menuText: "Register",
  },
  {
    path: "/RegisterSuccess",
    component: () => <RegisterSuccessPage />,
    menuText: "Register Success",
  },

  {
    path: "/PaymentSuccess",
    component: () => <PaymentSuccess />,
    menuText: "Payment Success",
  },
    {
    path: "/VehicleSales",
    component: () => <VehicleSales />,
    menuText: "Vehicle Sales",
  },
{
  path: "/membership/:name",
  component: () => <Membership />,
},
{
  path: "/Services",
  component: () => <Services />,
},

  {
    path: "/TreeView",
    component: () => <TreeViewPage />,
    menuText: "Tree View",
  },

  {
    path: "/ReferralCodeVerificationSuccess",
    component: () => <ReferralCodeVerificationSuccess />,
    menuText: "Success",
  },
  {
    path: "/ReferralCodeVerificationFail",
    component: () => <ReferralCodeVerificationFail />,
    menuText: "failed",
  },

  {
    path: "/ReferralLink",
    component: () => <ShareReferrals />,
    menuText: "Referra lLink",
  },
  {
    path: "/MyDirectMembers",
    component: () => <MyDirectMembers />,
    menuText: "My Direct Members",
  },
  {
    path: "/MyKYC",
    component: () => <ViewKYC />,
    menuText: "View KYC",
  },
  {
    path: "/MyBank",
    component: () => <ViewBank />,
    menuText: "My Bank",
  },

  {
    path: "/Payments",
    component: () => <Payments />,
    menuText: "Payments",
  },
];

export { authAppRoutes, commonAppRoutes };
