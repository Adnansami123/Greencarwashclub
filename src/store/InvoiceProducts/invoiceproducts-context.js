import React from "react";

const InvoiceProductContext = React.createContext({
    items: [],
    itemcount:0,     
    paymentPendingInvoiceItems: [],
    paymentPendingInvoiceItemCount:0,
    addItem: (item) => {},
    removeItem: (id) => {},      
    addPaymentPendingInvoiceItem: (item)  => {},
    removePaymentPendingInvoiceItem: (id)=> {},
});

export default InvoiceProductContext;