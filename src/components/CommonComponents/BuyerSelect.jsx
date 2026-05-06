import { useCallback, useContext, useEffect, useState } from "react";
import { useGetClientsMutation } from "../../store/ClientsAPI/ClientsAPI";
import { Form, Select } from "antd";
import AuthContext from "../../store/authentication/auth-context";
import { getFilterByConsineePid, getFilteredEMandates } from "../../utils";
export default function BuyerSelect({
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
    inputName = "",
    labelName = "",
    placeHolderName = "",
    disabled = false,
    filterConsineeNumber = 0,
    consineeID = 0,

}) {


    const [form] = Form.useForm();
    const [buyerData, setBuyerData] = useState([]);
    const [clientID, setClientID] = useState();
    const [defaultID, setDefaultID] = useState();
    const [clientsData, setClientsData] = useState([]);
    const authCtx = useContext(AuthContext);
    const [
        fetchClients,
        {
            data: getFetchClientsData,
            isSuccess: isFetchDataSuccess,
        },
    ] = useGetClientsMutation();

    useEffect(() => {
        if (getFetchClientsData?.length > 0) {
            setClientsData(getFetchClientsData);
        }

    }, [getFetchClientsData]);

    //setting up the consinee id....


    console.log("filterConsineeNumber", filterConsineeNumber);  
    const onChangeClient = (e) => {
        console.log("amountamount", e);
        setClientID(e);
        onSuccess({ e });
    }

  
    useEffect(() => {
        console.log("filterConsineeNumber", filterConsineeNumber);
        if (filterConsineeNumber == 0) return;
        setBuyerData(getFilterByConsineePid({
            buyerDataObj: clientsData,
            pid: filterConsineeNumber,
        }))

    }, [clientsData, filterConsineeNumber])
    useEffect(() => {
        if (!!buyerData) return;
       // form.setFieldsValue({ BuyerClientXid: filterConsineeNumber });
        setClientID(filterConsineeNumber);
    }, [buyerData])
    useEffect(
        function Assets() {

            fetchClients({

                id: authCtx.companyBranchID,
            });

        }, [fetch]);

    return (
        <>
            <Form.Item
                label={labelName}
                name={"BuyerClientXid"}
                rules={[
                    {
                        required: true,
                        message: "Please select the  " + placeHolderName + "!",
                    },
                ]}
            >

                <Select disabled={disabled} onChange={onChangeClient} defaultValue={clientID} value={clientID} placeholder={placeHolderName}>
                    {buyerData.length > 0 && (buyerData.map((a) => (
                        <option key={a.pid} value={a.pid}>
                            {a.companyName}
                        </option>
                    )))}

                </Select>

            </Form.Item>
        </>
    );
}