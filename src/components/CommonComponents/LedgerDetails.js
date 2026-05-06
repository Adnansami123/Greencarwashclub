import {
    Modal, Form, Button,
    Input, Tabs, Select, DatePicker, Row, Col, Card, Table, theme, Tag, Space, Radio, Badge, InputNumber
} from "antd";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useGetInvoiceByClientIDMutation, useGetInvoicesWithPaymentByClientMutation } from "../../store/InvoiceAPI/InvoiceAPI";
import InvoiceProductContext from "../../store/InvoiceProducts/invoiceproducts-context";
import ProductItems from "../../common/Invoice/ProductItems";
import PaymentPendingInvoices from "../../common/Payments/PaymentPendingInvoices";
import { getAmountReceivedAgainstInvoice, getInvoicePaymentSum, getInvoicePendingSum, getInvoiceSum, getInvoiceType, getLedgerData, getLedgerSum } from "../../utils";
import AuthContext from "../../store/authentication/auth-context";
import { useGetLedgerByClientByClientIDMutation } from "../../store/PaymentAPI/PaymentAPI";
import { setLoadingModalConfiguration } from "../../store/Slices/ModalLoaderSlice";
import { useDispatch } from "react-redux";

export default function LedgerDetails({
    cientXID = 0,
    HeaderTitle = "Invoices",
    paymentInvoiceMaps = null,
    paymentTransactionXid = 0,
}) {

    const dispatch = useDispatch();
    const authCtx = useContext(AuthContext);
    const [data, setData] = useState();
    console.log("data", data);
    const cartCtx = useContext(InvoiceProductContext);

    const [
        fetch,
        {
            data: getFetchData,
            isSuccess: isFetchDataSuccess,
        },
    ] = useGetLedgerByClientByClientIDMutation();



    useEffect(() => {
        dispatch(setLoadingModalConfiguration({ isVisible: false }));

        if (!!data) {
            data.forEach((invoiceItem, index) => {


            });
        }
    }, [data])

    useEffect(() => {
        if (getFetchData?.length > 0) {
            dispatch(setLoadingModalConfiguration({ isVisible: false }));
            setData(getLedgerData({ ledgerData: getFetchData }));

        }
        else {

            setData(null)
            dispatch(setLoadingModalConfiguration({ isVisible: false }));
        }
        if (isFetchDataSuccess) {
            dispatch(setLoadingModalConfiguration({ isVisible: false }));
        }
    }, [getFetchData, isFetchDataSuccess])


    ///binding...
    const cartItems = (
        <div>
            <div className="col-md-16">
                <div className="row">
                    <div className="col-sm floatpad0">
                        Sl No.
                    </div>
                    <div className="col-md-2 floatpad0">
                        Date
                    </div>
                    {/* <div className="col-sm floatpad0">
                        Buyer Name
                    </div> */}
                    {/* <div className="col-sm floatpad0">
                        Company Name
                    </div> */}
                    <div className=" col-sm floatpad0">
                        Type
                    </div>
                    <div className=" col-sm floatpad0">
                        Ref. No.
                    </div>
                    <div className=" col-sm floatpad0">
                        Debit
                    </div>
                    <div className=" col-sm floatpad0">
                        Credit
                    </div>
                </div>
                {/* <div className="p-3"> */}
                {!!data && data?.map((taxitem, index) => (
                    <>
                        <PaymentPendingInvoices
                            slNo={index + 1}
                            //  ItemXID={taxitem?.ItemXID}
                            invoiceCreatedOn={taxitem?.invoiceCreatedOn}
                            companyName={taxitem?.companyName}
                            formTypeXid={getInvoiceType(taxitem?.formTypeXid)}
                            refID={taxitem?.refID}
                            debit={taxitem?.debit == 0 ? "-" : taxitem?.debit}
                            credit={taxitem?.credit == 0 ? "-" : taxitem?.credit}
                            isLedger={true}
                        // refID={taxitem?.refID}
                        // purchaseOrder={taxitem.purchaseOrder}
                        // invoiceAmount={taxitem?.invoiceAmount}
                        // amountRecevied={taxitem?.amountRecevied}
                        // pendingAmount={taxitem?.pendingAmount}

                        // receivedAmount={taxitem?.AmountReceivedAgainstInvoice}
                        // receivedAmountError={taxitem?.error?.AmountReceivedAgainstInvoice}
                        //  onChangeReceivedAmount={onChangeReceivedAmountHandler.bind(null, taxitem)}


                        ></PaymentPendingInvoices>

                    </>
                ))}
                {!!data && (
                    <>
                        <div className="col-md-16">
                            <div className="border row">
                                <div className="col-sm floatpad0">

                                </div>
                                <div className="col-sm floatpad0">

                                </div>
                                <div className="col-sm floatpad0">
                                    Opening Balance
                                </div>
                                <div className="col-sm floatpad0">
                                    0
                                </div>

                            </div>
                            <div className="border row">
                                <div className="col-sm floatpad0">

                                </div>
                                <div className="col-sm floatpad0">

                                </div>
                                <div className="col-sm floatpad0">

                                </div>
                                <div className="col-sm floatpad0">
                                    Current Total
                                </div>

                                <div className="col-sm floatpad0">
                                    {getLedgerSum({ ledgerData: data, type: "debit" })}
                                </div>
                                <div className="col-sm floatpad0">
                                    {getLedgerSum({ ledgerData: data, type: "credit" })}
                                </div>
                            </div>
                            <div className="border row">
                                <div className="col-sm floatpad0">

                                </div>
                                <div className="col-sm floatpad0">

                                </div>
                                <div className="col-sm floatpad0">

                                </div>
                                <div className="col-sm floatpad0">
                                    Closing Balance
                                </div>
                                <div className="col-sm floatpad0">

                                </div>
                                <div className="col-sm floatpad0">
                                    {getLedgerSum({ ledgerData: data, type: "debit" }) - getLedgerSum({ ledgerData: data, type: "credit" })}
                                </div>
                            </div>
                        </div>

                    </>
                )}
                {/* </div> */}
            </div>
        </div>
    );


    //end here...
    useEffect(
        function Assets() {
           
            if (cientXID == 0 || !!!cientXID) return;
            console.log("cientXID", cientXID)
           // dispatch(setLoadingModalConfiguration({ isVisible: true }));
            fetch({
                cbxid: authCtx.companyBranchID,
                clientxid: cientXID,

            });

        }, [cientXID]);


    return (
        <>
            <Card bordered={false}
                className="criclebox tablespace mb-24"
            // title={HeaderTitle}
            >
                {cartItems}
            </Card>
        </>
    )
}

LedgerDetails.propTypes = {
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