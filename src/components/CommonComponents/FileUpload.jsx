import {
    Form, Button,
    Input,
    Upload,
    message
} from "antd";
import PropTypes from "prop-types";
import { useCallback, useContext, useEffect, useState } from "react";
import { string } from "yup";
import { UploadOutlined } from '@ant-design/icons';
import AuthContext from "../../store/authentication/auth-context";
var XLSX = require("xlsx");

export default function FileUpload({
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

}) {

    const initStates = {
        assetName: "",
        assetTypeName: "",
        subAssetTypeName: "",
    }

    const authCtx = useContext(AuthContext);
    const [closeModal, setCloseModal] = useState(true);

    useEffect(() => {
        if (!!item?.pid === false) return;
        console.log("working!");
    }, [item])


    const onClickReset = () => {


    }

    const [states, setStates] = useState(initStates);
    const  onChangeUpload = async (e) => {
        //alert('demo');
        console.log("file remove", e);
        console.log("file remove", e.file?.status);
        if (e.file?.status === "removed") {
            console.log("file remove");
            onRemove({ fileName: "a", sorce: "b", file: e });
        }
        else {
            const fileSize = e.file.size / 1024 / 1024 < 2.5;
            const reader = new FileReader();
            const rABS = !!reader.readAsBinaryString;
            // const data = await e.arrayBuffer();
            // alert(data);
            reader.onload = e => {
                /* Parse data */
                const bstr = e.target.result;
                const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
                /* Get first worksheet */
                const wsname = wb.SheetNames[0];
                const ws = wb.Sheets[wsname];
                console.log(rABS, wb);
                /* Convert array of arrays */
                const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

                console.log("filefiledata", data);
                /* Update state */
                // this.setState({ data: data, cols: make_cols(ws["!ref"]) });
            };

            console.log("fileSize", fileSize);
            console.log("fileSize" + fileSize);
            if (!fileSize) {
                message.error(`${e.file.name} size is exceeded.`);
            }
            else {
                onSuccess({ fileName: "a", sorce: "b", file: e });
                // onSuccess =
            }
        }

    }
    const beforeUpload = (file) => {
        let isPNG;
        console.log("filefile", file);
        console.log("filefile", accept);
        if (file.type === "image/png")
            isPNG = file.type;
        else if (file.type === "image/jpg" || file.type === "image/jpeg" || file.type === "application/pdf") {
            isPNG = file.type;
        }
        else if (accept == ".xlsx" && file.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            isPNG = file.type;
        }

        if (!isPNG) {

            message.error(`${file.name} is not a png or JPG file`);
        }
        const reader = new FileReader();
        reader.onload = e => {
            console.log("beforeUpload", e.target.result);
        };
        const readData = reader.readAsText(file);
        // console.log("beforeUpload", readData);
        return false;
    }

    const onPreview = async (file) => {
        let src = file.url;
        console.log("onPrview", file);
        console.log("onPrview", file.originFileObj);
        if (!src) {
            src = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    return (
        <>
            <div>
                <Upload
                    method=""
                    accept={accept}
                    multiple={false}
                    fileList={fileList}
                    listType="picture-card"
                    maxCount={maxCount}
                    beforeUpload={beforeUpload}
                    onChange={onChangeUpload}
                    onPreview={onPreview}
                    showUploadList={{ showRemoveIcon: showRemoveIcon }}

                >
                    {hideUploadButton === true ? null : heading}
                    {/* <Button   type="primary"  icon={<UploadOutlined />}>{heading}</Button> */}

                </Upload>
            </div>
        </>
    );

}

FileUpload.propTypes = {
    item: PropTypes.object,
    onCancel: PropTypes.func,
    isModalClosable: PropTypes.bool,
    isModalOpen: PropTypes.bool,
    onSuccess: PropTypes.func,
    onRemove: PropTypes.func,
    onUpdated: PropTypes.func,
    maxCount: PropTypes.number,

}