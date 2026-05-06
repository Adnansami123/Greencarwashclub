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
import { useAddLevelMutation, usePutLevelMutation } from "../../store/ConfigurationAPI/ConfigurationMLM";

export default function LevelMatrixModal({
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
        form.setFieldsValue({ 
            LevelName: item.levelName,
            Level: item.level,
            Amount: item.amount,
        });
    }, [item])
    const [form] = Form.useForm();

    const [
        Add,
        {
            data: getAddData,
            isSuccess: isAddSuccess,
        },
    ] = useAddLevelMutation();

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
    ] = usePutLevelMutation();

    useEffect(() => {
        if (isPutSuccess) {
            onUpdated();
        }
    }, [getPutData])

    const onFinish = (values) => {

        if (!!item.pid) {
            let data = {               
                LevelName: form.getFieldValue("LevelName"),
                Level: form.getFieldValue("Level"),
                Amount: form.getFieldValue("Amount"),
                lastEditByXid: authCtx.clientID,
                pid: item.pid,
            };
            put({ data: data });
        }
        else {
            let data = {
               
                LevelName: form.getFieldValue("LevelName"),
                Level: form.getFieldValue("Level"),
                Amount: form.getFieldValue("Amount"),
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
            <Modal open={isModalOpen} title={!!item?.pid === true ? "Update Level " : "Add Level"} footer={null}
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
                            label="ALevel Name"
                            name="LevelName"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the Level Name ",
                                },
                            ]}
                        >
                            <Input  placeholder="Level Name "  />

                        </Form.Item>
                        <Form.Item
                            className="username"
                            label="Level "
                            name="Level"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the Level ",
                                },
                            ]}
                        >
                            <Input  placeholder="Level"  />

                        </Form.Item>
                        <Form.Item
                            className="username"
                            label="Level Amount"
                            name="Amount"
                            rules={[
                                {
                                    required: true,
                                    message: "Please enter the Level Amount ",
                                },
                            ]}
                        >
                            <Input  placeholder="Level Amount "  />

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

LevelMatrixModal.propTypes = {
    item: PropTypes.object,
    onCancel: PropTypes.func,
    isModalClosable: PropTypes.bool,
    isModalOpen: PropTypes.bool,
    onSuccess: PropTypes.func,
    onUpdated: PropTypes.func,

}