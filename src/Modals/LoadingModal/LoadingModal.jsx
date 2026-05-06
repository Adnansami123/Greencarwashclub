import { Modal } from "antd";
import PropTypes from "prop-types";
import { default as loader } from "../../components/UI/loading";

export default function LoadingModal ({isVisible, loadingText}){
    return (
        <>
            <Modal centered 
            zIndex={5000}
            open={isVisible}
            footer={null}
            maskClosable={false}
            closable={false}            
            >
                {loader({isLoading: true, loadingText:loadingText})}
            </Modal>
        </>
    );
}