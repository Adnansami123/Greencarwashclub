import {
    Modal, Form, Button,
    Input,
    Dropdown,
    Select
} from "antd";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { string } from "yup";
import { useAddAssetMutation, usePutAssetMutation } from "../../store/AssetsAPI/AssetsAPI";
import AuthContext from "../../store/authentication/auth-context";
import { useUsersMutation, useAddUserMutation, usePutUserMutation, } from "../../store/ConfigurationAPI/ConfigurationAPI";
import FileUpload from "../CommonComponents/FileUpload";
import { filterRolesOfClient, getExtensionByMIMEType, getImagesData, getRolesFromUserRoles } from "../../utils";
import { MultipleFileUpload, resetCommonMultipleFileUploadStates } from "../../store/Slices/FileUploadSlice";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingModalConfiguration } from "../../store/Slices/ModalLoaderSlice";
import { useAddUserBankMutation } from "../../store/ConfigurationAPI/ConfigurationMLM";


export default function CompanyBranchBank({
    item = {},
    onCancel,
    isModalClosable = true,
    isModalOpen = true,
    onSuccess,
    onUpdated,
    showPopup = true,
    clientIDFromAddClient = 0, // this is used to add the user fromt he client module....
    // if clientIDFromAddClient not equal to 0 then only Client need to show. this is from client module.
    isAdminOnly = false,  // if isAdminOnly true then only Admin need to show. this is from branch

}) {

    const initStates = {
        assetName: "",
        assetTypeName: "",
        subAssetTypeName: "",

    }
    const [states, setStates] = useState(initStates);
    const [APIError, setAPIError] = useState("");
    const dispatch = useDispatch();
    const authCtx = useContext(AuthContext);



    useEffect(() => {
        if (!!item?.pid === false) return;
        const roles = getRolesFromUserRoles({ data: item.roles })
        form.setFieldsValue({
            BankName: item.bankName, 
            AccountNo: item.accountNo,
            BankBranch: item.bankBranch,
            IFSCCode: item.ifscCode,
            BankAddress: item.bankAddress,
            BankUPI: item.bankUPI,
            PayNumber: item.payNumber,

        });
    }, [item])
    const [form] = Form.useForm();
    const [
        AddUser,
        {
            data: getAddData,
            isSuccess: isAddSuccess,
        },
    ] = useAddUserBankMutation();

    useEffect(() => {
        if (isAddSuccess && getAddData?.statusCode == 400) {
            dispatch(setLoadingModalConfiguration({ isVisible: false }));
            setAPIError(getAddData?.message);
        }
        else if (isAddSuccess) {
            dispatch(setLoadingModalConfiguration({ isVisible: false }));
            onSuccess();
        }
    }, [isAddSuccess])


    const onFinish = (values) => {

        if (!!item?.pid) {
            dispatch(setLoadingModalConfiguration({ isVisible: true }));

        }
        else {
            dispatch(setLoadingModalConfiguration({ isVisible: true }));
            let CompanyBranchBank = {
                BankName: form.getFieldValue("BankName"),
                AccountNo: form.getFieldValue("AccountNo"),
                BankBranch: form.getFieldValue("BankBranch"),
                IFSCCode: form.getFieldValue("IFSCCode"),
                BankAddress: form.getFieldValue("BankAddress"),
                BankUPI: form.getFieldValue("BankUPI"),
                PayNumber: form.getFieldValue("PayNumber"),
                UserXid: authCtx.clientID, // user xi id 
                lastEditByXid: authCtx.clientID, /// updated....
            }

            AddUser({ data: CompanyBranchBank });
        }

    }

    const onFinishFailed = () => {

    }




    const onClickReset = () => {

    }

   



    return (
        <>

            <Modal open={isModalOpen} title={!!item?.pid === true ? "Update Bank Details" : "Add Bank Details"} footer={null}
                closable={isModalClosable}
                onCancel={onCancel}>
                <Form form={form}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"
                    name="control-hooks"
                    className="row-col"
                >
                    <div class="col-md-12">{!!APIError === true ? APIError : null}</div>

                    <div className="row register-form">
                        <div class="row">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <Form.Item
                                        className="username"
                                        label="Bank Name"
                                        name="BankName"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter the Bank Name!",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Bank Name" />

                                    </Form.Item>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <Form.Item
                                        className="username"
                                        label="Account No"
                                        name="AccountNo"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter the Account No!",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Account No" />

                                    </Form.Item>
                                </div>
                            </div>

                            <div class="col-md-6">
                                <div class="form-group">
                                    <Form.Item
                                        className="username"
                                        label="Bank Branch"
                                        name="BankBranch"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter the Bank Branch!",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Bank Branch" />

                                    </Form.Item>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <Form.Item
                                        className="username"
                                        label="IFSC Code"
                                        name="IFSCCode"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter the IFSC Code!",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="IFSC Code" />

                                    </Form.Item>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <Form.Item
                                        className="username"
                                        label="Bank Address"
                                        name="BankAddress"
                                    // rules={[
                                    //     {
                                    //         required: true,
                                    //         message: "Please enter the Bank Address!",
                                    //     },
                                    // ]}
                                    >
                                        <Input placeholder="Bank Address" />

                                    </Form.Item>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <Form.Item
                                        className="username"
                                        label="Bank UPI"
                                        name="BankUPI"
                                    // rules={[
                                    //     {
                                    //         required: true,
                                    //         message: "Please enter the Bank Address!",
                                    //     },
                                    // ]}
                                    >
                                        <Input placeholder="Bank UPI" />

                                    </Form.Item>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <Form.Item
                                        className="username"
                                        label="GPay/Phone Pay"
                                        name="PayNumber"
                                    // rules={[
                                    //     {
                                    //         required: true,
                                    //         message: "Please enter the Bank Address!",
                                    //     },
                                    // ]}
                                    >
                                        <Input placeholder="GPay/Phone Pay" />

                                    </Form.Item>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="form-group">
                                        <Form.Item>
                                            <Button
                                                type="primary"
                                                htmlType="submit"
                                            >
                                                {!!item?.assetName === true ? "Update" : "Register"}
                                            </Button>
                                            <Button

                                                htmlType="button"
                                                onClick={onClickReset}
                                            >
                                                Cancel
                                            </Button>
                                        </Form.Item>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </Modal>

        </>
    );

}

CompanyBranchBank.propTypes = {
    item: PropTypes.object,
    onCancel: PropTypes.func,
    isModalClosable: PropTypes.bool,
    isModalOpen: PropTypes.bool,
    onSuccess: PropTypes.func,
    onUpdated: PropTypes.func,
    showPopup: PropTypes.bool,
    clientIDFromAddClient: PropTypes.number,  // if clientIDFromAddClient not equal to 0 then only Client need to show. this is from client module.
    isAdminOnly: PropTypes.bool,  // if isAdminOnly true then only Admin need to show. this is from branch


}