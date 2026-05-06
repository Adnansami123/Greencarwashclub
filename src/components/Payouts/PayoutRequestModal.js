import {
    Modal, Form, Button,
    Input,
    Select,
    Tabs, Checkbox, Card,
    Radio,
    DatePicker
} from "antd";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { string } from "yup";

import { useAddCompanyBranchMutation, useGetRolesMutation, useGetUserByIDMutation, usePutCompanyBranchMutation } from "../../store/ConfigurationAPI/ConfigurationAPI";
import { useBranchByCountryIDMutation, useBranchesMutation, useCountriesMutation, useStateNamesMutation } from "../../store/BranchesAPI/BranchesAPI";
import { useAddTemplateMutation } from "../../store/ConfigurationAPI/ConfigurationAPI";
import AuthContext from "../../store/authentication/auth-context";
import UserModal from "../Users/UserModal";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { filterRolesOfClient, getPayoutWithdrewSum } from "../../utils";
import FileUpload from "../CommonComponents/FileUpload";
import { setLoadingModalConfiguration } from "../../store/Slices/ModalLoaderSlice";
import { useDispatch, useSelector } from "react-redux";
import {
    CloseOutlined
} from '@ant-design/icons';
import { useAddUserPayoutMutation, useUserIncomeAndBalanceMutation } from "../../store/PayoutAPI/PayoutRequestAPI";
import { commonValidationsMsg } from "../../utils/validations/commonValidations";
import AlertModal from "../../Modals/Alert";

