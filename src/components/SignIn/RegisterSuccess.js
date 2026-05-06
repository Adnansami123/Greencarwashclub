import { Button, Card, Input } from "antd";
import React, { Component, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
const RegisterSuccess = () => {
  const history = useHistory();

  const onClickLoginPage = () => {
    history.push("Sign-In");
  };
  return (
    <>
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-center">
          <div className="w-full md:w-10/12 lg:w-8/12">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-xl p-6 text-white shadow-lg">
              <h2 className="text-2xl font-semibold">
                🎉 Registration Successful
              </h2>
            </div>
            <div className="bg-white rounded-b-xl shadow-lg p-6">
              <div className="space-y-4">
                <p className="text-green-600 font-medium">
                  🎊 Congratulations! Your registration has been successfully
                  completed.
                </p>
                <p className="text-gray-700">
                  We are excited to have you as part of our community.
                </p>
                <p className="text-gray-800">
                  📩 Please check your registered email.{" "}
                  <span className="italic text-gray-500">
                    (Kindly check the spam/junk folder.)
                  </span>
                </p>
                <p className="text-gray-800">
                  🚀 To get started, log in to your account and explore the
                  features we offer. If you have any questions, feel free to
                  reach out to our support team at{" "}
                  <span className="text-blue-600 font-semibold">#</span>.
                </p>
              </div>
              <div className="mt-6 text-right">
                <button
                  onClick={onClickLoginPage}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition duration-300"
                >
                  Sign In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterSuccess;
