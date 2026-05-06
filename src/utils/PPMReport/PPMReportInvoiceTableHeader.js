import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#000000'
const styles = StyleSheet.create({
    containerNormal: {
        flexDirection: 'row',
        borderTopColor: borderColor,
        borderTopWidth: 1,
        borderBottomColor: borderColor,
      //  backgroundColor: '#3778C2',
       // color: '#fff',
        borderBottomWidth: 1,
      
        // alignItems: 'center',
       // height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        //  flexGrow: 1,
        width: '100%',
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
        width: '10%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 3,
        paddingTop: 5,
    },
    description: {
        width: '50%',
        borderRightColor: borderColor,
        paddingTop: 5,
        borderRightWidth: 1,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        paddingTop: 5,
        borderRightWidth: 1,
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        paddingTop: 5,
        borderRightWidth: 1,
        flexGrow: 1,
        height: '100%',
    },
    rateWrap: {
        width: '15%',
        borderRightColor: borderColor,
        paddingTop: 5,
        borderRightWidth: 1,
        textWrap: 'wrap',
    },
   //for last column no need of right border.......
    amount: {
        width: '25%',
        paddingTop: 5,     
        textWrap: 'wrap',
    },
});

const PPMReportInvoiceTableHeader = () => (
    <View style={styles.containerNormal}>
        <Text style={styles.sno}>Sl. No.</Text>
        <Text style={styles.description}>Acceptance Inspection:</Text>
        <Text style={styles.rate}>Is Checked</Text>
        <Text style={styles.amount}>Remarks</Text>
    </View>
);


const PPMReportInvoiceTableHeaderSub = () => (
    <View style={styles.container}>
        <Text style={styles.sno}>Sl. No.</Text>
        <Text style={styles.description}>Asset Type</Text>
        <Text style={styles.description}>Sub Asset Type</Text>
        {/* <Text style={styles.rate}>Capacity</Text> */}
        <Text style={styles.rate}>Brand</Text>
        <Text style={styles.rate}>Mfg Year</Text>
        <Text style={styles.rate}>Status</Text>
        <Text style={styles.amount}>Remarks</Text>
    </View>
);

// this is Conditioanl Survey....
const PPMReportCSInvoiceTableHeaderSub = () => (
    <View style={styles.container}>
        <Text style={styles.sno}>Sl. No.</Text>
        <Text style={styles.description}>Asset Type</Text>
        <Text style={styles.description}>Sub Asset Type</Text>
        <Text style={styles.rate}>Brand</Text>
        <Text style={styles.rate}>Model</Text>
        <Text style={styles.rate}>Mfg Year</Text>
        <Text style={styles.rate}>Additional Details</Text>
        <Text style={styles.rate}>Snag Location</Text>
        <Text style={styles.rate}>Snag </Text>
        <Text style={styles.rate}>Priority </Text>
        <Text style={styles.rate}>Action required </Text>
        {/* <Text style={styles.rate}>Cost </Text> */}
        <Text style={styles.rate}>Status</Text>
        <Text style={styles.amount}>Remarks</Text>
        <Text style={styles.amount}>Photos</Text>
    </View>
);

const PPMReportInvoiceTableHeaderReplaement = () => (
    <View style={styles.containerNormal}>
        <Text style={styles.sno}>Sl. No.</Text>
        <Text style={styles.description}>Equipment Details</Text>
        <Text style={styles.rate}>Quantity</Text>
        <Text style={styles.rate}>Brand</Text>
        <Text style={styles.rateWrap}>Model/Details/Location</Text>
        <Text style={styles.rateWrap}>Serial Number</Text>
        <Text style={styles.rate}>Required</Text>
        <Text style={styles.rate}>Used</Text>
        <Text style={styles.amount}>Remarks</Text>
    </View>
);

export {
    PPMReportInvoiceTableHeader, PPMReportInvoiceTableHeaderSub,
    PPMReportInvoiceTableHeaderReplaement
    , PPMReportCSInvoiceTableHeaderSub,
};