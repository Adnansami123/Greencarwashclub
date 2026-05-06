import {
    Modal, Form, Button,
    Input,
    Select,
    Row,
    Col,
    Card,
    theme,
    Radio
} from "antd";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { string } from "yup";
import { useAddAssetMutation, usePutAssetMutation } from "../../store/AssetsAPI/AssetsAPI";
import { useBranchByCountryIDMutation, useBranchesMutation, useCountriesMutation, useStateNamesMutation } from "../../store/BranchesAPI/BranchesAPI";
import { useAddCommonCompanyMutation, useAddTemplateMutation } from "../../store/ConfigurationAPI/ConfigurationAPI";
import { Tabs } from 'antd';
import AuthContext from "../../store/authentication/auth-context";
import CompanyBranchBank from "./CompanyBranchBank";
import ConfirmationModal from "../../DeleteModal/Confirmation";
import Strings from "../../utils/Strings";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";

import AlertModal from "../../Modals/Alert";
import { setLoadingModalConfiguration } from "../../store/Slices/ModalLoaderSlice";
import { useDispatch } from "react-redux";
import FileUpload from "../CommonComponents/FileUpload";
import { MultipleFileUpload } from "../../store/Slices/FileUploadSlice";
import { filterRemovedFiles, getExtensionByMIMEType } from "../../utils";
import { useGetAllInventoriesMutation } from "../../store/InventoryAPI/InventoryAPI";
import { ContractImages } from "../../models/AssetModel";
import { useAddUserProofImagesMutation } from "../../store/ConfigurationAPI/ConfigurationMLM";
import { cartStateActions } from "../../store/authentication";
import {
    DownloadOutlined, PlusCircleOutlined,
    FormOutlined,
    UserDeleteOutlined,
    DeleteOutlined,
    UndoOutlined,
} from '@ant-design/icons';
export default function CompanyModalOld({
    item = {},
    onCancel,
    onSuccess,
    onUpdated,
}) {

    const dispatch = useDispatch();
    const location = useLocation();


    const [addorUpdateImages, setAddorUpdateImages] = useState(false);
    const [showOkModal, setShowOkModal] = useState(false);
    const history = useHistory();
    const [showActionMessage, setshowActionMessage] = useState(false);
    const [transactionType, setTransactionType] = useState("");
    const [showDelete, setShowDelete] = useState(false);
    const stateData = location.state?.stateData;

    useEffect(() => {
        if (!!stateData) {
            form.setFieldsValue({
                UnderUserXid: stateData.userXid,
                ReferralCode: stateData.referralCode,
            });
        }

        // here updating the UnderUserXID....
        dispatch(cartStateActions.setUnderUserXid({ UnderUserXid: stateData.userXid }));

    }, [stateData])
    const initialStates = {
        ViewTitle: "",
        AddButton: "",
        AddTitle: "",
        EditTitle: "",
        formURLView: "",
        formURLAdd: "",
        formURLEdit: "",
        companyBranchConfig: {},
        form: {},
    }

    const [initialState, setInitialState] = useState(initialStates);
    const [states, setStates] = useState(initialStates);
    const URLPathName = useLocation().pathname.replace("/", "");





    //end here..



    useEffect(() => {

        if (URLPathName === "AddCompany") {
            setStates({
                ...states,
                ViewTitle: Strings.company.company.Add.ViewTitle,
                formURLView: Strings.company.company.Add.formURLView,
                form: {
                    companyName: Strings.company.company.form.companyName,
                    showArabicCompanyField: Strings.company.company.form.showArabicCompanyField,
                    companyAddress: Strings.company.company.form.companyAddress,
                    //   companyAddress: Strings.company.company.Add.AfterPublicSuccess,
                }

            });
        }
        else {
            setStates({
                ...states,
                ViewTitle: Strings.company.company.Register.ViewTitle,
                formURLView: Strings.company.company.Register.formURLView,
                form: {
                    companyName: Strings.company.company.form.companyName,
                    showArabicCompanyField: Strings.company.company.form.showArabicCompanyField,
                    companyAddress: Strings.company.company.form.companyAddress,
                    // companyAddress: Strings.company.company.Add.AfterPublicSuccess,
                    // companyAddress: Strings.company.company.Add.AfterPublicSuccess,

                }

            });
        }
        form.setFieldsValue({
            prefix: Strings.company.companyBranchConfig.prefix,
            ClientPrefix: Strings.company.companyBranchConfig.clientPrefix,
            ContractPrefix: Strings.company.companyBranchConfig.contractPrefix,
            SubContractPrefix: Strings.company.companyBranchConfig.subContractPrefix,
            ReporttPrefix: Strings.company.companyBranchConfig.reportPrefix,
            ClientRefNumber: Strings.company.companyBranchConfig.clientRefNumber,
            ContractRefNumber: Strings.company.companyBranchConfig.contractRefNumber,
            ReportRefNumber: Strings.company.companyBranchConfig.reportRefNumber,

        });

    }, [URLPathName])



    const { token } = theme.useToken();
    const formStyle = {
        maxWidth: 'none',
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        padding: 24,
    };

    const BTFSAuthCtx = useContext(AuthContext);

    useEffect(() => {
        if (!!item[0]?.pid === false) return;

        fetchBranches({ countryid: item[0]?.countryXid, });

        form.setFieldsValue({
            nameEng: item[0].nameEng,
            nameAra: item[0].nameAra,
            //  CountryXid: item[0].countryXid,
            Address: item[0].address,
            mobile: item[0].companyBranches[0].mobile,
            POBox: item[0].companyBranches[0].poBox,
            fax: item[0].companyBranches[0].fax,
            branchEmail: item[0].companyBranches[0].email,
            BranchWebsite: item[0].companyBranches[0].webSite,
            branchXid: item[0].companyBranches[0].branchXid,
            ARN: item[0].companyBranches[0].arn,
            PAN: item[0].companyBranches[0].pan,
            StateXid: item[0].companyBranches[0].stateXid,

            //user details...
            firstName: item[0].companyBranches[0]?.userCompanies[0]?.user?.firstName,
            lastName: item[0].companyBranches[0]?.userCompanies[0]?.user?.lastName,
            userName: item[0].companyBranches[0]?.userCompanies[0]?.user?.userName,
            userMobile: item[0].companyBranches[0]?.userCompanies[0]?.user?.mobile,

            //Company confiugration
            prefix: item[0].companyBranches[0]?.companyBranchConfigurations?.prefix,
            ClientPrefix: item[0].companyBranches[0]?.companyBranchConfigurations.clientPrefix,
            ContractPrefix: item[0].companyBranches[0]?.companyBranchConfigurations.contractPrefix,
            SubContractPrefix: item[0].companyBranches[0]?.companyBranchConfigurations.subContractPrefix,
            ReporttPrefix: item[0].companyBranches[0]?.companyBranchConfigurations.reporttPrefix,
            ClientRefNumber: item[0].companyBranches[0]?.companyBranchConfigurations.clientRefNumber,
            ContractRefNumber: item[0].companyBranches[0]?.companyBranchConfigurations.contractRefNumber,
            ReportRefNumber: item[0].companyBranches[0]?.companyBranchConfigurations.reportRefNumber,


            //Company Bank Details....
            BankName: item[0].companyBranches[0]?.companyBranchBanks[0]?.bankName,
            AccountNo: item[0].companyBranches[0]?.companyBranchBanks[0]?.accountNo,
            BankBranch: item[0].companyBranches[0]?.companyBranchBanks[0]?.bankBranch,
            IFSCCode: item[0].companyBranches[0]?.companyBranchBanks[0]?.iFSCCode,
            BankAddress: item[0].companyBranches[0]?.companyBranchBanks[0]?.bankAddress,

        });
    }, [item])
    const [form] = Form.useForm();

    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [
        Add,
        {
            data: getAddAssetData,
            isSuccess: isAddAssetSuccess,
        },
    ] = useAddCommonCompanyMutation();

    // useEffect(() => {
    //     if (error) {
    //         setTimeout(function () {
    //             setError(false);
    //             setErrorMessage("");
    //         }, 6000);
    //     }

    // }, [error])

    useEffect(() => {
        if (isAddAssetSuccess) {
            if (getAddAssetData?.statusCode === 500) {
                dispatch(setLoadingModalConfiguration({ isVisible: false }));
                setError(true);
                setErrorMessage(getAddAssetData?.message);
            }
            else if (getAddAssetData?.statusCode === 400) {
                dispatch(setLoadingModalConfiguration({ isVisible: false }));
                setError(true);
                setErrorMessage(getAddAssetData?.message);
            }
            else if (getAddAssetData?.statusCode === 200) {
                //checking if file already exists... thne 
                // if (!!allFilesAadhaar?.file) {
                //     setAddorUpdateImages(true);
                // }
                // else {
                    dispatch(setLoadingModalConfiguration({ isVisible: false }));
                    setshowActionMessage(true);
              //  }

            }
        }
    }, [getAddAssetData, isAddAssetSuccess])


    //adding contract iamges....
    const [
        AddAssetImages,
        {
            data: getAddAssetImageData,
            isSuccess: isAddAssetImagesSuccess,
        },
    ] = useAddUserProofImagesMutation();



    useEffect(() => {
        if (isAddAssetImagesSuccess) {
            /// here callingt the file upload...
            // here uploading the images...
            //here checking if any file is exists....
            if (!!allFilesAadhaar?.file || !!allFilesPAN?.file) {
                var bodyFormSetData = new FormData();
                bodyFormSetData.append("Entity", "AssetImage");
                bodyFormSetData.append("EntityType", "AssetImage");
                let customIndex = 0;
                if (!!allFilesAadhaar?.file) {

                    allFilesAadhaar?.file?.fileList.forEach((file, index) => {                      
                        bodyFormSetData.append("FileDetails[" + customIndex + "].TypeOfDoc", file.type);
                        bodyFormSetData.append("FileDetails[" + customIndex + "].OriginalName", file.name);
                        bodyFormSetData.append("FileDetails[" + customIndex + "].ImagePath", "");
                        bodyFormSetData.append("FileDetails[" + customIndex + "].DocExtension", file.type);
                        bodyFormSetData.append("FileDetails[" + customIndex + "].ExistingFileName", file.name);
                        bodyFormSetData.append("FileDetails[" + customIndex + "].FileNameGuid", file.uid + getExtensionByMIMEType({ fileName: file.type }));
                        bodyFormSetData.append("FileDetails[" + customIndex + "].Blob", file.originFileObj);
                        customIndex = customIndex + 1;
                    });
                }
                if (!!allFilesPAN?.file) {
                    allFilesPAN?.file?.fileList.forEach((file, index) => {                      
                        bodyFormSetData.append("FileDetails[" + customIndex + "].TypeOfDoc", file.type);
                        bodyFormSetData.append("FileDetails[" + customIndex + "].OriginalName", file.name);
                        bodyFormSetData.append("FileDetails[" + customIndex + "].ImagePath", "");
                        bodyFormSetData.append("FileDetails[" + customIndex + "].DocExtension", file.type);
                        bodyFormSetData.append("FileDetails[" + customIndex + "].ExistingFileName", file.name);
                        bodyFormSetData.append("FileDetails[" + customIndex + "].FileNameGuid", file.uid + getExtensionByMIMEType({ fileName: file.type }));
                        bodyFormSetData.append("FileDetails[" + customIndex + "].Blob", file.originFileObj);
                        customIndex = customIndex + 1;
                    });
                }



                dispatch(MultipleFileUpload({ data: bodyFormSetData }));

                dispatch(setLoadingModalConfiguration({ isVisible: false }));
                setshowActionMessage(true);
            }
        }

    }, [isAddAssetImagesSuccess]);
    //after images upload ... redirect to 

    useEffect(() => {
        const itemObj = [];
        if (addorUpdateImages) {
            allFilesAadhaar.file.fileList.forEach((el, index) => {
                let AssetImagesObj;
                if (el?.isOld !== true) {
                    AssetImagesObj = { ...ContractImages.ContractImagesArray[index] };
                    //const AssetImagesObj=null;
                    AssetImagesObj.UserXid = getAddAssetData?.details;
                    /// here we need to check on update alo we are getting the id or not
                    AssetImagesObj.Contract = null;
                    AssetImagesObj.typeOfDoc = "Aadhaar";
                    AssetImagesObj.savedName = el.uid + getExtensionByMIMEType({ fileName: allFilesAadhaar.file.fileList[index].type });;
                    AssetImagesObj.originalName = el.name;
                    AssetImagesObj.imagePath = "string";
                    AssetImagesObj.docExtension = el.type;
                    AssetImagesObj.lastEditByXid = 9999;
                    itemObj.push(AssetImagesObj);
                }
            });

            allFilesPAN.file.fileList.forEach((el, index) => {
                let AssetImagesObj;
                if (el?.isOld !== true) {
                    AssetImagesObj = { ...ContractImages.ContractImagesArray[index] };
                    //const AssetImagesObj=null;
                    AssetImagesObj.UserXid = getAddAssetData?.details;
                    /// here we need to check on update alo we are getting the id or not
                    AssetImagesObj.Contract = null;
                    AssetImagesObj.typeOfDoc = "PAN";
                    AssetImagesObj.savedName = el.uid + getExtensionByMIMEType({ fileName: allFilesPAN.file.fileList[index].type });;
                    AssetImagesObj.originalName = el.name;
                    AssetImagesObj.imagePath = "string";
                    AssetImagesObj.docExtension = el.type;
                    AssetImagesObj.lastEditByXid = 9999;
                    itemObj.push(AssetImagesObj);
                }
            });

            AddAssetImages({ data: itemObj });
        }
    }, [addorUpdateImages])


    const [
        putAsset,
        {
            data: getPutAssetData,
            isSuccess: isPutAssetSuccess,
        },
    ] = usePutAssetMutation();

    useEffect(() => {

    }, [getPutAssetData])




    const [
        fetchBranches,
        {
            data: getBranchesData,
            isSuccess: isGetBranchesSuccess,
        },
    ] = useBranchByCountryIDMutation();


    const [
        fetchStateNames,
        {
            data: getStateNamesData,
            isSuccess: isGetStateNamesSuccess,
        },
    ] = useStateNamesMutation();



    useEffect(() => {
        fetchBranches({ countryid: 1, });
    }, [fetchBranches]);

    // useEffect(() => {
    //     fetchStateNames({ id: "1", });
    // }, []);




    const onFinish = (values) => {
        dispatch(setLoadingModalConfiguration({ isVisible: true }));
        const commonCompany = {
            User: {
                firstName: form.getFieldValue("FirstName"),
                lastName: form.getFieldValue("LastName"),
                Gender: "M",
                userName: form.getFieldValue("userName"),
                email: form.getFieldValue("userName"),
                mobile: form.getFieldValue("userMobile"),
                password: "test11",
                lastEditByXid: 9999,
                NewUnderUserXid: form.getFieldValue("UnderUserXid"), // this is under user id.....
            },
            CompanyBranchBank: {
                BankName: '',
                AccountNo: '',
                BankBranch: '',
                IFSCCode: '',
                BankAddress: '',
                lastEditByXid: '',
            },
            UserPurchase: {
                UnderUserXid: '',
                //   ProductXid: form.getFieldValue("ProductXid"),
                ProductXid: 1, // we need to remove or add another table underxid purpphose 
                // or we need to integer same....
                lastEditByXid: 9999
            }

        }

        Add({ data: commonCompany });



    }

    const onChange = () => {

    }
    const onFinishFailed = () => {

    }

    const onClickReset = () => {
        form.setFieldsValue({ templateName: '' });
    }

    const onDeleteConfirm = async () => {
        setShowDelete(false);
    }

    const [tabActiveKey, setTabActiveKey] = useState("1");
    const [disableAssetTabs, setDisableAssetTabs] = useState(true);

    const onClickOK = () => {
        // setShowOkModal(false);
        // setShowSourceFolio(true);
    };


    const [allFilesAadhaar, setAllFilesAadhaar] = useState([]);
    const [allFilesPAN, setAllFilesPAN] = useState([]);

    const OnSuccessHandler = (e) => {
        setAllFilesAadhaar(e);
    }

    const OnSuccessHandlerNew = (e) => {
        if (e.type == "aadhar") {
            setAllFilesAadhaar(e.e);
        }
        else if (e.type == "pan") {
            setAllFilesPAN(e.e);
        }
    }

    const OnRemoveHandler = (e) => {
        if (e.type == "aadhar") {
            const filterFiles = filterRemovedFiles({ data: allFilesAadhaar, removeUID: e.e.file.file.uid })
            setAllFilesAadhaar(filterFiles);

        }
        else if (e.type == "pan") {
            const filterFiles = filterRemovedFiles({ data: allFilesPAN, removeUID: e.e.file.file.uid })
            setAllFilesPAN(filterFiles);
        }


    }

    const OnSuccessHandlerRegister = () => {

        //here updating the details.....
        dispatch(cartStateActions.setUserXID({ UserXid: getAddAssetData?.details }));
        //after successful... 
        //redirecting to product page...
        /// here session will be added......              
       // history.push("Products", { userXid: getAddAssetData?.details });
       history.push("RegisterSuccess");
    }

    function onMobileKeyPressHandler(event) {
        const res = /[0-9]/i.test(event.key);
        if (res === false) {
            event.preventDefault();
            return res;
        }
        return res;
    }
    return (
        <>

            <div class="container">

                <Card
                    bordered={false}
                    className="criclebox tablespace mb-24"
                    title={states.ViewTitle}
                >
                    {/* <div class="card px-0 pt-4 pb-0 mt-3 mb-3 bg-white">
                        <ul id="progressbar">
                            <li class="active" id="account"><strong>Account</strong></li>
                            <li id="personal"><strong>Product Purchase</strong></li>
                            <li id="payment"><strong>Payment</strong></li>
                            <li id="confirm"><strong>Finish</strong></li>
                        </ul>
                    </div> */}
                    <>
                        {error ? <><div>Error occurred : {errorMessage}</div></> : null}

                        <Form form={form}
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            style={formStyle}
                            layout="vertical"
                            name="control-hooks"
                            className="row-col"
                        >
                            <>
                                <div className="row register-form">
                                    <div className="row register-form">
                                        <div class="row bg-primary">
                                            <div class="col-16">
                                                REFERRAL DETAILS
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <Form.Item
                                                className="username"
                                                label="User Reference"
                                                name="UnderUserXid"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Please enter the User Referral Code!",
                                                    },
                                                ]}
                                            >
                                                <Input readOnly={true} placeholder=" User Referral Code" />

                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <Form.Item
                                                className="username"
                                                label="Referral Code"
                                                name="ReferralCode"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Please enter the User Referral Code!",
                                                    },
                                                ]}
                                            >
                                                <Input readOnly={true} placeholder=" User Referral Code" />

                                            </Form.Item>
                                        </div>
                                    </div>


                                    <div className="row register-form">
                                        <div class="row bg-primary">
                                            <div class="col-16">
                                                PERSONAL DETAILS
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <Form.Item
                                                className="username"
                                                label="First Name"
                                                name="FirstName"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Please enter the First Name!",
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="First Name" />

                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <Form.Item
                                                className="username"
                                                label="Last Name"
                                                name="LastName"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Please enter the Last Name!",
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="Last Name" />

                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <Form.Item
                                                className="username"
                                                label="Mobile"
                                                name="userMobile"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Please enter the User Mobile!",
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="User Mobile" />

                                            </Form.Item>

                                        </div>
                                    </div>

                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <Form.Item
                                                className="username"
                                                label="Email ID"
                                                name="userName"
                                                rules={[
                                                    {
                                                        required: true,
                                                        type: "email",
                                                        message: "Please enter the valid Email ID!",
                                                    },
                                                ]}
                                            >
                                                <Input placeholder="User Name/Email ID" />

                                            </Form.Item>
                                        </div>
                                    </div>





                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <Form.Item
                                                className="username"
                                                label="City"
                                                name="branchXid"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Please select the City!",
                                                    },
                                                ]}
                                            >
                                                <Select placeholder="City">
                                                    {getBranchesData?.map((a) =>
                                                    (
                                                        <option key={a.pid} value={a.pid}>{a.nameEng}</option>
                                                    ))}
                                                </Select>

                                            </Form.Item>
                                        </div>
                                    </div>
                                    <div class="col-md-6">
                                        <div class="form-group">
                                            <Form.Item
                                                className="username"
                                                label="Address"
                                                name="Address"
                                            >
                                                <Input placeholder="Address" />
                                            </Form.Item>
                                        </div>
                                    </div>

                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <Form.Item
                                                className="username"
                                                label="Aadhaar"
                                                name="Aadhaar"
                                                rules={[
                                                    {
                                                        required: true,
                                                        message: "Please enter the User Aadhaar!",
                                                    },
                                                ]}
                                            >
                                                <Input
                                                    onKeyPress={onMobileKeyPressHandler}
                                                    maxLength={12}
                                                    placeholder="Aadhaar" />
                                            </Form.Item>

                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">
                                            <FileUpload
                                                onSuccess={(e) => OnSuccessHandlerNew({ e: e, type: "aadhar" })}
                                                onRemove={(e) => OnRemoveHandler({ e: e, type: "aadhar" })}
                                                heading={"Upload Aadhaar"}
                                                accept={"image/*"}
                                                fileList={allFilesAadhaar?.file?.fileList}
                                                maxCount={1}
                                                hideUploadButton={false}
                                                showRemoveIcon={true}
                                            ></FileUpload>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="form-group">
                                            <Form.Item
                                                className="username"
                                                label="PAN"
                                                name="PAN"

                                            >
                                                <Input maxLength={10} placeholder="PAN" />
                                            </Form.Item>

                                        </div>
                                    </div>
                                    <div class="col-md-2">
                                        <div class="form-group">

                                            <FileUpload
                                                // onSuccess={(e) => OnSuccessHandler(e)}
                                                onSuccess={(e) => OnSuccessHandlerNew({ e: e, type: "pan" })}
                                                onRemove={(e) => OnRemoveHandler({ e: e, type: "pan" })}
                                                heading={"Upload PAN"}
                                                accept={"image/*"}
                                                fileList={allFilesPAN?.file?.fileList}
                                                maxCount={1}
                                                hideUploadButton={false}
                                                showRemoveIcon={true}
                                            ></FileUpload>
                                        </div>
                                    </div>

                                </div>
                            </>
                            <div className="row register-form">
                                <div class="row bg-primary">
                                    <div class="col-12">
                                        USER  BANK DETAILS
                                    </div>
                                </div>
                            </div>
                            <div className="row register-form">
                                <div class="row">
                                    <div class="col-12">
                                        <CompanyBranchBank
                                            // onSuccess={() => onSuccessUser()}
                                            //  onUpdated={() => onUpdatedUser()}
                                            //  item={!!getUserBYIDData ? getUserBYIDData : null}
                                            showPopup={false}
                                            // clientIDFromAddClient={!!item.pid ? item.pid : getAddAssetData?.details}
                                            isAdminOnly={true}
                                        ></CompanyBranchBank>
                                    </div>
                                </div>
                            </div>
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
                        </Form>
                    </>
                </Card>


            </div >
            {!!error == true ? <AlertModal onCancel={() => {
                setError(false);
            }} title={errorMessage}></AlertModal> : null
            }
            {
                !!showActionMessage == true ? <AlertModal
                    onCancel={() => OnSuccessHandlerRegister()}
                    title={"Registration Successful!"}></AlertModal> : null
            }
        </>
    );

}

CompanyModalOld.propTypes = {
    item: PropTypes.object,
    onCancel: PropTypes.func,
    isModalClosable: PropTypes.bool,
    isModalOpen: PropTypes.bool,
    onSuccess: PropTypes.func,
    onUpdated: PropTypes.func,

}