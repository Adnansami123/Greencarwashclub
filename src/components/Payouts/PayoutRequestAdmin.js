import {
  useHistory,
  useLocation,
} from "react-router-dom/cjs/react-router-dom.min";
import { useCompany_GetCompanySetupByIDMutation } from "../../store/ConfigurationAPI/ConfigurationAPI";
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
  useAddCommonCompanyMutation,
  useGetCompaniesMutation,
  useGetCompanyByIDMutation,
  usePutCompanyMutation,
  ConfirmationModal,
  DeleteConfirmationModal,
  AuthContext,
} from "../index";
import {
  DownloadOutlined,
  PlusCircleOutlined,
  FormOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import Strings from "../../utils/Strings";
import { setLoadingModalConfiguration } from "../../store/Slices/ModalLoaderSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetAllPayoutBySuperAdminMutation,
  useGetPayoutRequestMutation,
  usePutPayoutApproveByIDMutation,
} from "../../store/PayoutAPI/PayoutRequestAPI";
import { useContext } from "react";

export default function PayoutRequestAdmin(props) {
  const authCtx = useContext(AuthContext);

  const history = useHistory();

  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [confirmationMessage, setConfirmationMessage] = useState();
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [project, setProject] = useState({});
  const [data, setData] = useState([]);
  const [assetByIDData, setAssetByIDData] = useState([]);
  const [showActionMessage, setshowActionMessage] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const [dataproject, setDataProject] = useState({});

  const initialStates = {
    ViewTitle: "",
    AddButton: "",
    AddTitle: "",
    EditTitle: "",
    formURLView: "",
    formURLAdd: "",
    formURLEdit: "",
  };

  const [initialState, setInitialState] = useState(initialStates);
  const [states, setStates] = useState(initialStates);

  const location = useLocation();
  const URLPathName = useLocation().pathname.replace("/", "");

  const [fetch, { data: getFetchData, isSuccess: isFetchDataSuccess }] =
    useGetAllPayoutBySuperAdminMutation();

  useEffect(() => {
    if (showActionMessage) {
      setTimeout(function () {
        setshowActionMessage(false);
        dispatch(setLoadingModalConfiguration({ isVisible: true }));
        fetch({
          id: authCtx.clientID, // this is from state...
        });
      }, 2000);
    }
  }, [showActionMessage]);

  useEffect(() => {
    if (getFetchData?.length > 0) {
      dispatch(setLoadingModalConfiguration({ isVisible: false }));
      setData(getFetchData);
    } else {
      dispatch(setLoadingModalConfiguration({ isVisible: false }));
    }
  }, [getFetchData]);

  useEffect(
    function Assets() {
      dispatch(setLoadingModalConfiguration({ isVisible: true }));
      fetch({
        id: authCtx.clientID,
      });
    },
    [fetch]
  );

  const [deleteID, setDeleteID] = useState();

  const [
    payoutApproveByID,
    { data: deletByIDData, isSuccess: isDeleteByIDSuccess },
  ] = usePutPayoutApproveByIDMutation();

  useEffect(() => {
    if (isDeleteByIDSuccess && deletByIDData?.statusCode == 500) {
      setTransactionType("error");
      setshowActionMessage(true);
    } else if (isDeleteByIDSuccess) {
      setTransactionType("approved");
      setshowActionMessage(true);
    }
  }, [isDeleteByIDSuccess]);

  const onDeleteConfirm = async () => {
    setShowDelete(false);
    // deleteByID({
    //     id: deleteID,
    // });
    let PutData = {
      Pid: deleteID,
      UserXid: 0,
      LastEditByXid: authCtx.clientID,
    };
    payoutApproveByID({ data: PutData });
  };
  const onClickDelete = (e) => {
    //alert(JSON.stringify(e));
    setShowDelete(true);
    setDeleteID(e.key);
    // deleteAssetByID({
    //     id: e.key,
    // });
  };

  const onClickEdit = (e) => {
    setConfirmationMessage("Are you sure want to approve the Payout REquest?");
    setShowDelete(true);
    setDeleteID(e.key);

    // history.push("EditCompanyOffice", {
    //     Pid: e.key
    // });
  };

  const onClickNext = () => {
    history.push("CompanyTeam");
  };
  const columns = [
    {
      title: "Sl. No.",
      render: (_, records, index) => (
        <>
          {currentPage === 1
            ? index + 1
            : currentPageSize * (currentPage - 1) + index + 1}
        </>
      ),
    },
    {
      title: "Action",
      key: "edit",
      render: (_, records, index) => (
        <>
          {records.statusXid == 1 ? (
            <>
              <Button
                icon={<FormOutlined />}
                onClick={() => onClickEdit({ key: records.pid })}
              >
                Approve
              </Button>

              <Button
                icon={<DeleteOutlined />}
                onClick={() => onClickDelete({ key: records.pid })}
              >
                Reject
              </Button>
            </>
          ) : (
            <></>
          )}
        </>
      ),
    },
    {
      title: "Payout Amount",
      dataIndex: "payoutAmount",
      key: "payoutAmount",
    },
    {
      title: "Payout Request Date",
      dataIndex: "payoutRequestDate",
      key: "payoutRequestDate",
    },
    {
      title: "Payout Request Date",
      dataIndex: "userRemarks",
      key: "userRemarks",
    },

    {
      title: "Status",
      dataIndex: "statusXid",
      key: "statusXid",
    },
    {
      title: "Created On",
      key: "createdOn",
      dataIndex: "createdOn",
    },
  ];

  const [addAssetFlag, setAddAssetFlag] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  console.log(addAssetFlag);
  const onClickAdd = () => {
    history.push("AddPayoutRequest");
    // setAssetByIDData({});
    // setAddAssetFlag(true);
  };

  const onChangePageChange = (e) => {
    setCurrentPage(e.current);
    setCurrentPageSize(e.pageSize);
  };

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Payout Request"
            >
              <div className="table-responsive">
                <Table
                  columns={columns}
                  dataSource={!!data ? data : null}
                  // pagination={false}
                  className="ant-border-space"
                  rowKey={(record) => record.pid}
                  onChange={(e) => onChangePageChange(e)}
                  currentPage={currentPage}
                />
              </div>
            </Card>
          </Col>
        </Row>

        {showDelete && (
          <DeleteConfirmationModal
            onClickDeleteButton={onDeleteConfirm}
            confirmationMessage={confirmationMessage}
            onCancel={() => setShowDelete(false)}
            item={assetByIDData}
          ></DeleteConfirmationModal>
        )}
        {showActionMessage && (
          <ConfirmationModal
            onClickDeleteButton={onDeleteConfirm}
            onCancel={() => setShowDelete(false)}
            transactionType={transactionType}
            item={assetByIDData}
          ></ConfirmationModal>
        )}
      </div>
    </>
  );
}
