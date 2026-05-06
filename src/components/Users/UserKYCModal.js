import {
    Modal, Form, Button,
    Input,
    Select
} from "antd";
import PropTypes from "prop-types";
import { useCallback, useContext, useEffect, useState } from "react";
import { string } from "yup";
import AuthContext from "../../store/authentication/auth-context";
import { useAddAssetCategoryMutation, useAddCheckListItemMutation, usePutAssetCategoryMutation, usePutCheckListItemMutation } from "../../store/ConfigurationAPI/ConfigurationAPI";
import FileUpload from "../CommonComponents/FileUpload";
import { filterRemovedFiles, getExtensionByMIMEType } from "../../utils";
import { useAddUserKYCInfoMutation, useAddUserProofImagesMutation } from "../../store/ConfigurationAPI/ConfigurationMLM";
import { ContractImages } from "../../models/AssetModel";
import { setLoadingModalConfiguration } from "../../store/Slices/ModalLoaderSlice";
import { MultipleFileUpload } from "../../store/Slices/FileUploadSlice";
import { useDispatch } from "react-redux";
import AlertModal from "../../Modals/Alert";

export default function UserKYCModal({
    item = {},
    onCancel,
    isModalClosable = true,
    isModalOpen = true,
    onSuccess,
    onUpdated,

}) {


    const dispatch = useDispatch();
    const authCtx = useContext(AuthContext);

    const [showImageError, setShowImageError] = useState(false);
    const [errorMessage, setEerrorMessage] = useState("");
    const [allFilesAadhaar, setAllFilesAadhaar] = useState([]);
    const [showActionMessage, setshowActionMessage] = useState(false);

    const [addorUpdateImages, setAddorUpdateImages] = useState(false);

    const [allFilesPAN, setAllFilesPAN] = useState([]);
    const { TextArea } = Input;

    useEffect(() => {
        if (!!item?.pid === false) return;
        form.setFieldsValue({ NameEng: item.nameEng });
    }, [item])
    const [form] = Form.useForm();

    const [
        Add,
        {
            data: getAddAssetData,
            isSuccess: isAddSuccess,
        },
    ] = useAddUserKYCInfoMutation();

    useEffect(() => {

        if (isAddSuccess) {
            setAddorUpdateImages(true);
            //  onSuccess();
        }
    }, [isAddSuccess])



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
            else {
                dispatch(setLoadingModalConfiguration({ isVisible: false }));
            }
        }

    }, [isAddAssetImagesSuccess]);

    /// uploading images

    useEffect(() => {
        const itemObj = [];
        if (addorUpdateImages) {
            allFilesAadhaar.file.fileList.forEach((el, index) => {
                let AssetImagesObj;
                if (el?.isOld !== true) {
                    AssetImagesObj = { ...ContractImages.ContractImagesArray[index] };
                    //const AssetImagesObj=null;
                    AssetImagesObj.UserXid = authCtx.clientID;
                    AssetImagesObj.KYCInfoXid = getAddAssetData?.details[0].pid;
                    /// here we need to check on update alo we are getting the id or not
                    AssetImagesObj.Contract = null;
                    AssetImagesObj.typeOfDoc = "Aadhaar";
                    AssetImagesObj.savedName = el.uid + getExtensionByMIMEType({ fileName: allFilesAadhaar.file.fileList[index].type });;
                    AssetImagesObj.originalName = el.name;
                    AssetImagesObj.imagePath = "string";
                    AssetImagesObj.docExtension = el.type;
                    AssetImagesObj.lastEditByXid = authCtx.clientID;
                    itemObj.push(AssetImagesObj);
                }
            });

            allFilesPAN.file.fileList.forEach((el, index) => {
                let AssetImagesObj;
                if (el?.isOld !== true) {
                    AssetImagesObj = { ...ContractImages.ContractImagesArray[index] };
                    //const AssetImagesObj=null;
                    AssetImagesObj.UserXid = authCtx.clientID;
                    AssetImagesObj.KYCInfoXid = getAddAssetData?.details[1].pid;;
                    /// here we need to check on update alo we are getting the id or not
                    AssetImagesObj.Contract = null;
                    AssetImagesObj.typeOfDoc = "PAN";
                    AssetImagesObj.savedName = el.uid + getExtensionByMIMEType({ fileName: allFilesPAN.file.fileList[index].type });;
                    AssetImagesObj.originalName = el.name;
                    AssetImagesObj.imagePath = "string";
                    AssetImagesObj.docExtension = el.type;
                    AssetImagesObj.lastEditByXid = authCtx.clientID;
                    itemObj.push(AssetImagesObj);
                }
            });

            AddAssetImages({ data: itemObj });
        }
    }, [addorUpdateImages])
    // edn here
    const [
        put,
        {
            data: getPutData,
            isSuccess: isPutSuccess,
        },
    ] = usePutAssetCategoryMutation();

    useEffect(() => {
        if (isPutSuccess) {
            onUpdated();
        }
    }, [getPutData])

    const onFinish = (values) => {
        if (!!allFilesAadhaar?.file && !!allFilesPAN?.file) {
            if (!!item.pid) {
                // let data = {
                //     nameEng: form.getFieldValue("NameEng"),
                //     NameAra: form.getFieldValue("NameEng"),
                //     companyXid: authCtx.companyID,
                //     lastEditByXid: authCtx.clientID,
                //     pid: item.pid,
                // };
                // put({ data: data });
            }
            else {
                dispatch(setLoadingModalConfiguration({ isVisible: true }));
                let UserBankArray = [
                    {
                        UserXid: authCtx.clientID,
                        KCYType: "Aadhar",
                        KYCTypeNumber: form.getFieldValue("Aadhaar"),
                        ReferenceNumber: '34343',
                        StatusXid: 1,
                        lastEditByXid: authCtx.clientID,
                        //  pid: !!item.pid === true ? item.pid : null
                    },
                    {
                        UserXid: authCtx.clientID,
                        KCYType: "PAN",
                        KYCTypeNumber: form.getFieldValue("PAN"),
                        ReferenceNumber: '343433232',
                        StatusXid: 1,
                        lastEditByXid: authCtx.clientID,
                        //  pid: !!item.pid === true ? item.pid : null
                    }
                ]
                Add({ data: UserBankArray });

            }
        }
        else {
            setEerrorMessage("Please Uplooad the Aadhar & PAN Proofs");
            setShowImageError(true);
        }

    }

    const onFinishFailed = () => {

    }

    const onClickReset = () => {
        form.setFieldsValue({ NameEng: '' });
    }




    useEffect(
        function Assets() {
            fetch({

                id: authCtx.companyID,
            });

        }, [fetch]);

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


    function onMobileKeyPressHandler(event) {
        const res = /[0-9]/i.test(event.key);
        if (res === false) {
            event.preventDefault();
            return res;
        }
        return res;
    }

    const OnSuccessHandlerRegister = () => {

        onSuccess();
    }

    return (
        <>
            <Modal open={isModalOpen} title={!!item?.pid === true ? "Update KYC" : "Add KYC"} footer={null}
                closable={isModalClosable}
                onCancel={onCancel}
                maskClosable={false}

            >
                <div>
                    <Form form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        layout="vertical"
                        name="control-hooks"
                        className="row-col"
                    >


                        <div class="col-md-12">
                            <div class="form-group">
                                <Form.Item
                                    className="username"
                                    label="Aadhaar"
                                    name="Aadhaar"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter the Aadhaar Number!",
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
                        <div class="col-md-12">
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
                        <div class="col-md-12">
                            <div class="form-group">
                                <Form.Item
                                    className="username"
                                    label="PAN"
                                    name="PAN"
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter the PAN NUmber!",
                                        },
                                    ]}

                                >
                                    <Input maxLength={10} placeholder="PAN" />
                                </Form.Item>

                            </div>
                        </div>
                        <div class="col-md-12">
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
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                            >
                                {!!item?.pid === true ? "Update" : "Add"}
                            </Button>
                            <Button

                                htmlType="button"
                                disabled={!!item?.pid === true}
                                onClick={onClickReset}
                            >
                                Reset
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                <>
                    {
                        !!showActionMessage == true ? <AlertModal
                            onCancel={() => OnSuccessHandlerRegister()}
                            title={"KYC Added Successful!"}></AlertModal> : null
                    }
                    {!!showImageError == true ? <AlertModal onCancel={() => {
                        setShowImageError(false);
                    }} title={errorMessage}></AlertModal> : null
                    }
                </>
            </Modal>
        </>
    );

}

UserKYCModal.propTypes = {
    item: PropTypes.object,
    onCancel: PropTypes.func,
    isModalClosable: PropTypes.bool,
    isModalOpen: PropTypes.bool,
    onSuccess: PropTypes.func,
    onUpdated: PropTypes.func,

}