export default function PayoutRequestModal({
    //   item = {},
    onCancel,
    isModalClosable = true,
    isModalOpen = true,
    onSuccess,
    onUpdated,
}) {


    /// here fetching hhe balance..
    const [showActionMessage, setshowActionMessage] = useState(false);
    const [availableBalance, setAvailableBalance] = useState();
    const [errorMessage, setErrorMessage] = useState();
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
    const [allFiles, setAllFiles] = useState([]);
    const authCtx = useContext(AuthContext);
    const history = useHistory();
    const [tabActiveKey, setTabActiveKey] = useState("1");
    const [branchText, setBranchText] = useState("");
    const [addUser, setAddUser] = useState(false);
    const location = useLocation();
    const CountryID = location.state?.CountryID;
    const item = location.state?.item;
    const Pid = location.state?.Pid;
    const [disabledAdUserTab, setDisabledAdUserTab] = useState(!!item?.pid ? true : false);






    const [
        UserIncomeAndBalance,
        {
            data: getUserIncomeAndBalance,
            isSuccess: isUserIncomeAndBalanceSuccess,
        },
    ] = useUserIncomeAndBalanceMutation();

    useEffect(() => {
        UserIncomeAndBalance({ id: authCtx.clientID });
    }, []);


    useEffect(() => {
        if (!!getUserIncomeAndBalance) {
            setAvailableBalance(!!getUserIncomeAndBalance == true ? getUserIncomeAndBalance?.userAmount - getPayoutWithdrewSum({ invoiceData: getUserIncomeAndBalance?.userPayouts, type: 3 }) - getPayoutWithdrewSum({ invoiceData: getUserIncomeAndBalance?.userPayouts, type: 1 }) : null);
        }
        if (isUserIncomeAndBalanceSuccess) {

        }

    }, [getUserIncomeAndBalance, isUserIncomeAndBalanceSuccess])













    const [form] = Form.useForm();
    const [form1] = Form.useForm();


    const [
        Add,
        {
            data: getAddAssetData,
            isSuccess: isAddAssetSuccess,
        },
    ] = useAddUserPayoutMutation();

    useEffect(() => {

        if (isAddAssetSuccess) {
            dispatch(setLoadingModalConfiguration({ isVisible: false }));
            // onSuccess();
            if (getAddAssetData?.statusCode === 400) {
                alert(getAddAssetData?.message);
            }
            else if (getAddAssetData?.statusCode === 500) {
                alert(getAddAssetData?.message);
            }
            else {

                history.push("PayoutRequest");

            }
        }
    }, [isAddAssetSuccess])







    const onFinish = (values) => {

        if (Number(form.getFieldValue("PayoutAmount")) <= availableBalance) {
            setErrorMessage(null);

            dispatch(setLoadingModalConfiguration({ isVisible: true }));


            const commonProfile = {

                UserXid: authCtx.clientID,
                PayoutAmount: form.getFieldValue("PayoutAmount"),
                UserRemarks: form.getFieldValue("UserRemarks"),
                StatusXid: 1, // this is should be Pending For Approval... dynamic need to check...
                ContactPerson: form.getFieldValue("ContactPerson"),
                //TransfererUserXid: null,


            }
            Add({ data: commonProfile });

        }
        else {
            setshowActionMessage(true);
            setErrorMessage(commonValidationsMsg.PayoutBalanceAmountExceed)
        }

    }

    const onChangeBranch = (e) => {
        setBranchText(e.target.value);
    }
    const onFinishFailed = () => {

    }

    const onClickReset = () => {
        form.setFieldsValue({
            CountryXid: '',
            branchXid: '',
            Address: '',
            Phone: '',
            Mobile: '',
            Fax: '',
            Email: '',
            OfficeType: '',
            ContactPerson: '',
            Title: '',
            Source: '',
        });
    }

    //when te success from th client pop up as user success...
    const onSuccessUser = () => {
        onSuccess();
    }






    const onChange = () => {


    }


    function onMobileKeyPressHandler(event) {
        const res = /[0-9]/i.test(event.key);
        if (res === false) {
            event.preventDefault();
            return res;
        }
        return res;
    }
    const onClickCancel = () => {
        history.push("PayoutRequest");
    }
    return (
        <>
            <div class="container">

                <div class="row">
                    <div class="col-12">

                        <Card title={!!item?.pid ? "Update Payout Request" : "Add Payout Request"}
                            extra={
                                <>
                                    <Button type="Primary" icon={<CloseOutlined></CloseOutlined>} onClick={onClickCancel}>
                                        Cancel
                                    </Button>
                                </>

                            }
                        >
                            <>

                                <div class="row">
                                    <div class="col-4">
                                        Total Income
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-4">
                                        Total Income
                                    </div>
                                    <div class="col-4 text-left">
                                        {!!getUserIncomeAndBalance == true ? getUserIncomeAndBalance?.userAmount : null}
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="col-4">
                                        Total Withdraw
                                    </div>
                                    <div class="col-4 text-left">
                                        {!!getUserIncomeAndBalance == true ? getPayoutWithdrewSum({ invoiceData: getUserIncomeAndBalance?.userPayouts, type: 3 }) : null}
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="col-4">
                                        Withdraw In Progress
                                    </div>
                                    <div class="col-4 text-left">
                                        {!!getUserIncomeAndBalance == true ? getPayoutWithdrewSum({ invoiceData: getUserIncomeAndBalance?.userPayouts, type: 1 }) : null}
                                    </div>

                                </div>
                                <div class="row">
                                    <div class="col-4">
                                        Available Balance
                                    </div>
                                    <div class="col-4 text-left">
                                        {availableBalance}
                                        {/* {!!getUserIncomeAndBalance == true ? getUserIncomeAndBalance?.userAmount - getPayoutWithdrewSum({ invoiceData: getUserIncomeAndBalance?.userPayouts, type: 3 }) - getPayoutWithdrewSum({ invoiceData: getUserIncomeAndBalance?.userPayouts, type: 1 }) : null} */}
                                    </div>

                                </div>
                                <div class="row">
                                    <hr />
                                </div>
                            </>

                            <Form form={form}
                                onFinish={onFinish}
                                onFinishFailed={onFinishFailed}
                                layout="vertical"
                                name="control-hooks"
                                className="row-col"
                            >
                                <div className="row register-form">


                                    <div class="row">
                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <Form.Item
                                                    className="username"
                                                    label="Payout Amount"
                                                    name="PayoutAmount"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: "Please enter the Payout Amount!",
                                                        },
                                                    ]}
                                                >
                                                    <Input
                                                        onKeyPress={onMobileKeyPressHandler}
                                                        placeholder="Payout Amount" />
                                                    {/* <p>Amout should not exceed with the balance Amount</p> */}
                                                </Form.Item>



                                            </div>
                                        </div>


                                    </div>
                                    <div class="row">

                                        <div class="col-md-4">
                                            <div class="form-group">
                                                <Form.Item
                                                    className="username"
                                                    label="User Remarks"
                                                    name="UserRemarks"
                                                    rules={[
                                                        {
                                                            required: false,
                                                            message: "Please enter the User Remarks",
                                                        },
                                                    ]}
                                                >
                                                    <Input placeholder="User Remarks" />

                                                </Form.Item>
                                            </div>
                                        </div>

                                    </div>




                                </div>




                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                    >
                                        {!!item?.pid === true ? "Update Payout Request" : "Submit Payout Request"}
                                    </Button>
                                    <Button
                                        disabled={!!item?.pid === true}
                                        htmlType="button"
                                        onClick={onClickReset}
                                    >
                                        Reset
                                    </Button>
                                </Form.Item>

                            </Form>
                        </Card>
                    </div>
                </div>
            </div >
            {
                !!showActionMessage == true ? <AlertModal
                    onCancel={() => setshowActionMessage(false)}
                    title={errorMessage}></AlertModal> : null
            }
        </>
    );

}

PayoutRequestModal.propTypes = {
    // item: PropTypes.object,
    onCancel: PropTypes.func,
    isModalClosable: PropTypes.bool,
    isModalOpen: PropTypes.bool,
    onSuccess: PropTypes.func,
    onUpdated: PropTypes.func,

}