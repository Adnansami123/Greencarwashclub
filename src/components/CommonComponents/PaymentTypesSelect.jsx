import { useCallback, useContext, useEffect, useState } from "react";
import { useGetClientsMutation } from "../../store/ClientsAPI/ClientsAPI";
import { Form, Select } from "antd";
import AuthContext from "../../store/authentication/auth-context";
import { getFilterByAccountHead, getFilterByConsineePid, getFilteredEMandates } from "../../utils";
import {
    DownloadOutlined, PlusCircleOutlined,
    FormOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { useGetPaymentTypesMutation } from "../../store/PaymentTypesAPI/PaymentTypesAPI";
export default function PaymentTypesSelect({
    onSuccess,
    inputName = "",
    labelName = "",
    placeHolderName = "",
    disabled = false,
    filterConsineeNumber = 0,
    consineeID = 0,
    isExpenses= true,

}) {


    const [form] = Form.useForm();
    const [clientID, setClientID] = useState();
    const [clientsData, setClientsData] = useState([]);
    const authCtx = useContext(AuthContext);
    const [
        fetchPaymentTypes,
        {
            data: getFetchClientsData,
            isSuccess: isFetchDataSuccess,
        },
    ] = useGetPaymentTypesMutation();

    useEffect(() => {
        if (getFetchClientsData?.length > 0) {
            //here binding the based the expsense type means CR, DR and EXP...
            setClientsData(getFilterByAccountHead({ data: getFetchClientsData, isExpenses: isExpenses }));
        }

    }, [getFetchClientsData]);




    const onChangeClient = (e) => {
        setClientID(e);
        onSuccess({ e });
    }




    useEffect(
        function Assets() {
            fetchPaymentTypes();
        }, [fetch]);

    return (
        <>
            <Form.Item
                label={labelName}
                name={inputName}
                rules={[
                    {
                        required: true,
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
                    disabled={disabled} allowClear={true} onChange={onChangeClient} placeholder={placeHolderName}>
                    {
                        clientsData.map((a) => (
                            <option key={a.pid} value={a.pid}>
                                {a?.paymentMasters?.name + "-" + a.type}
                            </option>
                        ))}
                </Select>
            </Form.Item>
        </>
    );
}