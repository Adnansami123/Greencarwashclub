import {
    Modal, Form, Button,
    Input, Tabs, Select, DatePicker, Row, Col, Card, Table, theme, Tag, Space, Radio, Badge, InputNumber, Checkbox
} from "antd";
import { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

import { useGetInvoiceByClientIDMutation, useGetInvoicesWithPaymentByClientMutation } from "../../store/InvoiceAPI/InvoiceAPI";
import InvoiceProductContext from "../../store/InvoiceProducts/invoiceproducts-context";
import ProductItems from "../../common/Invoice/ProductItems";
import PaymentPendingInvoices from "../../common/Payments/PaymentPendingInvoices";
import { getAmountReceivedAgainstInvoice, getInvoicePaymentSum, getInvoicePendingSum, getInvoiceSum } from "../../utils";
import AuthContext from "../../store/authentication/auth-context";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

export default function InvoiceTableForPayment({
    cientXID = 0,
    HeaderTitle = "Invoices",
    paymentInvoiceMaps = null,
    paymentTransactionXid = 0,
    noInvoice,
}) {
    const URLPathName = useLocation().pathname.replace("/", "");
    const authCtx = useContext(AuthContext);
    const [data, setDate] = useState();
    const cartCtx = useContext(InvoiceProductContext);

    const [
        fetch,
        {
            data: getFetchData,
            isSuccess: isFetchDataSuccess,
        },
    ] = useGetInvoicesWithPaymentByClientMutation();

    //event is not coming here...
    const onChangeReceivedAmountHandler = (taxitem, e) => {
        taxitem.AmountReceivedAgainstInvoice = e.target.value;
        cartCtx.addPaymentPendingInvoiceItem(taxitem);
    }

    const onCheckMakePaymentHandler = (taxitem, e) => {
        // alert(JSON.stringify(e));
        taxitem.makePaymentFlag = e.target.checked;
        if (e.target.checked==false)
            taxitem.AmountReceivedAgainstInvoice = null;


        cartCtx.addPaymentPendingInvoiceItem(taxitem);
    }

    useEffect(() => {
        if (!!data) {
            data.forEach((invoiceItem, index) => {
                cartCtx.addPaymentPendingInvoiceItem({
                    // checkListItemXid: invoiceItem.checkListItemXid,                 
                    pid: invoiceItem.pid,
                    id: index + 1,
                    ppmFrequencySurveyScheduleXid: 1,
                    ItemXID: 0,
                    companyName: "",//invoiceItem.buyerClients.companyName, // not getting from the API... as there is issue.
                    InvoiceXID: invoiceItem.pid, // this is invoice id in the invoice product details table...
                    // buyerCompanyName: invoiceItem.buyerClients.companyName
                    refID: invoiceItem.refID,
                    purchaseOrder: invoiceItem.purchaseOrder,
                    invoiceAmount: getInvoiceSum({ invoiceData: invoiceItem.invoiceProductDetails }),
                    pendingAmount: getInvoicePendingSum({
                        invoiceItemSum: invoiceItem.invoiceProductDetails, invoicePaymentSum: invoiceItem.paymentInvoiceMaps, invoiceID: invoiceItem.pid, paymentTransactionXid: paymentTransactionXid
                        , paymentInvoiceMaps: invoiceItem.paymentInvoiceMaps
                    }),
                    //to get the invoice paid ammount.
                    amountRecevied: getInvoicePaymentSum({ invoiceData: invoiceItem.paymentInvoiceMaps, invoiceID: invoiceItem.pid, paymentTransactionXid: paymentTransactionXid }),
                    //here we need to update the paid amount for the payment trandaction when it is in edit mode...
                    //AmountReceivedAgainstInvoice: paymentTransactionXid == invoiceItem.paymentInvoiceMaps[0]?.paymentTransactionXid ? 1000 : null,
                    AmountReceivedAgainstInvoice: paymentTransactionXid != 0 ? getAmountReceivedAgainstInvoice({ paymentTransactionXid: paymentTransactionXid, paymentInvoiceMaps: invoiceItem.paymentInvoiceMaps }) : null,
                    lastEditByXid: authCtx.clientID,
                    makePaymentFlag: false,
                })

            });
        }
    }, [data])

    useEffect(() => {
        if (!!!isFetchDataSuccess) return;

        if (getFetchData?.length > 0 && !!getFetchData[0]?.paymentInvoiceMaps) {
            setDate(getFetchData);

        }
        else  //here if there is no invoice then we need to take the adavance... so implementing this.
        {
            noInvoice();
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
                    <div className="col-sm floatpad0">
                        Check to Make Payment
                    </div>
                    {/* <div className="col-md-2 floatpad0">
                        Consinee Name
                    </div> */}
                    {/* <div className="col-sm floatpad0">
                        Buyer Name
                    </div> */}
                    <div className="col-sm floatpad0">
                        Invoice NO.
                    </div>
                    <div className=" col-sm floatpad0">
                        Purchase Order No.
                    </div>
                    <div className=" col-sm floatpad0">
                        Invoice Amount.
                    </div>
                    <div className=" col-md floatpad0">
                        Amount Paid.
                    </div>
                    <div className="col-md floatpad0">
                        Pending Amount.
                    </div>
                    <div className="col-sm floatpad0">
                        Record Amount
                    </div>

                </div>
                {/* <div className="p-3"> */}
                {!!cartCtx && cartCtx?.paymentPendingInvoiceItems?.map((taxitem, index) => (
                    <>
                        <PaymentPendingInvoices
                            slNo={index + 1}
                            //  ItemXID={taxitem?.ItemXID}
                            //  companyName={taxitem?.companyName}
                            refID={taxitem?.refID}
                            onCheckMakePayment={onCheckMakePaymentHandler.bind(null, taxitem)}
                            purchaseOrder={taxitem.purchaseOrder}
                            invoiceAmount={taxitem?.invoiceAmount}
                            amountRecevied={taxitem?.amountRecevied}
                            pendingAmount={taxitem?.pendingAmount}

                            receivedAmount={taxitem?.AmountReceivedAgainstInvoice}
                            receivedAmountError={taxitem?.error?.AmountReceivedAgainstInvoice}
                            onChangeReceivedAmount={onChangeReceivedAmountHandler.bind(null, taxitem)}
                            makePaymentFlag={taxitem?.makePaymentFlag}


                        ></PaymentPendingInvoices>
                    </>
                ))}
                {/* </div> */}
            </div>
        </div>
    );


    //end here...
    useEffect(
        function Assets() {
            if (cientXID == 0 || !!!cientXID) return;
            fetch({
                ClientID: cientXID,
                FormTypeXid: URLPathName === "AddPayment" ? 3 : 6, // this is purchase order.....
            });

        }, [cientXID]);


    return (
        <>
            <Card bordered={false}
                className="criclebox tablespace mb-24"
                title={HeaderTitle}>
                {cartItems}
            </Card>
        </>
    )
}

InvoiceTableForPayment.propTypes = {
    item: PropTypes.object,
    onCancel: PropTypes.func,
    isModalClosable: PropTypes.bool,
    isModalOpen: PropTypes.bool,
    onSuccess: PropTypes.func,
    onSuccessContract: PropTypes.func,
    onRemove: PropTypes.func,
    onUpdated: PropTypes.func,
    maxCount: PropTypes.number,
    noInvoice: PropTypes.func, // this means, there is no unpiad invoice related to the customer...

}