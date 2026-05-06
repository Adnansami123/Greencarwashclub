import { Badge, Button, Card, Col, Row, Select, Table, Tag } from "antd";
import { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { PPMColumns } from "../../models/ColumnsModel";
import moment from "moment";
import {
    DownloadOutlined, PlusCircleOutlined,
    FormOutlined,
    DeleteOutlined,
    BarcodeOutlined
} from '@ant-design/icons';
import { useHistory, useLocation } from "react-router-dom";
import AssetReplacementContext from "../../store/AssetReplacement/assetreplacement-context";
import { filterBasedOnFrequency, getSurveyType, onlyDate } from "../../utils";
import { AuthContext } from "../../components";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import PPMReportPdfDocument from "../../utils/PPMReport/PPMReport";
import PPMPlannerReportDownloadModal from "../Reports/PPMPlannerReportDownloadModal";
import { PDFDownloadicon } from "../../utils/icons";

export default function ScheduledSurveyList({
    item = {},
    onCancel,
    isModalClosable = true,
    isModalOpen = true,

}) {
    const cartCtx = useContext(AssetReplacementContext);
    const history = useHistory();
    const authCtx = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageSize, setCurrentPageSize] = useState(10);
    const [getfetchPPMFrequencyScheduledData, setgetfetchPPMFrequencyScheduledData] = useState([]);
    const [getFetchDataContractAssets, setgetFetchDataContractAssets] = useState([]);
    const [getContractFrequencyData, setgetContractFrequencyData] = useState([]);

    const location = useLocation();


    const columns = [
        {
            title: "Sl. No.",
            render: (_, records, index) => (
                <>
                    {/* {currentPage}
                    {index}
                    {currentPageSize} */}
                    {currentPage === 1 ? index + 1 : (currentPageSize * (currentPage - 1) + 1)}
                </>
            )
        },
        {
            title: "Asset Name",
            key: "companyName",
            render: (_, records, index) => (
                <>
                    {records.contractAssets.assetName}
                </>
            )
        },
        {
            title: "Company Name",
            key: "companyName",
            render: (_, records, index) => (
                <>
                    {records.contractAssets.companyName}
                </>
            )
        },
        {
            title: "Contract Start Date",
            dataIndex: "contractAssetCheckLists",
            key: "contractAssetCheckLists",
            render: (contractAssetCheckLists) => (
                <span>
                    {contractAssetCheckLists.map((item) => {


                        return (
                            <Tag item={item}>
                                {moment(item.startDate).format("DD-MM-YYYY")}

                            </Tag>
                        );
                    })}
                </span>
            ),
        },
        {
            title: "Contract End Date",
            dataIndex: "contractAssetCheckLists",
            key: "contractAssetCheckLists",
            render: (contractAssetCheckLists) => (
                <span>
                    {contractAssetCheckLists.map((item) => {


                        return (
                            <Tag key={item}>
                                {moment(item.endDate).format("DD-MM-YYYY")}
                                {/* {cAC.endDate} */}
                            </Tag>
                        );
                    })}
                </span>
            ),
        },
        {
            title: "PPM Frequency",
            dataIndex: "contractAssetPPMFrequencyTemplates",
            key: "contractAssetPPMFrequencyTemplates",
            render: (contractAssetPPMFrequencyTemplates) => (
                <span>
                    {contractAssetPPMFrequencyTemplates[0].frequencyName}
                    {/* {contractAssetPPMFrequencyTemplates.map((frequencyName) => {


                        return (
                            <Tag key={frequencyName}>
                                {frequencyName.frequencyName}
                            </Tag>
                        );
                    })} */}
                </span>
            ),
            // {
            //     title: "PPM Frequency",
            //     dataIndex: "companyName",
            //     key: "companyName",
            //     render: (_, records, index) => (
            //         <>
            //             {records.contractAssetPPMFrequencyTemplates[0].frequencyName}
            //         </>
            //     )
            // },
        },
        {
            title: "Survey Type",
            key: "surveyTypeXid",
            render: (_, records, index) => (
                <>
                    {getSurveyType(records.contractAssets.surveyTypeXid)}
                </>
            )
        },
        // {
        //     title: "Survey Status",
        //     dataIndex: "surveySchedules",
        //     key: "surveySchedules",
        //     render: (surveySchedules) => (
        //         <span>
        //             {surveySchedules.map((item) => {

        //                 return (
        //                     <div key={item}>
        //                         <Tag>
        //                             {moment(item.surveyStartDate).format("DD-MM-YYYY")}
        //                         </Tag>
        //                         {item.status === "Done" ?
        //                             <Tag color={item.status === false ? moment(item.surveyStartDate) <= new Date() ? "#f50" : "#108ee9" : "#108ee9"}>
        //                                 {item.status === "Done" ? "Completed" : moment(item.surveyStartDate) <= new Date() ? 'Over Due' : "Pending"}
        //                             </Tag>
        //                             : null}
        //                         {item.status !== "Done" ?
        //                             <Tag color={item.status !== "Done" ? moment(item.surveyStartDate) <= new Date() ? "red" : "#108ee9" : "#108ee9"}>
        //                                 {item.status === "Done" ? "Completed" : moment(item.surveyStartDate) <= new Date() ? 'Over Due' : "Pending"}
        //                             </Tag>
        //                             : null}
        //                         {authCtx.usertype !== "client" && (
        //                             <Tag>

        //                                 <Button disabled={item.status === "Done"} icon={<FormOutlined />} onClick={() => onClickContractAssetEdit({ key: item?.ppmFrequencySurveySchedulePid, contractRefeNo: item?.ppmFrequencySurveySchedulePid })}>Start </Button>
        //                             </Tag>
        //                         )}

        //                         {item.status === "Done" && authCtx.usertype === "client" ?
        //                             // <Tag>
        //                             //     <PDFDownloadLink

        //                             //         document={<PPMReportPdfDocument invoicedata={getfetchPPMFrequencyScheduledData?.length > 0 ? filterBasedOnFrequency({ data: getfetchPPMFrequencyScheduledData, ppmFrequencySurveySchedulePid: item?.ppmFrequencySurveySchedulePid }) : null} />}
        //                             //         fileName={"PPM-Service-Report.pdf"}
        //                             //     >
        //                             //         {({ blob, url, loading, error }) =>
        //                             //             loading ? "Loading..." : "Export to PDF PPM Planner"
        //                             //         }
        //                             //     </PDFDownloadLink>
        //                             // </Tag>
        //                             <>


        //                                 <Tag>

        //                                     <Button disabled={item.status === "Done"} icon={<FormOutlined />} onClick={() => onClickContractAssetEdit({ key: item?.ppmFrequencySurveySchedulePid, contractRefeNo: item?.ppmFrequencySurveySchedulePid })}>Start </Button>
        //                                 </Tag>
        //                                 <Tag>
        //                                     <Button onClick={() => onClickContractSheduletDownload({ ppmFrequencySurveySchedulePidPass: item?.ppmFrequencySurveySchedulePid })}>Download Report</Button>
        //                                 </Tag>
        //                             </>

        //                             : null}
        //                     </div>
        //                 );
        //             })}
        //         </span>
        //     ),
        // },

    ]
    useEffect(() => {
        if (!!item === false) return;
        setgetfetchPPMFrequencyScheduledData(item);

    }, [item])

    // this is start....
    const onClickContractAssetEdit = (key) => {
        //  cartCtx.removeItem();
        cartCtx.clearCart(); //in signle methiod clearing asset and check list itme as well...
        //  cartCtx.removeassetsurveyitem();
        //  cartCtx.removechecklistitem();
        history.replace("/SurveyProcess", {
            ppmFrequencySurveySchedulePid: key.key,
            // ContractRefNo: key.contractRefeNo          
            ContractRefNo: location.state?.ContractRefNo,
            reProcess: false ///  this is first time process start....
        });
    }
    // this is edit and reprocess...
    const onClickContractAssetReProcess = (key) => {
        //  cartCtx.removeItem();
        cartCtx.clearCart(); //in signle methiod clearing asset and check list itme as well...
        //  cartCtx.removeassetsurveyitem();
        //  cartCtx.removechecklistitem();
        history.replace("/SurveyProcessNew", {
            ppmFrequencySurveySchedulePid: key.key,
            // ContractRefNo: key.contractRefeNo          
            ContractRefNo: location.state?.ContractRefNo,
            reProcess: true // this is re-process....
        });
    }

    const [preview, setPreview] = useState(false);
    const [ppmFrequencySurveySchedulePid, setppmFrequencySurveySchedulePid] = useState();
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const onClickContractSheduletDownload = ({ key, ppmFrequencySurveySchedulePidPass }) => {
        setppmFrequencySurveySchedulePid(ppmFrequencySurveySchedulePidPass);
        setShowDownloadModal(true);
        // generatePdfDocument(filterBasedOnFrequency({ data: getfetchPPMFrequencyScheduledData, ppmFrequencySurveySchedulePid: item?.ppmFrequencySurveySchedulePid }), "newfile.pdf");
    }

    const onChangePageChange = (e) => {
        setCurrentPage(e.current);
        setCurrentPageSize(e.pageSize);

    }

    const expandedRowRender = (rowIndex, rowIndexValue) => {
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
                title: "Sruvey Start Date",
                render: (_, records, index) => (
                    <>
                        {onlyDate(records.surveyStartDate)}
                    </>
                ),
            },
            {
                title: "Is Edited?",
                render: (_, records, index) => (
                    <>
                        {records?.isEdited === true ? <Badge status="success" text="Yes" /> : <Badge status="error" text="No" />}
                    </>
                ),
            },
            {
                title: "Revised Sruvey Start Date",
                render: (_, records, index) => (
                    <>
                        {records?.isEdited === true ?
                            onlyDate(records?.revisedStartDate) : null}
                    </>
                ),
            },
            {
                title: "Revised Reason/Remarks",
                render: (_, records, index) => (
                    <>
                        {records?.isEdited === true ?
                            records?.reason : null}
                    </>
                ),
            },
            {
                title: "Survey Status",
                render: (_, item, index) => (
                    <Tag color={item.status === false ? moment(item.surveyStartDate) <= new Date() ? "#f50" : "#108ee9" : "#108ee9"}>
                        {item.status === "Done" ? "Completed" : moment(item.surveyStartDate) <= new Date() ? 'Over Due' : "Pending"}
                    </Tag>
                ),
            },
            // {
            //     title: "Edit  Action",
            //     render: (_, item, index) => (
            //         <Tag>
            //             <Button disabled={item.status === "Done"} icon={<FormOutlined />} onClick={() => onClickContractSheduletEdit({ ppmFrequencySurveySchedulePidPass: item?.ppmFrequencySurveySchedulePid, itemData: item })}></Button>
            //         </Tag>
            //     ),
            // },
            {
                title: "Action",
                render: (_, item, index) => (
                    <>
                        {authCtx.usertype.toLowerCase() !== "client" && (
                            <Tag>

                                <Button disabled={item.status === "Done"} icon={<FormOutlined />} onClick={() => onClickContractAssetEdit({ key: item?.ppmFrequencySurveySchedulePid, contractRefeNo: item?.ppmFrequencySurveySchedulePid })}>Start </Button>
                            </Tag>
                        )}
                    </>
                ),
            },
            {
                title: "Edit Action",
                render: (_, item, index) => (
                    <>
                        {authCtx.usertype.toLowerCase() !== "client" && (
                            <>
                                {
                                    item.status === "Done" ?
                                        <Tag>

                                            <Button disabled={item.status !== "Done"} icon={<FormOutlined />} onClick={() => onClickContractAssetReProcess({ key: item?.ppmFrequencySurveySchedulePid, contractRefeNo: item?.ppmFrequencySurveySchedulePid })}>Edit </Button>
                                        </Tag>
                                        : null}
                            </>
                        )}
                    </>
                ),
            },
            {
                title: "Download Survey Report",
                render: (_, item, index) => (
                    <>
                        {item.status === "Done" ?
                            <Tag>
                                {/* {item?.ppmFrequencySurveySchedulePid} */}
                                <Button onClick={() => onClickContractSheduletDownload({ ppmFrequencySurveySchedulePidPass: item?.ppmFrequencySurveySchedulePid, emergencyCallOutPid: item?.ppmFrequencySurveySchedulePid })}>{PDFDownloadicon()} PDF</Button>

                            </Tag>
                            : null}
                    </>
                ),
            },

        ];

        return <Table columns={columns} dataSource={getfetchPPMFrequencyScheduledData[rowIndexValue].surveySchedules} rowKey={getfetchPPMFrequencyScheduledData[rowIndexValue].surveySchedules?.tempPid} pagination={false} />;
    };
    return (
        <>
            <div>
                <div className="tabled">
                    {preview && (
                        <div className="App">
                            <PDFViewer width={800} height={500} showToolbar={false}>
                                <PPMReportPdfDocument invoicedata={getfetchPPMFrequencyScheduledData?.length > 0 ? getfetchPPMFrequencyScheduledData[0] : null} />
                            </PDFViewer>
                        </div>
                    )}
                    <Row gutter={[24, 0]}>
                        <Col xs="24" xl={24}>
                            <Card
                                bordered={false}
                                className="criclebox tablespace mb-24"
                                title="PPM Scheduled Survey"
                                extra={<></>

                                }
                            >
                                <div className="table-responsive">
                                    <Table
                                        expandable={{
                                            expandedRowRender,
                                        }}
                                        columns={columns}
                                        dataSource={getfetchPPMFrequencyScheduledData?.length > 0 ? getfetchPPMFrequencyScheduledData : null}
                                        // pagination={false}
                                        className="ant-border-space"
                                        onChange={((e) => onChangePageChange(e))}
                                        currentPage={currentPage}
                                    />
                                </div>
                            </Card>


                        </Col>
                    </Row>
                </div>

            </div>
            {showDownloadModal === true ? <PPMPlannerReportDownloadModal
                onCancel={() => {
                    setShowDownloadModal(false);

                }}
                ppmFrequencySurveySchedulePid={ppmFrequencySurveySchedulePid}
                contractAssetCheckListXid={"0"}>

            </PPMPlannerReportDownloadModal> : null}
        </>
    )
}

ScheduledSurveyList.propTypes = {
    item: PropTypes.object,
    onCancel: PropTypes.func,
    isModalClosable: PropTypes.bool,
    isModalOpen: PropTypes.bool,
    onSuccess: PropTypes.func,
    onUpdated: PropTypes.func,

}