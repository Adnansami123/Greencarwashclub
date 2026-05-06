

import { Pagination } from "antd";
import { useDeleteAssetCategoryMutation, useDeleteCheckListItemCategoryMutation, useGetAssetCategoryByIDMutation, useGetAssetCategoryMutation, useGetCheckListItemCategoryByIDMutation } from "../../store/ConfigurationAPI/ConfigurationAPI";
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
    useEffect,
    DeleteConfirmationModal,
    ConfirmationModal,
    AuthContext,
} from "../index";
import {
    DownloadOutlined, PlusCircleOutlined,
    FormOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { useContext } from "react";
import { DateWithTimeStamp } from "../../utils";
import { useGetDirectOrReferralMembersMutation, useGetUserIncomeMutation } from "../../store/ConfigurationAPI/ConfigurationMLM";
import UsersReport from "../../common/Reports/UsersReport";

export default function MyDirectMembers(props) {


    const { Title } = "Assets";
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageSize, setCurrentPageSize] = useState(10);
    const authCtx = useContext(AuthContext);
    const [project, setProject] = useState({});
    const [data, setData] = useState([]);
    const [assetByIDData, setAssetByIDData] = useState([]);
    const [showActionMessage, setshowActionMessage] = useState(false);
    const [transactionType, setTransactionType] = useState("");
    const [dataproject, setDataProject] = useState({});

    const [
        fetch,
        {
            data: getFetchData,
            isSuccess: isFetchDataSuccess,
        },
    ] = useGetDirectOrReferralMembersMutation();

    useEffect(() => {
        if (showActionMessage) {
            setTimeout(function () {

                setshowActionMessage(false);
                fetch({
                    id: authCtx.clientID,
                });
            }, 2000);

        }

    }, [showActionMessage])

    useEffect(() => {
        if (showActionMessage) {
            setTimeout(function () {

                setshowActionMessage(false);
                fetch({
                    id: authCtx.clientID,
                });
            }, 2000);

        }

    }, [showActionMessage])

    const [
        fetchByID,
        {
            data: getByIDData,
            isSuccess: isGetByIDSuccess,
        },
    ] = useGetAssetCategoryByIDMutation();
    const [
        deleteByID,
        {
            data: deletByIDData,
            isSuccess: isDeleteByIDSuccess,
        },
    ] = useDeleteAssetCategoryMutation();

    useEffect(() => {
        if (isDeleteByIDSuccess && deletByIDData?.statusCode == 500) {

            setTransactionType("error");
            setshowActionMessage(true);
        }
        else if (isDeleteByIDSuccess) {

            setTransactionType("deleted");
            setshowActionMessage(true);
        }

    }, [isDeleteByIDSuccess])

    useEffect(() => {
        if (!!getByIDData) {

            setAddAssetFlag(true);
            setAssetByIDData(getByIDData);
        }

    }, [getByIDData])

    useEffect(() => {
        if (getFetchData?.length > 0) {
            console.log("onChangePageChange", getFetchData);
            setData(getFetchData);
        }

    }, [getFetchData]);

    useEffect(
        function Assets() {
            fetch({
                id: authCtx.clientID,
            });

        }, [fetch]);



    const [deleteID, setDeleteID] = useState();
    const onDeleteConfirm = async () => {

        deleteByID({
            id: deleteID,
        });
        setShowDelete(false);
    }
    const onClickDelete = (e) => {
        //alert(JSON.stringify(e));
        setShowDelete(true);
        setDeleteID(e.key);
        // deleteAssetByID({
        //     id: e.key,
        // });
    }

    const onClickEdit = (e) => {

        fetchByID({
            id: e.key,
        });

    }

    const [filteredInfo, setFilteredInfo] = useState({});
    const [sortedInfo, setSortedInfo] = useState({});


    const onChangePageChange = (e, pagination, filters, sorter) => {
        setCurrentPage(pagination.current);
        setCurrentPageSize(pagination.pageSize);
        setFilteredInfo(filters);
        setSortedInfo(sorter);
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
            ),

        },
        {
            title: "Side",
            dataIndex: "side",
            key: "side",
        },
        {
            title: "DOJ",
            key: "doj",
            dataIndex: "doj",
            render: (_, records, index) => (
                <>
                    {DateWithTimeStamp(records?.doj)}
                </>
            ),
            sorter: (a, b) => a.doj.localeCompare(b.doj),
        },


        {
            title: "Created On",
            key: "createdOn",
            dataIndex: "createdOn",
            render: (_, records, index) => (
                <>
                    {DateWithTimeStamp(records?.createdOn)}
                </>
            ),
            sorter: (a, b) => a.createdOn.localeCompare(b.createdOn),
        },


    ];

    const [addAssetFlag, setAddAssetFlag] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const onClickAdd = () => {
        setAssetByIDData({});
        setAddAssetFlag(true);
    }


    return (
        <>
            <div className="tabled">
                <Row gutter={[24, 0]}>
                    <Col xs="24" xl={24}>
                     
                                <Card bordered={false}

                                    className="criclebox tablespace mb-24"
                                    title="MY REFERRAL MEMBER">

                                    <UsersReport item={!!data ? data : null}></UsersReport>


                                </Card>
                           

                    </Col>
                </Row>

            </div>
        </>
    );

}
