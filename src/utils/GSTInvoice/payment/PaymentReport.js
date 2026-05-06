import React from "react";
import { Page, Document, StyleSheet, Image, Text, View, Link, Rect, Svg } from "@react-pdf/renderer";

import { PaymentReceiptReportTitle } from "./PaymentHeader";
import { GSTInvoiceItems, PaymentForInvoicesTable } from "./PaymentByInvoices";




const borderColor = '#000000'
const styles = StyleSheet.create({
     page: {
          backgroundColor: '#fff',
          fontFamily: 'Helvetica',
          fontSize: 10,
          paddingTop: 10,
          paddingLeft: 25,
          paddingRight: 10,
          lineHeight: 1,
          //lineHeight: 1.5,
          flexDirection: 'column',
          border: 0.5,
          borderColor: borderColor,
          borderLeftWidth: 0.5,
     },
     viewBox: {
          // fontSize: 10,
          // display: 'flex',
          // alignItems: 'flex-start',
          border: 0.5,
          borderColor: borderColor,
          //flexDirection: 'row',
     },
     viewBoxItem: {
          minHeight: 300,
          border: 0.5,
          borderColor: borderColor,
          borderRight: 0.5,
          borderLeft: 0.5,
          borderRadius: 0.5,
     },
     // box: { width: '100%', marginBottom: 30, borderRadius: 5 },
     pageNumbers: {
          position: 'absolute',
          bottom: 20,
          left: 0,
          right: 0,
          textAlign: 'right'
     },
     logo: {
          width: 84,
          height: 70,
          marginLeft: 'auto',
          marginRight: 'auto'
     },

     row: {
          flexDirection: 'row',
          borderBottomColor: borderColor,
          borderBottomWidth: 1,
          alignItems: 'center',
          // height: 24,
          fontStyle: 'bold',
          width: '100%',
     },

     generalRemarksRow: {
          flexDirection: 'row',
          textAlign: 'left',
          borderBottomColor: borderColor,
          borderBottomWidth: 1,
          textWrap: 'wrap',
          width: '100%',
          minHeight: '100',
          height: '100%',
     },

     clientGeneralRemarksRow:
     {
          flexDirection: 'row',
          textAlign: 'left',
          borderBottomColor: borderColor,
          borderBottomWidth: 1,
          textWrap: 'wrap',
          width: '100%',
          minHeight: '20',
          height: '100%',
     },

     descriptionWithTopBorder: {
          width: '25%',
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


     },
     description: {
          width: '25%',
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
     amount: {
          width: '25%',
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
     center: {
          textAlign: "center",
          borderColor: borderColor,
     },
});

const PaymentReport = ({ invoicedata }) => {
     console.log("invoicedata", invoicedata);
     return (
          <Document>
               {/* <Page size="A4" style={styles.page} > */}
               <Page size="A4" style={styles.page} >
                    <View style={styles.viewBox}>
                         <PaymentReceiptReportTitle  invoice={invoicedata[0]}  companyBrach={invoicedata[0]?.clients} />
                         <View style={styles.viewBoxItem}>


                              <PaymentForInvoicesTable></PaymentForInvoicesTable>
                              <GSTInvoiceItems invoiceTaxData={!!invoicedata[0] == true ? invoicedata[0].paymentInvoiceMaps : null} ></GSTInvoiceItems>
                              {/* <GSTInvoiceTableItems invoice={!!invoicedata[0] == true ? invoicedata[0] : null}></GSTInvoiceTableItems> */}


                         </View>
                         {/* <GSTInvoiceTableGSTTotalAmount invoice={!!invoicedata[0] == true ? invoicedata[0] : null}></GSTInvoiceTableGSTTotalAmount>
                         <GSTInvoiceTaxTable></GSTInvoiceTaxTable>
                         <GSTInvoiceTaxItems invoiceTaxData={!!invoicedata[0] == true ? invoiceToTaxData({ invoiceData: invoicedata[0].invoiceProductDetails }) : null}></GSTInvoiceTaxItems>
                         <GSTInvoiceBottom invoice={invoicedata[0]}></GSTInvoiceBottom> */}
                    </View>
                    <View style={[styles.center]}>
                         <Text style={styles.center}>This is Computer Generated Payment Receipt</Text>
                    </View>
               </Page>
          </Document>
     );
}

export default PaymentReport;