import React from "react";
import { Page, Document, StyleSheet, Image, Text, } from "@react-pdf/renderer";

//import logo from "../assets/images/BTFS_Logo-"
import { InvoiceTitle } from "./InvoiceTitle";
import InvoiceNo from "./InvoiceNo";
import BillTo from "./BillTo";
import InvoiceThankYouMsg from "./InvoiceThankYouMsg";
import InvoiceItemsTable from "./InvoiceItemsTable";

const borderColor = '#000000'
const styles = StyleSheet.create({
  page: {
          backgroundColor: '#fff',
          fontFamily: 'Helvetica',
          fontSize: 11,
          paddingTop: 25,
          paddingLeft: 25,
          paddingRight: 15,
          lineHeight: 1.5,
          flexDirection: 'column',
          border: 2,
          borderLeftColor: borderColor,
          borderLeftWidth: 1,
     },
    logo: {
        width: 84,
        height: 70,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});

const PdfDocument = ({ invoicedata }) => {
    console.log("invoicedata", invoicedata)
    return (
        <Document>
            <Page size="A4" style={styles.page} >
                {/* <InvoiceTitle title={'PPM Planner'} /> */}
                <InvoiceTitle invoice={invoicedata} />
                <InvoiceNo invoice={invoicedata} />
                {/* <BillTo invoice={invoicedata} /> */}
                <InvoiceItemsTable invoice={invoicedata} />
                <InvoiceThankYouMsg />
                <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
                    `${pageNumber} / ${totalPages}`
                )} fixed />
            </Page>
        </Document>
    );
}

export default PdfDocument;