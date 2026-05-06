import { useDispatch } from "react-redux";
import { setLoadingModalConfiguration } from "../../store/Slices/ModalLoaderSlice";
import { useForgotPasswordMutation, useLoginMutation } from "../../store/ConfigurationAPI/ConfigurationAPI";
import {
    Layout,
    Menu,
    Button,
    Row,
    Col,
    Typography,
    Form,
    Input,
    Switch,
    Select,
    Card,
} from "antd";
import { useEffect, useState } from "react";
import { ConfirmationModal, useHistory } from "../../components";

const ForgotPassword = () => {

    const { Title } = Typography;
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const history = useHistory();
    const [invalidUser, setInvalidUser] = useState(false);
    const [transactionType, setTransactionType] = useState("");
    const [showActionMessage, setshowActionMessage] = useState(false);


    const [
        fetch,
        {
            data: getFetchData,
            isSuccess: isFetchDataSuccess,
        },
    ] = useForgotPasswordMutation();

    useEffect(() => {
        if (getFetchData !== null) {
            dispatch(setLoadingModalConfiguration({ isVisible: false }));
            if (getFetchData?.statusCode === 500) {
                setshowActionMessage(true);
                setTransactionType("forgotPasswordEmailSent");
            }
        }
    }, [getFetchData])

    const onFinish = (values) => {
        dispatch(setLoadingModalConfiguration({ isVisible: true }));
        let data = {
            username: form.getFieldValue("email"),
        }

        fetch({
            data: data
        });
    }

    const onFinishFailed = () => {

    }

    useEffect(() => {
        if (showActionMessage) {
            setTimeout(function () {

                setshowActionMessage(false);
                history.push("/Sign-In");

            }, 2000);

        }

    }, [showActionMessage])

    const Onclick = () => {
        history.push("/Sign-In")
    }

    return (
        <>
            <div class="container">
                <div class="row">
                    <div class="col-lg">
                        <Card
                            bordered={false}
                            className="criclebox tablespace mb-24 "
                            title="Forgot Your Password?"
                        >





                            <p>Just enter your email address below<br></br>and we'll send you a link to reset your password!</p>

                            <div class="col-lg">
                                {invalidUser && (<div>Invalid user name</div>)}
                                <Form form={form}
                                    onFinish={onFinish}
                                    onFinishFailed={onFinishFailed}
                                    layout="vertical"
                                    className="row-col"
                                >
                                    <Form.Item
                                        className="username"
                                        label="Email"
                                        name="email"
                                        rules={[
                                            {
                                                required: true,
                                                message: "Please enter your email!",
                                            },
                                        ]}
                                    >
                                        <Input placeholder="Email" />
                                    </Form.Item>

                                    <Form.Item>
                                        <Button
                                            type="primary"
                                            htmlType="submit"
                                            style={{ width: "100%" }}
                                        >
                                            Send Password
                                        </Button>
                                    </Form.Item>

                                </Form>
                            </div>


                            <div className="row register-form">
                                <div class="col">
                                  
                                    Already have Account?                          
                                  

                                        <Button
                                            type="link"
                                            htmlType="submit"
                                            onClick={Onclick}
                                            style={{ width: "100%" }}
                                        >
                                            Sign In
                                        </Button>
                                  
                                </div>
                            </div>

                        </Card>
                    </div>
                </div>
            </div>
            {showActionMessage && (<ConfirmationModal
                // onClickDeleteButton={onDeleteConfirm}
                //  onCancel={() => setShowDelete(false)}
                transactionType={transactionType}
            // item={assetByIDData}
            ></ConfirmationModal>)
            }
        </>
    );
}

export default ForgotPassword