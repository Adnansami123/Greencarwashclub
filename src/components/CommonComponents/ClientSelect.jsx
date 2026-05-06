import { useCallback, useContext, useEffect, useState } from "react";
import { useGetClientsMutation } from "../../store/ClientsAPI/ClientsAPI";
import { Form, Select } from "antd";
import AuthContext from "../../store/authentication/auth-context";
import { getFilterByConsineePid, getFilteredEMandates } from "../../utils";
import { setLoadingModalConfiguration } from "../../store/Slices/ModalLoaderSlice";
import { useDispatch } from "react-redux";
export default function ClientSelect({
    onSuccess,
    inputName = "",
    labelName = "",
    placeHolderName = "",
    disabled = false,
    filterConsineeNumber = 0,
    consineeID = 0,
    isMandatory = true,

}) {


    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [clientID, setClientID] = useState();
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
            dispatch(setLoadingModalConfiguration({ isVisible: false }));
            setClientsData(getFetchClientsData);
        }
        else if (isFetchDataSuccess) {
            dispatch(setLoadingModalConfiguration({ isVisible: false }));
        }

    }, [getFetchClientsData, isFetchDataSuccess]);

    //setting up the consinee id....
    useEffect(() => {
        console.log("consineeID", consineeID);
        if (consineeID == 0) return;

        setClientID(consineeID);
    }, [consineeID])


    const onChangeClient = (e) => {
        setClientID(e);
        onSuccess({ e });
    }

    const filterByConsineePid = ({ pid }) => {
        return getFilterByConsineePid({
            buyerDataObj: clientsData,
            pid: pid,
        });
    };

    useEffect(() => {
        if (!!filterByConsineePid) {
            console.log("filterConsineeNumber", filterConsineeNumber);
            console.log("consineeID", inputName);
            setClientID(filterConsineeNumber);
            form.setFieldsValue({ BuyerClientXid: "" });
            /// form.setFieldsValue({ inputName: filterConsineeNumber });
        }

    }, [filterByConsineePid, inputName, filterConsineeNumber, consineeID])
    useEffect(
        function Assets() {
            dispatch(setLoadingModalConfiguration({ isVisible: true }));
            fetchClients({
                id: authCtx.companyBranchID,
            });
        }, [fetch]);

    return (
        <>
            <Form.Item
                label={labelName}
                name={inputName}
                rules={[
                    {
                        required: isMandatory,
                        message: "Please select the  " + placeHolderName + "!",
                    },
                ]}
            >
                <Select showSearch
                    optionFilterProp='children'
                    filterOption={(input, option) =>
                        option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA, optionB) =>
                        optionA.children
                            .toLowerCase()
                            .localeCompare(optionB.children.toLowerCase())
                    }
                disabled={disabled} allowClear={true}  onChange={onChangeClient} placeholder={placeHolderName}>
                    {
                        filterByConsineePid({ pid: filterConsineeNumber }).map((a) => (
                            <option key={a.pid} value={a.pid}>
                                {a.companyName}
                            </option>
                        ))}
                </Select>
            </Form.Item>
        </>
    );
}