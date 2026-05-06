import { Button, Modal } from "antd";
import PropTypes from "prop-types";


export default function DeleteConfirmationModal({
    onCancel,
    onClickDeleteButton,
    isCancelTransaction = false,
    isTriggerTransaction = false,
    confirmationMessage = "Are you sure want to delete?",
}) {
    return (
        <>
            <Modal footer={null}
                open={true}
                onCancel={onCancel}
                closable={true}
                maskClosable={false}>
                <div>{confirmationMessage}</div>
                <Button type="primary" onClick={onClickDeleteButton}>Yes</Button>
                <Button type="submit" onClick={onCancel}>No</Button>
            </Modal>
        </>
    );
}

DeleteConfirmationModal.propTypes = {
    onCancel:PropTypes.func,
    onClickDeleteButton: PropTypes.func,
    isCancelTransaction: PropTypes.bool,
};