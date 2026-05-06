import { Modal } from "antd";
import PropTypes from "prop-types";
import { modalBodyStyle } from "./modalStyles";

export default function AlertModal({
    title,
    content,
    isModalClosable = true,
    onCancel,
    imgPath,


}) {
    return (
        <>
            <Modal

               // bodyStyle={modalBodyStyle({ isAlertModal: true })}
                centered
                footer={null}
                open={true}

                onCancel={onCancel}
                closable={isModalClosable}
                maskClosable={false}>
                <div>
                    {!!imgPath && (
                        <img src={imgPath} alt='alert icon' className='alert-icon' />
                    )}

                    {title}

                    <p>{content}</p>
                    <div>

                    </div>



                </div>
            </Modal>
        </>
    );
}

AlertModal.propTypes = {
    title: PropTypes.string,
    content: PropTypes.element || PropTypes.string,
    imgPath: PropTypes.string,
    onCancel: PropTypes.func,
    isModalClosable: PropTypes.bool,
};
