import React, { Fragment } from 'react';
import { Text, View, StyleSheet, Image, Link } from '@react-pdf/renderer';
import { PPMReportInvoiceTableHeader, PPMReportInvoiceTableHeaderSub, PPMReportInvoiceTableHeaderReplaement, PPMReportCSInvoiceTableHeaderSub } from './PPMReportInvoiceTableHeader';
import { AssetSurveyHeading, ECOHeding, PPMReportBillTo, SparePartsHeading } from './PPMReportBillTo';

const borderColor = '#000000'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        alignItems: 'center',
        // height: 24,
        fontStyle: 'bold',
        width: '100%',
    },
    sno: {
        width: '10%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 4,
        flexGrow: 1,
        height: '100%',
    },
    descriptionWithTopBorder: {
        width: '50%',
        textAlign: 'left',
        textWrap: 'wrap',
        //  textOverflow: 'ellipsis',
        borderTopColor: borderColor,
        borderTopWidth: 1,
        borderRightColor: borderColor,
        // display:"flex",
        // flexDirection:"row",
        borderRightWidth: 1,
        paddingLeft: 8,
        height: '100%',

    },
    description: {
        width: '50%',
        textAlign: 'left',
        textWrap: 'wrap',
        //  textOverflow: 'ellipsis',
        borderRightColor: borderColor,
        // display:"flex",
        // flexDirection:"row",
        borderRightWidth: 1,
        paddingLeft: 8,
        height: '100%',
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        flexGrow: 1,
        textAlign: 'center',
        paddingRight: 8,
        height: '100%',
    },
    amount: {
        width: '25%',
        borderRightColor: borderColor,
        textAlign: 'center',
        paddingRight: 2,
        textWrap: 'wrap',
        height: '100%',
    },
});

const stylesHeader = StyleSheet.create({
    headerContainer: {
        marginTop: 16,
        justifyContent: 'flex-start',
        width: '50%'
    },
    billTo: {
        marginTop: 10,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    },
});


const PPMReportInvoiceTableRow = ({ items }) => {
    const rows = items.contractChecklistItemSurveyProcess.map((item, rowindex) =>
        <>
            {rowindex === 0 && <PPMReportBillTo invoice={item} />}
            {rowindex === 0 ? <PPMReportInvoiceTableHeader /> : null}
            <View style={styles.row}>
                <Text style={styles.sno}>{rowindex + 1}</Text>
                <Text style={styles.description}>{item.checkListItems.description}</Text>
                <Text style={styles.rate}>{item.isProcessed === true ? "Yes" : "No"}</Text>
                <Text style={styles.amount}>{item.remarks}</Text>
            </View>
        </>
    );
    return (<Fragment>{rows}</Fragment>)
};

const EmergencyCallOutRequestSection = ({ items, ECOData }) => {
    const rows = items.contractAssetDetailsSurveyProcess.map((item, rowindex) =>

        item.lstContractAssetDetails.map((rowitem, subrowindex) =>
            <>
                {rowindex === 0 && <ECOHeding heading={"Complaint Report"} />}
                <View style={styles.row}>
                    <Text style={styles.descriptionWithTopBorder}>{"Data & Time:"}</Text>
                    <Text style={styles.descriptionWithTopBorder}>{ECOData.emergencyCallout.createdOn}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.description}>{"Asset Type:"}</Text>
                    <Text style={styles.amount}>{items.ppmFrequencySurveySchedule.assetName}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.description}>{"Location:"}</Text>
                    <Text style={styles.amount}>{ECOData.emergencyCallout.location}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.description}>{"Issue:"}</Text>
                    <Text style={styles.amount}>{ECOData.emergencyCallout.issue}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.description}>{"Photo(s):"}</Text>
                    {ECOData.emergencyCallout.emergencyCallOutImages.map((rowitem, subrowindex) =>

                        <>
                            <Link src={`${process.env.REACT_APP_API_BASEURL}/Upload/` + rowitem.savedName + `?entityType=AssetImage`}> Click to download</Link>
                            {/* <Text style={styles.amount}>{ECOData.emergencyCallOutImages[0].savedName}</Text> */}
                        </>
                    )
                    }
                    {/* <Image style={styles.image} src={"https://btfsstorage.blob.core.windows.net/filecontainer/" + ECOData.emergencyCallOutImages[0].savedName} cache={false} /> */}
                    {/* https://localhost:7039/api/Upload/0caec14c-7cae-446b-9ad3-ba89e06c3602.png?entityType=AssetImage */}

                </View>
            </>
        )
    );
    return (<Fragment>{rows}</Fragment>)
};

