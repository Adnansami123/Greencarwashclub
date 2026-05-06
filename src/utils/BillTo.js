import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { getSurveyType } from '.';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 5,
        justifyContent: 'flex-start',
        width: '50%'
    },
    billTo: {
        marginTop: 20,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    },
});

const BillTo = ({ invoice }) => (

    <View style={styles.headerContainer}>
        <Text style={styles.billTo}>Client & Contract Details:</Text>
        <Text>{invoice.contractAssets?.prefix + '-' + invoice.contractAssets.clientPrefix + '-' + invoice.contractAssets.clientReferenceNumber}</Text>
        <Text>{invoice?.contractAssets?.prefix + "-" + invoice?.contractAssets?.contractPrefix + "-" + invoice?.contractAssets?.refNo}</Text>
        <Text>{invoice?.contractAssets?.isSubContract === true ? invoice?.contractAssets?.prefix + "-" + invoice?.contractAssets?.subContractPrefix + "-" + invoice?.contractAssets?.subContractRefNo : "No"}</Text>
        <Text>{invoice.contractAssets.companyName}</Text>
        <Text>{invoice.contractAssets.contractContactName}</Text>
        <Text>{invoice.contractAssets.mobile}</Text>
        <Text>{invoice.contractAssets.email}</Text>
        <Text>{getSurveyType(invoice.contractAssets.floorDetails)}</Text>
        <Text>{getSurveyType(invoice.contractAssets.surveyTypeXid)}</Text>
        <Text>{invoice.contractAssets.assetName}</Text>
        <Text>{invoice.contractAssetPPMFrequencyTemplates[0].frequencyName}</Text>
        {/* <Text>{invoice.address}</Text>
        <Text>{invoice.phone}</Text>
        <Text>{invoice.email}</Text>
        <Text>{invoice.contractStartData}</Text>
        <Text>{invoice.contractEndData}</Text> */}
    </View>
);

export default BillTo;