import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import { getSurveyType, getSurveyTypeShortName } from '..';

const styles = StyleSheet.create({
    invoiceNoContainer: {
        flexDirection: 'row',
        marginTop: 36,
        justifyContent: 'flex-end'
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    invoiceDate: {
        fontSize: 12,
        fontStyle: 'bold',
    },
    label: {
        width: 120,
        textAlign: 'right',
        paddingLeft: 5,
    }
});
let today = new Date()
let date = today.getDate() + '-' + parseInt(today.getMonth() + 1) + '-' + today.getFullYear()

const PPMReportInvoiceNo = ({ invoice }) => (
    <Fragment>
        <View style={styles.invoiceDateContainer}>
            <Text style={styles.label}>Date: </Text>
            <Text style={styles.invoiceDate}>{date}</Text>
        </View>
        <View style={styles.invoiceDateContainer}>
            <Text style={styles.label}>Report No: </Text>
            <Text style={styles.invoiceDate}>{invoice.ppmFrequencySurveySchedule.companyBranchConfigurationPrefix}{invoice.ppmFrequencySurveySchedule.countryShortName}{invoice.ppmFrequencySurveySchedule.branchAddress}-{getSurveyTypeShortName(invoice.ppmFrequencySurveySchedule.contractAssetSurveyTypeXid)}-{invoice.ppmFrequencySurveySchedule.contractAssetSurveyReportNumber}</Text>
        </View >
    </Fragment>
);

export default PPMReportInvoiceNo;