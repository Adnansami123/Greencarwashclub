import {
    Modal, Form, Button,
    Input,
    Dropdown,
    Select
} from "antd";
import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { string } from "yup";
import AuthContext from "../../store/authentication/auth-context";
import { useBranchesMutation } from "../../store/BranchesAPI/BranchesAPI";
import {  useAddUserMutation, useGetRolesMutation, usePutUserMutation, useDownloadImagesMutation, useDownloadImagesPassBlobMutation } from "../../store/ConfigurationAPI/ConfigurationAPI";
import FileUpload from "../CommonComponents/FileUpload";
import { filterRolesOfClient, getExtensionByMIMEType, getImagesData, getRolesFromUserRoles } from "../../utils";
import { MultipleFileUpload, resetCommonMultipleFileUploadStates } from "../../store/Slices/FileUploadSlice";
import { useDispatch, useSelector } from "react-redux";
import { setLoadingModalConfiguration } from "../../store/Slices/ModalLoaderSlice";


export default function UserModal({
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
    const [APIError, setAPIError] = useState("");
    console.log("clientIDFromAddClient", clientIDFromAddClient);
    const dispatch = useDispatch();

    const [allFiles, setAllFiles] = useState([]);
    const authCtx = useContext(AuthContext);
    const { data: uploadData, code, error } = useSelector((state) => state.CommonMultipleFileUPloadSlice);
    useEffect(() => {
        if (!error && !!uploadData) {
            dispatch(resetCommonMultipleFileUploadStates());
            onSuccess();
        }
    }, [uploadData, error])
    const [
        fetchBranches,
        {
            data: getBranchesData,
            isSuccess: isGetBranchesSuccess,
        },
    ] = useBranchesMutation();

    useEffect(
        function fetchBranchesFuction() {

            fetchBranches()

        }, [fetchBranches]);


    const [
        fetchRoles,
        {
            data: getFetchRolesData,
            isSuccess: isFetchRolesSuccess,
        },
    ] = useGetRolesMutation();


    useEffect(
        function fetchRolesFuction() {

            fetchRoles()

        }, [fetchRoles]);

    const [rolesData, setRolesData] = useState([]);
    useEffect(() => {

        setRolesData(filterRolesOfClient({ data: getFetchRolesData, isOnlyClient: clientIDFromAddClient === 0 ? false : true, showAdminOnly : isAdminOnly }));
    }, [getFetchRolesData])


    const [
        fetchImages,
        {
            data: getfetchBarCodeData,
            isSuccess: isFetchfetchBarCodeSuccess,
        },
    ] = useDownloadImagesPassBlobMutation();

    useEffect(() => {
        if (!!getfetchBarCodeData) {
            const fileNew = {
                file: {
                    fileList: [{
                        uid: item.imageName,
                        name: item.imageName,
                        status: "done",
                        //  url: "https://btfsstorage.blob.core.windows.net/filecontainer/" + item.imagePath,
                        url: URL.createObjectURL(getfetchBarCodeData),
                    }]
                }
            };
            setAllFiles(fileNew);
        }
    }, [isFetchfetchBarCodeSuccess, getfetchBarCodeData])


    useEffect(() => {
        if (!!item?.pid === false) return;
        const roles = getRolesFromUserRoles({ data: item.roles })
        form.setFieldsValue({
            userName: item.firstName, lastName: item.firstName,
            email: item.email,
            mobile: item.mobile,
            RoleXid: getRolesFromUserRoles({ data: item.roles }),
        });
        if (!!item.imageName) {
            let data = {
                //fileName: e.key,
                fileName: item.imagePath,
                entityType: "AssetImage"
            }
            fetchImages({ data: data })

        }
    }, [item])
    const [form] = Form.useForm();
    console.log("form", form)
    const [
        AddUser,
        {
            data: getAddData,
            isSuccess: isAddSuccess,
        },
    ] = useAddUserMutation();

    useEffect(() => {
        if (isAddSuccess && getAddData?.statusCode == 400) {
            dispatch(setLoadingModalConfiguration({ isVisible: false }));
            setAPIError(getAddData?.message);
        }
        else if (isAddSuccess) {
            dispatch(setLoadingModalConfiguration({ isVisible: false }));
            if (!!allFiles?.file) {
                var bodyFormSetData = new FormData();
                bodyFormSetData.append("Entity", "AssetImage");
                bodyFormSetData.append("EntityType", "AssetImage");
                allFiles?.file?.fileList.forEach((file, index) => {
                    bodyFormSetData.append("FileDetails[" + index + "].TypeOfDoc", file.type);
                    bodyFormSetData.append("FileDetails[" + index + "].OriginalName", file.name);
                    bodyFormSetData.append("FileDetails[" + index + "].ImagePath", "");
                    bodyFormSetData.append("FileDetails[" + index + "].DocExtension", file.type);
                    bodyFormSetData.append("FileDetails[" + index + "].ExistingFileName", file.name);
                    bodyFormSetData.append("FileDetails[" + index + "].FileNameGuid", file.uid + getExtensionByMIMEType({ fileName: file.type }));
                    bodyFormSetData.append("FileDetails[" + index + "].Blob", file.originFileObj);
                });

                dispatch(MultipleFileUpload({ data: bodyFormSetData }));
            }
            else {
                onSuccess();
            }
        }
    }, [isAddSuccess])

    const [
        putAsset,
        {
            data: getPutAssetData,
            isSuccess: isPutAssetSuccess,
        },
    ] = usePutUserMutation();

    ///on edit sucess 

    useEffect(() => {
        if (isPutAssetSuccess && getPutAssetData?.statusCode == 400) {
            dispatch(setLoadingModalConfiguration({ isVisible: false }));
            setAPIError(getPutAssetData?.message);
        }
        else
            if (isPutAssetSuccess) {
                dispatch(setLoadingModalConfiguration({ isVisible: false }));
                onUpdated();
            }
    }, [isPutAssetSuccess])

    useEffect(() => {

    }, [getPutAssetData])

    const onFinish = (values) => {

        if (!!item?.pid) {
            dispatch(setLoadingModalConfiguration({ isVisible: true }));

            let data = {

                userName: form.getFieldValue("email"),
                FirstName: form.getFieldValue("userName"),
                lastName: form.getFieldValue("lastName"),
                gender: "M",
                Password: "test11",
                email: form.getFieldValue("email"),
                mobile: form.getFieldValue("mobile"),
                companyXid: authCtx.companyID,
                lastEditByXid: 9999,
                pid: item.pid,

                CompanyBranch:
                    [
                        {
                            "id": authCtx.companyBranchID
                        }
                    ],

                CBXids:
                {
                    "id": authCtx.companyBranchID
                },
                RoleXids:
                {
                    "id": form.getFieldValue("RoleXid")
                }
            };
            putAsset({ data: data });
        }
        else {
            // const selectedValues = form.getFieldValue("RoleXid");
            // const rolesIDs = selectedValues.map((item) =>
            // (
            //     item
            // ));
            dispatch(setLoadingModalConfiguration({ isVisible: true }));
            let data = {
                User:
                {
                    userName: form.getFieldValue("email"),
                    firstName: form.getFieldValue("userName"),
                    lastName: form.getFieldValue("lastName"),
                    gender: "M",
                    Password: "test11",
                    email: form.getFieldValue("email"),
                    mobile: form.getFieldValue("mobile"),
                    companyXid: authCtx.companyID,
                    lastEditByXid: authCtx.clientID,
                    ImageName: allFiles?.file?.fileList[0]?.name,
                    ImagePath: allFiles?.file?.fileList[0]?.uid + getExtensionByMIMEType({ fileName: allFiles?.file?.fileList[0]?.type }),
                },
                CompanyBranch:
                    [
                        {
                            "id":  isAdminOnly === true ?  clientIDFromAddClient : authCtx.companyBranchID
                        }
                    ],

                CBXids:
                {
                    "id": isAdminOnly === true ?  clientIDFromAddClient : authCtx.companyBranchID
                },
                RoleXids:
                {
                    "id": form.getFieldValue("RoleXid")
                },
                UserAsClient:
                {
                    "ClientXid": clientIDFromAddClient,
                    "LastEditByXid": authCtx.clientID,
                }
            };

            AddUser({ data: data });
        }

    }

    const onFinishFailed = () => {

    }

    const onClickReset = () => {
        form.setFieldsValue({ userName: '', email: '', mobile: '', branch: '' });
    }

    const [states, setStates] = useState(initStates);

    const OnSuccessHandler = (e) => {
        console.log("demo", e)
        setAllFiles(e);
    }
    const OnRemoveHandler = (e) => {
        console.log("demo", e)
    }

    const user = <>
        <div>{!!APIError === true ? APIError : null}</div>
        <div>
            <Form form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="vertical"
                name="control-hooks"
                className="row-col"
            >
                <Form.Item
                    className="username"
                    label="First Name"
                    name="firstName"
                    rules={[
                        {
                            required: true,
                            message: "Please enter the First Name!",
                        },
                    ]}
                >
                    <Input placeholder="First Name" />

                </Form.Item>
                <Form.Item
                    className="username"
                    label="Last Name"
                    name="lastName"
                    rules={[
                        {
                            required: true,
                            message: "Please enter the Last Name!",
                        },
                    ]}
                >
                    <Input placeholder="Last Name" />

                </Form.Item>
                <Form.Item
                    className="username"
                    label="Email/User Name"
                    name="email"
                    rules={[
                        {
                            required: true,
                            type: "email",
                            message: "Please enter the User Email!",
                        },
                    ]}
                >
                    <Input placeholder="User Email" />

                </Form.Item>
                <Form.Item
                    className="username"
                    label="Mobile"
                    name="mobile"
                    rules={[
                        {
                            required: true,
                            message: "Please enter the User Mobile!",
                        },
                    ]}
                >
                    <Input placeholder="User Mobile" />

                </Form.Item>
                <Form.Item
                    className="username"
                    label="Company Branch"
                    name="CBXids"
                >
                    <Select placeholder="Company Branch" mode={"multiple"}>
                        {!!getBranchesData && getBranchesData?.length > 0 ? getBranchesData?.map((a) =>
                        (
                            <option key={a.pid} value={a.pid}>{a.nameEng}</option>
                        )) : null}
                    </Select>

                </Form.Item>

                <Form.Item
                    className="username"
                    label="Roles"
                    name="RoleXid"
                    rules={[
                        {
                            required: true,
                            message: "Please select the User Role(s) !",
                        },
                    ]}
                >
                    {/* multiple is not implemented */}
                    <Select placeholder="User Roles" mode="single">
                        {!!rolesData && rolesData?.length ? rolesData?.map((a) =>
                        (
                            <option key={a.pid} value={a.pid}>{a.nameEng}</option>
                        )) : null}
                    </Select>

                </Form.Item>
                <FileUpload
                    onSuccess={(e) => OnSuccessHandler(e)}
                    onRemove={(e) => OnRemoveHandler(e)}
                    heading={"Upload User Profile Picture"}
                    accept={"image/*"}
                    fileList={allFiles?.file?.fileList}
                    maxCount={1}
                    hideUploadButton={false}
                    showRemoveIcon={true}
                ></FileUpload>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        {!!item?.pid === true ? "Update" : "Add"}
                    </Button>
                    <Button
                        disabled={item?.pid}
                        htmlType="button"
                        onClick={onClickReset}
                    >
                        Reset
                    </Button>
                </Form.Item>
            </Form>
        </div>
    </>

    return (
        <>
            {showPopup === true ? <>
                <Modal open={isModalOpen} title={!!item?.pid === true ? "Update User" : "Add User"} footer={null}
                    closable={isModalClosable}
                    onCancel={onCancel}

                >
                    {user}
                </Modal>
            </> : <>
                {user}</>}
        </>
    );

}

UserModal.propTypes = {
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