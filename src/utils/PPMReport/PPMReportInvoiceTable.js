import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader';
import PPMReportInvoiceTableRow from './PPMReoprtInvoiceTableRow';
import InvoiceTableFooter from './InvoiceTableFooter';

const borderColor = '#000000'
const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: borderColor,
    },
});
//console.log("invoice", invoice);

const PPMReportInvoiceTable = ({ invoice }) => (
    
 
    <View style={styles.tableContainer}>
      
        <PPMReportInvoiceTableRow items={invoice} />
       
        {/* <InvoiceTableFooter items={invoice.items} /> */}
    </View>
);

export default PPMReportInvoiceTable;