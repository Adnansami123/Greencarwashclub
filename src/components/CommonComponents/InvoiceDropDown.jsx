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
import { useGetInvoiceByClientIDMutation } from "../../store/InvoiceAPI/InvoiceAPI";
import ConfirmationModal from "../../DeleteModal/Confirmation";
import { setLoadingModalConfiguration } from "../../store/Slices/ModalLoaderSlice";
import { useDispatch } from "react-redux";

export default function InvoiceDropDown({
    item = {},
    onCancel,
    onSuccess,
    onRemove,
    onUpdated,
    assetCategoryXid = null,
    clientID = null,
    formTypeID = null,
}) {
    const dispatch = useDispatch();
    const [data, setData] = useState([]);
    const authCtx = useContext(AuthContext);
    const [transactionType, setTransactionType] = useState("");
    const [showActionMessage, setshowActionMessage] = useState(false);
    const [showDelete, setShowDelete] = useState(false);

    const [
        fetch,
        {
            data: getFetchData,
            isSuccess: isFetchDataSuccess,
        },
    ] = useGetInvoiceByClientIDMutation();


    useEffect(() => {
        if (isFetchDataSuccess) {
            dispatch(setLoadingModalConfiguration({ isVisible: false }));
            if (getFetchData?.length > 0 && isFetchDataSuccess) {
                setData(getFetchData);
            }
            else {
                setTransactionType("NoRecord")
                setshowActionMessage(true);
                setData(null);
            }
        }

    }, [getFetchData, isFetchDataSuccess]);

    useEffect(() => {
        if (showActionMessage) {
            setTimeout(function () {
                setshowActionMessage(false);
            }, 2000);

        }

    }, [showActionMessage])

    const onChangeClient = (e) => {
        onSuccess({ AssetCategoryID: e })
    }


    useEffect(
        function Assets() {
            if (!!formTypeID && !!clientID) {
                dispatch(setLoadingModalConfiguration({ isVisible: true }));
                fetch({
                    ClientID: clientID,
                    FormTypeID: formTypeID
                });
            }


        }, [clientID, formTypeID]);






    return (
        <>
            <div className="row">
                <div>Existing Invoice Number</div>
                <Select value={!!assetCategoryXid ? assetCategoryXid : null} placeholder="Invoice" onChange={onChangeClient}>
                    {data?.map((a) =>
                    (
                        <option key={a.pid} value={a.RefID}>{a.RefID}</option>
                    ))}
                </Select>

                {showActionMessage && (<ConfirmationModal

                    onCancel={() => setShowDelete(false)}
                    transactionType={transactionType}
                //item={assetByIDData}
                ></ConfirmationModal>)
                }
            </div>
        </>
    );

}

InvoiceDropDown.propTypes = {
    item: PropTypes.object,
    onCancel: PropTypes.func,
    onSuccess: PropTypes.func,
    onRemove: PropTypes.func,
    onUpdated: PropTypes.func,

}