const EmergencyCallOutResponseSection = ({ items }) => {
    const rows = items.contractAssetDetailsSurveyProcess.map((item, rowindex) =>

        item.lstContractAssetDetails.map((rowitem, subrowindex) =>

            <>
                {rowindex === 0 && <ECOHeding heading={"Response Report"} />}

                <View style={styles.row}>
                    <Text style={styles.descriptionWithTopBorder}>{"Data & Time:"}</Text>
                    <Text style={styles.descriptionWithTopBorder}>{rowitem.assetTypes.createdOn}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.description}>{"Asset Type:"}</Text>
                    <Text style={styles.amount}>{rowitem.assetTypes.nameEng}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.description}>{"Location:"}</Text>
                    <Text style={styles.amount}>{item.location}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.description}>{"Issue:"}</Text>
                    <Text style={styles.amount}>{item.issue}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.description}>{"Action Taken:"}</Text>
                    <Text style={styles.amount}>{item.actionTaken}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.description}>{"Photo(s):"}</Text>
                    <Text style={styles.amount}>{"-"}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.description}>{"Status:"}</Text>
                    <Text style={styles.amount}>{item.isPassed === true ? "Passed" : "Failed"}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.description}>{"Remarks: (if open):"}</Text>
                    <Text style={styles.amount}>{item.remarks}</Text>
                </View>
            </>
        )
    );
    return (<Fragment>{rows}</Fragment>)
};



const PPMReportInvoiceTableRowSub = ({ items }) => {
    console.log("invoicedata", items);
    const rows = items.contractAssetDetailsSurveyProcess.map((item, rowindex) =>

        item.lstContractAssetDetails.map((rowitem, subrowindex) =>

            <>
                {rowindex === 0 && <AssetSurveyHeading invoice={item} />}
                {rowindex === 0 && <PPMReportInvoiceTableHeaderSub />}
                <View style={styles.row}>
                    <Text style={styles.sno}>{rowindex + 1}</Text>
                    <Text style={styles.description}>{rowitem.assetTypes.nameEng}</Text>
                    <Text style={styles.description}>{rowitem.subAssetTypes.nameEng}</Text>
                    {/* <Text style={styles.rate}>{"."}</Text> */}
                    <Text style={styles.rate}>{rowitem.brand}</Text>
                    <Text style={styles.rate}>{rowitem.mfgYear}</Text>
                    <Text style={styles.rate}>{item.isPassed === true ? "Passed" : "Failed"}</Text>
                    <Text style={styles.amount}>{item.remarks}</Text>
                </View>
            </>
        )
    );
    return (<Fragment>{rows}</Fragment>)
};

//this is Conditional Survey .....
const PPMReportCSInvoiceTableRowSub = ({ items }) => {
    console.log("invoicedata", items);
    const rows = items.contractAssetDetailsSurveyProcess.map((item, rowindex) =>

        item.lstContractAssetDetails.map((rowitem, subrowindex) =>

            <>
                {rowindex === 0 && <AssetSurveyHeading invoice={item} />}
                {rowindex === 0 && <PPMReportCSInvoiceTableHeaderSub />}
                <View style={styles.row}>
                    <Text style={styles.sno}>{rowindex + 1}</Text>
                    <Text style={styles.description}>{rowitem.assetTypes.nameEng}</Text>
                    <Text style={styles.description}>{rowitem.subAssetTypes.nameEng}</Text>
                    <Text style={styles.rate}>{item.brand}</Text>
                    <Text style={styles.rate}>{"model"}</Text>
                    <Text style={styles.rate}>{item.mfgYear}</Text>
                    <Text style={styles.rate}>{item.additionalDetails}</Text>
                    <Text style={styles.rate}>{item?.snagLocation}</Text>
                    <Text style={styles.rate}>{item?.snag}</Text>
                    <Text style={styles.rate}>{item?.priority}</Text>
                    <Text style={styles.rate}>{item?.actionrequired}</Text>
                    {/* <Text style={styles.rate}>{item?.cost}</Text> */}
                    <Text style={styles.rate}>{item.isPassed === true ? "Passed" : "Failed"}</Text>
                    <Text style={styles.amount}>{item.remarks}</Text>
                    <Text style={styles.amount}>
                        {item.contractAssetDetailsSurveyProcessImages.map((photoItems, subrowindex) =>
                            <>
                                <Link src={`${process.env.REACT_APP_API_BASEURL}/Upload/` + photoItems.savedName + `?entityType=AssetImage`}>  Download</Link>

                            </>
                        )
                        }
                    </Text>
                </View>
            </>
        )
    );
    return (<Fragment>{rows}</Fragment>)
};

const SparePartReplacementReport = ({ items }) => {

    const rows = items.contractAssetReplacement.map((item, rowindex) =>
        // item.contractAssetPPMFrequencyTemplates.map((rowitem, rowindex) =>

        <>
            {rowindex === 0 && <SparePartsHeading invoice={item} />}
            {rowindex === 0 && <PPMReportInvoiceTableHeaderReplaement />}
            <View style={styles.row}>
                <Text style={styles.sno}>{rowindex + 1}</Text>
                <Text style={styles.description}>{item.item}</Text>
                <Text style={styles.rate}>{item.quantity}</Text>
                <Text style={styles.rate}>{item.brand}</Text>
                <Text style={styles.rate}>{item.details}</Text>
                <Text style={styles.rate}>{item.serialNo}</Text>
                <Text style={styles.rate}>{item.required}</Text>
                <Text style={styles.rate}>{item.used}</Text>
                <Text style={styles.amount}>{item.remarks}</Text>
            </View>
        </>
        // )
    );
    return (<Fragment>{rows}</Fragment>)
};

export {
    PPMReportInvoiceTableRow, PPMReportInvoiceTableRowSub, SparePartReplacementReport,
    EmergencyCallOutRequestSection,
    EmergencyCallOutResponseSection,
    PPMReportCSInvoiceTableRowSub
};