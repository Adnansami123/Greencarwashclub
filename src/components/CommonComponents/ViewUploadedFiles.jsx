import {
    Form, Button,
    Input,
    Upload,
    message,
    Row,
    Col,
    Modal
} from "antd";
import PropTypes from "prop-types";
import { useCallback, useContext, useEffect, useState } from "react";
import { string } from "yup";
import { UploadOutlined } from '@ant-design/icons';
import AuthContext from "../../store/authentication/auth-context";
import FileUpload from "./FileUpload";

export default function ViewUploadedFiles({
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

    return (
        <>
            <Modal open={isModalOpen} title={"Uploaded Asset Survey Process Images"} footer={null}
                closable={isModalClosable}
                onCancel={onCancel}
                maskClosable={false}

            >
                <Row>
                    <Col
                        span={24}
                        style={{
                            textAlign: 'left',
                        }}
                    >
                        <p>Uploaded Asset Survey Process Images</p>
                        <FileUpload
                            fileList={fileList}
                            accept={"image/*,.JPG"}
                            maxCount={4}
                            hideUploadButton={true}
                            showRemoveIcon={false}
                        ></FileUpload>
                    </Col>
                </Row>
            </Modal >
        </>
    );
}

ViewUploadedFiles.propTypes = {
    item: PropTypes.object,
    onCancel: PropTypes.func,
    isModalClosable: PropTypes.bool,
    isModalOpen: PropTypes.bool,
    onSuccess: PropTypes.func,
    onRemove: PropTypes.func,
    onUpdated: PropTypes.func,
    maxCount: PropTypes.number,

}
