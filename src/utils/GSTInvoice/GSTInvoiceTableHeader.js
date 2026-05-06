import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { getInvoiceSum, getSumByType } from '..';
import { numberToEnglish } from '../currency/Currency';

const borderColor = '#000000'
const borderWidth = 0.5
const styles = StyleSheet.create({
    containerNormal: {
        flexDirection: 'row',
        borderTopColor: borderColor,
        borderTopWidth: borderWidth,
        borderBottomColor: borderColor,
        borderBottomWidth: borderWidth,
        textAlign: 'center',
        fontStyle: 'bold',
        width: '100%',
        borderColor: borderColor,
    },
    containerNormalOnlyBorder: {
        flexDirection: 'row',
        borderTopColor: borderColor,
        borderTopWidth: borderWidth,
        borderBottomColor: borderColor,
        borderBottomWidth: borderWidth,
        textAlign: 'center',
        fontStyle: 'bold',
        width: '100%',
        borderColor: borderColor,
        height:200,
    },
    container: {
        flexDirection: 'row',
        borderTopColor: borderColor,
        borderTopWidth: 1,
        borderBottomColor: borderColor,
        backgroundColor: '#3778C2',
        color: '#fff',
        borderBottomWidth: 1,
        // alignItems: 'center',
        //height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        //  flexGrow: 1,
        width: '100%',
    },
    sno: {
        width: 24,
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 3,
        paddingTop: 5,
    },
    description: {
        width: 300,
        textAlign: "left",
        borderRightColor: borderColor,
        paddingTop: 5,
        borderRightWidth: borderWidth,
    },
    descriptionRight: {
        width: 300,
        textAlign: "right",
        borderRightColor: borderColor,
        paddingTop: 5,
        borderRightWidth: borderWidth,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        paddingTop: 5,
        borderRightWidth: borderWidth,
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        paddingTop: 5,
        borderRightWidth: borderWidth,
        flexGrow: 1,
        height: '100%',
    },
    rateWrap: {
        width: '15%',
        borderRightColor: borderColor,
        paddingTop: 5,
        borderRightWidth: borderWidth,
        textWrap: 'wrap',
    },
    //for last column no need of right border.......
    amount: {
        width: '25%',
        paddingTop: 5,
        textWrap: 'wrap',
    },
});

const GSTInvoiceTableHeader = () => (
    <View style={styles.containerNormal}>
        <Text style={styles.sno}>Sl. No.</Text>
        <Text style={styles.description}>Description of Goods</Text>
        <Text style={styles.rate}>HSN/SAC</Text>
        <Text style={styles.rate}>Quantity</Text>
        <Text style={styles.rate}>UOM</Text>
        <Text style={styles.rate}>Rate</Text>
        <Text style={styles.rate}>Per</Text>
        <Text style={styles.rate}>Amount</Text>
    </View>
);



const GSTInvoiceTableItems = ({ invoice }) => {   
    const rows = invoice?.invoiceProductDetails?.map((item, rowindex) =>
        <>
            <View style={styles.containerNormal}>
                <Text style={styles.sno}>{rowindex + 1}</Text>
                <Text style={styles.description}>{item.description} </Text>
                <Text style={styles.rate}>{item.hsncode}</Text>
                <Text style={styles.rate}>{item.quantity } </Text>
                <Text style={styles.rate}>{item.uom} </Text>
                <Text style={styles.rate}>{item.quantityAmount}</Text>
                <Text style={styles.rate}>{item.gstPer}</Text>
                <Text style={styles.rate}>{item.totalAmount}</Text>
            </View>
        </>
    );
    return (<Fragment>{rows}</Fragment>)
};

const GSTInvoiceTableGSTAmount = ({ invoice }) => {
    const rows = <>
        <View style={styles.containerNormal}>
            <Text style={styles.sno}></Text>
            <Text style={styles.rate}></Text>
            <Text style={styles.rate}></Text>
            <Text style={styles.descriptionRight}>SGST </Text>
          
            <Text style={styles.rate}></Text>
            <Text style={styles.rate}></Text>
            <Text style={styles.rate}></Text>
            <Text style={styles.rate}>{getSumByType({ invoiceData: invoice.invoiceProductDetails, type: "SGST" })}</Text>
        </View>
        <View style={styles.containerNormal}>
            <Text style={styles.sno}></Text>
            <Text style={styles.rate}></Text>
            <Text style={styles.rate}></Text>
            <Text style={styles.descriptionRight}>CGST </Text>
           
            <Text style={styles.rate}></Text>
            <Text style={styles.rate}></Text>
            <Text style={styles.rate}></Text>
            <Text style={styles.rate}>{getSumByType({ invoiceData: invoice.invoiceProductDetails, type: "CGST" })}</Text>
        </View>
        <View style={styles.containerNormal}>
            <Text style={styles.sno}></Text>
            <Text style={styles.rate}></Text>
            <Text style={styles.rate}></Text>
            <Text style={styles.descriptionRight}>IGST </Text>
            
            <Text style={styles.rate}></Text>
            <Text style={styles.rate}></Text>
            <Text style={styles.rate}></Text>
            <Text style={styles.rate}>{getSumByType({ invoiceData: invoice.invoiceProductDetails, type: "IGST" })}</Text>
        </View>
        <View style={styles.containerNormal}>
            <Text style={styles.sno}></Text>
            <Text style={styles.rate}></Text>
            <Text style={styles.rate}></Text>
            <Text style={styles.descriptionRight}>Round Off </Text>
           
            <Text style={styles.rate}></Text>
            <Text style={styles.rate}></Text>
            <Text style={styles.rate}></Text>
            <Text style={styles.rate}></Text>
        </View>
        <View style={styles.containerNormalOnlyBorder}>
            <Text style={styles.sno}></Text>
            <Text style={styles.rate}></Text>
            <Text style={styles.rate}></Text>
            <Text style={styles.descriptionRight}> </Text>
           
            <Text style={styles.rate}></Text>
            <Text style={styles.rate}></Text>
            <Text style={styles.rate}></Text>
            <Text style={styles.rate}></Text>
        </View>
    </>
    return (<Fragment>{rows}</Fragment>)
};

const GSTInvoiceTableGSTTotalAmount = ({ invoice }) => {
    { console.log("invoice", invoice) }
    const rows = <>
        <View style={styles.containerNormal}>
            <Text style={styles.sno}></Text>
            <Text style={styles.descriptionRight}>Total </Text>
            <Text style={styles.rate}></Text>
            <Text style={styles.rate}></Text>
            <Text style={styles.rate}></Text>
            <Text style={styles.rate}></Text>
            <Text style={styles.rate}>{getInvoiceSum({ invoiceData: invoice.invoiceProductDetails })}</Text>
        </View>
        <View style={styles.containerNormal}>
            <Text>Amount Chargeable (In Words):</Text>
            {/* <Text>{invoice[0]?.invoiceProductDetails[0]?.totalAmount}</Text> */}
            <Text>{numberToEnglish(getInvoiceSum({ invoiceData: invoice.invoiceProductDetails }))}</Text>
        </View>
    </>

    return (<Fragment>{rows}</Fragment>)
};



export {
    GSTInvoiceTableHeader, GSTInvoiceTableItems, GSTInvoiceTableGSTAmount, GSTInvoiceTableGSTTotalAmount
};