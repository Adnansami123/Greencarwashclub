import { Button, Card, Input } from "antd";
import React, { Component, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import FileUpload from "../CommonComponents/FileUpload";
const ViewKYC = () => {

    const history = useHistory();
    const [allFiles, setAllFiles] = useState([]);

    const onClickLoginPage = () => {
        history.push("/UserDashboard");
    }
    return (

        <>
            <div class="container">
                <div class="row justify-content-center">
                    <div class="col-12">
                        <Card bordered={false} title="MY KYC" className="criclebox ">

                            <div class="card bg-white">
                                <div class="card-body">
                                    <div class="row">
                                        <div className='col-md-6'>
                                            <p>Aadhar</p>
                                            <div className='col-md-12 text-right'>
                                                <FileUpload
                                                    // onSuccess={(e) => OnSuccessHandler(e)}
                                                    // onRemove={(e) => OnRemoveHandler(e)}
                                                    listType="picture"
                                                    heading={"Upload Contract Images/PDF"}
                                                    accept={"image/*,.JPG"}
                                                    //fileList={allFiles.file.fileList[0].originFileObj}
                                                    fileList={allFiles?.file?.fileList}
                                                    maxCount={10}
                                                    hideUploadButton={true}
                                                    showRemoveIcon={false}
                                                ></FileUpload>
                                            </div>
                                        </div>

                                        <div className='col-md-6'>
                                            <p>PAN</p>
                                            <div className='col-md-12 text-right'>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ViewKYC