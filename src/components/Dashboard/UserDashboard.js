import {
    Row,
    Col,
    Card,
    Radio,
    Table,
    Upload,
    message,
    Button,
    Avatar,
    Typography,
    useState,

    useEffect,
    useBranchesMutation,
    useCountriesMutation,
    useGetAssetsMutation,
    useHistory,
    AuthContext
} from '../index'
import {
    DownloadOutlined, PlusCircleOutlined,
    FormOutlined,
    DeleteOutlined,
    BarcodeOutlined
} from '@ant-design/icons';
import ClientsDropDown from '../CommonComponents/ClientsDropDown';
//import Echart from '../chart/EChart';
//import LineChart from '../chart/configs/lineChart';
import { Input, List } from 'antd';
import { Progress } from 'antd';
import { useGet_DashboardByUserMutation, useGet_DashboardMutation } from '../../store/Dashboard/DashboardAPI';

import moment from 'moment';
import { getSurveyType } from '../../utils';
import { useContext } from 'react';
import Paragraph from 'antd/es/skeleton/Paragraph';
import { setLoadingModalConfiguration } from '../../store/Slices/ModalLoaderSlice';
import { useDispatch } from 'react-redux';
import UsersReport from '../../common/Reports/UsersReport';
import { cartStateActions } from '../../store/authentication';
import CompanyBranchBank from '../SignIn/CompanyBranchBank';
import UserKYCModal from '../Users/UserKYCModal';

