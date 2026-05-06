import {
    Form, Button,
    Input,
    Dropdown,
    Select,
    Row,
    Col,
    Card
} from "antd";
import React, { Component, useContext, useEffect, useState } from "react";
import { useDownloadImagesPassBlobMutation, useGetUserByIDMutation, usePutUserMutation } from "../../store/ConfigurationAPI/ConfigurationAPI";
import AuthContext from "../../store/authentication/auth-context";
import { setLoadingModalConfiguration } from "../../store/Slices/ModalLoaderSlice";
import { useDispatch } from "react-redux";
import FileUpload from "../CommonComponents/FileUpload";
import { getExtensionByMIMEType, getRolesFromUserRoles, getRolesNameFromUserRoles } from "../../utils";
import { MultipleFileUpload } from "../../store/Slices/FileUploadSlice";



const Profile = () => {

    const [allFiles, setAllFiles] = useState([]);
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const authCtx = useContext(AuthContext);
    const [
        getUserByID,
        {
            data: getUserBYIDData,
            isSuccess: isGetUserByIDataSuccess,
        }
    ] = useGetUserByIDMutation();

    const [
        fetchImages,
        {
            data: getfetchBarCodeData,
            isSuccess: isFetchfetchBarCodeSuccess,
        },
    ] = useDownloadImagesPassBlobMutation();

    useEffect(() => {
        if (!!getfetchBarCodeData) {

            let filename = getUserBYIDData.imageName;
            let arr = filename.split(".");
            console.log("uid", arr);
            let extension = arr.pop();
            const fileNew = {
                file: {
                    fileList: [{
                        //   uid: getUserBYIDData.imageName,
                        uid: arr[0],
                        name: getUserBYIDData.imageName,
                        status: "done",
                        //  url: "https://btfsstorage.blob.core.windows.net/filecontainer/" + item.imagePath,
                        url: URL.createObjectURL(getfetchBarCodeData),
                        isFromDB: true,
                        // type: extension,
                        type: "image/png",
                    }]

                }
            };
            setAllFiles(fileNew);
        }
    }, [isFetchfetchBarCodeSuccess, getfetchBarCodeData])

    useEffect(() => {
        if (isGetUserByIDataSuccess) {
            dispatch(setLoadingModalConfiguration({ isVisible: false }));
            const roles = getRolesFromUserRoles({ data: getUserBYIDData.roles })
            form.setFieldsValue({
                userName: getUserBYIDData.firstName, lastName: getUserBYIDData.firstName,
                email: getUserBYIDData.email,
                mobile: getUserBYIDData.mobile,
                RoleXid: getRolesFromUserRoles({ data: getUserBYIDData.roles }),
            });

            if (!!getUserBYIDData.imageName) {
                let data = {
                    //fileName: e.key,
                    fileName: getUserBYIDData.imagePath,
                    entityType: "AssetImage"
                }
                fetchImages({ data: data })

            }
        }
    }, [isGetUserByIDataSuccess])

    useEffect(
        function Users() {
            dispatch(setLoadingModalConfiguration({ isVisible: true }));
            getUserByID({

                id: authCtx.clientID,
            });

        }, [getUserByID]);

    const [
        putAsset,
        {
            data: getPutAssetData,
            isSuccess: isPutAssetSuccess,
        },
    ] = usePutUserMutation();

    useEffect(() => {
        if (isPutAssetSuccess) {
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
        }
    }, [isPutAssetSuccess])

    const onFinish = (values) => {
        const selectedValues = form.getFieldValue("RoleXid");
        const rolesIDs = selectedValues.map((item) =>
        (
            item
        ));

        let data = {

            userName: form.getFieldValue("email"),
            firstName: form.getFieldValue("userName"),
            lastName: form.getFieldValue("lastName"),
            gender: "M",
            Password: "test11",
            email: form.getFieldValue("email"),
            mobile: form.getFieldValue("mobile"),
            companyXid: authCtx.companyID,
            ImageName: allFiles?.file?.fileList[0]?.name,
            ImagePath: allFiles?.file?.fileList[0]?.uid + getExtensionByMIMEType({ fileName: allFiles?.file?.fileList[0]?.type }),
            lastEditByXid: authCtx.clientID,
            pid: getUserBYIDData.pid,

            // CompanyBranch:
            //     [
            //         {
            //             "id": authCtx.companyBranchID
            //         }
            //     ],

            // CBXids:
            // {
            //     "id": authCtx.companyBranchID
            // },
            // RoleXids:
            // {
            //     "id": rolesIDs.toString()
            // }
        }
        putAsset({ data: data });
    }

    const onClickReset = () => {
        form.setFieldsValue({ userName: '', email: '', mobile: '', branch: '' });
    }
    const OnSuccessHandler = (e) => {
        setAllFiles(e);
    }
    const OnRemoveHandler = () => {

    }
    return (
        <>

            <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="Profile"
            >


                <Row gutter={[24, 0]}>
                    <Col xs="12" xl={2}>
                    </Col>
                    <Col xs="12" xl={12}>
                        <div>
                            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                                <div class="col-md-6"><label class="labels">Roles</label><label class="labels">[{getRolesNameFromUserRoles({ data: getUserBYIDData?.roles })}]</label></div>

                            </div>
                        </div>
                        <div>
                            <Form form={form}
                                onFinish={onFinish}
                                layout="vertical"
                                name="control-hooks"
                                className="row-col"
                            >
                                <Form.Item
                                    className="username"
                                    label="First Name"
                                    name="userName"
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
                                    <Input disabled={true} placeholder="User Email" />

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
                                    <Input placeholder="Mobile" />

                                </Form.Item>



                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                    >
                                        {"Update"}
                                    </Button>
                                    <Button
                                        htmlType="button"
                                        disabled={true}
                                        onClick={onClickReset}
                                    >
                                        Reset
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>

                    </Col>

                </Row>

            </Card>

        </>
    );
};

export default Profile;