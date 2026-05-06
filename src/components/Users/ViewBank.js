import { Button, Card, Input, Table } from "antd";
import React, { Component, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useGetBankDetailsByIDMutation, useGetUseBankByIDMutation } from "../../store/ConfigurationAPI/ConfigurationMLM";
import { DateWithTimeStamp } from "../../utils";
import AuthContext from "../../store/authentication/auth-context";
import {
    DownloadOutlined, PlusCircleOutlined,
    FormOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import CompanyBranchBank from "../SignIn/CompanyBranchBank";
import ConfirmationModal from "../../DeleteModal/Confirmation";
const ViewBank = () => {

    const authCtx = useContext(AuthContext);
    const [transactionType, setTransactionType] = useState("");
    const [showActionMessage, setshowActionMessage] = useState(false);

    const [addAssetFlag, setAddAssetFlag] = useState(false);
    const [assetByIDData, setAssetByIDData] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const [deleteID, setDeleteID] = useState();
    const history = useHistory();
    const [data, setData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageSize, setCurrentPageSize] = useState(10);

    const [
        fetch,
        {
            data: getFetchData,
            isSuccess: isFetchDataSuccess,
        },
    ] = useGetUseBankByIDMutation();


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
            title: "Action",
            key: "edit",
            render: (_, records, index) => (
                <>
                    <Button icon={<FormOutlined />} onClick={() => onClickEdit({ key: records.pid })}></Button>
                </>
            )

        },
        {
            title: "Bank Name",
            dataIndex: "bankName",
            key: "bankName",
            //  sorter: (a, b) => a.nameEng - b.nameEng,
            sorter: (a, b) => a.bankName.localeCompare(b.bankName),
            // sortOrder: sortedInfo.columnKey === 'nameEng' ? sortedInfo.order : null,
            // ellipsis: true,
        },

        {
            title: "Account Number",
            key: "accountNo",
            dataIndex: "accountNo",
            sorter: (a, b) => a.createdOn.localeCompare(b.createdOn),
        },
        {
            title: "Bank UPI",
            key: "bankUPI",
            dataIndex: "bankUPI",
            sorter: (a, b) => a.createdOn.localeCompare(b.createdOn),
        },
        {
            title: "Bank Address",
            key: "bankAddress",
            dataIndex: "bankAddress",
            sorter: (a, b) => a.createdOn.localeCompare(b.createdOn),
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

    // const onChangePageChange = (e, pagination, filters, sorter) => {       
    //     setCurrentPage(pagination.current);
    //     setCurrentPageSize(pagination.pageSize);
    //     setFilteredInfo(filters);
    //     setSortedInfo(sorter);
    //     setCurrentPage(e.current);
    //     setCurrentPageSize(e.pageSize);

    // }

    const [
        fetchByID,
        {
            data: getByIDData,
            isSuccess: isGetByIDSuccess,
        },
    ] = useGetBankDetailsByIDMutation();

    useEffect(() => {
        if (!!getByIDData) {

            setAddAssetFlag(true);
            setAssetByIDData(getByIDData);
        }

    }, [getByIDData])

    const onClickEdit = (e) => {
        fetchByID({
            id: e.key,
        });
    }


    return (

        <>
            <div className="tabled">
                <div class="row">
                    <div class="col-12">
                        <Card bordered={false} title="MY Bank Details" className="criclebox ">


                          
                                    <Table
                                        columns={columns}
                                        dataSource={!!data ? data : null}
                                        //  pagination={false}
                                        pagination={{
                                            pageSize: 10,
                                        }}
                                        className="table-responsive"
                                    //onChange={(() => onChangePageChange())}
                                    // onChange={onChangePageChange}
                                    // currentPage={currentPage}
                                    />
                               

                        </Card>
                    </div>
                </div>
            </div>
            {addAssetFlag && (<CompanyBranchBank
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
            ></CompanyBranchBank>)
            }
            {showActionMessage && (<ConfirmationModal
               // onClickDeleteButton={onDeleteConfirm}
                onCancel={() => setShowDelete(false)}
                transactionType={transactionType}
                item={assetByIDData}
            ></ConfirmationModal>)
            }
        </>
    )
};

export default ViewBank