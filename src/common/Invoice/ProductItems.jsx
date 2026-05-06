import { Button, Input, Select, } from "antd";

import {
    DownloadOutlined, PlusCircleOutlined,
    FormOutlined,
    DeleteOutlined,
    UndoOutlined,
} from '@ant-design/icons';
import ItemDropDown from "../../components/CommonComponents/ItemDropDown";
import { useGetAllInventoriesMutation } from "../../store/InventoryAPI/InventoryAPI";
import { AuthContext } from "../../components";
import { useContext, useEffect, useState } from "react";


export default function ProductItems(props) {

    //inventory dropdown
    const [data, setData] = useState([]);
    const authCtx = useContext(AuthContext);

    const [
        fetch,
        {
            data: getFetchData,
            isSuccess: isFetchDataSuccess,
        },
    ] = useGetAllInventoriesMutation();


    useEffect(() => {
        if (getFetchData?.length > 0 && isFetchDataSuccess) {
            setData(getFetchData);
        }

    }, [getFetchData, isFetchDataSuccess]);

    useEffect(
        function Assets() {
            fetch({
                CBXID: authCtx.companyBranchID,
            });

        }, [fetch]);

    //end here..

    const OnSuccessUOMHandler = (e) => {
        // form.setFieldsValue({ UOM: e.AssetCategoryID });
        // setUOM(e.AssetCategoryID);
    }

    return (
        <>
            <div className="col-md-16">
                <div className={props.isDeleted ? "border row border border-danger" : "border row"}>
                    <div className="col floatpad0">
                        {props.slNo}
                    </div>

                    <div className="col-md-2">
                        <Select className="ItemProduct" value={!!props.itemName ? props.itemName : null} placeholder="Item" onChange={props.onChangeItemName}>
                            {data?.map((a) =>
                            (
                                <option key={a.pid} value={JSON.stringify(a)}>{a.itemName}</option>
                            ))}
                        </Select>
                        <span className='errorMsg'>{props.Description}</span>
                    </div>

                    <div className="col-sm floatpad0">
                        <Input onChange={props.onChangeHSNCODE} value={props.HSNCODE} placeholder="HSNCode"></Input>
                        <span className='errorMsg'>{props.HSNCODEError}</span>
                    </div>
                    <div className="col-sm floatpad0">

                        <Input onChange={props.onChangeQuantity} value={props.Quantity} placeholder="Quantity"></Input>
                        <span className='errorMsg'>{props.QuantityError}</span>
                    </div>

                    <div className="col-sm floatpad0">

                        <Input onChange={props.onChangeUnits} value={props.UOM} placeholder="Untis"></Input>
                        <span className='errorMsg'>{props.UOMError}</span>

                    </div>
                    <div className="col-sm floatpad0">

                        <Input onChange={props.onChangeRate} value={props.QuantityAmount} placeholder="Rate"></Input>
                        <span className='errorMsg'>{props.QuantityAmountError}</span>

                    </div>


                    <div className="col-sm floatpad0">
                        <Input onChange={props.onChangeGST} value={props.GSTPer} placeholder="GST"></Input>
                        <span className='errorMsg'>{props.GSTPerError}</span>

                    </div>
                    <div className="col-sm floatpad0">
                        <Input disabled={true} value={props.TotalAmount} placeholder="Amount"></Input>
                    </div>
                    <div className="col-md-1">
                        <Input disabled={true} value={props.AfterGSTAmount} placeholder="Amount With GST"></Input>
                    </div>

                    <div className="col-sm">
                        {props.isDeleted ?
                            <Button icon={<UndoOutlined />} onClick={props.onClickUndoDelete}></Button>
                            :
                            <Button icon={<DeleteOutlined />} onClick={props.onClickDeleteItem}></Button>
                        }
                    </div>
                </div>
            </div>

        </>
    )
}