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
import { useGetUOMsMutation } from "../../store/InventoryAPI/InventoryAPI";

export default function UOMDropDown({
    item = {},
    onCancel,   
    onSuccess,
    onRemove,
    onUpdated,   
    assetCategoryXid = null,

}) {

    const [data, setData] = useState([]);
    const [clientsData, setClientsData] = useState([]);
    const [contractData, setContractData] = useState([]);
    const authCtx = useContext(AuthContext);

    const [
        fetch,
        {
            data: getFetchData,
            isSuccess: isFetchDataSuccess,
        },
    ] = useGetUOMsMutation();


    useEffect(() => {
        if (getFetchData?.length > 0 && isFetchDataSuccess) {
            setData(getFetchData);
        }

    }, [getFetchData, isFetchDataSuccess]);

    const onChangeClient = (e) => {
        onSuccess({ AssetCategoryID: e })       
    }   
   
    useEffect(
        function Assets() {
            fetch({
                id: authCtx.companyID,
            });

        }, [fetch]);

    return (
        <>
            <div className="row">
                <Select value={!!assetCategoryXid ? assetCategoryXid : null} placeholder="UOM" onChange={onChangeClient}>
                    {data?.map((a) =>
                    (
                        <option key={a.pid} value={a.uom}>{a.uom}</option>
                    ))}
                </Select>


            </div>
        </>
    );

}

UOMDropDown.propTypes = {
    item: PropTypes.object,
    onCancel: PropTypes.func,
    onSuccess: PropTypes.func,
    onRemove: PropTypes.func,
    onUpdated: PropTypes.func,

}