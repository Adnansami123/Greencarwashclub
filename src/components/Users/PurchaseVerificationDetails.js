
import {
    Row,
    Col,
    Card,
    Radio,
    Table,
    Upload,
    message,
    Progress,
    Button,
    Avatar,
    Typography,
    useState,
    useUsersMutation,
    useEffect,
    DeleteConfirmationModal,
    ConfirmationModal,
    AuthContext,

} from "../index";
import UserModal from "./UserModal";
import {
    DownloadOutlined, PlusCircleOutlined,
    FormOutlined,
    DeleteOutlined
} from '@ant-design/icons';
import { useContext } from "react";
import { useDeleteUserMutation, useGetUserByIDMutation } from "../../store/ConfigurationAPI/ConfigurationAPI";
import { Tag } from "antd";
import { setLoadingModalConfiguration } from "../../store/Slices/ModalLoaderSlice";
import { useDispatch } from "react-redux";
import { useApprovedPurchaseMutation, useGetAllPuchaseByUserMutation } from "../../store/ConfigurationAPI/ConfigurationMLM";
import {
    CloseOutlined
} from '@ant-design/icons';
// import { useEffect, useState } from "react";
// //import project1 from "../assets/images/logo.png";
// import project2 from "../../assets/images/logo.png";

// import project1 from "../../assets/images/logo.png"
// import { Link } from "react-router-dom
import PropTypes from "prop-types";
import FileUpload from "../CommonComponents/FileUpload";
import { getImagesData } from "../../utils";

