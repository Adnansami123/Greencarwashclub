import {
    Button,
    Table, Tag, Badge, Modal
} from "antd";
import PropTypes from "prop-types";
import moment from "moment";
import {
    FormOutlined,
} from '@ant-design/icons';
import { getSurveyType, onlyDate } from "../../utils";
import { useState } from "react";
import { PDFDownloadicon } from "../../utils/icons";
import EditPPMFrequency from "../Contracts/EditPPMFrequency";
import PPMPlannerReportDownloadModal from "../../common/Reports/PPMPlannerReportDownloadModal";
export default function ContractAssetCommonDetails({
    item = {},
    onCancel,
    isModalClosable = true,
    isModalOpen = true,

}) {

    const [currentPage, setCurrentPage] = useState(1);
    const [currentPageSize, setCurrentPageSize] = useState(10);

    const columns = [
        {
            title: "Sl. No.",
            render: (_, records, index) => (
                <>
                    {currentPage === 1 ? index + 1 : (currentPageSize * (currentPage - 1) + index + 1)}
                </>
            )
        },
        {
            title: "Asset Details",
            dataIndex: "nameOfAtt",
            key: "nameOfAtt",
        },
        {
            title: "Asset Details Value ",
            dataIndex: "AssetValue",
            key: "AssetValue",
        },
        // {
        //     title: "Is Database? ",
        //     dataIndex: "isFromDataBase",
        //     key: "isFromDataBase",
        // },
        // {
        //     title: "Action",
        //     key: "edit",
        //     render: (_, records, index) => (
        //         <>
        //             <Button icon={<FormOutlined />} onClick={() => onClickEditAssetCommonDetails({ key: records?.pid })}></Button>
        //             <Button icon={<DeleteOutlined />} onClick={(e) => onClickDeleteAssetCommonDetails({ key: records?.pid })}></Button>
        //         </>
        //     )

        // },

    ];

    return (
        <>
            <Modal open={isModalOpen} title={"View Contract Asset Details"} footer={null}
                closable={isModalClosable}
                onCancel={onCancel}
                maskClosable={false}
            >
                <div className="table-responsive">
                    <Table
                        columns={columns}
                        dataSource={!!item ? item : null}
                        // onChange={((e) => onChangePageChange(e))}
                        // pagination={false}
                        className="ant-border-space"
                    />
                </div>
            </Modal>
        </>
    )
}


ContractAssetCommonDetails.propTypes = {
    item: PropTypes.object,
    onCancel: PropTypes.func,
    isModalClosable: PropTypes.bool,
    isModalOpen: PropTypes.bool,


}