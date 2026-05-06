import React, { Fragment } from 'react';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logo from "../../../assets/images/BTFS_Logo-V1-transparent-175x149.png"
import { onlyDate } from '../..';
import { numberToEnglish } from '../../currency/Currency';

const borderWidth = 0.5
const borderColor = '#000000'

const styles = StyleSheet.create({
    titleContainer: {
        // textAlign: 'left',
        flexDirection: 'row',
        display: 'flex',
        textAlign: 'left',
        justifyContent: 'flex-start',
        width: '100%',
        borderBottom: borderWidth,
        borderRight: borderWidth,
        borderLeft: borderWidth,
        borderColor: borderColor,
    },
    TermsOfDelivery: {

        textAlign: 'left',
        width: '100%',
        borderBottom: borderWidth,
        borderRight: borderWidth,
        borderLeft: borderWidth,
        borderColor: borderColor,
        height: "40",
    },
    buyerTitle: {
        borderTop: borderWidth,

    },
    titleContainerViewLeft: {
        flexDirection: 'column',
        textAlign: 'left',
        width: '100%',
        borderBottom: borderWidth,
        // borderRight: borderWidth,
        borderLeft: borderWidth,
        borderColor: borderColor,
    },
    titleContainerViewRight: {
        flexDirection: 'column',
        textAlign: 'right',
        width: '50%',
        border: borderWidth,
        height: "20",

    },

    titleContainerViewRight25: {
        flexDirection: 'column',
        textAlign: 'right',
        width: '25%',
        border: borderWidth,

    },
    titleContainerViewLeft25: {
        // textAlign: 'left',
        flexDirection: 'column',
        textAlign: 'right',
        width: '25%',
        border: borderWidth,

    },
    titleContainerViewLeft12Text: {
        // textAlign: 'left',
        fontSize: "9",
        height: "20",
        borderBottom: borderWidth,
        // borderRight: borderWidth,
        borderLeft: borderWidth,
        borderColor: borderColor,

    },
    titleContainerViewLeft12: {
        // textAlign: 'left',
        fontSize: "9",
        flexDirection: 'column',
        textAlign: 'left',
        width: '50%',
        height: "20",
        borderColor: borderColor,
        border: borderWidth,

    },
    titleContainerViewLeft12right: {
        // textAlign: 'left',
        fontSize: "9",
        flexDirection: 'column',
        textAlign: 'right',
        width: '100%',
        height: "20",

    },
    invoiceDate: {
        width: "25%",
        fontSize: 12,
        flexDirection: 'column',
        textAlign: 'left',
        fontStyle: 'bold',
        border: borderWidth,

    },
    LeftinvoiceDate: {
        width: "25%",
        fontSize: 12,
        flexDirection: 'column',
        textAlign: 'left',
        fontStyle: 'bold',
        display: 'flex',
        border: borderWidth,

    },
    LeftLabel: {
        width: "25%",
        textAlign: 'left',
        flexDirection: 'column',
        paddingLeft: 5,
        display: 'flex',
        border: borderWidth,

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
    bottomBorderNew: {
        width: '100%',
        border: borderWidth,
    },
    textCenter: {
        padding: "0",
        textAlign: 'center',
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

const PaymentReceiptReportTitle = ({ invoice, companyBrach }) => (
    <>
        {console.log("invoicedata", invoice)}
        <Fragment>
            <View style={styles.titleContainer}>
                <View style={styles.bottomBorderNew}>
                    <Text>GSTIN/UIN: {companyBrach.companyBranches?.gstin}</Text>
                </View>
                <View style={styles.bottomBorderNew}>
                    <Text style={styles.textCenter}>Payment Receipt</Text>
                </View>
            </View>
            <View style={styles.titleContainer}>
                <Image style={styles.logo} src={logo} />
                <View>
                    <Text style={styles.reportTitle}>{companyBrach?.companyBranches?.companies?.nameEng}</Text>
                    <Text style={styles.reportSubTitle}>{companyBrach?.companyBranches?.poBox}</Text>
                    <Text style={styles.reportSubTitle}>Tel No: {companyBrach?.companyBranches?.phone}, Fx: {companyBrach?.companyBranches?.fax}</Text>
                    <Text style={styles.reportSubTitle}>Email: {companyBrach?.companyBranches?.email}, Webite: {companyBrach?.companyBranches?.webSite}</Text>
                </View>
            </View>
            <View style={styles.titleContainerViewLeft}>
                <View style={styles.titleContainer}>
                    <View style={styles.titleContainerViewLeft}>
                        <View style={styles.titleContainer}>
                            <View style={styles.titleContainerViewLeft12}>
                                <Text>Payment Date.</Text>
                            </View>
                            <View style={styles.titleContainerViewLeft12right}>
                                <Text>{onlyDate(invoice?.paymentDate)}</Text>
                            </View>
                        </View>
                        <View style={styles.titleContainer}>
                            <View style={styles.titleContainerViewLeft12}>
                                <Text>Reference Number</Text>
                            </View>
                            <View style={styles.titleContainerViewLeft12right}>
                                <Text>{onlyDate(invoice?.reference)}</Text>
                            </View>
                        </View>
                        <View style={styles.titleContainer}>
                            <View style={styles.titleContainerViewLeft12}>
                                <Text>Payment Mode</Text>
                            </View>
                            <View style={styles.titleContainerViewLeft12right}>
                                <Text>{onlyDate(invoice?.paymentType)}</Text>
                            </View>
                        </View>
                        <View style={styles.titleContainer}>
                            <View style={styles.titleContainerViewLeft12}>
                                <Text>Amount Received</Text>
                            </View>
                            <View style={styles.titleContainerViewLeft12right}>
                                <Text>{invoice?.amountReceived}</Text>
                            </View>
                        </View>
                        <View style={styles.titleContainer}>
                            <View style={styles.titleContainerViewLeft12}>
                                <Text>Amount Received In Words</Text>
                            </View>
                            <View style={styles.titleContainerViewLeft12right}>
                                <Text>{numberToEnglish(invoice?.amountReceived)}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            <View style={styles.titleContainer}>
                <View style={styles.titleContainerViewLeft}>
                    <Text>Bill To: </Text>
                    <Text>Name: {invoice?.clients?.companyName}</Text>
                    <Text>Address: {invoice?.clients?.poBox + ' ' + invoice?.clients?.officeAddress}</Text>
                    <Text>State Name: {invoice?.clients?.poBox}</Text>
                    <Text>GSTIN / UIN : {invoice?.clients?.gstin}</Text>
                    <Text>PAN / IT No : {invoice?.clients?.pan}</Text>
                </View>
            </View>

        </Fragment>

    </>
);







export { PaymentReceiptReportTitle };