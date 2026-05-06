import {
    Button,
    Input,
    Upload,
    message,
    Col,
    Row,
    Select,
    Card,
    Form,
    DatePicker,
    theme,
    Table,
} from "antd";

import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { useCallback, useContext, useEffect, useState } from "react";
import { string } from "yup";
import { UploadOutlined } from '@ant-design/icons';
import AuthContext from "../../store/authentication/auth-context";
import { useGetClientsMutation } from "../../store/ClientsAPI/ClientsAPI";
import { useContract_GetFilterMutation, useGetContractRenewalMutation, useGetRenewedTypesMutation, usePostContractRenewalMutation } from "../../store/ConfigurationAPI/ConfigurationAPI";
import { useGetTechnician_GetOfflineMutation } from "../../store/TechnicianAPI/TechnicianAPI";
import { setLoadingModalConfiguration } from "../../store/Slices/ModalLoaderSlice";
import { disablePreviousDates, onlyDate } from "../../utils";

export default function RenewalAndHistory({
    item = {},
    contractItems = [],
    onCancel,
    isModalClosable = true,
    isModalOpen = true,
    onSuccess,
    onSuccessContract,
    onRemove,
    onUpdated,
    maxCount = 1,
    heading = "Upload Asset Image",
    accept = ".jpg, .png",
    fileList = [],
    hideUploadButton = false,
    showRemoveIcon = true,

}) {
    const { token } = theme.useToken();
    const formStyle = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
    };
    const authCtx = useContext(AuthContext);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageSize, setCurrentPageSize] = useState(10);

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
            ),

        },

        {
            title: "Renewal Type",
            dataIndex: "renewedTypeXid",
            key: "renewedTypeXid",
            render: (_, records, index) => (
                <>
                    {records.renewedTypes.nameEng}
                </>
            ),
            sorter: (a, b) => a.renewedTypeXid.localeCompare(b.renewedTypeXid),
        },
        {
            title: "Previous Contract Start Date",
            dataIndex: "renewalStartDate",
            key: "renewalStartDate",
            //  sorter: (a, b) => a.nameEng - b.nameEng,
            sorter: (a, b) => a.nameEng.localeCompare(b.nameEng),
            // sortOrder: sortedInfo.columnKey === 'nameEng' ? sortedInfo.order : null,
            // ellipsis: true,
        },
        {
            title: "Previous Contract End Date",
            dataIndex: "renewalEndData",
            key: "renewalEndData",
            //  sorter: (a, b) => a.nameEng - b.nameEng,
            sorter: (a, b) => a.nameEng.localeCompare(b.nameEng),
            // sortOrder: sortedInfo.columnKey === 'nameEng' ? sortedInfo.order : null,
            // ellipsis: true,
        },
        {
            title: "Remarks",
            dataIndex: "remarks",
            key: "remarks",
            //  sorter: (a, b) => a.nameEng - b.nameEng,
            sorter: (a, b) => a.nameEng.localeCompare(b.nameEng),
            // sortOrder: sortedInfo.columnKey === 'nameEng' ? sortedInfo.order : null,
            // ellipsis: true,
        },

        // {
        //     title: "Created On",
        //     key: "createdOn",
        //     dataIndex: "createdOn",
        //     sorter: (a, b) => a.createdOn.localeCompare(b.createdOn),
        // },
        // {
        //     title: "Action",
        //     key: "edit",
        //     render: (_, records, index) => (
        //         <>
        //             <Button icon={<FormOutlined />} onClick={() => onClickEdit({ key: records.pid })}></Button>
        //             <Button icon={<DeleteOutlined />} onClick={() => onClickDelete({ key: records.pid })}></Button>
        //         </>
        //     )

        // },

    ];


    const [
        fetchRenewedTypes,
        {
            data: getRenewedTypesData,
            isSuccess: isRenewedTypesSuccess,
        },
    ] = useGetRenewedTypesMutation();


    useEffect(
        function RenewedTypes() {
            // dispatch(setLoadingModalConfiguration({ isVisible: true }));
            fetchRenewedTypes();

        }, [fetchRenewedTypes]);
    const [
        GetContractRenewal,
        {
            data: getGetContractRenewalData,
            isSuccess: isGetContractRenewalSuccess,
        },
    ] = useGetContractRenewalMutation();

    useEffect(() => {
        if (!!getGetContractRenewalData) {
            console.log("getGetContractRenewalData", getGetContractRenewalData);
        }
    }, [getGetContractRenewalData])
    console.log("itemitem", item);
    useEffect(() => {
        if (!!item) {
            GetContractRenewal({ id: item.pid })
        }
    }, [item])

    const [
        PostContractRenewal,
        {
            data: getPostContractRenewalData,
            isSuccess: isAPostContractRenewalSuccess,
        },
    ] = usePostContractRenewalMutation();

    useEffect(() => {
        if (getPostContractRenewalData?.statusCode === 200) {
            dispatch(setLoadingModalConfiguration({ isVisible: false }));
        }
        else if (!!getPostContractRenewalData && getPostContractRenewalData?.statusCode !== 200) {
            dispatch(setLoadingModalConfiguration({ isVisible: false }));
            alert(getPostContractRenewalData.message);
        }
    }, [getPostContractRenewalData])

    const onFinishContractRenewal = (values) => {
        dispatch(setLoadingModalConfiguration({ isVisible: true }));

        const commonCompany = {
            Contract: {
                contractXid: item?.pid,               
                RenewalEndDate: form.getFieldValue("contractStartDate"),
                lastEditByXid: authCtx.clientID,
            },

            //in the hsitory updateing the previous contract start and end date....
            ContractRenwal: {
                contractXid: item?.pid,
                renewalStartDate: item?.startDate,
                renewalEndData:  item?.endDate,
                renewedTypeXid: form.getFieldValue("typeOfContract"),
                remarks: form.getFieldValue("remarks"),
                lastEditByXid: authCtx.clientID,
            },


        }

        PostContractRenewal({ data: commonCompany });

        // ({ data: data });
    }
    return (
        <>
            <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="Renewal"

            >
                <div>
                    <div>Client Ref. No.</div><div>  {item?.client?.prefix + '-' + item?.client?.clientPrefix + '-' + item?.client?.clientReferenceNumber}</div>
                    <div>Contract Ref. No.</div><div>{item?.prefix + "-" + item?.contractPrefix + "-" + item?.refNo}</div>
                    <div>Contract Start Date</div><div>{onlyDate(item?.startDate)}</div>
                    <div>Contract End Date</div><div>{onlyDate(item?.endDate)}</div>
                </div>
                <div className="table-responsive">
                    {/* <CustomTable item={!!getfetchPPMFrequencyScheduledData ? getfetchPPMFrequencyScheduledData : null}></CustomTable> */}

                    <Form form={form} style={formStyle}
                        onFinish={onFinishContractRenewal}
                        // onFinishFailed={onFinishFailedAddContract}
                        layout="vertical"
                        // layout="inline"
                        name="control-hooks"

                    >
                        <Row>
                            <Col span={8}>
                                <Form.Item
                                    className="datepicker"
                                    label="Contract Renewal End Date"
                                    name="contractStartDate"
                                    key="contractStartDate"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter the Contract Renewal End Date!",
                                        },
                                    ]}
                                >
                                    <DatePicker
                                        placeholder="Contract Renewal End Date"
                                        disabledDate={(e) => disablePreviousDates(item?.endDate, e)}
                                    />

                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    className="username"
                                    label="Type of Renewal"
                                    name="typeOfContract"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please select the Tyoe Of Renewal!",
                                        },
                                    ]}
                                >
                                    <Select placeholder="Type Of Contract">
                                        {getRenewedTypesData?.map((a) =>
                                        (
                                            <option key={a.pid} value={a.pid}>{a.nameEng}</option>
                                        ))}
                                    </Select>

                                </Form.Item>
                            </Col>
                            <Col span={8}>

                                <Form.Item
                                    className="username"
                                    label="Remarks"
                                    name="remarks"                            
                                >
                                    <Input placeholder="Remarks" />

                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col
                                span={24}
                                style={{
                                    textAlign: 'right',
                                }}
                            >

                                <Button
                                    type="primary"
                                    htmlType="submit"

                                >
                                    {"Renew Contract"}
                                </Button>
                                <Button
                                    // disabled={!!getFetchContractByIDData?.pid}
                                    htmlType="button"
                                //  onClick={onClickReset}

                                >
                                    Reset
                                </Button>

                            </Col>
                        </Row>
                    </Form>

                </div>
            </Card>
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24}>



                </Col>
            </Row>
            <Row gutter={[24, 0]}>
                <Col xs="24" xl={24}>
                    <Card
                        bordered={false}
                        className="criclebox tablespace mb-24"
                        title="Renewal History"

                    >

                        <div className="table-responsive">
                            <Table
                                columns={columns}
                                dataSource={!!getGetContractRenewalData && getGetContractRenewalData.length > 0 ? getGetContractRenewalData : null}
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
        </>
    );
}

RenewalAndHistory.propTypes = {
    item: PropTypes.object,
    contractItems: PropTypes.object,
    onCancel: PropTypes.func,
    isModalClosable: PropTypes.bool,
    isModalOpen: PropTypes.bool,
    onSuccess: PropTypes.func,
    onSuccessContract: PropTypes.func,
    onRemove: PropTypes.func,
    onUpdated: PropTypes.func,
    maxCount: PropTypes.number,

}