const UserDashboard = () => {
    const dispatch = useDispatch();
    const { Title, Text } = Typography;
    const authCtx = useContext(AuthContext);
    const history = useHistory();

    ///binding dynamic details..
    const [dashboardData, setDashboardData] = useState();
    const [profileCompletePer, setProfileCompletePer] = useState();
    const [purchase, setPurchase] = useState(0);
    const [showAddBank, setShowAddBank] = useState(false);
    const [showUserKYCModal, setShowUserKYCModal] = useState(false);

    const [bank, setBank] = useState(0);
    const [KYC, setKYC] = useState(0);
    const [
        fetchAssets,
        {
            data: getAssetsData,
            isSuccess: isAssetsSuccess,
        },
    ] = useGet_DashboardByUserMutation();


    //if purchased then hiding the / collpased the the menu bar.... in the app.js...
    useEffect(() => {
        if (purchase == 25) {
            dispatch(cartStateActions.setIsPurchased({ IsPurchased: true }));
        }
    }, [purchase])
    useEffect(() => {
        if (!!getAssetsData) {
            dispatch(setLoadingModalConfiguration({ isVisible: false }));
            setDashboardData(getAssetsData);

            // if (getAssetsData?.purchasePid != null && getAssetsData?.userBankPId != null &&
            //     getAssetsData?.kycInfos?.length > 0) {
            setPurchase(getAssetsData?.purchasePid != null ? 25 : 0);
            setBank(getAssetsData?.userBankPId != null ? 25 : 0);
            setKYC(getAssetsData?.kycInfos?.length > 0 ? 25 : 0);
            // }

        }
        else if (isAssetsSuccess) {
            dispatch(setLoadingModalConfiguration({ isVisible: false }));
        }
    }, [getAssetsData])

    useEffect(
        function Dashboard() {
            dispatch(setLoadingModalConfiguration({ isVisible: true }));
            fetchAssets({
                id: authCtx.clientID,
            });

        }, [fetchAssets]);
    // end here....





    const data = [
        {
            title: "March, 01, 2021",
            description: "#MS-415646",
            amount: "$180",
        },
    ];
    const heart = [
        <svg
            width="22"
            height="22"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            key={0}
        >
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M3.17157 5.17157C4.73367 3.60948 7.26633 3.60948 8.82843 5.17157L10 6.34315L11.1716 5.17157C12.7337 3.60948 15.2663 3.60948 16.8284 5.17157C18.3905 6.73367 18.3905 9.26633 16.8284 10.8284L10 17.6569L3.17157 10.8284C1.60948 9.26633 1.60948 6.73367 3.17157 5.17157Z"
                fill="#fff"
            ></path>
        </svg>,
    ];

    const shakeHands = [
        <svg width="22" height="22" viewBox="0 0 97 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M80.3791 25.0002H83.3375C84.4425 25.0002 85.5024 25.4392 86.2838 26.2206C87.0652 27.002 87.5041 28.0618 87.5041 29.1669V58.3335C87.5041 59.4386 87.0652 60.4984 86.2838 61.2798C85.5024 62.0612 84.4425 62.5002 83.3375 62.5002H75.0041L57.6291 38.1835C56.6186 36.7695 55.1912 35.7069 53.5468 35.1443C51.9024 34.5817 50.1232 34.5474 48.4583 35.046L38.1 38.1544C36.659 38.5857 35.1282 38.619 33.6699 38.2508C32.2115 37.8825 30.8801 37.1264 29.8166 36.0627L28.5958 34.8419C28.1599 34.4061 27.8262 33.879 27.6186 33.2987C27.411 32.7183 27.3347 32.0991 27.3953 31.4858C27.4559 30.8724 27.6518 30.2801 27.9689 29.7516C28.286 29.223 28.7164 28.7715 29.2291 28.4294L51.7333 13.4294C53.0767 12.5331 54.6516 12.0466 56.2664 12.0288C57.8812 12.0111 59.4664 12.4629 60.8291 13.3294L78.1458 24.3502C78.8123 24.7737 79.5895 24.9991 80.3791 25.0002ZM20.9458 59.5627L14.2125 65.4543C13.7523 65.8578 13.3866 66.3576 13.1414 66.9183C12.8963 67.479 12.7776 68.0869 12.7939 68.6986C12.8102 69.3104 12.9611 69.911 13.2358 70.4579C13.5105 71.0047 13.9023 71.4844 14.3833 71.8627L35.8 88.696C36.2708 89.0666 36.816 89.3313 37.3984 89.4721C37.9808 89.6129 38.5867 89.6264 39.1748 89.5117C39.7629 89.397 40.3193 89.1568 40.8062 88.8075C41.293 88.4582 41.6988 88.008 41.9958 87.4877L44.9291 82.3544C45.8026 80.8257 46.1695 79.0596 45.9771 77.3095C45.7848 75.5594 45.043 73.9151 43.8583 72.6127L32.6 60.2252C31.1318 58.6098 29.0884 57.6351 26.9091 57.5104C24.7298 57.3857 22.5886 58.1211 20.9458 59.5585V59.5627ZM29.3583 20.8335H12.5C11.3949 20.8335 10.3351 21.2725 9.5537 22.0539C8.7723 22.8353 8.33331 23.8951 8.33331 25.0002V56.3169C8.33354 57.9974 8.84189 59.6387 9.79165 61.0252C9.89267 60.9316 9.99547 60.8399 10.1 60.7502L16.8291 54.8585C19.7041 52.3428 23.4515 51.0556 27.2655 51.2738C31.0795 51.4919 34.6556 53.198 37.225 56.0252L48.4833 68.4085C50.5553 70.6872 51.8527 73.5633 52.1896 76.6247C52.5264 79.6861 51.8853 82.7755 50.3583 85.4502L47.6291 90.2252C48.8066 90.6717 50.0699 90.8455 51.3241 90.7337C52.5784 90.6218 53.791 90.2271 54.8708 89.5794L73.2458 78.5544C73.7385 78.2583 74.1646 77.8636 74.4974 77.3949C74.8301 76.9262 75.0623 76.3938 75.1793 75.831C75.2963 75.2683 75.2956 74.6874 75.1773 74.1249C75.0589 73.5625 74.8255 73.0306 74.4916 72.5627L52.5458 41.8169C52.2931 41.4637 51.9364 41.1984 51.5255 41.058C51.1146 40.9175 50.6701 40.909 50.2541 41.0335L39.8958 44.1377C37.3741 44.8941 34.6947 44.9539 32.1418 44.3105C29.5889 43.6672 27.2578 42.3447 25.3958 40.4835L24.175 39.2627C23.0849 38.1732 22.2502 36.8554 21.731 35.4043C21.2118 33.9533 21.021 32.405 21.1725 30.8713C21.3239 29.3376 21.8138 27.8566 22.6068 26.5351C23.3998 25.2136 24.4762 24.0846 25.7583 23.2294L29.3583 20.8335Z" fill="#fff" />
        </svg>,
    ];

    const todaypending = [<img src='assets/svg/today-icon.svg' className='btnimg mr-2' alt='Pending' />]
    const upcoming = [<img src='assets/svg/upcoming.svg' className='btnimg mr-2' alt='Upcoming' />]
    const [count, setcount] = useState([]);
    const [amount, setAmount] = useState([]);
    console.log("count", count);
    console.log("count", dashboardData?.userCount);
    useEffect(() => {
        if (!!dashboardData) {
            setcount([
                {
                    today: "My Referral Registered Users",
                    key: "clients",
                    AssetName: "Fire Alaram",
                    totalPPMSchedule: "10",
                    totalPPMScheduleCompleted: "5",
                    totalPPMScheduleOverdue: "2",
                    totalPPMSchedulePending: "3",
                    title: !!dashboardData ? dashboardData?.users?.length : 0,
                    persent: "",
                    icon: heart,
                    bnb: "bnb2",
                },
                {
                    today: "Total Purchased",
                    key: "clients",
                    AssetName: "Fire Alaram",
                    totalPPMSchedule: "10",
                    totalPPMScheduleCompleted: "5",
                    totalPPMScheduleOverdue: "2",
                    totalPPMSchedulePending: "3",
                    title: !!dashboardData ? dashboardData?.purchaseCount : 0,
                    persent: "",
                    icon: heart,
                    bnb: "bnb2",
                },

                {
                    today: "Left Count",
                    key: "Survey",
                    AssetName: "Pending Survey(s)",
                    totalPPMSchedule: "10",
                    totalPPMScheduleCompleted: "5",
                    totalPPMScheduleOverdue: "2",
                    totalPPMSchedulePending: "3",
                    title: !!dashboardData ? dashboardData?.userLeftCount : 0,
                    persent: "",
                    icon: todaypending,
                    bnb: "bnb2",
                },
                {
                    today: "Right Count",
                    key: "Survey",
                    AssetName: "Upcoming Survey(s)",
                    totalPPMSchedule: "10",
                    totalPPMScheduleCompleted: "5",
                    totalPPMScheduleOverdue: "2",
                    totalPPMSchedulePending: "3",
                    title: !!dashboardData?.userRightCount ? dashboardData?.userRightCount : 0,
                    persent: "",
                    icon: upcoming,
                    bnb: "bnb2",
                },


            ])


            //here contract details....
            // dashboardData.forEach((el) => {
            //   const newObj = [];
            //   {

            //   }
            // }); 
        }
    }, [dashboardData])







    const onClickViewAll = ({ e }) => {
        history.push("/reports");
    }

    const onClickViewAllCC = ({ key }) => {
        history.push(key);
    }


    const OnSuccessHandler = (e) => {
        dispatch(setLoadingModalConfiguration({ isVisible: true }));
        fetchAssets({
            CBXID: authCtx.companyBranchID,
            clientXid: authCtx.usertype.toLowerCase() === "client" ? authCtx.clientID : e.clientXid === 0 ? -1 : e.clientXid,
            userXid: ["Technician", "Engineer"].includes(authCtx.usertype) ? authCtx.clientID : -1,
        });
    }
    const onSuccessContractHandler = (e) => {

    }

    const onClickLoginPage = () => {
        dispatch(cartStateActions.setUnderUserXid({ UnderUserXid: authCtx.underUserXid }));
        dispatch(cartStateActions.setUserXID({ UserXid: authCtx?.clientID }));
        history.push("Products");
    }

    const onClickAddBank = () => {
        setShowAddBank(true);
    }

    const onSuccessUser = () => {
        setShowAddBank(false);
        setShowUserKYCModal(false);
        fetchAssets({
            id: authCtx.clientID,
        });
    }

    const onClickShowKYCModal = () => {
        setShowUserKYCModal(true);
    }
    return (
        <>
            {!!dashboardData == true ?
                <div>
                    <>
                        <div class="container">
                            <div class="row justify-content-center">
                                <div class="col-12">
                                    <Card bordered={false} title={25 + bank + purchase + KYC == 100 ? "Profile Completed" : "Profile incomplete"} className="criclebox ">

                                        <div class="card bg-white">
                                            <div class="card-body">
                                                <div class="row">
                                                    <div className='col-md-12'>
                                                        <Progress percent={25 + bank + purchase + KYC} status="active" />
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <div className='col-md-3'>
                                                        <Progress type="circle" percent={100} size={80} />
                                                        <p>Registration</p>


                                                    </div>
                                                    <div className='col-md-3'>
                                                        <Progress type="circle" percent={dashboardData?.purchasePid != null ? 100 : 0} size={80} />
                                                        <p>Product Purchase</p>


                                                        {dashboardData?.purchasePid != null ? <></> : <>
                                                            <Button type="Primary" className="btn-primary text-white"
                                                                onClick={onClickLoginPage}
                                                            >
                                                                Continue To Purchase
                                                            </Button>
                                                        </>}
                                                    </div>
                                                    <div className='col-md-3'>
                                                        <Progress type="circle" percent={dashboardData?.kycInfos?.length > 0 ? 100 : 0} size={80} />
                                                        <p>KYC</p>


                                                        {dashboardData?.kycInfos?.length > 0 ? <></> : <>
                                                            <Button type="Primary" className="btn-primary text-white"
                                                                onClick={onClickShowKYCModal}
                                                            >
                                                                Continue To KYC
                                                            </Button>
                                                        </>}
                                                    </div>
                                                    <div className='col-md-3'>
                                                        <Progress type="circle" percent={dashboardData?.userBankPId != null ? 100 : 0} size={80} />
                                                        <p>Bank Details</p>
                                                        {dashboardData?.userBankPId != null ? <></> : <>
                                                            <Button type="Primary" className="btn-primary text-white"
                                                                onClick={onClickAddBank}
                                                            >
                                                                Continue To Add Bank
                                                            </Button>
                                                        </>}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </>

                    {dashboardData?.purchasePid != null ?

                        <div className="container">


                            <div class="d-sm-flex align-items-center justify-content-between mb-4">
                                <h1 class="h3 mb-0 text-gray-800">Dashboard</h1>

                            </div>
                            <div class="row">


                                <div class="col-xl-3 col-md-6 mb-4">
                                    <div class="card border-left-primary shadow h-100 py-2">
                                        <div class="card-body">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col mr-2">
                                                    <div class="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                        Earnings (Monthly)</div>
                                                    <div class="h5 mb-0 font-weight-bold text-gray-800">{!!dashboardData ? dashboardData.monthlyIncome : null}</div>
                                                </div>
                                                <div class="col-auto">
                                                    <i class="fa-solid fa-money-bill text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class="col-xl-3 col-md-6 mb-4">
                                    <div class="card border-left-success shadow h-100 py-2">
                                        <div class="card-body">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col mr-2">
                                                    <div class="text-xs font-weight-bold text-success text-uppercase mb-1">
                                                        Earnings (Total)</div>
                                                    <div class="h5 mb-0 font-weight-bold text-gray-800">{!!dashboardData ? dashboardData.userAmount : null}</div>
                                                </div>
                                                <div class="col-auto">
                                                    <i class="fas fa-dollar-sign fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class="col-xl-3 col-md-6 mb-4">
                                    <div class="card border-left-info shadow h-100 py-2">
                                        <div class="card-body">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col mr-2">
                                                    <div class="text-xs font-weight-bold text-info text-uppercase mb-1">Withdraw (Monthly)
                                                    </div>
                                                    <div class="row no-gutters align-items-center">
                                                        <div class="col-auto">
                                                            <div class="h5 mb-0 mr-3 font-weight-bold text-gray-800">{!!dashboardData ? dashboardData.totalPayoutCompletedMonthly : null}</div>
                                                        </div>
                                                        <div class="col">
                                                            <div class="progress progress-sm mr-2">
                                                                <div class="progress-bar bg-info" role="progressbar"
                                                                    aria-valuenow="50" aria-valuemin="0"
                                                                    aria-valuemax="100"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="col-auto">
                                                    <i class="fas fa-clipboard-list fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class="col-xl-3 col-md-6 mb-4">
                                    <div class="card border-left-warning shadow h-100 py-2">
                                        <div class="card-body">
                                            <div class="row no-gutters align-items-center">
                                                <div class="col mr-2">
                                                    <div class="text-xs font-weight-bold text-warning text-uppercase mb-1">
                                                        Withdraw (Total)</div>
                                                    <div class="h5 mb-0 font-weight-bold text-gray-800">{!!dashboardData ? dashboardData.totalPayout : null}</div>
                                                </div>
                                                <div class="col-auto">
                                                    <i class="fas fa-comments fa-2x text-gray-300"></i>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            <div className="layout-content">

                                <Row className="rowgap-vbox" gutter={[24, 0]}>
                                    {count.map((c, index) => (
                                        <Col
                                            key={index}
                                            xs={24}
                                            sm={24}
                                            md={12}
                                            lg={6}
                                            xl={6}
                                            className="mb-24"
                                        >
                                            <Card bordered={false} className="criclebox ">
                                                <div className="number">
                                                    <Row align="middle" gutter={[24, 0]}>
                                                        <Col xs={18}>
                                                            <span>{c.today}</span>
                                                            <Title level={3}>
                                                                {c.title} <small className={c.bnb}>{c.persent}</small>
                                                            </Title>
                                                        </Col>
                                                        <Col xs={6}>
                                                            <div className="icon-box">{c.icon}</div>
                                                        </Col>
                                                    </Row>
                                                    <Row align="middle" gutter={[24, 0]}>

                                                        <Col xs={18}>
                                                            <span><Button type="link" onClick={() => onClickViewAllCC({ key: c.key })}>  View All</Button></span>
                                                        </Col>

                                                    </Row>
                                                </div>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>


                            </div>
                            {!!dashboardData?.users && (
                                <div className="layout-content">

                                    <Row>
                                        <Col>
                                            <Card bordered={false}

                                                className="criclebox tablespace mb-24"
                                                title="My Registered Members">

                                                <UsersReport item={!!dashboardData ? dashboardData?.users : null}></UsersReport>


                                            </Card>
                                        </Col>
                                    </Row>
                                </div >
                            )}
                            <div class="card bg-primary">
                                <div class="card-header">
                                    Your Referral
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div className='col-md-8'>
                                            <Input readOnly={true} value={`${process.env.REACT_APP_PUblic}?Code=` + getAssetsData?.referralCode}></Input>

                                        </div>
                                        <div className='col-md-4'>
                                            <Button type="Primary"
                                                onClick={() => navigator.clipboard.writeText(`${process.env.REACT_APP_PUblic}?Code=` + getAssetsData?.referralCode)}
                                            >
                                                Copy
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div >
                        : <>

                        </>

                    }


                </div>
                : null}


            {showAddBank == true ? <>
                <CompanyBranchBank
                    onSuccess={() => onSuccessUser()}
                    //  onUpdated={() => onUpdatedUser()}
                    //  item={!!getUserBYIDData ? getUserBYIDData : null}
                    showPopup={true}
                    // clientIDFromAddClient={!!item.pid ? item.pid : getAddAssetData?.details}
                    isAdminOnly={false}
                    onCancel={() => setShowAddBank(false)}
                ></CompanyBranchBank>
            </> : null
            }
            {showUserKYCModal == true ? <>
                <UserKYCModal
                    onSuccess={() => onSuccessUser()}
                    //  onUpdated={() => onUpdatedUser()}
                    //  item={!!getUserBYIDData ? getUserBYIDData : null}
                    showPopup={true}
                    // clientIDFromAddClient={!!item.pid ? item.pid : getAddAssetData?.details}
                    isAdminOnly={false}
                    onCancel={() => setShowUserKYCModal(false)}
                ></UserKYCModal>
            </> : null
            }


        </>
    );

};





export default UserDashboard