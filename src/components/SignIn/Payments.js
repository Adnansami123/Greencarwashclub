import { Button, Card, Form, Image, Input, Radio } from "antd";
import React, { Component, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
// import QRCodeModal from "./QRCodeModal";
import FileUpload from "../CommonComponents/FileUpload";

import {
    DownloadOutlined, PlusCircleOutlined,
    FormOutlined,
    UserDeleteOutlined,
    DeleteOutlined,
    UndoOutlined,
} from '@ant-design/icons';
import { useDispatch, useSelector } from "react-redux";
import { useAddUserProofImagesMutation, usePostUserPurchaseMutation, usePutUserPurchaseMutation } from "../../store/ConfigurationAPI/ConfigurationMLM";
import { filterRemovedFiles, getExtensionByMIMEType } from "../../utils";
import { setLoadingModalConfiguration } from "../../store/Slices/ModalLoaderSlice";
import { MultipleFileUpload } from "../../store/Slices/FileUploadSlice";
import AlertModal from "../../Modals/Alert";
import { ContractImages } from "../../models/AssetModel";
import AuthContext from "../../store/authentication/auth-context";
const Payments = () => {


    const dispatch = useDispatch();
    const authCtx = useContext(AuthContext);

    const [form] = Form.useForm();
    const history = useHistory();
    const [showQRCoee, setShowQRCode] = useState(false);
    const [showImageError, setShowImageError] = useState(false);
    const [errorMessage, setEerrorMessage] = useState("");



    const cartState = useSelector(
        (state) => state.CartStateSlice.CartState
    );

    //if UserXid is nulll then need to redirect to login apge.. directly...
    // check on Finish... event.... so, no other issue come....
    const UserXid = useSelector(
        (state) => state.CartStateSlice.UserXid
    );

    const UnderUserXid = useSelector(
        (state) => state.CartStateSlice.UnderUserXid
    );

    console.log("onClickPurchase", cartState);
    console.log("onClickPurchase", JSON.stringify(cartState));
    const onClickLoginPage = () => {
        history.push("Sign-In");
    }

    const Onclick = () => {

        history.push("Payments", {
            stateData: null
        });
    }
    const [allFilesAadhaar, setAllFilesAadhaar] = useState([]);

    const oNClickShowQRCode = () => {
        setShowQRCode(true);
    }

    const OnCancelQRCode = () => {
        setShowQRCode(false);
    }

    const [
        putUserPuchase,
        {
            data: getPutAssetData,
            isSuccess: isPutAssetSuccess,
        },
    ] = usePutUserPurchaseMutation();

    /// this is update to pyament and purchase both......
    const [
        postUserPuchase,
        {
            data: getAddAssetData,
            isSuccess: isAddAssetSuccess,
        },
    ] = usePostUserPurchaseMutation();

    const [addorUpdateImages, setAddorUpdateImages] = useState(false);
    const [showActionMessage, setshowActionMessage] = useState(false);
    const [isAddAssetImagesSuccess, setisAddAssetImagesSuccess] = useState(false);


    //adding contract iamges....\
    //not using.... 
    // const [
    //     AddAssetImages,
    //     {
    //         data: getAddAssetImageData,
    //         isSuccess: isAddAssetImagesSuccess,
    //     },
    // ] = useAddUserProofImagesMutation();

    useEffect(() => {
        if (isAddAssetImagesSuccess) {
            /// here callingt the file upload...
            // here uploading the images...
            //here checking if any file is exists....
            if (!!allFilesAadhaar?.file) {
                var bodyFormSetData = new FormData();
                bodyFormSetData.append("Entity", "AssetImage");
                bodyFormSetData.append("EntityType", "AssetImage");
                if (!!allFilesAadhaar?.file) {

                    allFilesAadhaar?.file?.fileList.forEach((file, index) => {
                        bodyFormSetData.append("FileDetails[" + index + "].TypeOfDoc", file.type);
                        bodyFormSetData.append("FileDetails[" + index + "].OriginalName", file.name);
                        bodyFormSetData.append("FileDetails[" + index + "].ImagePath", "");
                        bodyFormSetData.append("FileDetails[" + index + "].DocExtension", file.type);
                        bodyFormSetData.append("FileDetails[" + index + "].ExistingFileName", file.name);
                        bodyFormSetData.append("FileDetails[" + index + "].FileNameGuid", file.uid + getExtensionByMIMEType({ fileName: file.type }));
                        bodyFormSetData.append("FileDetails[" + index + "].Blob", file.originFileObj);
                    });
                }


                dispatch(MultipleFileUpload({ data: bodyFormSetData }));

                dispatch(setLoadingModalConfiguration({ isVisible: false }));
                setshowActionMessage(true);
            }
        }

    }, [isAddAssetImagesSuccess]);
    //after images upload ... redirect to 


    // this is not using as we are using the same table to add the images details
    // useEffect(() => {
    //     const itemObj = [];
    //     if (addorUpdateImages) {
    //         allFilesAadhaar.file.fileList.forEach((el, index) => {
    //             let AssetImagesObj;
    //             if (el?.isOld !== true) {
    //                 AssetImagesObj = { ...ContractImages.ContractImagesArray[index] };
    //                 //const AssetImagesObj=null;
    //                 AssetImagesObj.UserXid = UserXid.UserXid;
    //                 /// here we need to check on update alo we are getting the id or not
    //                 AssetImagesObj.Contract = null;
    //                 AssetImagesObj.typeOfDoc = "Payment";
    //                 AssetImagesObj.savedName = el.uid + getExtensionByMIMEType({ fileName: allFilesAadhaar.file.fileList[index].type });
    //                 AssetImagesObj.originalName = el.name;
    //                 AssetImagesObj.imagePath = "string";
    //                 AssetImagesObj.docExtension = el.type;
    //                 AssetImagesObj.lastEditByXid = 9999;
    //                 itemObj.push(AssetImagesObj);
    //             }
    //         });

    //         AddAssetImages({ data: itemObj });
    //     }
    // }, [addorUpdateImages])

    useEffect(() => {
        if (isAddAssetSuccess) {


            if (!!allFilesAadhaar?.file) {
                //setAddorUpdateImages(true);
                setisAddAssetImagesSuccess(true);
            }
            else {
                dispatch(setLoadingModalConfiguration({ isVisible: false }));
                history.push("RegisterSuccess")
            }
            // here we need to upload the images...

        }
    }, [isAddAssetSuccess])


    const onFinishFailed = () => {

    }
    const onFinish = (values) => {

        /// here checking payment images exists or not....
        // else show the error....
        if (!!allFilesAadhaar?.file) {
            dispatch(setLoadingModalConfiguration({ isVisible: true }));
            const GstAmount = cartState?.CartState.salePrice * cartState?.CartState?.gstPercentage / 100
            const commonCompany = {
                UserPurchase: {
                    ProductXid: cartState?.CartState.pid, // we need to remove or add another table underxid purpphose 
                    UserXid: UserXid?.UserXid, // this is from Redux state....
                    UnderUserXid: UnderUserXid.UnderUserXid,  // this whocm purchase... setting in reduc upon company modal./ reigster...
                    // or we need to integer same....
                    lastEditByXid: UserXid?.UserXid,
                    Quantity: 1,
                    QuantityAmount: cartState?.CartState.salePrice,
                    TotalAmount: cartState?.CartState.salePrice,
                    HSNCODE: '',
                    GSTPer: '18',
                    SGSTAmount: GstAmount / 2,
                    CGSTPer: '9',
                    CGSTAmount: GstAmount / 2,
                    IGSTPer: '0',
                    IGSTAmount: '0',
                    AfterGSTAmount: cartState?.CartState.salePrice + (cartState?.CartState.salePrice * cartState?.CartState?.gstPercentage / 100),


                },
                UserPurchasePayment: {
                    WalletName: form.getFieldValue("WalletName"),
                    WalletReferenceName: form.getFieldValue("PaymentReferenceNumber"),
                    OtherReferences: "",
                    IFSCCode: form.getFieldValue("IFSCCode"),
                    BankAddress: form.getFieldValue("BankAddress"),
                    TypeOfDoc: "Payment",
                    SavedName: allFilesAadhaar.file.fileList[0].uid + getExtensionByMIMEType({ fileName: allFilesAadhaar.file.fileList[0].type }),
                    OriginalName: allFilesAadhaar.file.fileList[0].name,
                    ImagePath: '',
                    DocExtension: allFilesAadhaar.file.fileList[0].type,
                    lastEditByXid: authCtx?.clientID,
                    PaymentStatusXid: 1,
                    // by default pending.....
                },

            }

            postUserPuchase({ data: commonCompany });
        }
        else {
            setEerrorMessage("Please Uplooad the Payment Proof!");
            setShowImageError(true);
        }
    }


    const OnSuccessHandlerNew = (e) => {

        setAllFilesAadhaar(e.e);

    }

    const OnRemoveHandler = (e) => {
        const filterFiles = filterRemovedFiles({ data: allFilesAadhaar, removeUID: e.e.file.file.uid })
        setAllFilesAadhaar(filterFiles);
    }

    // upon payment successfull.. .whne file upload....
    const OnSuccessHandlerRegister = () => {
        //after successful... 
        //redirecting to product page...
        /// here session will be added......              
        history.push("PaymentSuccess")
    }

    return (
        <>
            <div class="container">
                <div class="row justify-content-center  bg-white">
                    <div class="col-lg">


                        <div class="container py-5 h-100">
                            <div class="row d-flex justify-content-center align-items-center h-100">

                                <div class="card-body p-4">
                                    <h5 class="card-title text-black">Shopping Cart & Payment</h5>
                                    <div class="row bg-white">

                                        <div class="col-lg">


                                            <div class="d-flex justify-content-between align-items-center mb-4">
                                                <div>
                                                    <p class="mb-0">You have 1 items in your cart</p>
                                                </div>
                                                {/* <div>
                                                        <p class="mb-0"><span class="text-muted">Sort by:</span> <a href="#!"
                                                            class="text-body">price <i class="fas fa-angle-down mt-1"></i></a></p>
                                                    </div> */}
                                            </div>

                                            <div class="card mb-3 bg-white">
                                                <div class="card-body">
                                                    <div class="d-flex justify-content-between">
                                                        <div class="d-flex flex-row align-items-center">
                                                            {/* <div>
                                                                                    <img
                                                                                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                                                                                        class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;" />
                                                                                </div> */}
                                                            <div class="ms-3 ">
                                                                <h3>{cartState?.CartState.itemName}</h3>
                                                                {/* <p class="small mb-0">256GB, Navy Blue</p> */}
                                                            </div>
                                                        </div>
                                                        <div class="d-flex flex-row align-items-center">
                                                            <div >
                                                                <h5 class="fw-normal mb-0">2</h5>
                                                            </div>
                                                            <div>
                                                                <h5 class="mb-0">$900</h5>
                                                            </div>
                                                            <a href="#!" ><i class="fas fa-trash-alt"></i></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div data-mdb-input-init class="form-outline form-white mb-4">
                                                <h5 class="text-black">Scan to pay here!</h5>
                                                <div>
                                                    {/* <Image src={QRCode}></Image> */}
                                                </div>
                                                {/* <Button onClick={oNClickShowQRCode} className="btn-primary text-white" type="Primary">Show QR Code</Button> */}
                                            </div>
                                            <div data-mdb-input-init class="form-outline form-white mb-4">
                                                <h5 class="text-black">GPay / Phone Pay to pay here!</h5>
                                                <div>
                                                    <img height={60} width={100} src={"images/gPay.png"}></img>

                                                    <b>{process.env.REACT_APP_GPayNumber}</b>
                                                </div>
                                                {/* <Button onClick={oNClickShowQRCode} className="btn-primary text-white" type="Primary">Show QR Code</Button> */}
                                            </div>




                                        </div>
                                        <div class="col-lg-4">

                                            <div class="card bg-primary text-white rounded-3">
                                                <div class="card-body">
                                                    <div class="d-flex justify-content-between align-items-center mb-4">
                                                        <h5 class="mb-0">Payment & QR Code Details</h5>

                                                    </div>


                                                    <div class="d-flex justify-content-between">
                                                        <p class="mb-2">Subtotal</p>
                                                        <p class="mb-2">{cartState?.CartState.salePrice}</p>
                                                    </div>

                                                    <div class="d-flex justify-content-between">
                                                        <p class="mb-2">Shipping</p>
                                                        <p class="mb-2">0.00</p>
                                                    </div>
                                                    <div class="d-flex justify-content-between">
                                                        <p class="mb-2">GST</p>
                                                        <p class="mb-2">{cartState?.CartState.salePrice * cartState?.CartState?.gstPercentage / 100}</p>
                                                    </div>

                                                    <div class="d-flex justify-content-between mb-4">
                                                        <p class="mb-2">Total(Incl. taxes)</p>
                                                        <p class="mb-2">{cartState?.CartState.salePrice + (cartState?.CartState.salePrice * cartState?.CartState?.gstPercentage / 100)}</p>
                                                    </div>
                                                    <hr class="my-4" />


                                                    <Form form={form}
                                                        onFinish={onFinish}
                                                        onFinishFailed={onFinishFailed}
                                                        layout="vertical"
                                                        name="control-hooks"
                                                        className="row-col"
                                                    >

                                                        <Form.Item
                                                            className="username"
                                                            label="Wallet Name"
                                                            name="WalletName"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Please enter the Wallet Name!",
                                                                },
                                                            ]}
                                                        >
                                                            <Input placeholder="Wallet Name" />

                                                        </Form.Item>






                                                        <Form.Item
                                                            className="username"
                                                            label="Payment Reference Number"
                                                            name="PaymentReferenceNumber"
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: "Please enter the Payment Reference Number!",
                                                                },
                                                            ]}
                                                        >
                                                            <Input placeholder="Payment Reference Number" />

                                                        </Form.Item>





                                                        <div class="col-md-2">
                                                            <div class="form-group">
                                                                <FileUpload
                                                                    onSuccess={(e) => OnSuccessHandlerNew({ e: e, type: "payment" })}
                                                                    onRemove={(e) => OnRemoveHandler({ e: e, type: "payment" })}
                                                                    heading={"Upload Payment Screen"}
                                                                    accept={"image/*"}
                                                                    fileList={allFilesAadhaar?.file?.fileList}
                                                                    maxCount={1}
                                                                    hideUploadButton={false}
                                                                    showRemoveIcon={true}
                                                                ></FileUpload>
                                                            </div>
                                                        </div>
                                                        <Form.Item>
                                                            <Button
                                                                type="primary"
                                                                htmlType="submit"
                                                            >
                                                                Finish
                                                            </Button>

                                                        </Form.Item>
                                                    </Form>

                                                </div>
                                            </div>

                                        </div>

                                    </div>

                                </div>


                            </div>
                        </div>



                        {/* {showQRCoee == true ?
                            <QRCodeModal
                                onCancel={() => OnCancelQRCode()}
                            ></QRCodeModal>
                            : null
                        } */}
                        {
                            !!showActionMessage == true ? <AlertModal
                                onCancel={() => OnSuccessHandlerRegister()}
                                title={"Payment Successful!"}></AlertModal> : null
                        }
                    </div>
                </div>
            </div>


            {!!showImageError == true ? <AlertModal onCancel={() => {
                setShowImageError(false);
            }} title={errorMessage}></AlertModal> : null
            }
        </>
    )
};

export default Payments