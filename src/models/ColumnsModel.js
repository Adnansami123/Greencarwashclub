import {
    Modal, Form, Button,
    Input, Tabs, Select, DatePicker, Row, Col, Card, Table, Tag, Space
} from "antd";
import {
    DownloadOutlined, PlusCircleOutlined,
    FormOutlined,
    DeleteOutlined,
    BarcodeOutlined
} from '@ant-design/icons';
import moment from "moment";
import { usePostBarCodeMutation } from "../store/ConfigurationAPI/ConfigurationAPI";
import { getSurveyType, getTotalCountByActivity } from "../utils";
import { useHistory } from "react-router-dom";


const onClickContractAssetDelete = () => {

}
const onClickDeleteCheckListByID = (key) => {
    console.log("key", key);
    //fetchContractByID({ codeToGenerate: key })
}

// const [
//     fetchContractByID,
//     {
//         data: getFetchContractByIDData,
//         isSuccess: isFetchContractByIDDataSuccess,
//     },
// ] = usePostBarCodeMutation();

export const AssetsRegistrationColumns =
{
    // columns: [
    //     {
    //         title: "Asset Name",
    //         key: "companyName",
    //         render: (_, records, index) => (
    //             <>
    //                 {records.contractAssets.assetName}
    //             </>
    //         )
    //     },
    //     {
    //         title: "Download Barcode",
    //         render: (_, records, index) => (
    //             <>
    //             <Space size="middle">
    //                 <Button icon={<BarcodeOutlined />} onClick={() => onClickDeleteCheckListByID({ key: records.contractAssets.assetXid })}></Button>
    //             </Space></>
    //         ),
    //     },
    //     {
    //         title: "Company Name",
    //         key: "companyName",
    //         render: (_, records, index) => (
    //             <>
    //                 {records.contractAssets.companyName}
    //             </>
    //         )
    //     },
    //     {
    //         title: "Contract Start Date",
    //         dataIndex: "contractAssetCheckLists",
    //         key: "contractAssetCheckLists",
    //         render: (contractAssetCheckLists) => (
    //             <span>
    //                 {contractAssetCheckLists.map((cAC) => {


    //                     return (
    //                         <Tag key={cAC}>
    //                             {cAC.startDate}
    //                         </Tag>
    //                     );
    //                 })}
    //             </span>
    //         ),
    //         // render: (_, records, index) => (
    //         //     <>
    //         //         {records.contractAssetCheckLists[0].startDate}
    //         //     </>
    //         // )
    //     },
    //     {
    //         title: "Contract End Date",
    //         dataIndex: "contractAssetCheckLists",
    //         key: "contractAssetCheckLists",
    //         render: (contractAssetCheckLists) => (
    //             <span>
    //                 {contractAssetCheckLists.map((cAC) => {


    //                     return (
    //                         <Tag key={cAC}>
    //                             {cAC.endDate}
    //                         </Tag>
    //                     );
    //                 })}
    //             </span>
    //         ),

    //         // render: (_, records, index) => (
    //         //     <>
    //         //         {records.contractAssetCheckLists[0].endDate}
    //         //     </>
    //         // )
    //     },
    //     {
    //     title: "PPM Frequency",
    //     dataIndex: "contractAssetPPMFrequencyTemplates",
    //     key: "contractAssetPPMFrequencyTemplates",
    //     render: (contractAssetPPMFrequencyTemplates) => (
    //         <span>
    //             {contractAssetPPMFrequencyTemplates.map((frequencyName) => {


    //                 return (
    //                     <Tag key={frequencyName}>
    //                         {frequencyName.frequencyName}
    //                     </Tag>
    //                 );
    //             })}
    //         </span>
    //     ),


    //     },

    // ],


}
export const PPMColumns =
{
    columns: [
        {
            title: "Sl. No.",
            render: (_, records, index) => (
                <>
                    {index + 1}
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
        //     title: "Survey Start Date",
        //     dataIndex: "surveySchedules",
        //     key: "surveySchedules",
        //     render: (surveySchedules) => (
        //         <span>
        //             {surveySchedules.map((item) => {


        //                 return (
        //                     <div key={item}>
        //                         {moment(item.surveyStartDate).format("DD-MM-YYYY")}
        //                     </div>
        //                 );
        //             })}
        //         </span>
        //     ),

        //     // render: (_, records, index) => (
        //     //     <>
        //     //         {records.surveySchedules[0].surveyStartDate}
        //     //     </>
        //     // )
        // },
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
        //                         <Tag color={item.status === false ? moment(item.surveyStartDate) <= new Date() ? "#f50" : "#108ee9" : "#108ee9"}>
        //                             {item.status === false ? moment(item.surveyStartDate) <= new Date() ? 'Over Due' : "Pending" : "Completed"}
        //                         </Tag>
        //                         <Tag>
        //                             <Button icon={<FormOutlined />} onClick={() => onClickContractAssetEdit({ key: item?.pid })}>Start</Button>
        //                         </Tag>
        //                     </div>
        //                 );
        //             })}
        //         </span>
        //     ),
        //     // render: (_, records, index) => (
        //     //     <>
        //     //         {records.surveySchedules[0].surveyStartDate}
        //     //     </>
        //     // )
        // },


    ],


}

export const TechPPMColumns =
{
    columns: [
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
        },

        {

            title: "PPM Scheule Count",
            dataIndex: "surveySchedules",
            key: "surveySchedules",
            render: (surveySchedules) => (
                <span>
                    {<div key={"1"}>
                        <div>
                            <div>
                                <Tag>
                                    Total PPM
                                </Tag>
                                <Tag>{getTotalCountByActivity({ items: surveySchedules, type: 1 })}</Tag>
                            </div>
                            <div>
                                <Tag>
                                    Total Scheduled
                                </Tag>
                                <Tag>{getTotalCountByActivity({ items: surveySchedules, type: 1 })}</Tag>
                            </div>
                            <div>
                                <Tag>
                                    Total Overdue
                                </Tag>
                                <Tag>{getTotalCountByActivity({ items: surveySchedules, type: 1 })}</Tag>
                            </div>
                        </div>


                    </div>
                    }

                </span>
            ),
        },
        {
            title: "Conditional Survey count",
            dataIndex: "surveySchedules",
            key: "surveySchedules",
            render: (surveySchedules) => (
                <span>
                    {<div key={"1"}>
                        <div>
                            <div>
                                <Tag>
                                    Total Conditional Survey
                                </Tag>
                                <Tag>{getTotalCountByActivity({ items: surveySchedules, type: 1 })}</Tag>
                            </div>
                            <div>
                                <Tag>
                                    Total Scheduled
                                </Tag>
                                <Tag>{getTotalCountByActivity({ items: surveySchedules, type: 1 })}</Tag>
                            </div>
                            <div>
                                <Tag>
                                    Total Overdue
                                </Tag>
                                <Tag>{getTotalCountByActivity({ items: surveySchedules, type: 1 })}</Tag>
                            </div>
                        </div>


                    </div>
                    }

                </span>
            ),
        },
        {
            title: "Emegeny Call Out count",
            dataIndex: "surveySchedules",
            key: "surveySchedules",
            render: (surveySchedules) => (
                <span>
                    {<div key={"1"}>
                        <div>
                            <div>
                                <Tag>
                                    Total ECO
                                </Tag>
                                <Tag>{getTotalCountByActivity({ items: surveySchedules, type: 1 })}</Tag>
                            </div>
                            <div>
                                <Tag>
                                    Total Scheduled
                                </Tag>
                                <Tag>{getTotalCountByActivity({ items: surveySchedules, type: 1 })}</Tag>
                            </div>
                            <div>
                                <Tag>
                                    Total Overdue
                                </Tag>
                                <Tag>{getTotalCountByActivity({ items: surveySchedules, type: 1 })}</Tag>
                            </div>
                        </div>


                    </div>
                    }

                </span>
            ),
        },

    ],


}
