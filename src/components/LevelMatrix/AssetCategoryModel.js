import {
    Modal, Form, Button,
    Input,
    Select
} from "antd";
import PropTypes from "prop-types";
import { useCallback, useContext, useEffect, useState } from "react";
import { string } from "yup";
import AuthContext from "../../store/authentication/auth-context";
import { useAddAssetCategoryMutation, useAddCheckListItemMutation,  usePutAssetCategoryMutation, usePutCheckListItemMutation } from "../../store/ConfigurationAPI/ConfigurationAPI";

export default function AssetCategoryModel({
    item = {},
    onCancel,
    isModalClosable = true,
    isModalOpen = true, 
    onSuccess,
    onUpdated,

}) {



    const authCtx = useContext(AuthContext);
    const [closeModal, setCloseModal] = useState(true);
    const { TextArea } = Input;

    useEffect(() => {
        if (!!item?.pid === false) return;
        form.setFieldsValue({ NameEng: item.nameEng });
    }, [item])
    const [form] = Form.useForm();

    const [
        Add,
        {
            data: getAddData,
            isSuccess: isAddSuccess,
        },
    ] = useAddAssetCategoryMutation();

    useEffect(() => {

        if (isAddSuccess) {
            onSuccess();
        }
    }, [isAddSuccess])


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

        if (!!item.pid) {
            let data = {               
                nameEng: form.getFieldValue("NameEng"),
                NameAra: form.getFieldValue("NameEng"),
                companyXid: authCtx.companyID,
                lastEditByXid: authCtx.clientID,
                pid: item.pid,
            };
            put({ data: data });
        }
        else {
            let data = {
                checkListItemCategoryXid: form.getFieldValue("CheckListItemCategoryXid"),
                nameEng: form.getFieldValue("NameEng"),
                NameAra: form.getFieldValue("NameEng"),
                companyXid: authCtx.companyID,
                lastEditByXid: authCtx.clientID,
                //  pid: !!item.pid === true ? item.pid : null
            };
            Add({ data: data });

        }

    }

    const onChange = () => {

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

    return (
        <>
            <Modal open={isModalOpen} title={!!item?.pid === true ? "Update Asset Category" : "Add Asset Category"} footer={null}
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
                       
                        <Form.Item
                            className="username"
                            label="Asset Category"
                            name="NameEng"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the Asset Category",
                                },
                            ]}
                        >
                            <Input  placeholder="Asset Category"  />

                        </Form.Item>
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
            </Modal>
        </>
    );

}

AssetCategoryModel.propTypes = {
    item: PropTypes.object,
    onCancel: PropTypes.func,
    isModalClosable: PropTypes.bool,
    isModalOpen: PropTypes.bool,
    onSuccess: PropTypes.func,
    onUpdated: PropTypes.func,

}