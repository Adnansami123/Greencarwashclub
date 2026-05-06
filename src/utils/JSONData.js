export const typeOfIndustry = [
  {
    key: "Offices",
    value: "Offices",
  },
  {
    key: "Residential",
    value: "Residential",
  },
  {
    key: "Malls",
    value: "Malls",
  },
  {
    key: "Hotels",
    value: "Hotels",
  },
  {
    key: "Hospital",
    value: "Hospital",
  },
  {
    key: "Warehouses",
    value: "Warehouses",
  },
  {
    key: "Schools",
    value: "Schools",
  },
];

export const TypeOfInvoice = [
  {
    key: 1,
    value: "Enquiry",
  },
  {
    key: 2,
    value: "Quotation",
  },
  {
    key: 3,
    value: "Purchase Order",
  },
  {
    key: 4,
    value: "Proforma Invoice", //duplicate is there....
  },
  {
    key: 5,
    value: "Proforma Invoice",
  },
  {
    key: 6,
    value: "GST Invoice",
  },
  {
    key: 7,
    value: "Delivery Challan",
  },
  {
    key: 8,
    value: "Credit Note",
  },
  {
    key: 9,
    value: "Debit Note",
  },
  /// this is not there in the master table... but for diaplay using...

  {
    key: 101,
    value: "Payment Received",
  },
  {
    key: 102,
    value: "Payment Paid",
  },
];

//this is M_Status table...
export const paymentStatus = [
  {
    key: 1,
    value: "Draft",
  },
  {
    key: 2,
    value: "Pending",
  },
  {
    key: 3,
    value: "Over Due",
  },
  {
    key: 4,
    value: "Done", //duplicate is there....
  },
  {
    key: 5,
    value: "Processed",
  },
  {
    key: 6,
    value: "Rejected",
  },
  {
    key: 7,
    value: "Re-Processed",
  },
];

//this is M_Status table...
export const paymentModes = [
  {
    pid: 1,
    name: "Cash",
  },
  {
    pid: 2,
    name: "Bank Transfer",
  },
];
//this is M_Status table...
export const TransactionTypes = [
  {
    pid: 1,
    name: "WISH",
  },
  {
    pid: 2,
    name: "COMPARE",
  },
  {
    pid: 3,
    name: "VIEW",
  },
  {
    pid: 4,
    name: "CART",
  },
];
