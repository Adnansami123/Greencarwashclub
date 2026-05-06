import React, { Fragment } from 'react';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { numberToEnglish } from '../../currency/Currency';
import { getInvoicePaymentSum, getSingleInvoicePaymentSum, onlyDate } from '../..';
const borderColor = '#000000'
const borderWidth = 0.5
const styles = StyleSheet.create({
    titleContainer: {
        // textAlign: 'left',
        flexDirection: 'row',
        display: 'flex',
        textAlign: 'left',
        justifyContent: 'flex-start',
        width: '100%',
        borderColor: borderColor,
    },
    Column1: {
        flexDirection: 'column',
        textAlign: 'left',
        width: '25%',
        border: borderWidth,
        borderColor: borderColor,

    },
    Column100: {
        flexDirection: 'column',
        textAlign: 'left',
        width: '100%',
        border: borderWidth,
        borderColor: borderColor,

    },
    Column2: {
        flexDirection: 'column',
        textAlign: 'left',
        width: '15%',
        border: borderWidth,
        borderColor: borderColor,

    },
    RateWidth: {
        flexDirection: 'column',
        textAlign: 'left',
        width: '50%',
        border: borderWidth,
        borderColor: borderColor,

    },
    RateWidthRight: {
        flexDirection: 'column',
        textAlign: 'right',
        width: '50%',
        border: borderWidth,
        borderColor: borderColor,

    },

    TopPadding: {
        paddingTop: 10,
        marginTop: 10,
    },



    Column34: {
        flexDirection: 'column',
        textAlign: 'left',
        width: '20%',
        border: 0.5,
        borderColor: borderColor,


    },
    Column5: {
        flexDirection: 'column',
        textAlign: 'left',
        width: '20%',
        border: 0.5,
        borderColor: borderColor,

    },
    titleContainerViewRight: {
        flexDirection: 'column',
        textAlign: 'right',
        width: '50%',
        border: "2",
        height: "20",

    },

    titleContainerViewRight25: {
        flexDirection: 'column',
        textAlign: 'right',
        width: '25%',
        border: "2",
        borderColor: borderColor,


    },
    titleContainerViewLeft25: {
        // textAlign: 'left',
        flexDirection: 'column',
        textAlign: 'right',
        width: '25%',
        border: "2",
        borderColor: borderColor,


    },
    titleContainerViewLeft12Text: {
        // textAlign: 'left',
        fontSize: "9",
        height: "20",
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


    },
    titleContainerViewLeft12right: {
        // textAlign: 'left',
        fontSize: "9",
        flexDirection: 'column',
        textAlign: 'right',
        width: '50%',
        height: "20",
        borderColor: borderColor,


    },
    invoiceDate: {
        width: "25%",
        fontSize: 12,
        flexDirection: 'column',
        textAlign: 'left',
        fontStyle: 'bold',
        border: "2",
        borderColor: borderColor,


    },
    LeftinvoiceDate: {
        width: "25%",
        fontSize: 12,
        flexDirection: 'column',
        textAlign: 'left',
        fontStyle: 'bold',
        display: 'flex',
        border: "2",
        borderColor: borderColor,


    },
    LeftLabel: {
        width: "25%",
        textAlign: 'left',
        flexDirection: 'column',
        paddingLeft: 5,
        display: 'flex',
        border: "2",
        borderColor: borderColor,


    },
    label: {
        //  textAlign: 'left',
        paddingLeft: 5,
        border: "2",
        height: "20",
        borderColor: borderColor,


    },
    reportTitle: {
        fontSize: 15,
        textAlign: 'center',
        flex: 1,
        flexDirection: 'row',
        textTransform: 'uppercase',
        width: '75%',
        borderColor: borderColor,

    },
    reportSubTitle: {
        fontSize: 11,
        textAlign: 'center',
        flex: 1,
        // textTransform: 'uppercase',
        width: '75%',
        borderColor: borderColor,

    },
    logo: {
        width: 84,
        height: 70,
    }
});

const PaymentForInvoicesTable = ({ invoice, }) => (
    <>
        <Fragment>
            <View style={styles.titleContainer}>
                <View style={styles.Column1}>
                    <Text>Invoice Number</Text>
                </View>
                <View style={styles.Column2}>
                    <Text>Invoice Date</Text>
                </View>
                <View style={styles.Column2}>
                    <Text>Invoice Amount</Text>
                </View>
                <View style={styles.Column5}>
                    <Text>Payment Amount</Text>
                </View>
            </View>
        </Fragment>

    </>
);

// this need to check with Data....
const GSTInvoiceItems = ({ invoiceTaxData, }) => {
    console.log("GSTInvoiceItems", invoiceTaxData);
    const rows = invoiceTaxData?.map((item, rowindex) =>
        <>
            <View style={styles.titleContainer}>
                <View style={styles.Column1}>
                    <Text>{item.invoiceXID}</Text>
                </View>
                <View style={styles.Column2}>
                    <Text>{onlyDate(item?.companyBranchInvoices?.invoiceCreatedOn)}</Text>
                </View>
                <View style={styles.Column2}>
                    <Text>{getSingleInvoicePaymentSum({ invoiceData: item?.companyBranchInvoices?.invoiceProductDetails })}</Text>
                </View>
                <View style={styles.Column2}>
                    <Text>{item.amountReceivedAgainstInvoice}</Text>
                </View>
                {/*   <View style={styles.Column34}>

                    <View style={styles.titleContainer}>
                        <View style={styles.RateWidth}>
                            <Text>{item.sgstPer}</Text>
                        </View>
                        <View style={styles.RateWidth}>
                            <Text>{item.sgstAmount}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.Column5}>
                    <Text>{item.totalTaxableAmount}</Text>
                </View> */}
            </View>
        </>
    );



    return (<Fragment>{rows}</Fragment>)
}





export { PaymentForInvoicesTable, GSTInvoiceItems };