import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

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

const PPMReportBillTo = ({ invoice }) => (
    
    <View style={styles.headerContainer}>
        <Text style={styles.billTo}>CheckList Item Process:</Text>
        <Text></Text>      
    </View>
);

const AssetSurveyHeading = ({ invoice }) => (
    
    <View style={styles.headerContainer}>
        <Text style={styles.billTo}>Asset Survey Details:</Text>
        <Text>{""}</Text>   
    </View>
);

const ECOHeding = ({ heading }) => (
    
    <View style={styles.headerContainer}>
        <Text style={styles.billTo}>{heading}</Text>
        <Text>{""}</Text>   
    </View>
);

const SparePartsHeading = ({ invoice }) => (
    
    <View style={styles.headerContainer}>
        <Text style={styles.billTo}>Spare Part Replacement Details:</Text>
        <Text>{""}</Text>   
    </View>
);

const SurveyImagesHeading = ({ invoice }) => (
    
    <View style={styles.headerContainer}>
        <Text style={styles.billTo}>Survey Images:</Text>
        <Text>{""}</Text>   
    </View>
);

const FooterHeading = ({ invoice }) => (
    
    <View style={styles.headerContainer}>
        <Text style={styles.billTo}></Text>
        <Text>{""}</Text>   
    </View>
);

export { PPMReportBillTo, AssetSurveyHeading, SparePartsHeading, FooterHeading
,ECOHeding, SurveyImagesHeading}