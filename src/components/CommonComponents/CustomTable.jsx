import {
    Modal, Form, Button,
    Input, Tabs, Select, DatePicker, Row, Col, Card, Table, theme, Tag, Space, Radio, Badge
} from "antd";
import PropTypes from "prop-types";
import moment from "moment";
import {
    DownloadOutlined, PlusCircleOutlined,
    FormOutlined,
    DeleteOutlined,
    BarcodeOutlined,
    FilePdfOutlined
} from '@ant-design/icons';
import { getSurveyType, onlyDate } from "../../utils";
import { useEffect, useState } from "react";
import { PDFDownloadicon } from "../../utils/icons";
import EditPPMFrequency from "../Contracts/EditPPMFrequency";
import PPMPlannerReportDownloadModal from "../../common/Reports/PPMPlannerReportDownloadModal";
export default function CustomTable({
    item = {},
    isPPMPlanner = false,


}) {

    const [transactionType, setTransactionType] = useState("");
    const [showActionMessage, setshowActionMessage] = useState(false);
    const [addAssetFlag, setAddAssetFlag] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [itemData, setItemData] = useState({});
    const [showDownloadModal, setShowDownloadModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageSize, setCurrentPageSize] = useState(10);
    const onClickContractSheduletEdit = ({ ppmFrequencySurveySchedulePidPass, itemData = {} }) => {
        setShowEdit(true);
        setItemData(itemData)
    }

    const [ppmFrequencySurveySchedulePid, setppmFrequencySurveySchedulePid] = useState();
    const [emergencyCalloutID, setEmergencyCalloutID] = useState();
    useEffect(() => {
        if (!!emergencyCalloutID)
            setShowDownloadModal(true);
    }, [emergencyCalloutID])
    const onClickContractSheduletDownload = ({ key, ppmFrequencySurveySchedulePidPass, pRowIndex }) => {
        setppmFrequencySurveySchedulePid(ppmFrequencySurveySchedulePidPass);
        setEmergencyCalloutID(item[pRowIndex].contractAssets.emergencyCallOutPid);
        // alert(pRowIndex);

    }

    const PPMColumnsNew =
    {
        columns: [
            {
                title: "Sl. No..",
                render: (_, records, index) => (
                    <>
                        {currentPage === 1 ? index + 1 : (currentPageSize * (currentPage - 1) + index + 1)}
                    </>
                )
            },
            {
                title: "Client Ref. No.",
                render: (_, records, index) => (
                    <>
                        {records?.contractAssets?.prefix + '-' + records?.contractAssets?.clientPrefix + '-' + records?.contractAssets?.clientReferenceNumber}
                    </>
                )
            },
            {
                title: "Contract Reference No.",
                dataIndex: "clientReferenceNumber",
                key: "clientReferenceNumber",
                render: (_, records, index) => (
                    <>
                        {records?.contractAssets?.prefix + "-" + records?.contractAssets?.contractPrefix + "-" + records?.contractAssets?.refNo}
                    </>
                )
            },
            {
                title: "Is SubContract",
                dataIndex: "isSubContract",
                key: "isSubContract",
                render: (_, records, index) => (
                    <>
                        {records?.contractAssets?.isSubContract === true ? records?.contractAssets?.prefix + "-" + records?.contractAssets?.subContractPrefix + "-" + records?.contractAssets?.subContractRefNo : "No"}
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
                title: "Contract Start & End Date",
                dataIndex: "contractAssetCheckLists",
                key: "contractAssetCheckLists",
                render: (contractAssetCheckLists) => (
                    <span>
                        {contractAssetCheckLists.map((item) => {


                            return (
                                <>
                                    <Tag item={item}>
                                        {moment(item.startDate).format("DD-MM-YYYY")}

                                    </Tag>
                                    <Tag key={item}>
                                        {moment(item.endDate).format("DD-MM-YYYY")}
                                        {/* {cAC.endDate} */}
                                    </Tag>
                                </>
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
            //     title: "Is Edited? & Survey Status",
            //     name: "surveySchedules",
            //     dataIndex: "surveySchedules",
            //     key: "surveySchedules",
            //     render: (surveySchedules) => (
            //         <span>
            //             {surveySchedules.map((item) => {

            //                 return (
            //                     <div key={item}>
            //                         <Tag>
            //                             {item.isEdited === true ? "Yes" : "No"}
            //                         </Tag>
            //                         <Tag>
            //                             {moment(item.surveyStartDate).format("DD-MM-YYYY")}

            //                         </Tag>
            //                         {item.isEdited === true ?
            //                             <Tag>
            //                                 {onlyDate(item.revisedStartDate)}
            //                             </Tag>
            //                             : null}
            //                         <Tag color={item.status === false ? moment(item.surveyStartDate) <= new Date() ? "#f50" : "#108ee9" : "#108ee9"}>
            //                             {item.status === "Done" ? "Completed" : moment(item.surveyStartDate) <= new Date() ? 'Over Due' : "Pending"}
            //                         </Tag>
            //                         <Tag>
            //                             <Button disabled={item.status === "Done"} icon={<FormOutlined />} onClick={() => onClickContractSheduletEdit({ ppmFrequencySurveySchedulePidPass: item?.ppmFrequencySurveySchedulePid, itemData: item })}></Button>
            //                         </Tag>
            //                         {item.status === "Done" ?
            //                             <Tag>
            //                                 {/* {item?.ppmFrequencySurveySchedulePid} */}
            //                                 <Button onClick={() => onClickContractSheduletDownload({ ppmFrequencySurveySchedulePidPass: item?.ppmFrequencySurveySchedulePid, emergencyCallOutPid: item?.ppmFrequencySurveySchedulePid })}>{PDFDownloadicon()} PDF</Button>

            //                             </Tag>
            //                             : null}

            //                     </div>
            //                 );
            //             })}
            //         </span>
            //     ),
            // },

        ],




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

            {
                title: "Edit  Action",
                render: (_, item, index) => (
                    <>
                        {isPPMPlanner === false ?
                            <Tag>
                                <Button disabled={item.status === "Done"} icon={<FormOutlined />} onClick={() => onClickContractSheduletEdit({ ppmFrequencySurveySchedulePidPass: item?.ppmFrequencySurveySchedulePid, itemData: item })}></Button>
                            </Tag>
                            : null}
                    </>
                ),
            },
            {
                title: "Download Survey Report",
                render: (_, item, index) => (
                    <>
                        {item.status === "Done" ?
                            <Tag>
                                {/* {JSON.stringify(item)} */}
                                <Button onClick={() => onClickContractSheduletDownload({ ppmFrequencySurveySchedulePidPass: item?.ppmFrequencySurveySchedulePid, emergencyCallOutPid: item?.ppmFrequencySurveySchedulePid, pRowIndex: rowIndexValue })}>{PDFDownloadicon()} PDF</Button>

                            </Tag>
                            : null}
                    </>
                ),
            },

        ];

        return <Table columns={columns} dataSource={item[rowIndexValue].surveySchedules} rowKey={item[rowIndexValue].surveySchedules?.tempPid} pagination={false} />;
    };

    return (
        <>

            <Table
                expandable={{
                    expandedRowRender,
                }}
                columns={PPMColumnsNew.columns}
                dataSource={!!item ? item : null}
                // pagination={false}
                rowKey={(record) => record.contractAssets.contractAssetPid}
                className="ant-border-space"
            />
            {
                showEdit && (<EditPPMFrequency
                    onCancel={() => {
                        setShowEdit(false);

                    }}
                    onSuccess={() => {
                        setAddAssetFlag(false);
                        setShowEdit(false);
                        setTransactionType("updated");
                        setshowActionMessage(true);

                    }}
                    item={itemData}
                ></EditPPMFrequency>)
            }
            {showDownloadModal === true ? <PPMPlannerReportDownloadModal
                onCancel={() => {
                    setShowDownloadModal(false);

                }}
                ppmFrequencySurveySchedulePid={ppmFrequencySurveySchedulePid}
                emergencyCallOutPid={emergencyCalloutID}
                contractAssetCheckListXid={"0"}>

            </PPMPlannerReportDownloadModal> : null}
        </>
    )
}


CustomTable.propTypes = {
    item: PropTypes.object,
    onCancel: PropTypes.func,
    isModalClosable: PropTypes.bool,
    isModalOpen: PropTypes.bool,
    onSuccess: PropTypes.func,
    onSuccessContract: PropTypes.func,
    onRemove: PropTypes.func,
    onUpdated: PropTypes.func,
    maxCount: PropTypes.number,

}