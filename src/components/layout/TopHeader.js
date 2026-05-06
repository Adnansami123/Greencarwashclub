//import { menus } from "../../common/navBar";
//import { Navlink } from "react-router-dom";
//import { useHistory } from "react-router-dom";

// import { useContext } from "react";
// import AuthContext from "../../store/authentication/auth-context"; 
// import {useDispatch} from "react-redux";

import { Link, NavLink, useHistory, useLocation } from "react-router-dom";
import {
    Layout,
    Menu,
    Button,
    Row,
    Col,
    Typography,
    Form,
    Input,
    Switch,
    Breadcrumb,
    Badge,
    Dropdown,
    List,
    Drawer,
    Popover,

} from "antd";
import SubMenu from "antd/es/menu/SubMenu";
import {
    AppstoreOutlined, MailOutlined, LoginOutlined,
    SettingOutlined, UserOutlined, CustomerServiceOutlined
    , BarChartOutlined,
    HomeOutlined, ImportOutlined,
    ApartmentOutlined, StockOutlined,
    ShoppingCartOutlined,
    ProjectOutlined,
    RocketOutlined,
    GoldenFilled,
    MoneyCollectFilled,
    ShoppingFilled,
    SoundFilled,
    MergeFilled,
    GroupOutlined,
    AccountBookOutlined,

} from '@ant-design/icons';
import { MenuProps } from 'antd';
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../store/authentication/auth-context";
// import img from "../../../src/assets/images/"
import imgDemo from "../../../src/assets/images/Demo-Logo.png"
import imgProd from "../../../src/assets/images/Demo-Logo.png"
import { Header } from "antd/es/layout/layout";

import styled from "styled-components";
import {
    SearchOutlined,
    StarOutlined,
    TwitterOutlined,
    FacebookFilled,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { getFilterMenus } from "../../utils";
const NavBarItems = ({ path }) => {
    return (
        <ul>
            <li>
                {/* {menus.map((a) =>
                (
                    <Navlink to={path}   isActive={() => isNav}
                    ))}; */}
            </li>
        </ul>
    )
};

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
const bell = [
    <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        key={0}
    >
        <path
            d="M10 2C6.68632 2 4.00003 4.68629 4.00003 8V11.5858L3.29292 12.2929C3.00692 12.5789 2.92137 13.009 3.07615 13.3827C3.23093 13.7564 3.59557 14 4.00003 14H16C16.4045 14 16.7691 13.7564 16.9239 13.3827C17.0787 13.009 16.9931 12.5789 16.7071 12.2929L16 11.5858V8C16 4.68629 13.3137 2 10 2Z"
            fill="#111827"
        ></path>
        <path
            d="M10 18C8.34315 18 7 16.6569 7 15H13C13 16.6569 11.6569 18 10 18Z"
            fill="#111827"
        ></path>
    </svg>,
];
const clockicon = [
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
            d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 6C11 5.44772 10.5523 5 10 5C9.44772 5 9 5.44772 9 6V10C9 10.2652 9.10536 10.5196 9.29289 10.7071L12.1213 13.5355C12.5118 13.9261 13.145 13.9261 13.5355 13.5355C13.9261 13.145 13.9261 12.5118 13.5355 12.1213L11 9.58579V6Z"
            fill="#111827"
        ></path>
    </svg>,
];

const data = [
    {
        title: "New message from Sophie",
        description: <>{clockicon} 2 days ago</>,
    },
];


const menu = (
    <List
        min-width="100%"
        className="header-notifications-dropdown "
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
            <List.Item>
                <List.Item.Meta
                    // avatar={<Avatar shape="square" src={item.avatar} />}
                    title={item.title}
                    description={item.description}
                />
            </List.Item>
        )}
    />
);

const emc_high = <><Badge size="small" count={4}>

    {bell}

</Badge>
</>
const logsetting = [
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
            d="M11.4892 3.17094C11.1102 1.60969 8.8898 1.60969 8.51078 3.17094C8.26594 4.17949 7.11045 4.65811 6.22416 4.11809C4.85218 3.28212 3.28212 4.85218 4.11809 6.22416C4.65811 7.11045 4.17949 8.26593 3.17094 8.51078C1.60969 8.8898 1.60969 11.1102 3.17094 11.4892C4.17949 11.7341 4.65811 12.8896 4.11809 13.7758C3.28212 15.1478 4.85218 16.7179 6.22417 15.8819C7.11045 15.3419 8.26594 15.8205 8.51078 16.8291C8.8898 18.3903 11.1102 18.3903 11.4892 16.8291C11.7341 15.8205 12.8896 15.3419 13.7758 15.8819C15.1478 16.7179 16.7179 15.1478 15.8819 13.7758C15.3419 12.8896 15.8205 11.7341 16.8291 11.4892C18.3903 11.1102 18.3903 8.8898 16.8291 8.51078C15.8205 8.26593 15.3419 7.11045 15.8819 6.22416C16.7179 4.85218 15.1478 3.28212 13.7758 4.11809C12.8896 4.65811 11.7341 4.17949 11.4892 3.17094ZM10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z"
            fill="#111827"
        ></path>
    </svg>,
];

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

