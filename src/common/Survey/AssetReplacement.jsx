import { Button, Input, } from "antd";

import {
    DownloadOutlined, PlusCircleOutlined,
    FormOutlined,
    DeleteOutlined,
} from '@ant-design/icons';


export default function AssetReplacement(props) {

    return (
        <>

            <div className="col-md-16">
                <div className="row">
                    <div className="col-sm floatpad0">
                        <div>{props.slNo}</div>
                    </div>
                    <div className="col-md-2 floatpad0">
                        <div><Input onChange={props.onChangeItemName} value={props.itemName} placeholder="Item Name"></Input></div>
                    </div>



                    <div className="col-sm floatpad0">

                        <div><Input onChange={props.onChangeQuantity} value={props.quantity}  placeholder="Quantity"></Input></div>
                    </div>
                    <div className="col-sm floatpad0">

                        <div><Input onChange={props.onChangeBrand} value={props.brand} placeholder="Brand"></Input></div>
                    </div>
                    <div className="border col-md floatpad0">

                        <div><Input onChange={props.onChangeDetails} value={props.details}  placeholder="Model/Details"></Input></div>
                    </div>
                    <div className="col-sm floatpad0">

                        <div><Input onChange={props.onChangeSerialNumber} value={props.serialNumber} placeholder="Serial Number"></Input></div>
                    </div>
                    <div className="col-sm floatpad0">

                        <div><Input onChange={props.onChangeRequired} value={props.required} placeholder="Required"></Input></div>
                    </div>
                    <div className="col-sm floatpad0">

                        <div><Input onChange={props.onChangeUsed} value={props.used} placeholder="Used"></Input></div>
                    </div>


                    <div className="col-md-2 floatpad0">
                        <div><Input onChange={props.onChangeRemark} value={props.remark}  placeholder="Remarks"></Input></div>
                    </div>
                    <div className="col-sm floatpad0">
                        <div><Button icon={<DeleteOutlined />} onClick={props.onClickDeleteItem}></Button></div> </div>
                </div>
            </div>

        </>
    )
}