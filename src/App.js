import logo from "./logo.svg";
import React, { useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import "./App.css";
import "./bootstrap.css";
import "./assets/styles/main.css";
import "./assets/styles/responsive.css";
import "./assets/styles/sb-admin-2.css";

// import "./assets/styles/responsive.css";
import {
  Layout,
  Menu,
  Button,
  Popover,
  Spin,
  Modal,
  ConfigProvider,
} from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  FacebookFilled,
  TwitterOutlined,
  StarOutlined,
} from "@ant-design/icons";
import { Footer } from "antd/es/layout/layout";
import TopHeader from "./components/layout/TopHeader";
import FooterSection from "./components/layout/Footer";
import RoutesDetails from "./routes/RoutesDetails";
// import Header from './components/layout/Header';
import LoadingModal from "./Modals/LoadingModal/LoadingModal";
import { useDispatch, useSelector } from "react-redux";
import NewAssetProvider from "./store/AssetReplacement/assetreplacement-provider";
import { AuthContext } from "./components"; //thisis provious one which was working...
import { useContext, useEffect } from "react";
import img from "../src/assets/images/GreenCar Wsh.png";
import imgDemo from "../src/assets/images/Demo-Logo.png";
//import AuthContext from "../store/authentication/auth-context"; // this is not
import styled from "styled-components";
import ProfileHeader from "./components/layout/ProfileHeader";
import NewProductProvider from "./store/InvoiceProducts/invoiceproducts-provider";
import { WishlistProvider } from "./context/WishlistContext";
import CartProvider from "./context/CartContext";
import Navbar from "./components/UI/navbar";
import { CompareProvider } from "./context/CompareContext";
const { Header, Content, Sider } = Layout;

//process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'

const ButtonContainer = styled.div`
  .ant-btn-primary {
    background-color: #1890ff;
  }
  .ant-btn-success {
    background-color: #52c41a;
  }
  .ant-btn-yellow {
    background-color: #fadb14;
  }
  .ant-btn-black {
    background-color: #262626;
    color: #fff;
    border: 0px;
    border-radius: 5px;
  }
  .ant-switch-active {
    background-color: #1890ff;
  }
`;
const App = () => {
  const IsPurchased = useSelector((state) => state.CartStateSlice.IsPurchased);
  const [collapsed, setCollapsed] = useState(
    IsPurchased == true ? true : false,
  );
  const history = useHistory();
  const { Title, Text } = "Assets";
  const dispatch = useDispatch();
  const authCtx = useContext(AuthContext);

  let { pathname } = useLocation();
  pathname = pathname.replace("/", "");

  //here added the title of the page....
  useEffect(() => {
    document.title = process.env.REACT_APP_TITLE;
  }, []);

  const [open, setOpen] = useState(false);
  const hide = () => {
    setOpen(false);
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };

  const onClickDownloadImage = ({ key }) => {
    history.push(key);
  };

  const { loadingModalCofiguration } = useSelector((state) => state.modal);

  const { data, code, error, loading } = useSelector(
    (state) => state.EmergencyCallOutSlice,
  );

  const [imgPath, setImPath] = useState(
    process.env.REACT_APP_ENV === "UAT"
      ? imgDemo
      : process.env.REACT_APP_ENV === "PROD"
        ? imgDemo
        : img,
  );

   const [timeLeft, setTimeLeft] = useState({});
    const [launchCompleted, setLaunchCompleted] = useState(false);
  
    // ⏰ Launch Time (Today 4:15 PM)
    const launchTime = new Date();
    launchTime.setHours(16, 30, 0, 0);
  
    useEffect(() => {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = launchTime.getTime() - now;
  
        if (distance <= 0) {
          clearInterval(timer);
          setLaunchCompleted(true);
  
          window.close();
  
          return;
        }
  
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
  
        const minutes = Math.floor(
          (distance % (1000 * 60 * 60)) / (1000 * 60)
        );
  
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  
        setTimeLeft({
          hours,
          minutes,
          seconds,
        });
      }, 1000);
  
      return () => clearInterval(timer);
    }, []);

 return (
  <>
    {!launchCompleted ? (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">
            Website Launching at 4:25 PM
          </h1>

          <div className="flex gap-6 justify-center">
            <div className="bg-white/10 px-6 py-4 rounded-2xl">
              <h2 className="text-4xl font-bold">
                {String(timeLeft.hours || 0).padStart(2, "0")}
              </h2>
              <p>Hours</p>
            </div>

            <div className="bg-white/10 px-6 py-4 rounded-2xl">
              <h2 className="text-4xl font-bold">
                {String(timeLeft.minutes || 0).padStart(2, "0")}
              </h2>
              <p>Minutes</p>
            </div>

            <div className="bg-white/10 px-6 py-4 rounded-2xl">
              <h2 className="text-4xl font-bold">
                {String(timeLeft.seconds || 0).padStart(2, "0")}
              </h2>
              <p>Seconds</p>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#d82929",
          },
        }}
      >
        <NewAssetProvider>
          <NewProductProvider>
            <WishlistProvider>
              <CartProvider>
                <CompareProvider>
                  <Layout>
                    <Navbar />

                    <Layout className="site-layout">
                      <Content
                        className="site-layout-background"
                        style={{
                          margin: 0,
                          padding: 0,
                          width: "100%",
                        }}
                      >
                        <RoutesDetails />
                      </Content>

                      <FooterSection />
                    </Layout>
                  </Layout>
                </CompareProvider>
              </CartProvider>
            </WishlistProvider>
          </NewProductProvider>
        </NewAssetProvider>
      </ConfigProvider>
    )}
  </>
);
};

export default App;
