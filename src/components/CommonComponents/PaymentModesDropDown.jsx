import {
    Select
} from "antd";
import PropTypes from "prop-types";
import {  useContext,  useState } from "react";
import AuthContext from "../../store/authentication/auth-context";
import { paymentModes } from "../../utils/JSONData";

export default function PaymentModeDropDown({
    item = {},
    onCancel,
    onSuccess,
    onRemove,
    onUpdated,
    PaymentModeXID = null,

}) {
    const [data, setData] = useState([]);
    const authCtx = useContext(AuthContext);
    console.log("PaymentModeXID", PaymentModeXID);
    const onChangeClient = (e) => {
        onSuccess({ PaymentModeXID: e })
    }   
   
   

    return (
        <>
            <div className="row">
                <Select value={!!PaymentModeXID ? PaymentModeXID : null} placeholder="Payment Mode" onChange={onChangeClient}>
                    {!!paymentModes && paymentModes?.map((a) =>
                    (
                        <option key={a.pid} value={a.pid}>{a.value}</option>
                    ))}
                </Select>
            </div>
        </>
    );

}

PaymentModeDropDown.propTypes = {
    item: PropTypes.object,
    onCancel: PropTypes.func,
    onSuccess: PropTypes.func,
    onRemove: PropTypes.func,
    onUpdated: PropTypes.func,

}