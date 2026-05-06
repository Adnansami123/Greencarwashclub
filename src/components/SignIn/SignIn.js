import React, { Component, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
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
  Tooltip,
} from "antd";
import TopHeader from "../layout/TopHeader";
import AuthContext from "../../store/authentication/auth-context";
import {
  useGetAllUsersMutation,
  useLoginMutation,
} from "../../store/ConfigurationAPI/ConfigurationAPI";
// import { setLoadingModalConfiguration } from "../../store/Slices/ModalLoaderSlice";
import { useDispatch } from "react-redux";
import StringMessages, { imagesPath } from "../../common/StringMessages";
import TooltipComponent from "../CommonComponents/TooltipComponent";
const SignIn = () => {
  const { Title } = Typography;
  const history = useHistory();
  // const { Header, Footer, Content } = Layout;
  const dispatch = useDispatch();

  const authCtx = useContext(AuthContext);
  const BTFSAuthCtx = useContext(AuthContext);

  const [form] = Form.useForm();
  const [invalidUser, setInvalidUser] = useState(false);
  const [unknownError, setUnknownError] = useState(false);

  const [
    fetch,
    { data: getFetchData, isSuccess: isFetchDataSuccess, isError: isError },
  ] = useLoginMutation();

  // useEffect(() => {
  //   if (BTFSAuthCtx.isLoggedIn) {
  //     const redirectPath = localStorage.getItem("redirectAfterLogin");
  //     if (redirectPath) {
  //       localStorage.removeItem("redirectAfterLogin");
  //       history.push(redirectPath);
  //     } else {
  //       history.push("/");
  //     }
  //   }
  // }, [BTFSAuthCtx.isLoggedIn, history]);

  useEffect(() => {
    console.log("getFetchData", isError);
  }, [isError]);

  const [data, setData] = useState([]);
  useEffect(() => {
    if (getFetchData !== null && isFetchDataSuccess) {
      console.log("getFetchData", getFetchData);
      console.log("getFetchData", isFetchDataSuccess);

      if (getFetchData == undefined && isFetchDataSuccess) {
        console.log("getFetchData", getFetchData);
        setUnknownError(true);
        // dispatch(setLoadingModalConfiguration({ isVisible: false }));
        return;
      } else {
        setUnknownError(false);
      }
      if (!!getFetchData && getFetchData?.statusCode !== 400) {
        const expirationTime = new Date(new Date().getTime() + 20000 * 10000);

        authCtx.login(
          getFetchData.token,
          //getRightUser[0].pid === "9999" ? "superAdmin" : "admin",
          getFetchData.roles,
          getFetchData.companyXid,
          getFetchData?.branchDtls[0]?.companyName, //company is ..
          // getUserByBranch[0].companyBranch.pid,
          getFetchData.roles === "SuperAdmin"
            ? 0
            : getFetchData?.branchDtls[0]?.pid,
          getFetchData?.userXid, // this is client id default 0...
          getFetchData?.clientXid, // this is client id  from the client table... default 0... and this actual clietn ID.
          getFetchData?.firstName, // this is the first Name....
          getFetchData?.underUserXid, // this is the first Name....
          expirationTime.toISOString(),
        );
        setInvalidUser(false);
      // dispatch(setLoadingModalConfiguration({ isVisible: false }));
        history.push("/");
      } else if (getFetchData?.statusCode === 400) {
      // dispatch(setLoadingModalConfiguration({ isVisible: false }));
        setInvalidUser(true);
      } else {
        // dispatch(setLoadingModalConfiguration({ isVisible: false }));
        setInvalidUser(false);
      }
    }
  }, [getFetchData, isFetchDataSuccess]);
  useEffect(() => {
    if (isError) {
     
     
     // dispatch(setLoadingModalConfiguration({ isVisible: false }));
      setUnknownError(true);
    }
  }, [isError]);
  const onFinish = (values) => {
    // alert("Success!");
    const expirationTime = new Date(new Date().getTime() + 20000 * 10000);
   // dispatch(setLoadingModalConfiguration({ isVisible: true }));

    let data = {
      username: form.getFieldValue("email"),
      password: form.getFieldValue("password"),
      CompanyXID: process.env.REACT_APP_CompanyXID,
    };

    fetch({
      data: data,
    });
  };

  const onChange = () => {};

  const onFinishFailed = () => {};

  const Onclick = () => {
    history.push("/ForgotPassword");
  };

  const OnclickRegister = () => {
    history.push("/Register");
  };

  return (
    <>
      <div className="login-container bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Side: Login Card */}
            <div className="w-full md:w-1/2 bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="px-6 py-8 sm:p-10">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {StringMessages.LoginCompon.title}
                </h2>
                <p className="text-gray-600 mb-6">
                  {StringMessages.LoginCompon.description}
                </p>

                {invalidUser && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-red-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">
                          {getFetchData?.message}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {unknownError && (
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg
                          className="h-5 w-5 text-red-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">
                          Unknown Error Occurred!
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <Form
                  form={form}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical"
                  className="space-y-6"
                >
                  <Form.Item
                    className="mb-4"
                    label={
                      <span className="text-gray-700 font-medium">
                        {StringMessages.LoginCompon.controls.labels.email}
                      </span>
                    }
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your email!",
                      },
                    ]}
                  >
                    <Input
                      className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder={
                        StringMessages.LoginCompon.controls.placeHolder.email
                      }
                      prefix={
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                          />
                        </svg>
                      }
                      suffix={
                        <TooltipComponent
                          title={
                            StringMessages.LoginCompon.controls.tooltip.email
                          }
                        >
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </TooltipComponent>
                      }
                    />
                  </Form.Item>

                  <Form.Item
                    className="mb-4"
                    label={
                      <span className="text-gray-700 font-medium">
                        Password
                      </span>
                    }
                    name="password"
                    rules={[
                      {
                        required: true,
                        message: "Please enter your password!",
                      },
                    ]}
                  >
                    <Input.Password
                      className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                      visibilityToggle={true}
                      placeholder="Password"
                      prefix={
                        <svg
                          className="h-5 w-5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      }
                    />
                  </Form.Item>

                  <div className="flex items-center justify-between">
                    <Form.Item
                      name="remember"
                      valuePropName="checked"
                      className="mb-0"
                    >
                      <div className="flex items-center">
                        <Switch
                          defaultChecked={false}
                          onChange={onChange}
                          className="mr-2 bg-gray-200"
                        />
                        <span className="text-gray-600">Remember me</span>
                      </div>
                    </Form.Item>

                    <Button
                      type="link"
                      className="text-indigo-600 hover:text-indigo-500 font-medium"
                      onClick={Onclick}
                    >
                      Forgot Password?
                    </Button>
                  </div>

                  <Form.Item className="mb-0">
                    <Button
                      type="primary"
                      htmlType="submit"
                      className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      {StringMessages.LoginCompon.controls.buttons.signIn}
                    </Button>
                  </Form.Item>
                </Form>

                <div className="text-center text-sm text-gray-500 mt-6">
                  <span>We'll send you a link to reset your password!</span>
                </div>
              </div>
            </div>

            {/* Right Side: Register Card */}
            <div className="w-full md:w-1/2 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl shadow-lg overflow-hidden text-white">
              <div className="px-6 py-8 sm:p-10 flex flex-col justify-between h-full">
                <div>
                  <h2 className="text-3xl font-bold mb-6">
                    {StringMessages.LoginCompon.register}
                  </h2>
                  <p className="text-xl mb-8">New to our store?</p>
                  <div className="space-y-4 text-lg">
                    <div className="flex items-center">
                      <svg
                        className="h-6 w-6 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Fast checkout</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="h-6 w-6 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Track your orders</span>
                    </div>
                    <div className="flex items-center">
                      <svg
                        className="h-6 w-6 mr-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span>Exclusive deals & offers</span>
                    </div>
                  </div>
                </div>
                <div className="mt-10">
                  <p className="mb-4 text-lg">
                    Don't have an account? Join now!
                  </p>
                  <Button
                    type="default"
                    htmlType="button"
                    onClick={OnclickRegister}
                    className="w-full py-2 px-4 border border-white rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white flex justify-center items-center"
                  >
                    Register Now
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
