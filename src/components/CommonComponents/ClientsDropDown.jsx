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
import { useContract_GetFilterMutation } from "../../store/ConfigurationAPI/ConfigurationAPI";

export default function ClientsDropDown({
    item = {},
    onCancel,
    isModalClosable = true,
    isModalOpen = true,
    onSuccess,
    onSuccessContract,
    onRemove,
    onUpdated,
    maxCount = 1,
    heading = "Upload Asset Image",
    accept = ".jpg, .png",
    fileList = [],
    hideUploadButton = false,
    showRemoveIcon = true,

}) {

    const [defaultValue, setDefaultValue] = useState(0);
    const [clientID, setClientID] = useState();
    const [clientsData, setClientsData] = useState([]);
    console.log("clientsData", clientsData);
    const [contractData, setContractData] = useState([]);
    const authCtx = useContext(AuthContext);

    const [
        fetchClients,
        {
            data: getFetchClientsData,
            isSuccess: isFetchDataSuccess,
        },
    ] = useGetClientsMutation();
    console.log("clientsData", getFetchClientsData);

    useEffect(() => {
        if (getFetchClientsData?.length > 0) {
            setClientsData(getFetchClientsData);
        }

    }, [getFetchClientsData]);


    const [
        fetch,
        {
            data: getFetchData,
            isSuccess: isFetchContractDataSuccess,
        },
    ] = useContract_GetFilterMutation();

    useEffect(() => {
        if (!!getFetchData) {
            setContractData(getFetchData);
            onSuccess({ clientXid: clientID });
        }
        else if (isFetchContractDataSuccess) {
            onSuccess({ clientXid: clientID });
        }
    }, [getFetchData, isFetchContractDataSuccess])


    const onChangeClient = (e) => {
        console.log("onChangeClient" + e);
        if (e !== 0) { // when it;s "ALL"
            fetch({
                companyXid: authCtx.companyID,
                clientXid: e,
                contractXid: -1,
            });
        }
        else {
            setContractData([]);
            setDefaultValue(0);
        }
        setClientID(e);

    }

    const onChangeContract = (e) => {

        setDefaultValue(e);
        onSuccessContract({ contractXid: e });
    }

    const onFinishFailedAddContract = (values) => {

    }
    const onClickReset = () => {

    }
    useEffect(
        function Assets() {

            fetchClients({

                id: authCtx.companyBranchID,
                // userXid: authCtx.usertype === "Admin" ? -1 : authCtx.clientID,
                userXid: ["Admin"].includes(authCtx.usertype) ? - 1 : ["Technician", "Engineer"].includes(authCtx.usertype) ? authCtx.clientID : -1,
                clientXid: authCtx.usertype.toLowerCase() === "client" ? authCtx.actualClientID : -1,
            });

        }, [fetch]);
    return (
        <>
           
            <div className="row" >
                <div class="column">

                    <div class="column" >Select Client</div>
                    <div>
                        <Select defaultValue={0} placeholder="Client" className="form-control" onChange={onChangeClient}>
                            {clientsData?.length > 0 ? clientsData?.map((a, index) =>
                            (
                                <>
                                    {index === 0 ?
                                        <>
                                            <option key={0} value={0}>ALL Client</option>
                                            <option key={a.pid} value={a.pid}> {a.companyName}</option>
                                        </>
                                        : <option key={a.pid} > {a.companyName + index}</option>}

                                </>
                            )) : <option key={0} value={0}>ALL Clients</option>}
                        </Select>
                    </div>
                </div>
                <div class="column">
                    <div class="column">Select Contract</div>
                    <div>
                        <Select defaultValue={defaultValue} className="form-control" placeholder="Contract" onChange={onChangeContract}>
                            {contractData?.length > 0 ? contractData?.map((a, index) =>
                            (
                                <>
                                    {index === 0 ?
                                        <>
                                            <option key={0} value={0}>ALL Bids</option>
                                            <option key={a.pid} value={a.pid}>{a.prefix + "-" + a.contractPrefix + "-" + a.refNo + " - " + a.contactName + " - " + a.buildingAddress1 + "-" + a.buildingAddress2}</option>
                                        </>
                                        : <option key={a.pid} value={a.pid}>{a.prefix + "-" + a.contractPrefix + "-" + a.refNo + " - " + a.contactName + " - " + a.buildingAddress1 + "-" + a.buildingAddress2}</option>
                                    }

                                </>
                                // <option key={a.pid} value={a.pid}>{a.prefix + "-" + a.contractPrefix + "-" + a.refNo + " - " + a.contactName + " - " + a.buildingAddress1 + "-" + a.buildingAddress2}</option>
                            )) : <option key={0} value={0}>ALL Bids</option>}
                        </Select>
                    </div>

                </div>
            </div >
        </>
    );

}

ClientsDropDown.propTypes = {
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