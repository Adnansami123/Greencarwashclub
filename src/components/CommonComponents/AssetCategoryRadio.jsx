import {
    Form, Button,
    Input,
    Upload,
    message,
    Col,
    Row,
    Select,
    Radio,
    Checkbox
} from "antd";
import PropTypes from "prop-types";
import { useCallback, useContext, useEffect, useState } from "react";
import { string } from "yup";
import { UploadOutlined } from '@ant-design/icons';
import AuthContext from "../../store/authentication/auth-context";
import { useGetClientsMutation } from "../../store/ClientsAPI/ClientsAPI";
import { useContract_GetFilterMutation, useGetAssetCategoryMutation } from "../../store/ConfigurationAPI/ConfigurationAPI";

export default function AssetCategoryRadio({
    item = {},
    onCancel,
    isModalClosable = true,
    isModalOpen = true,
    onSuccess,
    onRemove,
    onUpdated,
    maxCount = 1,
    heading = "Upload Asset Image",
    accept = ".jpg, .png",
    fileList = [],
    hideUploadButton = false,
    showRemoveIcon = true,
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
    ] = useGetAssetCategoryMutation();


    useEffect(() => {
        if (getFetchData?.length > 0) {
            setData(getFetchData);
        }

    }, [getFetchData]);

    const onChangeClient = (e) => {
      
        onSuccess({ AssetCategoryID: e.target.value })
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
                {/* <Select value={!!assetCategoryXid ? assetCategoryXid : null} placeholder="Asset Category" onChange={onChangeClient}>
                    {data?.map((a) =>
                    (
                        <option key={a.pid} value={a.pid}>{a.nameEng}</option>
                    ))}
                </Select>     */}
                <Radio.Group  value={!!assetCategoryXid ? assetCategoryXid : null} onChange={onChangeClient}>
                    {data?.map((a) =>
                    (
                        <Radio key={a.pid} value={a.pid}>{a.nameEng}</Radio>
                    ))}
                </Radio.Group>
            </div>
        </>
    );

}

AssetCategoryRadio.propTypes = {
    item: PropTypes.object,
    onCancel: PropTypes.func,
    isModalClosable: PropTypes.bool,
    isModalOpen: PropTypes.bool,
    onSuccess: PropTypes.func,
    onRemove: PropTypes.func,
    onUpdated: PropTypes.func,
    maxCount: PropTypes.number,

}