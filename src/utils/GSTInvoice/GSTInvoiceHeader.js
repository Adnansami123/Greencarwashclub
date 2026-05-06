import React, { Fragment, useState } from 'react';
import { Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import logo from "../../assets/images/BTFS_Logo-V1-transparent-175x149.png"
import { getInvoiceType, onlyDate } from '..';
import FileUpload from '../../components/CommonComponents/FileUpload';

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
        width: '50%',
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
        width: '50%',
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



const GSTInvoiceReportTitle = ({ invoice, CompanyLogo }) => (
    <>    
        <Fragment>
            <View style={styles.titleContainer}>
                <View style={styles.bottomBorderNew}>
                    <Text>GSTIN/UIN: {invoice.companyBranches?.gstin}</Text>
                </View>
                <View style={styles.bottomBorderNew}>
                    <Text style={styles.textCenter}>{getInvoiceType(invoice.formTypeXid)}</Text>
                </View>
            </View>
            <View style={styles.titleContainer}>
                <Image style={styles.logo} src={logo} />
                {/* <FileUpload                  
                 
                     fileList={CompanyLogo}
                    maxCount={1}
                    hideUploadButton={true}
                    showRemoveIcon={false}
                ></FileUpload> */}
                <View>
                    <Text style={styles.reportTitle}>{invoice?.companyBranches?.companies?.nameEng}</Text>
                    <Text style={styles.reportSubTitle}>{invoice?.companyBranches?.poBox}</Text>
                    <Text style={styles.reportSubTitle}>Tel No: {invoice?.companyBranches?.phone}, Fx: {invoice?.companyBranches?.fax}</Text>
                    <Text style={styles.reportSubTitle}>Email: {invoice?.companyBranches?.email}, Webite: {invoice?.companyBranches?.webSite}</Text>
                </View>
            </View>

            <View style={styles.titleContainer}>
                <View style={styles.titleContainerViewLeft}>
                    <Text>Consinee: </Text>
                    <Text>Name: {invoice?.clients?.companyName}</Text>
                    <Text>Address: {invoice?.clients?.poBox + ' ' + invoice?.clients?.officeAddress}</Text>
                    <Text>State Name: {invoice?.clients?.masterStateNames?.stateName} Code: {invoice?.clients?.masterStateNames?.stateCode} </Text>
                    <Text>GSTIN / UIN : {invoice?.clients?.gstin}</Text>
                    <Text>PAN / IT No : {invoice?.clients?.pan}</Text>

                    <View style={styles.buyerTitle}>
                        <Text>Buyer (If other than consinee): </Text>
                        <Text>Name: {invoice?.clients?.companyName}</Text>
                        <Text>Address: {invoice?.clients?.poBox + ' ' + invoice?.clients?.officeAddress}</Text>
                        <Text>State Name: {invoice?.clients?.masterStateNames?.stateName} Code: {invoice?.clients?.masterStateNames?.stateCode} </Text>
                        <Text>GSTIN / UIN : {invoice?.clients?.gstin}</Text>
                        <Text>PAN / IT No : {invoice?.clients?.pan}</Text>
                    </View>
                </View>
                <View style={styles.titleContainerViewLeft}>
                    <View style={styles.titleContainer}>
                        <View style={styles.titleContainerViewLeft}>
                            <View style={styles.titleContainer}>
                                {invoice.formTypeXid == 8 && ( //Credit Note
                                    <View style={styles.titleContainerViewLeft12}>
                                        <Text> CN RefID.</Text>
                                        <Text>{invoice?.existingInvoiceXID}</Text>
                                    </View>
                                )}
                                <View style={invoice.formTypeXid == 8 ? styles.titleContainerViewLeft12right : styles.titleContainerViewLeft12}>
                                    <Text>Invoice No.</Text>
                                    <Text>{invoice?.refID}</Text>
                                </View>
                                {invoice.formTypeXid != 8 && (
                                    <View style={styles.titleContainerViewLeft12right}>
                                        <Text> e-Way No.</Text>
                                        <Text>{invoice?.eWayBillNumber}</Text>
                                    </View>
                                )}
                            </View>
                            <View style={styles.titleContainerViewLeft12Text}>
                                <Text>Delivery Note: </Text>
                                <Text>{invoice?.deliveryNote}</Text>
                            </View>
                            <View style={styles.titleContainerViewLeft12Text}>
                                <Text>Supplier's Ref.</Text>
                                <Text >{invoice?.companyBranches?.companyShortName + "/" + invoice?.formTypeXid + "/" + invoice?.tYear + "/" + invoice?.refID}</Text>
                            </View>
                            <View style={styles.titleContainerViewLeft12Text}>
                                <Text>Buyer¶s Order No.</Text>
                                <Text >{invoice.purchaseOrder}</Text>
                            </View>
                            <View style={styles.titleContainerViewLeft12Text}>
                                <Text>Despatched Document No.</Text>
                                <Text >{invoice?.despatchedDocumentNumber}</Text>
                            </View>
                            <View style={styles.titleContainerViewLeft12Text}>
                                <Text>Despatched Through</Text>
                                <Text>{invoice?.delivery}</Text>
                            </View>
                            <View style={styles.titleContainerViewLeft12Text}>
                                <Text>Bill Of Landing / LR- RR</Text>
                                <Text >{invoice?.pandF}</Text>
                            </View>
                        </View>
                        <View style={styles.titleContainerViewLeft}>
                            <View style={styles.titleContainerViewLeft12Text}>
                                <Text>Dated</Text>
                                <Text >{onlyDate(invoice.createdOn)}</Text>
                            </View>
                            <View style={styles.titleContainerViewLeft12Text}>
                                <Text>Mode / Terms Of Payment</Text>
                                <Text>{invoice?.modeorTermsOfPayment}</Text>
                            </View>
                            <View style={styles.titleContainerViewLeft12Text}>
                                <Text>Other Reference</Text>
                                <Text>{invoice?.otherReferences}</Text>
                            </View>
                            <View style={styles.titleContainerViewLeft12Text}>
                                <Text>Dated</Text>
                                <Text>{invoice?.purchaseOrderDate}</Text>
                            </View>
                            <View style={styles.titleContainerViewLeft12Text}>
                                <Text>Delivery Note Date</Text>
                                <Text>{invoice?.deliveryNoteDate}</Text>
                            </View>
                            <View style={styles.titleContainerViewLeft12Text}>
                                <Text>Destination</Text>
                                <Text>{invoice.pandF}</Text>
                            </View>
                            <View style={styles.titleContainerViewLeft12Text}>
                                <Text>Motor Vehicle No.</Text>
                                <Text>{invoice.price}</Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.TermsOfDelivery}>
                        <Text>Terms of Delivery:{invoice.Transport}</Text>
                    </View>
                </View>
            </View>
        </Fragment>

    </>
);







export { GSTInvoiceReportTitle };