export default function PurchaseVerificationDetails({
    item = {},
    onCancel,
    isModalClosable = true,
    isModalOpen = true,
    onSuccess,
    onUpdated,
    showPopup = true,
    clientIDFromAddClient = 0, // this is used to add the user fromt he client module....
    // if clientIDFromAddClient not equal to 0 then only Client need to show. this is from client module.
    isAdminOnly = false,  // if isAdminOnly true then only Admin need to show. this is from branch
    PurchaseID = null,

}) {
    const dispatch = useDispatch();
    const [allFiles, setAllFiles] = useState([]);

    const [
        getPurchaseDetailsByUserXID,
        {
            data: getPurchaseDetailsByUser,
            isSuccess: isgetPurchaseDetailsByUserSuccess,
        },
    ] = useGetAllPuchaseByUserMutation();


    useEffect(() => {
        if (getPurchaseDetailsByUser?.length > 0) {
            dispatch(setLoadingModalConfiguration({ isVisible: false }));
            if (getPurchaseDetailsByUser[0]?.userPurchasePayments?.length > 0) {
                setAllFiles(getImagesData({ imagesData: getPurchaseDetailsByUser[0]?.userPurchasePayments }));
            }
        }
        else if (isgetPurchaseDetailsByUserSuccess) {
            dispatch(setLoadingModalConfiguration({ isVisible: false }));
        }
    }, [getPurchaseDetailsByUser, isgetPurchaseDetailsByUserSuccess])


    const onClickApprove = (e) => {
        onSuccess({
            UnderUserXid: e.key,
            userXid: e.pid,
            purchasePId: e.purchasePId,
        });
    }

    useEffect(() => {
        if (PurchaseID != null) {
            dispatch(setLoadingModalConfiguration({ isVisible: true }));
            getPurchaseDetailsByUserXID({
                id: PurchaseID,
            });
        }
    }, [PurchaseID])

    const onClickCancel = () => {
        // history.push("CompanyNetwork");
        onCancel();
    }

    return (
        <>



            <Card
                bordered={false}
                className="criclebox tablespace mb-24"
                title="KYC Verification Details"
                extra={
                    <>
                        <Button type="Primary" icon={<CloseOutlined></CloseOutlined>} onClick={onClickCancel}>
                            Cancel
                        </Button>
                    </>

                }
            >
                {!!getPurchaseDetailsByUser == true ? <>
                    <div class="row">
                        <div class="col-16">
                            <div class="col-16 bg-primary text-white">
                                REFERRAL DETAILS
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                Referral Code
                            </div>
                            <div class="col-md-3">
                                -
                            </div>

                            <div class="col-md-3">
                                User Name
                            </div>
                            <div class="col-md-3">
                                -
                            </div>
                        </div>
                        <div class="col-16">
                            <div class="col-16 bg-primary  text-white">
                                PERSONAL DETAILS
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                First Name
                            </div>
                            <div class="col-md-3">
                                {getPurchaseDetailsByUser[0]?.firstName}
                            </div>

                            <div class="col-md-3">
                                "Last Name
                            </div>
                            <div class="col-md-3">
                                {getPurchaseDetailsByUser[0]?.lastName}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                Mobile
                            </div>
                            <div class="col-md-3">
                                {getPurchaseDetailsByUser[0]?.mobile}
                            </div>

                            <div class="col-md-3">
                                Email ID
                            </div>
                            <div class="col-md-3">
                                {getPurchaseDetailsByUser[0]?.email}
                            </div>
                        </div>
                        <div class="row">
                            {/* <div class="col-md-3">
                                City
                            </div>
                            <div class="col-md-3">
                            {getPurchaseDetailsByUser[0]?.email}

                            </div> */}

                            <div class="col-md-3">
                                Address
                            </div>
                            <div class="col-md-3">
                                -
                            </div>
                        </div>




                        <div class="col-16">
                            <div class="col-16 bg-primary text-white">
                                Bank Details
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                Bank Name
                            </div>
                            <div class="col-md-3">
                                {getPurchaseDetailsByUser[0]?.userBanks?.bankName}
                            </div>

                            <div class="col-md-3">
                                Account No
                            </div>
                            <div class="col-md-3">
                                {getPurchaseDetailsByUser[0]?.userBanks?.accountNo}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                Bank Branch
                            </div>
                            <div class="col-md-3">
                                {getPurchaseDetailsByUser[0]?.userBanks?.bankBranch}
                            </div>

                            <div class="col-md-3">
                                IFSC Code
                            </div>
                            <div class="col-md-3">
                                {getPurchaseDetailsByUser[0]?.userBanks?.ifscCode}

                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                Bank Address
                            </div>
                            <div class="col-md-3">
                                {getPurchaseDetailsByUser[0]?.userBanks?.bankAddress}
                            </div>


                        </div>


                        <div class="col-16">
                            <div class="col-16 bg-primary text-white">
                                Product Details
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                Product Name
                            </div>
                            <div class="col-md-3">
                                {getPurchaseDetailsByUser[0]?.productName}
                            </div>

                            <div class="col-md-3">
                                Amount
                            </div>
                            <div class="col-md-3">
                                {getPurchaseDetailsByUser[0]?.quantityAmount}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                GST Percentage
                            </div>
                            <div class="col-md-3">
                                {getPurchaseDetailsByUser[0]?.gstPer}

                            </div>

                            <div class="col-md-3">
                                GST Amount
                            </div>
                            <div class="col-md-3">
                                {Number(getPurchaseDetailsByUser[0]?.sgstAmount) + Number(getPurchaseDetailsByUser[0]?.cgstAmount)}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                Total Paid
                            </div>
                            <div class="col-md-3">
                                {getPurchaseDetailsByUser[0]?.afterGSTAmount}

                            </div>

                            <div class="col-md-3">
                                Wallet
                            </div>
                            <div class="col-md-3">
                                {getPurchaseDetailsByUser[0]?.userPurchasePayments[0]?.walletName}
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                Pay. Reference
                            </div>
                            <div class="col-md-3">
                                {getPurchaseDetailsByUser[0]?.userPurchasePayments[0]?.walletReferenceName}
                            </div>



                        </div>
                        <div class="col-16">
                            <div class="col-16 bg-primary text-white">
                                Payment Proof
                            </div>
                        </div>
                        <div class="row">


                            <>

                                <div class="col-md-6">
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
                                    {/* {aa.typeOfDoc} */}
                                </div>
                            </>



                        </div>

                        <div class="col-16">
                            <div class="col-16 bg-primary">

                            </div>
                        </div>
                        {getPurchaseDetailsByUser[0]?.paymentStatusXid != 1 ? <><div>Already Approved!</div></> :
                            <>
                                <Button type="primary" className="primary" onClick={() => onClickApprove({ pid: getPurchaseDetailsByUser[0]?.pid, key: getPurchaseDetailsByUser[0]?.underUserXid, purchasePId: getPurchaseDetailsByUser[0]?.purchasePid })}>Approve</Button>
                            </>
                        }
                        <div class="row">
                            {/* <div class="col-md-3">
                              
                            </div> */}
                            {/* <div class="col-md-3">
                                <Button>Reject</Button>
                            </div> */}

                            {/* <div class="col-md-3">
                            Account No
                        </div>
                        <div class="col-md-3">
                            4343
                        </div> */}
                        </div>
                    </div>
                </> : null}

            </Card >




            {/* {showDelete && (<DeleteConfirmationModal
                    onClickDeleteButton={onDeleteConfirm}
                    onCancel={() => setShowDelete(false)}
                    item={assetByIDData}
                ></DeleteConfirmationModal>)
                }
                {showActionMessage && (<ConfirmationModal
                    onClickDeleteButton={onDeleteConfirm}
                    onCancel={() => setShowDelete(false)}
                    transactionType={transactionType}
                    item={assetByIDData}
                ></ConfirmationModal>)
                } */}

        </>
    );

} PurchaseVerificationDetails.propTypes = {
    item: PropTypes.object,
    onCancel: PropTypes.func,
    isModalClosable: PropTypes.bool,
    isModalOpen: PropTypes.bool,
    onSuccess: PropTypes.func,
    onUpdated: PropTypes.func,
    showPopup: PropTypes.bool,
    clientIDFromAddClient: PropTypes.number,  // if clientIDFromAddClient not equal to 0 then only Client need to show. this is from client module.
    isAdminOnly: PropTypes.bool,  // if isAdminOnly true then only Admin need to show. this is from branch
    PurchaseID: PropTypes.number,


}