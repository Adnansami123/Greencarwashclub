import { useDispatch } from "react-redux";
import { setLoadingModalConfiguration } from "../../store/Slices/ModalLoaderSlice";
import {
  useChangePasswordMutation,
  useForgotPasswordMutation,
  useLoginMutation,
} from "../../store/ConfigurationAPI/ConfigurationAPI";
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
import { useContext, useEffect, useState } from "react";
import { AuthContext, ConfirmationModal, useHistory } from "../../components";

const ChangePassword = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const history = useHistory();
  const [invalidUser, setInvalidUser] = useState(false);
  const [transactionType, setTransactionType] = useState("");
  const [showActionMessage, setshowActionMessage] = useState(false);
  const BTFSAuthCtx = useContext(AuthContext);

  const [fetch, { data: getFetchData, isSuccess: isFetchDataSuccess }] =
    useChangePasswordMutation();

  useEffect(() => {
    if (getFetchData !== null) {
      dispatch(setLoadingModalConfiguration({ isVisible: false }));
      if (getFetchData?.statusCode === 500) {
        setshowActionMessage(true);
        setTransactionType("forgotPasswordEmailSent");
      }
    }
  }, [getFetchData]);

  const onFinish = (values) => {
    dispatch(setLoadingModalConfiguration({ isVisible: true }));
    let data = {
      existingPassword: form.getFieldValue("existingPassword"),
      newPassword: form.getFieldValue("newPassword"),
      id: BTFSAuthCtx.clientID,
    };

    fetch({
      data: data,
    });
  };

  const onFinishFailed = () => {};

  useEffect(() => {
    if (showActionMessage) {
      setTimeout(function () {
        setshowActionMessage(false);
        history.push("/Sign-In");
      }, 2000);
    }
  }, [showActionMessage]);

  return (
    <>
      <Card
        bordered={false}
        className="criclebox tablespace mb-24"
        title={
          <div className="flex items-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Change Password
            </h2>
            <div className="h-1 w-20 bg-blue-600 rounded-full mt-2 ml-2"></div>
          </div>
        }
        bodyStyle={{ padding: "24px" }}
        style={{
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
          borderRadius: "12px",
        }}
      >
        <div className="px-2 sm:px-6">
          {invalidUser && (
            <div className="mb-6 p-3 bg-red-50 text-red-600 border border-red-200 rounded-lg flex items-center">
              <span className="mr-2">⚠️</span>
              <span>Invalid user name</span>
            </div>
          )}

          <Form
            form={form}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            className="row-col"
          >
            <Form.Item
              className="username"
              label={
                <span className="font-medium text-gray-700">
                  Existing Password
                </span>
              }
              name="existingPassword"
              rules={[
                {
                  required: true,
                  message: "Please enter existing Password!",
                },
              ]}
            >
              <Input
                prefix={<span className="text-blue-600">🔒</span>}
                placeholder="Existing Password"
                type="password"
                className="rounded-lg py-2"
              />
            </Form.Item>

            <Form.Item
              className="username"
              label={
                <span className="font-medium text-gray-700">New Password</span>
              }
              name="newPassword"
              rules={[
                {
                  required: true,
                  message: "Please enter new Password",
                },
              ]}
            >
              <Input
                prefix={<span className="text-blue-600">🔒</span>}
                placeholder="New Password"
                type="password"
                className="rounded-lg py-2"
              />
            </Form.Item>

            <Form.Item
              className="username"
              label={
                <span className="font-medium text-gray-700">
                  Confirm Password
                </span>
              }
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please enter confirm Password",
                },
              ]}
            >
              <Input
                prefix={<span className="text-blue-600">🔒</span>}
                placeholder="Confirm Password"
                type="password"
                className="rounded-lg py-2"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{
                  width: "100%",
                  height: "44px",
                  background: "linear-gradient(90deg, #2563eb, #7c3aed)",
                  borderRadius: "8px",
                  fontWeight: "500",
                  fontSize: "16px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(37, 99, 235, 0.2)",
                }}
                className="hover:shadow-lg transition-shadow"
              >
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
      {showActionMessage && (
        <ConfirmationModal
          // onClickDeleteButton={onDeleteConfirm}
          //  onCancel={() => setShowDelete(false)}
          transactionType={transactionType}
          // item={assetByIDData}
        ></ConfirmationModal>
      )}
    </>
  );
};

export default ChangePassword;
