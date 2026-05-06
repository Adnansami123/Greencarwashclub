import { Button, Modal } from "antd";
import PropTypes from "prop-types";


export default function ConfirmationModal({
    onCancel,
    onClickDeleteButton,
    isCancelTransaction = false,
    isTriggerTransaction = false,
    transactionType = "",
}) {
    return (
        <>
            <Modal footer={null}
                open={true}
                onCancel={onCancel}
                closable={false}
                maskClosable={false}>
                {transactionType === "added" ? <div>Records is added successfully!</div> :
                    transactionType === "updated" ? <div> Records is updated successfully!</div>
                        :   transactionType === "deleted" ?<div> Records is deleted successfully!</div> 
                        :   transactionType === "error" ?<div> Transaction failed!</div> 
                        :   transactionType === "NoRecord" ?<div> No Record Found!</div> 
                        :   transactionType === "approved" ?<div> Record has been Approved!</div> 
                        :   transactionType === "forgotPasswordEmailSent" ?<div> forgot Password Email Sent!</div> 
                        :<div> transaction successfully!</div>
                }

            </Modal>
        </>
    );
}

ConfirmationModal.propTypes = {
    onCancel: PropTypes.func,
    onClickDeleteButton: PropTypes.func,
    isCancelTransaction: PropTypes.bool,
};