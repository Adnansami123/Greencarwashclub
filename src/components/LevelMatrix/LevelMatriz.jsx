

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
import TemplateModal from "./LevelMatrixModal";
import {
    DownloadOutlined, PlusCircleOutlined,
    FormOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { useContext } from "react";
import { DateWithTimeStamp } from "../../utils";
import { useGetLevelMatrixByIDMutation, useGetLevelMatrixMutation } from "../../store/ConfigurationAPI/ConfigurationMLM";

export default function LevelMatriz(props) {


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
    ] = useGetLevelMatrixMutation();

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
        fetchByID,
        {
            data: getByIDData,
            isSuccess: isGetByIDSuccess,
        },
    ] = useGetLevelMatrixByIDMutation();
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
                id: authCtx.companyID,
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

    const setAgeSort = () => {
        setSortedInfo({
          order: 'descend',
          columnKey: 'nameEng',
        });
      };
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
            title: "Level Name",
            dataIndex: "levelName",
            key: "levelName",
          //  sorter: (a, b) => a.nameEng - b.nameEng,
            sorter: (a, b) => a.levelName.localeCompare(b.levelName),
            // sortOrder: sortedInfo.columnKey === 'nameEng' ? sortedInfo.order : null,
            // ellipsis: true,
        },
        {
            title: "Level",
            dataIndex: "level",
            key: "level",
          //  sorter: (a, b) => a.nameEng - b.nameEng,
            sorter: (a, b) => a.level.localeCompare(b.level),
            // sortOrder: sortedInfo.columnKey === 'nameEng' ? sortedInfo.order : null,
            // ellipsis: true,
        },
        
        {
            title: "Amount",
            dataIndex: "amount",
            key: "amount",
          //  sorter: (a, b) => a.nameEng - b.nameEng,
          //  sorter: (a, b) => a.nameEng.localeCompare(b.nameEng),
            // sortOrder: sortedInfo.columnKey === 'nameEng' ? sortedInfo.order : null,
            // ellipsis: true,
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
        {
            title: "Action",
            key: "edit",
            render: (_, records, index) => (
                <>
                    <Button icon={<FormOutlined />} onClick={() => onClickEdit({ key: records.pid })}></Button>
                    <Button icon={<DeleteOutlined />} onClick={() => onClickDelete({ key: records.pid })}></Button>
                </>
            )

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
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24"
                            title="Charge and Commission"
                            extra={
                                <><Button type="Primary" icon={<PlusCircleOutlined />} onClick={onClickAdd}>
                                   Add Charge and Commission
                                </Button>
                                </>

                            }
                        >
                            <div className="table-responsive">
                                <Table
                                    columns={columns}
                                    dataSource={!!data ? data : null}
                                   //  pagination={false}
                                    pagination={{
                                        pageSize: 10,
                                      }}
                                    className="ant-border-space"
                                    //onChange={(() => onChangePageChange())}
                                    onChange={onChangePageChange}
                                    currentPage={currentPage}
                                />
                               
                            </div>
                        </Card>


                    </Col>
                </Row>
                {addAssetFlag && (<TemplateModal
                    onCancel={() => {
                        setAddAssetFlag(false);

                    }}
                    onSuccess={() => {
                        setAddAssetFlag(false);
                        setTransactionType("added");
                        setshowActionMessage(true);

                    }}
                    onUpdated={() => {
                        setAddAssetFlag(false);
                        setTransactionType("updated");
                        setshowActionMessage(true);

                    }}
                    item={assetByIDData}
                ></TemplateModal>)
                }
                {showDelete && (<DeleteConfirmationModal
                    onClickDeleteButton={onDeleteConfirm}
                    onCancel={() => setShowDelete(false)}
                    item={assetByIDData}
                ></DeleteConfirmationModal>)
                }
                {showActionMessage && (<ConfirmationModal
                    onClickDeleteButton={onDeleteConfirm}
                    onCancel={() => setShowDelete(false)}
                    transactionType={transactionType}
                    item={assetByIDData}
                ></ConfirmationModal>)
                }
            </div>
        </>
    );

}
