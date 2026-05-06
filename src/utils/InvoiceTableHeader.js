import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#000000'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: borderColor,
        backgroundColor: '#3778C2',
        color: '#fff',

        borderBottomWidth: 1,
        // alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
        width: '100%',
    },
    serialNo: {
        width: '10%',
        borderRightColor: borderColor,
        marginTop: 5,
        borderRightWidth: 1,
    },
    description: {
        width: '40%',
        borderRightColor: borderColor,
        marginTop: 5,
        borderRightWidth: 1,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        marginTop: 5,
        borderRightWidth: 1,
    },
    rate: {
        width: '25%',
        borderRightColor: borderColor,
        marginTop: 5,
        borderRightWidth: 1,
    },
    amount: {
        width: '25%'
    },
});

const InvoiceTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.serialNo}>Sl. No.</Text>
        {/* <Text style={styles.description}>Asset</Text> */}
        {/* <Text style={styles.rate}>Sub Asset</Text>
        <Text style={styles.rate}>Sub Asset Type</Text> */}
        {/* <Text style={styles.rate}>PPM Frequency</Text> */}
        <Text style={styles.rate}>Survey Start Date</Text>
        <Text style={styles.rate}>Is Edited?</Text>
        <Text style={styles.rate}>Revised Start Date</Text>
        <Text style={styles.rate}>Revised Reason</Text>        
        <Text style={styles.rate}>Status</Text>
    </View>
);

export default InvoiceTableHeader;