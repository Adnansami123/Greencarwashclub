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
    <div>
      <ConfigProvider
        theme={{
          token: {
            // 🎨 Colors
            colorPrimary: "#d82929",
            colorSuccess: "#52c41a",
            colorWarning: "#faad14",
            colorError: "#ff4d4f",
            colorInfo: "#1677ff",

            // 🔤 Typography
            fontSize: 14,
            fontFamily: "'Segoe UI', sans-serif",
            fontWeightStrong: 600,

            // 📦 Layout / spacing
            borderRadius: 8,
            padding: 16,
            margin: 16,

            // 🖌 Border & shadows
            borderColor: "#d9d9d9",
            boxShadow: "0 4px 12px rgba(0,0,0,0.15)",

            // 🏷 Other UI tokens
            lineHeight: 1.6,
            controlHeight: 40, // default height of inputs/buttons
          },

          components: {
            Card: {
              headerPadding: "2px", // header area
              paddingLG: 8, // large padding size
              paddingSM: 4, // small padding size
            },
            Button: {
              colorPrimary: "#ff221e", // override primary button color
              colorPrimaryHover: "#f46721",
              colorPrimaryActive: "#d9363e",
              borderRadius: 12,
              controlHeight: 44,
            },
            Input: {
              borderRadius: 6,
              colorBorder: "#999",
              colorBgContainer: "#FFFFFF",
            },
            Table: {
              // 📦 Table Layout
              cellPaddingBlock: 4, // vertical padding in cells
              cellPaddingInline: 8, // horizontal padding in cells
              cellFontSize: 14,
              borderRadius: 6, // border radius for table wrapper

              // 🎨 Header styles
              headerBg: "#1767df", // header background
              headerColor: "#ffffff", // header text color
              headerBorderRadius: 0, // radius for header cells
              headerSplitColor: "#d9d9d9", // border between header cells

              // 🎨 Body styles
              rowHoverBg: "#1d95cc", // background on hover
              rowSelectedBg: "#e6f7ff", // background for selected row
              rowSelectedHoverBg: "#bae7ff", // selected + hover

              // 📏 Borders & Lines
              borderColor: "#d31717", // cell border color
              borderColorHorizontal: "#d31717",
              borderColorVertical: "#d31717",

              // 🖌 Striped Table
              bodySortBg: "#fafafa", // background when sorting
              headerSortBg: "#f0f0f0", // header bg when sorting
              headerSortHoverBg: "#e6f7ff", // header bg when sorting + hover

              // 🔍 Expanded row
              expandedRowBg: "#fafafa",

              // 📑 Pagination (inside table footer)
              colorText: "#333333",
              colorTextHeading: "#555555",
              colorTextSecondary: "#888888",

              // 🏷 Sticky header
              stickyScrollBarBg: "#ccc",
              stickyScrollBarBorderRadius: 4,

              // 🖤 Disabled state
              colorTextDisabled: "#999999",
            },
          },
        }}
      >
        {/* <LoadingModal
          isVisible={loadingModalCofiguration.isVisible}
          loadingText={loadingModalCofiguration.loadingText}
        ></LoadingModal> */}
        <div>
          <NewAssetProvider>
            <NewProductProvider>
              <WishlistProvider>
                <CartProvider>
                  <CompareProvider>
                    <Layout>
                      <Navbar />
                      {/* {!!authCtx.token &&
                      !["products", "payments", "paymentsuccess"].includes(
                        pathname.toLowerCase()
                      ) && (
                        <Sider trigger={null} collapsible collapsed={collapsed}>
                          {!!collapsed == false ? (
                            <img
                              src={imgPath}
                              height={!!collapsed ? "31" : "50"}
                              width={!!collapsed ? "16" : "230"}
                            ></img>
                          ) : (
                            <img
                              src={imgPath}
                              height={!!collapsed ? "31" : "50"}
                              width={!!collapsed ? "80" : "230"}
                            ></img>
                          )}

                          <TopHeader
                            name={!!pathname === true ? pathname : "dashboard"}
                          ></TopHeader>
                        </Sider>
                      )} */}
                      <Layout className="site-layout">
                        <Header
                          className="site-layout-background hidden"
                          style={{ padding: 0 }}
                        >
                          {!!authCtx.token ? (
                            React.createElement(
                              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                              {
                                className: "trigger",
                                onClick: () => setCollapsed(!collapsed),
                              },
                            )
                          ) : (
                            <img src={imgPath} alt="Logo" />
                          )}

                          <div style={{ float: "right" }}>
                            <ProfileHeader />
                          </div>
                        </Header>

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

                        {/* ✅ DIRECT FOOTER (NO ANT WRAPPER) */}
                        <FooterSection />
                      </Layout>
                    </Layout>
                  </CompareProvider>
                </CartProvider>
              </WishlistProvider>
            </NewProductProvider>
          </NewAssetProvider>
        </div>
      </ConfigProvider>
    </div>
  );
};

export default App;
