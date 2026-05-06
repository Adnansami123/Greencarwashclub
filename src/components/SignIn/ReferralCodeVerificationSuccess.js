import { Button, Card } from "antd";
import React, { Component, useContext, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom/cjs/react-router-dom.min";
const ReferralCodeVerificationSuccess = () => {

    const history = useHistory();
    const location = useLocation();
    const stateData = location.state?.stateData;

    console.log("stateData", stateData);

    const Onclick = () => {

        history.push("Register", {
            stateData: stateData
        });
    }
    return (
        <>
            <div class="container-fluid">
                <div class="row justify-content-center">
                    <div class="col-sm">
                        <Card bordered={false} title="Referral Verification Successful" className="criclebox ">
                            <div class="card bg-white">
                                <div className='col-md-12'>
                                    <p>Congratulations! Referral Code has been Verified.</p>
                                    <p class="card-text">Name: {stateData?.firstName} </p>
                                    <p class="card-text">Email: {stateData?.email}</p>
                                    <p class="card-text">Referral Code: {stateData?.referralCode} </p>

                                </div>





                            </div>
                            <div className='col-md-12 text-right'>
                            <Button type="Primary" className="btn btn-primary" onClick={Onclick}>
                                Continue To Registration
                            </Button>
                            </div>

                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ReferralCodeVerificationSuccess