const toggler = [
    <svg
        width="20"
        height="20"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 448 512"
        key={0}
    >
        <path d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"></path>
    </svg>,
];

const setting = [
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
            d="M11.4892 3.17094C11.1102 1.60969 8.8898 1.60969 8.51078 3.17094C8.26594 4.17949 7.11045 4.65811 6.22416 4.11809C4.85218 3.28212 3.28212 4.85218 4.11809 6.22416C4.65811 7.11045 4.17949 8.26593 3.17094 8.51078C1.60969 8.8898 1.60969 11.1102 3.17094 11.4892C4.17949 11.7341 4.65811 12.8896 4.11809 13.7758C3.28212 15.1478 4.85218 16.7179 6.22417 15.8819C7.11045 15.3419 8.26594 15.8205 8.51078 16.8291C8.8898 18.3903 11.1102 18.3903 11.4892 16.8291C11.7341 15.8205 12.8896 15.3419 13.7758 15.8819C15.1478 16.7179 16.7179 15.1478 15.8819 13.7758C15.3419 12.8896 15.8205 11.7341 16.8291 11.4892C18.3903 11.1102 18.3903 8.8898 16.8291 8.51078C15.8205 8.26593 15.3419 7.11045 15.8819 6.22416C16.7179 4.85218 15.1478 3.28212 13.7758 4.11809C12.8896 4.65811 11.7341 4.17949 11.4892 3.17094ZM10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z"
            fill="#111827"
        ></path>
    </svg>,
];

