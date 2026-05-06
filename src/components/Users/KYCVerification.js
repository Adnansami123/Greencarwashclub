
import {
    Row,
    Col,
    Card,
    Radio,
    Table,
    Upload,
    message,
    Progress,
    Button,
    Avatar,
    Typography,
    useState,
    useUsersMutation,
    useEffect,
    DeleteConfirmationModal,
    ConfirmationModal,
    AuthContext,

} from "../index";
import UserModal from "./UserModal";
import {
    DownloadOutlined, PlusCircleOutlined,
    FormOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { useContext } from "react";
import { useDeleteUserMutation, useGetUserByIDMutation } from "../../store/ConfigurationAPI/ConfigurationAPI";
import { Tag } from "antd";
import { setLoadingModalConfiguration } from "../../store/Slices/ModalLoaderSlice";
import { useDispatch } from "react-redux";
import { useApprovedPurchaseMutation, useGetAllPuchaseByUserMutation, useGetAllPuchaseForApprovalMutation } from "../../store/ConfigurationAPI/ConfigurationMLM";
import KYCVerfificationDetails from "./KYCVerfificationDetails";
// import { useEffect, useState } from "react";
// //import project1 from "../assets/images/logo.png";
// import project2 from "../../assets/images/logo.png";

// import project1 from "../../assets/images/logo.png"
// import { Link } from "react-router-dom


export default function KYCVerification() {

    const dispatch = useDispatch();
    const { Title } = "Users";
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageSize, setCurrentPageSize] = useState(10);
    const [assetByIDData, setAssetByIDData] = useState([]);
    const [addAssetFlag, setAddAssetFlag] = useState(false);
    const [deleteID, setDeleteID] = useState();
    const [showDelete, setShowDelete] = useState(false);
    const [showKYCDetails, setShowKYCDetails] = useState(false);
    const [KYCPurchaseID, setKYCPurchaseID] = useState();
    console.log("PurchaseID", KYCPurchaseID);
    const [showActionMessage, setshowActionMessage] = useState(false);
    const [transactionType, setTransactionType] = useState("");
    const [project, setProject] = useState({});
    const [data, setData] = useState([]);
    const [dataproject, setDataProject] = useState({});
    const authCtx = useContext(AuthContext);


    const onClickEdit = (e) => {
        dispatch(setLoadingModalConfiguration({ isVisible: true }));
        const commonCompany = {
            UnderUserXid: e.key,
            userXid: e.pid,
            purchasePId: e.purchasePId,
        }
        getUserByID(
            {
                data: commonCompany,
            });

    }

    const OnSuccessHandlerNew = (e) => {
        console.log("OnSuccessHandlerNew", e);
        dispatch(setLoadingModalConfiguration({ isVisible: true }));
        const commonCompany = {
            UnderUserXid: e.e.UnderUserXid,
            userXid: e.e.userXid,
            purchasePId: e.e.purchasePId,
        }
        getUserByID(
            {
                data: commonCompany,
            });


    }

    const onClickView = (e) => {
        setKYCPurchaseID(e.key);
        setShowKYCDetails(true);
    }
    useEffect(() => {
        if (showActionMessage) {
            setTimeout(function () {

                setshowActionMessage(false);
                fetch({
                    id: authCtx.companyID,
                });
            }, 2000);

        }

    }, [showActionMessage])

    const [
        getUserByID,
        {
            data: getUserBYIDData,
            isSuccess: isGetUserByIDataSuccess,
        }
    ] = useApprovedPurchaseMutation();

    useEffect(() => {

        if (isGetUserByIDataSuccess && !!getUserBYIDData) {
            // dispatch(setLoadingModalConfiguration({ isVisible: false }));
            fetch({
                id: authCtx.companyID,
            });
        }

    }, [isGetUserByIDataSuccess, getUserBYIDData])









    const [
        fetch,
        {
            data: getData,
            isSuccess: isAssetsSuccess,
        },
    ] = useGetAllPuchaseForApprovalMutation();


    useEffect(() => {
        if (getData?.length > 0) {
            dispatch(setLoadingModalConfiguration({ isVisible: false }));
            setData(getData);
        }
        else if (isAssetsSuccess) {
            dispatch(setLoadingModalConfiguration({ isVisible: false }));
        }

    }, [getData, isAssetsSuccess]);

    useEffect(
        function Users() {
            dispatch(setLoadingModalConfiguration({ isVisible: true }));
            fetch({

                id: authCtx.companyID,
            });

        }, [fetch]);

    const onChangePageChange = (e) => {
        setCurrentPage(e.current);
        setCurrentPageSize(e.pageSize);

    }

    const columns = [
        {
            title: "Sl. No.",
            render: (_, records, index) => (
                <>
                    {currentPage === 1 ? index + 1 : (currentPageSize * (currentPage - 1) + 1)}
                </>
            )
        },
        {
            title: "Action",
            key: "action",
            render: (_, records, index) => (
                <>


                    <Button icon={<DeleteOutlined />} onClick={() => onClickView({ key: records.purchasePidNew })}>View More Details</Button>
                    {records?.paymentStatusXid != 1 ? <></> :
                        <>
                            <Button icon={<FormOutlined />} onClick={() => onClickEdit({ pid: records.pid, key: records.underUserXid, purchasePId: records.purchasePid })}> Approve</Button>
                        </>
                    }
                </>
            )

        },
        {
            title: "Ref.",
            dataIndex: "pid",
            key: "pid",
            sorter: (a, b) => a.pid.localeCompare(b.pid),

        },
        {
            title: "First Name",
            dataIndex: "firstName",
            key: "firstName",
            sorter: (a, b) => a.firstName.localeCompare(b.firstName),

        },
        {
            title: "Last Name",
            dataIndex: "lastName",
            key: "lastName",
            sorter: (a, b) => a.lastName.localeCompare(b.lastName),

        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",
            sorter: (a, b) => a.email.localeCompare(b.email),

        },
        {
            title: "Mobile",
            dataIndex: "mobile",
            key: "mobile",
            sorter: (a, b) => a.mobile.localeCompare(b.mobile),

        },




        {
            title: "DOJ",
            key: "doj",
            dataIndex: "doj",
            sorter: (a, b) => a.createdOn.localeCompare(b.createdOn),

        },

    ];

    const onCancelHandler = () => {
        setShowKYCDetails(false);
    }


    return (
        <>
            <div className="container">

                <Card
                    bordered={false}
                    className="criclebox tablespace mb-24"
                    title="KYC Verification"
                >
                    <div class="row">
                        <div class={showKYCDetails == false ? "col-md-12 overflow-auto" : "col-md-6 overflow-auto"}>

                            <Table
                                columns={columns}
                                dataSource={!!data ? data : null}
                                // pagination={false}
                                className="ant-border-space"
                                onChange={((e) => onChangePageChange(e))}
                                currentPage={currentPage}
                            />

                        </div>
                        {showKYCDetails == true ? <>
                            <div class="col-md-6">
                                <KYCVerfificationDetails onCancel={(e) => onCancelHandler({ e })} onSuccess={(e) => OnSuccessHandlerNew({ e })} PurchaseID={KYCPurchaseID}></KYCVerfificationDetails>
                            </div>
                        </>
                            : null}


                    </div>
                </Card>




                {showDelete && (<DeleteConfirmationModal
                    //onClickDeleteButton={onDeleteConfirm}
                    onCancel={() => setShowDelete(false)}
                    item={assetByIDData}
                ></DeleteConfirmationModal>)
                }
                {showActionMessage && (<ConfirmationModal
                    //  onClickDeleteButton={onDeleteConfirm}
                    onCancel={() => setShowDelete(false)}
                    transactionType={transactionType}
                    item={assetByIDData}
                ></ConfirmationModal>)
                }
            </div>
        </>
    );

}
