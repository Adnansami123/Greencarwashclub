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
import logo from "../../assets/images/BTFS_Logo-V1-transparent-175x149.png"

export default function GSTInvoiceReportDownloadModal(
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

    console.log("GSTInvoiceNumber", GSTInvoiceNumber);
    const [data, setData] = useState([]);
    const [getEmergencyCallOutData, setgetEmergencyCallOutData] = useState({});


    const [
        GetInvoiceReportData,
        {
            data: getFetInvoiceReportData,
            isSuccess: isetInvoiceReportDataSuccess,
        },
    ] = useGetInvoiceReportDataMutation();

    useEffect(() => {
        if (!!getFetInvoiceReportData) {
            setData(getFetInvoiceReportData);
        }

    }, [getFetInvoiceReportData])



    //end here....
    useEffect(() => {

        if (!!GSTInvoiceNumber) {
            GetInvoiceReportData({

                GSTInvoiceNumber: GSTInvoiceNumber,
            });
        }

    }, [GSTInvoiceNumber])

    const [allFiles, setAllFiles] = useState([]);

    useEffect(() => {

        // let extension = arr.pop();
        const fileNew = {
            file: {
                fileList: [{
                    //   uid: getUserBYIDData.imageName,
                    uid: "logo",
                    name: "logo",
                    status: "done",
                    //  url: "https://btfsstorage.blob.core.windows.net/filecontainer/" + item.imagePath,
                    //  url: URL.createObjectURL(logo),
                    url: logo,
                    isFromDB: true,
                    // type: extension,
                    type: "image/png",
                }]

            }
        };
        setAllFiles(fileNew);
    }, [logo])
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

                                    document={<GSTInvoiceReport invoicedata={!!data == true ? data : null}
                                        CompanyLogo={!!allFiles == true ? allFiles?.file?.fileList
                                            : null} />}
                                    fileName={"GSTInvoice.pdf"}
                                >
                                    {({ blob, url, loading, error }) =>
                                        loading ? "Loading..." : "Export to PDF"
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

GSTInvoiceReportDownloadModal.propTypes = {
    item: PropTypes.object,
    onCancel: PropTypes.func,
    isModalClosable: PropTypes.bool,
    isModalOpen: PropTypes.bool,
    onSuccess: PropTypes.func,
    onUpdated: PropTypes.func,
    onClickRedirect: PropTypes.func,
    //ppmFrequencySurveySchedulePid: PropTypes.object,

}