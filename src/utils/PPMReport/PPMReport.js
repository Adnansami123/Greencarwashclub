import React from "react";
import { Page, Document, StyleSheet, Image, Text, View, Link } from "@react-pdf/renderer";

//import logo from "../assets/images/BTFS_Logo-"
import { InvoiceTitle, InvoiceTitlePPMReport } from "../InvoiceTitle";
import PPMReportInvoiceNo from "./PPMReportInvoiceNo";
import BillTo from "../BillTo";
import InvoiceThankYouMsg from "../InvoiceThankYouMsg";
import InvoiceItemsTable from "../InvoiceItemsTable";
import { EmergencyCallOutRequestSection, EmergencyCallOutResponseSection, PPMReportCSInvoiceTableRowSub, PPMReportInvoiceTableRow, PPMReportInvoiceTableRowSub, SparePartReplacementReport } from "./PPMReoprtInvoiceTableRow";
import { getSurveyType, onlyDate } from "..";
import { FooterHeading, SparePartsHeading, SurveyImagesHeading } from "./PPMReportBillTo";



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
     viewBox: {
          // fontSize: 10,
          // display: 'flex',
          // alignItems: 'flex-start',
          border: 1,
          //flexDirection: 'row',
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
});

const PPMReportPdfDocument = ({ invoicedata, ECOData }) => {
     return (
          <Document>
               {/* <Page size="A4" style={styles.page} > */}
               <Page size={invoicedata.ppmFrequencySurveySchedule.contractAssetSurveyTypeXid === 1 ? "A2" : "A3"} style={styles.page} >
                    <View style={styles.viewBox}>
                         <InvoiceTitlePPMReport invoice={invoicedata} />
                         <PPMReportInvoiceNo invoice={invoicedata} />
                         <View style={styles.row}>
                              <Text style={styles.descriptionWithTopBorder}>{"Contract Number"}</Text>
                              <Text style={styles.descriptionWithTopBorder}>{invoicedata.ppmFrequencySurveySchedule.contractPrefix + "-" + invoicedata.ppmFrequencySurveySchedule.contractRefNo}</Text>
                              <Text style={styles.descriptionWithTopBorder}>{"Client LPO/Contract No."}</Text>
                              <Text style={styles.descriptionWithTopBorder}>{invoicedata.ppmFrequencySurveySchedule.clientLPO}</Text>
                         </View>
                         <View style={styles.row}>
                              <Text style={styles.description}>{"Is Sub Contract"}</Text>
                              <Text style={styles.amount}>{invoicedata.ppmFrequencySurveySchedule.isSubContract === true ? "Yes" : "No"}</Text>
                              <Text style={styles.description}>{"Sub Contract Number"}</Text>
                              <Text style={styles.amount}>{invoicedata.ppmFrequencySurveySchedule.isSubContract === true ? invoicedata.ppmFrequencySurveySchedule.subContractRefNo : "NA"}</Text>
                         </View>
                         <View style={styles.row}>
                              <Text style={styles.description}>{"Contract Type:"}</Text>
                              <Text style={styles.amount}>{invoicedata.ppmFrequencySurveySchedule.typeOfContract}</Text>
                              <Text style={styles.description}>{"Client Name:"}</Text>
                              <Text style={styles.amount}>{invoicedata.ppmFrequencySurveySchedule.companyName}</Text>
                         </View>
                         <View style={styles.row}>
                              <Text style={styles.description}>{"Semi Comprehensive type (if SC):"}</Text>
                              <Text style={styles.amount}>{"-"}</Text>
                              <Text style={styles.description}>{"Building Name:"}</Text>
                              <Text style={styles.amount}>{invoicedata.ppmFrequencySurveySchedule.buildingAddress1 + " " + invoicedata.ppmFrequencySurveySchedule.floorDetails}</Text>
                         </View>
                         <View style={styles.row}>
                              <Text style={styles.description}>{"Threshold Amount:"}</Text>
                              <Text style={styles.amount}>{"0.00"}</Text>
                              <Text style={styles.description}>{"Type of Facility:"}</Text>
                              <Text style={styles.amount}>{invoicedata.ppmFrequencySurveySchedule.typeOfIndustry}</Text>
                              {/* not avaialble need to add in the SP */}
                         </View>
                         <View style={styles.row}>
                              <Text style={styles.description}>{"Engineer Name & Technician Name:"}</Text>
                              <Text style={styles.amount}>{invoicedata.ppmFrequencySurveySchedule.m_UserFirstName + " " + invoicedata.ppmFrequencySurveySchedule.m_UserLastName }</Text>
                              <Text style={styles.description}>{"Building Location:"}</Text>
                              <Text style={styles.amount}>{invoicedata.ppmFrequencySurveySchedule.buildingAddress1 + " " + invoicedata.ppmFrequencySurveySchedule.buildingAddress2}</Text>
                         </View>
                         <View style={styles.row}>
                              <Text style={styles.description}>{"PPM Scheduled Date"}</Text>
                              <Text style={styles.amount}>{onlyDate(invoicedata.ppmFrequencySurveySchedule.ppmFrequencySurveyScheduleSurveyStartDate)}</Text>
                              <Text style={styles.description}>{"PPM Completion Date & Time:"}</Text>
                              <Text style={styles.amount}>{!!invoicedata.ppmFrequencySurveySchedule?.contractAssetSurveyStartDate === true ? invoicedata.ppmFrequencySurveySchedule?.contractAssetSurveyStartDate : invoicedata.ppmFrequencySurveySchedule?.contractAssetSurveyCreatedOn}</Text>
                         </View>
                         <View style={styles.row}>
                              <Text style={styles.description}>{"Type of Activity:"}</Text>
                              <Text style={styles.amount}>{getSurveyType(invoicedata.ppmFrequencySurveySchedule.contractAssetSurveyTypeXid)}</Text>
                              <Text style={styles.description}>{"Asset Type:"}</Text>
                              <Text style={styles.amount}>{invoicedata.ppmFrequencySurveySchedule.assetName}</Text>
                         </View>
                         <View style={styles.row}>
                              <Text style={styles.description}>{"Service Frequency:"}</Text>
                              <Text style={styles.amount}>{invoicedata.ppmFrequencySurveySchedule.ppmFrequencyNameEng}</Text>
                              <Text style={styles.description}>{"PPM No."}</Text>
                              <Text style={styles.amount}>{invoicedata.ppmFrequencySurveySchedule.ppmFrequencySurveySchedulePid}</Text>
                         </View>



                         {invoicedata.ppmFrequencySurveySchedule.contractAssetSurveyTypeXid === 2 ?
                              <PPMReportInvoiceTableRow items={invoicedata} /> // this is checklist...
                              :
                              invoicedata.ppmFrequencySurveySchedule.contractAssetSurveyTypeXid === 1 ?
                                   null // this is checklist...
                                   :
                                   <> <EmergencyCallOutRequestSection ECOData={ECOData} items={invoicedata} />
                                        <EmergencyCallOutResponseSection items={invoicedata} />
                                   </>}


                         {invoicedata.ppmFrequencySurveySchedule.contractAssetSurveyTypeXid === 2 ?
                              <PPMReportInvoiceTableRowSub items={invoicedata} />
                              : invoicedata.ppmFrequencySurveySchedule.contractAssetSurveyTypeXid === 1 ?
                                   <PPMReportCSInvoiceTableRowSub items={invoicedata} />
                                   : null}

                         <SparePartReplacementReport items={invoicedata} />
                         <SurveyImagesHeading />
                         {invoicedata.contractAssetSurveyProcessImages.map((rowitem, subrowindex) =>
                              <View style={styles.row}>
                                   <Text style={styles.description}>{"Photo(s):"}</Text>
                                   <>
                                        <Link src={`${process.env.REACT_APP_API_BASEURL}/Upload/` + rowitem.savedName + `?entityType=AssetImage`}> Click to download</Link>
                                        {/* <Text style={styles.amount}>{ECOData.emergencyCallOutImages[0].savedName}</Text> */}
                                   </>
                              </View>
                         )
                         }
                         <View style={styles.row}>

                              <Text style={styles.generalRemarksRow}>{"General Remarks (Office Used Only)"}
                                   {invoicedata.ppmFrequencySurveySchedule.contractAssetSurveyRemarks}
                              </Text>

                         </View>
                         <FooterHeading />
                         <View style={styles.row}>

                              <Text style={styles.generalRemarksRow}>{"Client Remarks (Client Used Only)"}
                                   {"-"}
                              </Text>

                         </View>
                         <View style={styles.row}>

                              <Text style={styles.clientGeneralRemarksRow}>{"Rate your satisfaction level with our service: Satisfactory/Good/Excelent"}
                                   {"-"}
                              </Text>

                         </View>

                         <View style={styles.row}>
                              <Text style={styles.description}>{"Facility Management Name:"}</Text>
                              <Text style={styles.amount}>{"-"}</Text>
                              <Text style={styles.description}>{"Employee Name & Code:"}</Text>
                              <Text style={styles.amount}>{"-"}</Text>
                              <Text style={styles.description}>{"Mobile"}</Text>
                              <Text style={styles.amount}>{"-"}</Text>
                              <Text style={styles.description}>{"Signature"}</Text>
                              <Text style={styles.amount}>{"-"}</Text>
                         </View>
                         <View style={styles.row}>
                              <Text style={styles.description}>{"Client Name:"}</Text>
                              <Text style={styles.amount}>{invoicedata.ppmFrequencySurveySchedule.companyName}</Text>
                              <Text style={styles.description}>{"Employee Name & Code:"}</Text>
                              <Text style={styles.amount}>{"-"}</Text>
                              <Text style={styles.description}>{"Mobile"}</Text>
                              <Text style={styles.amount}>{"-"}</Text>
                              <Text style={styles.description}>{"Signature"}</Text>
                              <Text style={styles.amount}>{"-"}</Text>
                         </View>
                         {/* <InvoiceThankYouMsg /> */}
                         <Text style={styles.pageNumbers} render={({ pageNumber, totalPages }) => (
                              `${pageNumber} / ${totalPages}`
                         )} fixed />
                    </View>
               </Page>
          </Document>
     );
}

export default PPMReportPdfDocument;