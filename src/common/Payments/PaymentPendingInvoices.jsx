import { Button, Checkbox, Input, Select, } from "antd";

import {
    DownloadOutlined, PlusCircleOutlined,
    FormOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import ItemDropDown from "../../components/CommonComponents/ItemDropDown";
import { useGetAllInventoriesMutation } from "../../store/InventoryAPI/InventoryAPI";
import { AuthContext } from "../../components";
import { useContext, useEffect, useState } from "react";


export default function PaymentPendingInvoices(props) {

    return (
        <>
            <div className="col-md-16">
                <div className="border row">
                    <div className="col-sm floatpad0">
                        {props.slNo}
                    </div>
                    <div className="col-sm floatpad0">
                        {props.invoiceCreatedOn}
                    </div>
                    {!!props.isLedger == false ?
                        <>
                            <div className="col-sm floatpad0">
                                <Checkbox onChange={props.onCheckMakePayment} checked={props.makePaymentFlag} value={props.makePaymentFlag}></Checkbox>
                            </div>
                        </> : null
                    }

                    {/* <div className="col-sm floatpad0">
                        {props.companyName}
                    </div> */}
                    {/* this is used in the ledger.... */}
                    <div className="col-sm floatpad0">
                        {props.formTypeXid}
                    </div>

                    <div className="col-sm floatpad0">
                        {props.refID}
                    </div>
                    {!!props.isLedger == false ?
                        <>
                            <div className="col-sm floatpad0">
                                {props.purchaseOrder}
                            </div>
                            <div className="col-sm floatpad0">
                                {props.invoiceAmount}
                            </div>
                            <div className="col-sm floatpad0">
                                {props.amountPaid}
                            </div>
                            <div className="col-sm floatpad0">
                                {props.amountRecevied}
                            </div>
                            <div className="col-sm floatpad0">
                                {props.pendingAmount}
                            </div>
                            <div className="col-sm floatpad0">
                                <Input disabled={!props.makePaymentFlag} onChange={props.onChangeReceivedAmount} value={props.receivedAmount} placeholder="Received Amount"></Input>
                                <span className='errorMsg'>{props.receivedAmountError}</span>

                            </div>
                        </>
                        :
                        <>
                            <div className="col-sm floatpad0">
                                {props.debit}
                            </div>
                            <div className="col-sm floatpad0">
                                {props.credit}
                            </div>

                        </>
                    }
                </div>
            </div>

        </>
    )
}