const TopHeader = ({ placement,
    name,
    subName,
    onPress,
    handleSidenavColor,
    handleSidenavType,
    handleFixedNavbar }) => {
    /// const history = useHistory();

    const showInvoiceOnly = useSelector((state) => state.MenuSettingsSlice.showInvoiceOnly);
    console.log("showInvoiceOnly", showInvoiceOnly);
    const [filteredMenuItems, setFilteredMenuItems] = useState();

    useEffect(() => {
        setFilteredMenuItems(getFilterMenus({ menuObj: items, showInvoiceOnly: showInvoiceOnly }))
    }, [showInvoiceOnly])

    const { data: emergencyCallOutCount, code, error, loading } = useSelector((state) => state.EmergencyCallOutSlice);


    const [EMCount, setEMCount] = useState("");
    const isInvoice = `${process.env.REACT_APP_ONLY_INVOICE}`

    useEffect(() => {
        setEMCount(emergencyCallOutCount);
    }, [emergencyCallOutCount])

    const nonLoginItems = [
        {

            label: 'Login',
            key: '/sign-in',
            icon: <LoginOutlined />,

        },
        {

            label: 'Register',
            key: '/Register',
            icon: <LoginOutlined />,

        },
    ];
    const items = [
        {
            label: 'Dashboard',
            key: 'UserDashboard',
            visible: true,
            icon: <GoldenFilled />,
        },
        {
            label: 'My Account',
            key: 'MyAccount',
            visible: true,
            icon: <UserOutlined />,
            children: [

                {
                    label: 'Update Profile',
                    key: 'profile',
                    visible: false,
                },
                {
                    label: 'My KYC',
                    key: 'MyKYC',
                    visible: false,
                },
                {
                    label: 'My Bank',
                    key: 'MyBank',
                    visible: false,
                },
            ],

        },
        {
            label: 'My Earning',
            key: 'MyEarning',
            visible: true,
            icon: <MoneyCollectFilled />,
            children: [

                {
                    label: 'Level Income',
                    key: 'MyProfit',
                    visible: false,
                },
                // {
                //     label: 'ROI Income',
                //     key: 'ROIIncome',
                //     visible: false,
                // },
            ],

        },
        {
            label: "Payouts",
            key: 'Payouts',
            visible: true,
            icon: <MoneyCollectFilled />,
            children: [

                {
                    label: 'Payout Request',
                    key: "PayoutRequest",
                    visible: false,
                },
                {
                    label: 'Payout History',
                    key: '#t',
                    visible: false,
                },
            ],

        },
        {
            label: 'Downline Network',
            key: 'MyDownlineNetwork',
            visible: true,
            icon: <MoneyCollectFilled />,
            children: [

                {
                    label: 'My Direct Members',
                    key: 'MyDirectMembers',
                    visible: false,
                },
                {
                    label: 'My Team ',
                    key: '#',
                    visible: false,
                },
                {
                    label: 'Downline Members Tree ',
                    key: 'TreeView1',
                    visible: false,
                },
            ],

        },
        {
            label: 'Transaction History',
            key: 'TransactionHistory',
            visible: true,
            icon: <ShoppingFilled />,
            children: [
                {
                    label: 'My Profit',
                    key: 'MyProfit',
                    visible: false,
                },
            ],

        },

        {
            label: 'Marketing Tool',
            key: 'MarketingTool',
            visible: true,
            icon: <SoundFilled />,
            children: [
                {
                    label: 'Referral Link',
                    key: 'ReferralLink',
                    visible: false,
                },
            ],

        },
    ];



    const superAdminItems = [
        {
            label: 'Dashboard',
            key: 'Dashboard',
            visible: true,
            icon: <GoldenFilled />,
        },
        {
            label: 'User Management',
            key: 'UserManagment',
            icon: <UserOutlined />,

            children: [
                {
                    label: 'All Users',
                    key: 'Users',
                },
                // {
                //     label: 'KYC Verfification',
                //     key: 'KYCVerification',
                // },
                {
                    label: 'Pur. &  Pay. Verfification',
                    key: 'PurchaseVerification',
                },

            ],

        },
        {
            label: 'Packages',
            key: 'Inventory',
            visible: true,
            icon: <HomeOutlined />,
        },
        {
            label: 'Charge & Commission',
            key: 'Levels',
            visible: true,
            icon: <AccountBookOutlined />,
        },
        {
            label: 'Masters',
            key: 'superAdmin',
            icon: <SettingOutlined />,

            children: [

                // {
                //     label: 'Countries',
                //     key: 'Countries',
                // },
                {
                    label: 'City',
                    key: 'Branches',
                },
                {
                    label: 'Product Category',
                    key: 'AssetCategory',
                },


            ],


        },
        {
            label: 'Withdraw System',
            key: 'WithdrawSystem',
            icon: <MoneyCollectFilled />,

            children: [
                {
                    label: 'Withdraw/Payout Request',
                    key: 'PayoutRequestAdmin',
                },
                {
                    label: 'View History',
                    key: 'PayoutRequestHistoryAdmin',
                },

            ],

        },
        // {
        //     label: 'Report',
        //     key: '#',
        //     visible: true,
        //     icon: <ShoppingCartOutlined />,
        // },
        // {
        //     label: 'Company Transaction',
        //     key: 'SubMenuSC',
        //     icon: <SettingOutlined />,

        //     children: [
        //         {
        //             label: 'Payout Request',
        //             key: 'CompanyOffice',
        //         },

        //     ],

        // },

    ];

    const BTFSAuthCtx = useContext(AuthContext);




    const [visible, setVisible] = useState(false);
    const [sidenavType, setSidenavType] = useState("transparent");

    useEffect(() => window.scrollTo(0, 0));

    const showDrawer = () => setVisible(true);
    const hideDrawer = () => setVisible(false);


    // const dispatch = useDispatch();
    const history = useHistory();
    const [current, setCurrent] = useState('/dashboard');
    const onClick = (e) => {
        history.push(e.key);
        setCurrent(e.key);
    };

    useEffect(() => {
        if (!!name) {
            let menuName;
            switch (name) {
                case "AllSurvey":
                    menuName = "StartSurvey";
                    break;
                case "SurveyProcessNew":
                    menuName = "StartSurvey";
                    break;
                case "SurveyProcess":
                    menuName = "StartSurvey";
                    break;
                case "client/ViewContracts":
                    menuName = "/client/ViewContracts";
                    break;
                case "client/ViewContracts":
                    menuName = "/client/EmergenyCallOut";
                    break;
                case "client/EmergenyCallOut":
                    menuName = "/client/EmergenyCallOut";
                    break;
                case "client/dashboard":
                    menuName = "/client/dashboard";
                    break;
                case "client/Dashboard":
                    menuName = "/client/dashboard";
                    break;

                default:
                    menuName = name;
            }
            setCurrent(menuName);
        }
    }, [name])





    const [open, setOpen] = useState(false);
    const hide = () => {
        setOpen(false);
    };
    const handleOpenChange = (newOpen) => {
        setOpen(newOpen);
    };


    const [imgPath, setImPath] = useState(
        process.env.REACT_APP_ENV === "UAT" ? imgDemo :  process.env.REACT_APP_ENV === "PROD"
    );
    return (
        <>



            {!!BTFSAuthCtx.isLoggedIn && BTFSAuthCtx.usertype.toUpperCase() === "SUPERADMIN" && (
                <div>
                    <Menu theme="dark" onClick={onClick} selectedKeys={[current]} mode="inline" items={superAdminItems} />

                </div>
            )}
            {!!BTFSAuthCtx.isLoggedIn && BTFSAuthCtx.usertype.toUpperCase() === "ADMIN" && (
                // <Menu theme="dark" style={{ paddingLeft: 0, flex: "auto" }} onClick={onClick} selectedKeys={[current]} mode="inline" items={items.filter(item => item.visible == true && item?.children?.length > 0 ? item?.children?.item?.visible == true : null)} />
                <Menu theme="dark" style={{ paddingLeft: 0, flex: "auto" }} onClick={onClick} selectedKeys={[current]} mode="inline" items={items} />
            )}


            {!!BTFSAuthCtx.isLoggedIn === false && (
                <Menu theme="dark" onClick={onClick} selectedKeys={[current]} mode="inline" items={nonLoginItems} />
            )}




        </>
    )

};

export default TopHeader;