import { Button, Card } from "antd";
import React, { Component, useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
const ReferralCodeVerificationFail = () => {

    const history = useHistory();
    const location = useLocation();
    const stateData = location.state?.stateData;

    console.log("stateData", stateData);

    const Onclick = () => {
        // const stateData = {

        //     ReferralCode: CheckReferralData,
        // };
        history.push("Register", {
            stateData: stateData
        });
    }
    return (
        <>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-6 ">
                        <Card bordered={false} title="Referral Verification Failed" className="criclebox ">
                            <div class="card bg-white">
                                <div class="card-body">
                                   
                                            <p>Error! Referral Code has been not verified, Please check with Support Team.</p>

                                       
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ReferralCodeVerificationFail