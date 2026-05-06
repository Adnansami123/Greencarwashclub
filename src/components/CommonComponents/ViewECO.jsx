import {
    Form, Button,
    Input,
    Upload,
    message,
    Col,
    Row,
    Select
} from "antd";
import PropTypes from "prop-types";
import { useCallback, useContext, useEffect, useState } from "react";
import { string } from "yup";
import { UploadOutlined } from '@ant-design/icons';
import AuthContext from "../../store/authentication/auth-context";
import { useGetClientsMutation } from "../../store/ClientsAPI/ClientsAPI";
import { useContract_GetFilterMutation } from "../../store/ConfigurationAPI/ConfigurationAPI";
import FileUpload from "./FileUpload";
import { useGetEmergencyCallOutByIDMutation } from "../../store/CientModule/EmergencyCallOutAPI";
import { getImagesData } from "../../utils";

export default function ViewECO({
    item = {},
    onCancel,
    isModalClosable = true,
    isModalOpen = true,
    onSuccess,
    onRemove,
    onUpdated,
    maxCount = 1,
    heading = "Upload Asset Image",
    accept = ".jpg, .png",
    fileList = [],
    hideUploadButton = false,
    showRemoveIcon = true,
    emergencyCallOutPid = 0,

}) {

    const [allFiles, setAllFiles] = useState([]);
    const [assetByIDData, setAssetByIDData] = useState([]);

    console.log("assetByIDData", assetByIDData);

    const [
        fetchAssetByID,
        {
            data: getAssetByIDData,
            isSuccess: isAssetByIDSuccess,
        },
    ] = useGetEmergencyCallOutByIDMutation();

    useEffect(() => {
        fetchAssetByID({
            id: emergencyCallOutPid,
        });
    }, [emergencyCallOutPid])

    useEffect(() => {
        if (!!getAssetByIDData) {

            setAllFiles(getImagesData({ imagesData: getAssetByIDData.emergencyCallout.emergencyCallOutImages }));
            setAssetByIDData(getAssetByIDData);
        }

    }, [getAssetByIDData])
    return (
        <>

            <div className="col">
                <div className="ml-10 text-primary bg-primary text-white">EMERGENCY CALL OUT DETAILS</div>
            </div>
            <div>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-3 floatpad0">
                            <div className="font-weight-bold">Asset</div>
                            <div>{getAssetByIDData?.asset?.assetName}</div>
                        </div>
                        <div className="col-md-3 floatpad0">
                            <div>Issue</div>
                            <div>{getAssetByIDData?.emergencyCallout?.issue}</div>
                        </div>
                        <div className="col-md-3 floatpad0">
                            <div>Location</div>
                            <div>{getAssetByIDData?.emergencyCallout?.location}</div>
                        </div>


                    </div>
                </div>
                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-3 floatpad0">
                            <div>Submmited On</div>
                            <div>{getAssetByIDData?.emergencyCallout?.createdOn}</div>
                        </div>
                        <div className="col-md-3 floatpad0">
                            <div>Images</div>
                            <div> <FileUpload
                                accept={"image/*"}
                                fileList={allFiles?.file?.fileList}
                                maxCount={4}
                                showRemoveIcon={true}
                                hideUploadButton={true}
                            ></FileUpload></div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
}

ViewECO.propTypes = {
    item: PropTypes.object,
    onCancel: PropTypes.func,
    isModalClosable: PropTypes.bool,
    isModalOpen: PropTypes.bool,
    onSuccess: PropTypes.func,
    onRemove: PropTypes.func,
    onUpdated: PropTypes.func,
    maxCount: PropTypes.number,

}