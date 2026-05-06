import { Button, Input, Modal, } from "antd";
import PropTypes from "prop-types";

import {
    DownloadOutlined, PlusCircleOutlined,
    FormOutlined,
    DeleteOutlined,
} from '@ant-design/icons';
import { PDFDownloadLink } from "@react-pdf/renderer";
import PPMReportPdfDocument from "../../utils/PPMReport/PPMReport";
import { useEffect, useState } from "react";
import { useGetRptPPMFrequencySurveyDtlsMutation } from "../../store/ConfigurationAPI/ConfigurationAPI";
import { useGetEmergencyCallOutByIDMutation } from "../../store/CientModule/EmergencyCallOutAPI";
import GSTInvoiceReport from "../../utils/GSTInvoice/GSTInvoiceReport";
import { useGetInvoiceReportDataMutation } from "../../store/InvoiceAPI/InvoiceAPI";
import PaymentReport from "../../utils/GSTInvoice/payment/PaymentReport";
import { useGetRptPaymentTransactionByIDMutation } from "../../store/PaymentAPI/PaymentAPI";


export default function PaymentReceiptReportDownloadModal(
    {
        item = {},
        onCancel,
        isModalClosable = true,
        isModalOpen = true,
        onSuccess,
        onUpdated,
        GSTInvoiceNumber,
        onClickRedirect,

    }
) {

    const [data, setData] = useState([]);
    const [getEmergencyCallOutData, setgetEmergencyCallOutData] = useState({});


    const [
        GetInvoiceReportData,
        {
            data: getFetInvoiceReportData,
            isSuccess: isetInvoiceReportDataSuccess,
        },
    ] = useGetRptPaymentTransactionByIDMutation();

    useEffect(() => {
        if (!!getFetInvoiceReportData) {
            setData(getFetInvoiceReportData);
        }

    }, [getFetInvoiceReportData])



    //end here....
    useEffect(() => {

        if (!!GSTInvoiceNumber) {
            GetInvoiceReportData({
                // id is nothting but payment tranaction...
                id: GSTInvoiceNumber,
            });
        }

    }, [GSTInvoiceNumber])



    return (
        <>
            <Modal open={isModalOpen} title={"Download the Report"} footer={null}
                closable={isModalClosable}
                onCancel={onCancel}
                maskClosable={false}
            >
                <div className="row mt-2 custom-float">
                    <div className="col-md-16">
                        <div className="row">
                            {data?.length > 0 && (
                                <PDFDownloadLink

                                    document={<PaymentReport invoicedata={!!data == true ? data : null} />}
                                    fileName={"GSTInvoice.pdf"}
                                >
                                    {({ blob, url, loading, error }) =>
                                        loading ? "Loading..." : "Export to PDF (Payment Receipt)"
                                    }
                                </PDFDownloadLink>
                            )}
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

PaymentReceiptReportDownloadModal.propTypes = {
    item: PropTypes.object,
    onCancel: PropTypes.func,
    isModalClosable: PropTypes.bool,
    isModalOpen: PropTypes.bool,
    onSuccess: PropTypes.func,
    onUpdated: PropTypes.func,
    onClickRedirect: PropTypes.func,
    //ppmFrequencySurveySchedulePid: PropTypes.object,

}