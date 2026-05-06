import React, { Fragment } from 'react';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logo from "../assets/images/BTFS_Logo-V1-transparent-175x149.png";

const styles = StyleSheet.create({
    // titleContainer: {
    //     textAlign: 'left',
    //     flexDirection: 'row',
    //     display: 'flex',
    //     justifyContent: 'flex-start',
    //     width: '100%',
    //     flexGrow: 1,
    // },
    titleContainer: {
        // textAlign: 'left',
        flexDirection: 'row',
        display: 'flex',
        textAlign: 'left',
        justifyContent: 'flex-start',
        width: '100%',
        backgroundColor: "green",
    },
    titleContainerViewLeft: {
        flexDirection: 'column',
        textAlign: 'left',
        width: '50%',
        height: "200",
        backgroundColor: "blue",
    },
    titleContainerViewRight: {
        flexDirection: 'column',
        textAlign: 'right',
        width: '50%',
        backgroundColor: "yellow",
        border: "2",
        height: "20",

    },

    titleContainerViewRight25: {
        flexDirection: 'column',
        textAlign: 'right',
        width: '25%',
        backgroundColor: "yellow",
        border: "2",

    },
    titleContainerViewLeft25: {
        // textAlign: 'left',
        flexDirection: 'column',
        textAlign: 'right',
        width: '25%',
        backgroundColor: "yellow",
        border: "2",

    },
    titleContainerViewLeft12Text: {
        // textAlign: 'left',
        fontSize: "9",
        height: "20",
        backgroundColor: "yellow",

    },
    titleContainerViewLeft12: {
        // textAlign: 'left',
        fontSize: "9",
        flexDirection: 'column',
        textAlign: 'left',
        width: '50%',
        height: "20",
        backgroundColor: "yellow",

    },
    titleContainerViewLeft12right: {
        // textAlign: 'left',
        fontSize: "9",
        flexDirection: 'column',
        textAlign: 'right',
        width: '50%',
        height: "20",
        backgroundColor: "yellow",

    },
    invoiceDate: {
        width: "25%",
        fontSize: 12,
        flexDirection: 'column',
        textAlign: 'left',
        fontStyle: 'bold',
        backgroundColor: "red",
        border: "2",

    },
    LeftinvoiceDate: {
        width: "25%",
        fontSize: 12,
        flexDirection: 'column',
        textAlign: 'left',
        fontStyle: 'bold',
        display: 'flex',
        backgroundColor: "red",
        border: "2",

    },
    LeftLabel: {
        width: "25%",
        textAlign: 'left',
        flexDirection: 'column',
        paddingLeft: 5,
        backgroundColor: "orange",
        display: 'flex',
        border: "2",

    },
    label: {
        //  textAlign: 'left',
        paddingLeft: 5,
        border: "2",
        height: "20",

    },
    reportTitle: {
        fontSize: 15,
        textAlign: 'center',
        flex: 1,
        flexDirection: 'row',
        textTransform: 'uppercase',
        width: '75%'
    },
    reportSubTitle: {
        fontSize: 11,
        textAlign: 'center',
        flex: 1,
        // textTransform: 'uppercase',
        width: '75%'
    },
    logo: {
        width: 84,
        height: 70,
    }
});

