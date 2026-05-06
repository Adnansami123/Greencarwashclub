import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader';
import BillTo from './BillTo';
import { onlyDate } from '.';

const borderColor = '#000000'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
        alignItems: 'center',
        fontStyle: 'bold',
        width: '100%',
    },
    serialNo: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    description: {
        width: '40%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
        textWrap: 'wrap',
        height: '100%',
    },
    rate: {
        width: '25%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'center',
        paddingRight: 8,
    },
    amount: {
        width: '25%',
        textAlign: 'center',
        paddingRight: 8,
    },
});

const stylesHeader = StyleSheet.create({
    headerContainer: {
        marginTop: 16,
        justifyContent: 'flex-start',
        width: '50%'
    },
    billTo: {
        marginTop: 10,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    },
});

const InvoiceTableRow = ({ items }) => {
    console.log("items", items);

    const rows = items.map((item, index) =>

        item.surveySchedules.map((rowitem, rowindex) =>

            <>
                {rowindex === 0 && <BillTo invoice={item} />}
                {rowindex === 0 && <InvoiceTableHeader />}
                <View style={styles.row}>
                    <Text style={styles.serialNo}>{rowindex + 1}</Text>
                    {/* <Text style={styles.description}>{item.contractAssets.assetName}</Text>                                              */}
                    {/* <Text style={styles.rate}>{item.contractAssetPPMFrequencyTemplates[0].frequencyName}</Text>  */}
                    <Text style={styles.rate}>{onlyDate(rowitem.surveyStartDate)}</Text>
                    <Text style={styles.rate}>{rowitem?.isEdited === true ? "Yes" : "No"}</Text>

                    <Text style={styles.rate}>{!!rowitem?.isEdited === true ? onlyDate(rowitem?.revisedStartDate) : "-"}</Text>
                    <Text style={styles.rate}>{!!rowitem?.reason ? rowitem?.reason : "-"}</Text>
                    <Text style={styles.rate}>{rowitem.status === "Draft" ? "Pending" : "Completed"}</Text>
                </View>
            </>


        )




    );
    return (<Fragment> {rows}</Fragment>)
};

export default InvoiceTableRow;