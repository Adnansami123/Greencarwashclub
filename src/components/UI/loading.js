import React from "react";
import btfsloader from "../../assets/images/GreenCar Wsh.png"
import demoloader from "../../assets/images/GreenCar Wsh.png"
import imgVSDemo from "../../assets/images/vijayasarees.png"
import { Spin } from 'antd';
export default function loading({ isLoading, loadingText, loadingTextColor }) {
   // const imgPath = process.env.REACT_APP_ENV === "UAT" ? demoloader : process.env.REACT_APP_ENV === "PROD" ? syebros : btfsloader

    const imgPath = ["TRIALPROD", "PROD", "UAT"].includes(process.env.REACT_APP_ENV) ? btfsloader
    : ["VIJAYAPROD"].includes(process.env.REACT_APP_ENV) ? imgVSDemo : demoloader

    return (
        <>
            <div className="ant-card loaderContainer">
                <div className="text-center">
                    {isLoading ?
                        <img className="load" src={imgPath} alt={"Loadig.gif"}/> 
                        // <Spin />
                        : null}
                    {!!loadingText ? (
                        <>
                            <h6 style={{ margin: 5 }}>{loadingText}</h6>
                        </>
                    ) : null}
                </div>
            </div>
        </>
    );
}