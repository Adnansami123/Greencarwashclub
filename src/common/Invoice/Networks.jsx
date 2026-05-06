import { Button, Input, Select, } from "antd";

import {
    DownloadOutlined, PlusCircleOutlined,
    FormOutlined,
    DeleteOutlined,
    UndoOutlined,
} from '@ant-design/icons';
import ItemDropDown from "../../components/CommonComponents/ItemDropDown";
import { useGetAllInventoriesMutation } from "../../store/InventoryAPI/InventoryAPI";
import { AuthContext, useBranchesMutation } from "../../components";
import { useContext, useEffect, useState } from "react";
import { useGetPortLIstMutation } from "../../store/ConfigurationAPI/ConfigurtionApiSLD";
import { OnlyPortFilter } from "../../utils";


export default function Networks(props) {

    //inventory dropdown
    const [data, setData] = useState([]);
    const authCtx = useContext(AuthContext);

    const [
        fetch,
        {
            data: getFetchData,
            isSuccess: isFetchDataSuccess,
        },
    ] = useBranchesMutation();


    useEffect(() => {
        if (getFetchData?.length > 0 && isFetchDataSuccess) {
          //  setData(getFetchData);
            setData(OnlyPortFilter({ buyerDataObj: getFetchData }));
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
                        <Select className="ItemProduct" value={!!props.Port ? props.Port : null} placeholder="Item" onChange={props.onChangeItemName}>
                            {data?.map((a) =>
                            (
                                <option key={a.pid} value={JSON.stringify(a)}>{a.nameEng}</option>
                            ))}
                        </Select>
                        <span className='errorMsg'>{props.PortError}</span>
                    </div>

                    <div className="col-sm floatpad0">
                        <Input onChange={props.onChangeHSNCODE} value={props.PortOrder} placeholder="Port Order"></Input>
                        <span className='errorMsg'>{props.PortOrderError}</span>
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