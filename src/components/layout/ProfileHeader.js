import { useContext, useEffect, useState } from "react";

import {
  Row,
  Col,
  Breadcrumb,
  Badge,
  Dropdown,
  Button,
  List,
  Avatar,
  Input,
  Drawer,
  Typography,
  Switch,
  Popover,
  Checkbox,
  Menu,
} from "antd";

import {
  SearchOutlined,
  StarOutlined,
  TwitterOutlined,
  FacebookFilled,
} from "@ant-design/icons";

import { NavLink, Link, useHistory, useLocation } from "react-router-dom";
import TopHeader from "./TopHeader";
import { authAppRoutes } from "../../routes/routesConfig";
import { useMemo } from "react";
import AuthContext from "../../store/authentication/auth-context";
import { useDispatch, useSelector } from "react-redux";
import { menuSettingsActions } from "../../store/authentication";
// import styled from "styled-components";
// import avtar from "../../assets/images/team-2.jpg";

const profile = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
      fill="#111827"
    ></path>
  </svg>,
];

function ProfileHeader({
  placement,
  name,
  subName,
  onPress,
  handleFixedNavbar,
}) {
  const { Title, Text } = "Assets";

  const URLPathName = useLocation().pathname.replace("/", "");
  const location = useLocation();
  const history = useHistory();
  const BTFSAuthCtx = useContext(AuthContext);
  const [visible, setVisible] = useState(false);
  const [sidenavType, setSidenavType] = useState("transparent");

  useEffect(() => window.scrollTo(0, 0));

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

  const onClickLogout = () => {
    BTFSAuthCtx.logout();
    history.push("/Sign-In");
  };

  const content = (
    <div>
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
          onClick={() => onClickDownloadImage({ key: "ChangePassword" })}
          type="link"
        >
          Change Password
        </Button>
      </p>
      <p>
        {" "}
        <Button type="link" onClick={onClickLogout}>
          Logout
        </Button>
      </p>
    </div>
  );

  const routes = authAppRoutes;

  const getBreadCrumbName = useMemo(() => {
    return routes.filter((route) => route.path === location.pathname)?.[0];
  }, [location]);
  const dispatch = useDispatch();
  const onChange = () => {
    dispatch(menuSettingsActions.showOnlyInoiceMenu());
  };

  const OnclickRegister = () => {
    history.push("/Register");
  };

  const OnclickSignIn = () => {
    history.push("/Sign-In");
  };

  const showInvoiceOnly = useSelector(
    (state) => state.MenuSettingsSlice.showInvoiceOnly
  );
  const nonLoginItems = [
    {
      label: "Company View",
      key: "/View",
    },
    {
      label: "Sea Ports",
      key: "/SeaPorts",
    },
    {
      label: "Location",
      key: "/Locations",
    },
  ];

  const onClick = (e) => {
    history.push(e.key);
  };
  return (
    <>
      {!!BTFSAuthCtx.isLoggedIn ? (
        <>
          <div className="container">
            <div class="row">
              <div className="column mt-10">-</div>
              <div className="column">
                <Popover
                  content={content}
                  trigger="hover"
                  open={open}
                  onOpenChange={handleOpenChange}
                >
                  {profile}
                  <span className="p-1">{BTFSAuthCtx.userName}</span>
                  <div>
                    <div>Roles: {BTFSAuthCtx.usertype}</div>
                  </div>
                </Popover>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="container">
            <div class="row">
              <span className="column"> {profile}Guest</span>
            </div>
          </div>

          {BTFSAuthCtx.isLoggedIn === false &&
          ![
            "Sign-In",
            "Products",
            "Payments",
            "RegisterSuccess",
            "ReferralCodeVerificationSuccess",
          ].includes(URLPathName) ? (
            <span className="p-1">
              {" "}
              <Button
                type="link"
                htmlType="submit"
                onClick={OnclickSignIn}
                style={{ width: "100%" }}
              >
                Having account? Sign In
              </Button>
            </span>
          ) : null}
        </>
      )}
    </>
  );
}

export default ProfileHeader;
