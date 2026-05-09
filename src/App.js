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

  
 return (
  <>
     
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
  
  </>
);
};

export default App;