const GSTInvoiceTitlePPMReport = ({ invoice, }) => (
    <>
        {console.log("invoicedata", invoice)}
        <Fragment>
            <View style={styles.titleContainer}>
                <Image style={styles.logo} src={logo} />
                <View>
                    <Text style={styles.reportTitle}>{invoice?.companyBranches?.companies?.nameEng}</Text>
                    <Text style={styles.reportSubTitle}>{invoice?.companyBranches?.poBox + " - " + invoice?.companyBranches?.branchNameEng + " - " + invoice?.companyBranches?.countryNameEng}</Text>
                    <Text style={styles.reportSubTitle}>Tel No: {invoice?.companyBranches?.phone}, Fx: {invoice?.companyBranches?.fax}</Text>
                    <Text style={styles.reportSubTitle}>Email: {invoice?.companyBranches?.email}, Webite: {invoice?.companyBranches?.webSite}</Text>
                    <Text style={styles.reportTitle}>{"GST INVOICE"}</Text>
                </View>
            </View>

            <View style={styles.titleContainer}>
                <View style={styles.titleContainerViewLeft}>
                    <Text style={styles.LeftLabel}>Date: </Text>
                    <Text style={styles.LeftinvoiceDate} >{"data"}</Text>
                </View>
                <View style={styles.titleContainerViewLeft}>
                    <View style={styles.titleContainer}>
                        <View style={styles.titleContainerViewLeft}>
                            <View style={styles.titleContainer}>
                                <View style={styles.titleContainerViewLeft12}>
                                    <Text>Invoice No.</Text>
                                    <Text>1</Text>
                                </View>
                                <View style={styles.titleContainerViewLeft12right}>
                                    <Text>e-Way No.</Text>
                                    <Text>1</Text>
                                </View>
                            </View>
                            <View style={styles.titleContainerViewLeft12Text}>
                                <Text>Delivery Note: </Text>
                                <Text>-</Text>
                            </View>
                            <View style={styles.titleContainerViewLeft12Text}>
                                <Text>Supplier's Ref.</Text>
                                <Text ></Text>
                            </View>
                            <Text>Buyer¶s Order No.</Text>
                            <Text >-</Text>
                            <Text>Despatched Document No.</Text>
                            <Text >BTFS</Text>
                            <Text>Despatched Through</Text>
                            <Text >-</Text>
                            <Text>Bill Of Landing / LR- RR</Text>
                            <Text >-</Text>
                        </View>






                        <View style={styles.titleContainerViewLeft}>
                            <View style={styles.titleContainerViewLeft12Text}>
                                <Text>Dated</Text>
                                <Text >BTFS</Text>
                            </View>
                            <View style={styles.titleContainerViewLeft12Text}>
                                <Text>Mode / Terms Of Payment</Text>
                                <Text ></Text>
                            </View>
                            <Text>Other Reference</Text>
                            <Text >-</Text>
                            <Text>Dated</Text>
                            <Text >BTFS</Text>
                            <Text>Delivery Note Date</Text>
                            <Text >BTFS</Text>
                            <Text>Destination</Text>
                            <Text >-</Text>
                            <Text>Motor Vehicle No.</Text>
                            <Text >-</Text>
                        </View>



                    </View>
                    <Text>Terms of Delivery:</Text>
                    <Text >-</Text>
                </View>
            </View>
        </Fragment>

    </>
);


const InvoiceTitle = ({ invoice }) => (

    <>
        {console.log("invoicedata", invoice)}
        <View style={styles.titleContainer}>
            <Image style={styles.logo} src={logo} />
            <View style={styles.titleContainer1}>
                <Text style={styles.reportTitle}>{invoice[0]?.contractAssets?.companyNameEng}</Text>
                <Text style={styles.reportSubTitle}>{invoice[0]?.contractAssets?.companyBranchPOBox + " - " + invoice[0]?.contractAssets?.branchNameEng + " - " + invoice[0]?.contractAssets?.countryNameEng}</Text>
                <Text style={styles.reportSubTitle}>Tel No: {invoice[0]?.contractAssets?.companyBranchPhone}, Fx: {invoice[0]?.contractAssets?.companyBranchFax}</Text>
                <Text style={styles.reportSubTitle}>Email: {invoice[0]?.contractAssets?.companyBranchEmail}, Webite: {invoice[0]?.contractAssets?.companyBranchWebSite}</Text>
                <Text style={styles.reportTitle}>{"PPM PLANNER"}</Text>
            </View>
        </View>

    </>
);

const InvoiceTitlePPMReport = ({ invoice, }) => (

    <>
        <View style={styles.titleContainer}>
            <Image style={styles.logo} src={logo} />
            <View>
                <Text style={styles.reportTitle}>{invoice.ppmFrequencySurveySchedule.companyNameEng}</Text>
                <Text style={styles.reportSubTitle}>{invoice.ppmFrequencySurveySchedule.companyBranchPOBox + " - " + invoice.ppmFrequencySurveySchedule.branchNameEng + " - " + invoice.ppmFrequencySurveySchedule.countryNameEng}</Text>
                <Text style={styles.reportSubTitle}>Tel No: {invoice.ppmFrequencySurveySchedule.companyBranchPhone}, Fx: {invoice.ppmFrequencySurveySchedule.companyBranchFax}</Text>
                <Text style={styles.reportSubTitle}>Email: {invoice.ppmFrequencySurveySchedule.companyBranchEmail}, Webite: {invoice.ppmFrequencySurveySchedule.companyBranchWebSite}</Text>
                <Text style={styles.reportTitle}>{"SERVICE REPORT"}</Text>
            </View>
        </View>

    </>
);



export { InvoiceTitle, InvoiceTitlePPMReport, GSTInvoiceTitlePPMReport };