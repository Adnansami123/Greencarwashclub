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
    useBranchesMutation,
    DeleteConfirmationModal,
    ConfirmationModal
} from '../index'
import {
    DownloadOutlined, PlusCircleOutlined,
    FormOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import BranchModal from './BranchModal';
import { useDeleteAssetCategoryMutation, useGetAssetCategoryByIDMutation } from '../../store/ConfigurationAPI/ConfigurationAPI';
import { useBranchByCountryIDMutation, useBranchByIDMutation, useDeleteBranchMutation } from '../../store/BranchesAPI/BranchesAPI';
import { AuthContextProvider } from '../../store/authentication/auth-context';
import { useContext } from 'react';
export default function Branches() {
    const { Title } = Typography;
    const [project, setProject] = useState({});
    const [data, setData] = useState([]);
    const [dataproject, setDataProject] = useState({});
    const [showActionMessage, setshowActionMessage] = useState(false);

    const authCtx = useContext(AuthContextProvider);
    const [transactionType, setTransactionType] = useState("");
    const [showDelete, setShowDelete] = useState(false);
    const [deleteID, setDeleteID] = useState();

    const onClickDelete = (e) => {
        setShowDelete(true);
        setDeleteID(e.key);

    }
    const [
        deleteByID,
        {
            data: deletByIDData,
            isSuccess: isDeleteByIDSuccess,
        },
    ] = useDeleteBranchMutation();

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
        if (showActionMessage) {
            setTimeout(function () {

                setshowActionMessage(false);
                fetchBranches({
                    id: "1",
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
    ] = useBranchByIDMutation();

    useEffect(() => {
        if (!!getByIDData) {

            setAddAssetFlag(true);
            setAssetByIDData(getByIDData);
        }

    }, [getByIDData])

    const onDeleteConfirm = async () => {

        deleteByID({
            id: deleteID,
        });
        setShowDelete(false);
    }
    const onClickEdit = (e) => {

        fetchByID({
            id: e.key,
        });

    }
    const [
        fetchBranches,
        {
            data: getBranchesData,
            isSuccess: isBrachesSuccess,
        },
    ] = useBranchesMutation();


    useEffect(() => {
        if (getBranchesData?.length > 0) {
            setData(getBranchesData);
        }

    }, [getBranchesData]);

    useEffect(
        function Fetch() {

            fetchBranches({

                id: "1",
            });

        }, [fetchBranches]);

    const columns = [
        {
            title: "Sl. No.",
            render: (_, records, index) => (
                <>
                    {index + 1}
                </>
            )

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
        {
            title: "Country Name",
            dataIndex: "nameEng",
            key: "nameEng",
            render: (_, records, index) => (
                <div class="text-wrap">
                    {records.countries.nameEng}
                </div>
            )
        },
        {
            title: "Country City",
            dataIndex: "nameEng",
            key: "nameEng",
        },
        {
            title: "lat",
            dataIndex: "lat",
            key: "lat",
        },
        {
            title: "Long",
            dataIndex: "long",
            key: "long",
        },
        {
            title: "Is Port",
            render: (_, records, index) => (
                <>
                    {records.isPort == true ? "True" : "False"}
                </>
            ),
        },

    ];

    const [assetByIDData, setAssetByIDData] = useState([]);
    const [addAssetFlag, setAddAssetFlag] = useState(false);
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
                            title="Branches / Cities"
                            extra={
                                <><Button type="Primary" icon={<PlusCircleOutlined />} onClick={onClickAdd}>
                                    Add Branch / Cities
                                </Button>
                                </>

                            }>
                            <div className="table-responsive">
                                <Table
                                    columns={columns}
                                    dataSource={!!data ? data : null}
                                    // pagination={false}
                                    className="ant-border-space"
                                />
                            </div>
                        </Card>


                    </Col>
                </Row>
                {addAssetFlag && (<BranchModal
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
                ></BranchModal>)
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
