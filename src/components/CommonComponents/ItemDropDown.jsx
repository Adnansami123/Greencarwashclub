import {
    Form, Button,
    Input,
    Upload,
    message,
    Col,
    Row,
    Select
} from "antd";
import PropTypes from "prop-types";
import { useCallback, useContext, useEffect, useState } from "react";
import { string } from "yup";
import { UploadOutlined } from '@ant-design/icons';
import AuthContext from "../../store/authentication/auth-context";
import { useGetClientsMutation } from "../../store/ClientsAPI/ClientsAPI";
import { useContract_GetFilterMutation, useGetAssetCategoryMutation } from "../../store/ConfigurationAPI/ConfigurationAPI";
import { useGetAllInventoriesMutation, useGetUOMsMutation } from "../../store/InventoryAPI/InventoryAPI";

export default function ItemDropDown({
    item = {},
    onCancel,   
    onSuccess,
    onRemove,
    onUpdated,   
    assetCategoryXid = null,

}) {

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

    const onChangeClient = (e) => {
        onSuccess({ AssetCategoryID: e })       
    }

    const onFinishFailedAddContract = (values) => {

    }
    const onClickReset = () => {

    }
    useEffect(
        function Assets() {
            fetch({
                CBXID: authCtx.companyBranchID,
            });

        }, [fetch]);

    return (
        <>
            <div className="row">
                <Select value={!!assetCategoryXid ? assetCategoryXid : null} placeholder="Item" onChange={onChangeClient}>
                    {data?.map((a) =>
                    (
                        <option key={a.pid} value={a.uom}>{a.itemName}</option>
                    ))}
                </Select>
            </div>
        </>
    );

}

ItemDropDown.propTypes = {
    item: PropTypes.object,
    onCancel: PropTypes.func,
    onSuccess: PropTypes.func,
    onRemove: PropTypes.func,
    onUpdated: PropTypes.func,

}