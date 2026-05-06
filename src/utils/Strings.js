import { toINR } from "../utils";
import { TypeOfInvoice } from "./JSONData";

const imgPaths = {
  success: " New../images/svg/success_alert.svg",
  error: " New../images/svg/error_icon.svg",
  balance: " New../images/svg/balance_icon.svg",
  units: " New../images/svg/units_icon.svg",
  nav: " New../images/svg/nav_icon.svg",
  cart: {
    path: " New../images/svg/cart_icon.svg",
    alt: " NewCart Icon",
  },

  rupeeIcon: {
    path: " New../images/svg/rupee_icon.svg",
    alt: " NewRupee Icon",
  },
};

const Strings = {

  ackScheduleTransactionTitle: " New Transaction Acknowledgement",

  noDataFound: {
    title: " NewNo Data Found!",
    message: " NewFailed to create password",
    buttonText: " NewTry again",
    imgPath: imgPaths.error,
  },

  billing: {
    invoie: {
      formType: TypeOfInvoice[5].key, /// 5 equal to invoice 6 Delivery cahllan... index is different...
      formURL: "Invoices",
      showTransportTab: true,
      ViewTitle: "Invoice",
      AddButton: "Add Invoice",
      AddTitle: "Add Invoice",
      EditTitle: "Edit Invoice",
      customer: "Select Consinee",
      showBuyer: true,
      disableBuyer: false,
      purchaseOrderNumber: "Purchase Order Number",
      purchaseOrderNumberReqMsg: "Please enter the Purchase Order Number!",

      Add: {
        formURL: "AddInvoice",
        ViewTitle: "Invoice",
        AddButton: "Generate Invoice",
        showInvoiceSearch: false,
      },
      Edit: {
        formURL: "/EditInvoice",
        ViewTitle: "Edit Invoice",
        AddButton: "Re-Generate Invoice",
        showInvoiceSearch: false,
      }
    },
    credit: {
      formType: TypeOfInvoice[7].key, /// 5 equal to invoice 6 Delivery cahllan... index is different...
      permanentInvoiceFormType: TypeOfInvoice[5].key,
      formURL: "CreditNotes",
      showTransportTab: false,
      ViewTitle: "Credit Note",
      AddButton: "Add Credit Note",
      AddTitle: "Add Credit Note",
      EditTitle: "Edit Credit Note",
      customer: "Select Customer",
      showBuyer: true,
      disableBuyer: true,
      purchaseOrderNumber: "Invoice Order Number",
      purchaseOrderNumberReqMsg: "Please enter the Order Number!",


      Add: {
        formURL: "AddCreditNote",
        ViewTitle: "Credit Note",
        AddButton: "Generate Credit Note",
        showInvoiceSearch: true,

      },
      Edit: {
        formURL: "EditCreditNote",
        ViewTitle: "Edit Credit Note",
        AddButton: "Re-Generate Credit Note",
        showInvoiceSearch: false,
      }
    },
    debit: {
      formType: TypeOfInvoice[8].key, /// 5 equal to invoice 6 Delivery cahllan... index is different...    
      permanentInvoiceFormType: TypeOfInvoice[2].key,
      formURL: "DebitNotes",
      showTransportTab: false,
      ViewTitle: "Debit Note",
      AddButton: "Add Debit Note",
      AddTitle: "Add Debit Note",
      EditTitle: "Edit Debit Note",
      customer: "Select Customer",
      showBuyer: false,
      disableBuyer: true,
      purchaseOrderNumber: "Sales Order Number",
      purchaseOrderNumberReqMsg: "Please enter the Order Number!",


      Add: {
        formURL: "AddDebitNote",
        ViewTitle: "Debit Note",
        AddButton: "Generate Debit Note",
        showInvoiceSearch: true,
      },
      Edit: {
        formURL: "EditDebitNote",
        ViewTitle: "Edit Debit Note",
        AddButton: "Re-Generate Debit Note",
        showInvoiceSearch: true,
      }
    },
    purchase: {
      formType: TypeOfInvoice[2].key,
      formURL: "Purchase",
      showTransportTab: false,
      ViewTitle: "Purchase",
      AddButton: "Add Purchase",
      AddTitle: "Add Purchase",
      EditTitle: "Edit Purchase",
      customer: "Select Vendor",
      showBuyer: false,
      disableBuyer: true, //disabled...
      purchaseOrderNumber: "Quotation Order Number",
      purchaseOrderNumberReqMsg: "Please enter the Order Number!",
      Add: {
        formURL: "AddPurchase",
        ViewTitle: "Add Purchase",
        AddButton: "Generate Purchase",
      },
      Edit: {
        formURL: "EditPurchase",
        ViewTitle: "Edit Purchase",
        AddButton: "Re-Generate Purchase",
      }
    },

  },
  company: {
    company: {
      formURL: "Invoices",
      ViewTitle: "Companies",
      AddButton: "Add Invoice",
      AddTitle: "Add Invoice",
      EditTitle: "Edit Invoice",
      customer: "Select Consinee",
      showBuyer: true,
      disableBuyer: false, 
      purchaseOrderNumber: "Purchase Order Number",
      purchaseOrderNumberReqMsg: "Please enter the Purchase Order Number!",
      form: {
          companyName: "Company Name",
          companyNameInArabic: "Company Name In Arabic",
          showArabicCompanyField: false,
          companyAddress: "Company Address",          
      },
      Add: {
        formURL: "/AddCompany",
        ViewTitle: "Add Company",
        AddButton: "Add Company",
        formURLView: "/Companies"

      },
      Register: {
        formURL: "/AddCompany",
        ViewTitle: "User Registration",
        formURLView: "/RegistrationSuccess"

      },
      Edit: {
        formURL: "/EditCompany",
        ViewTitle: "Edit Company",
        AddButton: "Update Company",
        showInvoiceSearch: false,
      }
    },
    companyBranchConfig: {
      prefix: "CC",
      clientPrefix: "CLT",
      contractPrefix: "CON",
      subContractPrefix: "SUB-CON",
      reportPrefix: "RPT",
      reportPrefix: "RPT",
      clientRefNumber: "1",
      contractRefNumber: "1",
      reportRefNumber: "1",

    },
  },
  inventory: {
    itemGroup: {
      itemGroupName: "Item Group",
      errors: {
        itemGroupNameError: "Please select the tem Group!"
      }

    }
  },
  Contracts: {
    errors: {
      templatesNotExists: "Templates does not exists, add from the configration section!"
    }


  },

  logoutModal: {
    title: " NewLog out of the ",
    message: " NewDo you really want to log out?",
    buttonText: " NewYes",
    noButtonText: " NewCancel",
    imgPath: imgPaths.error,
  },










  duration: " NewDuration",
};

export default Strings;

export { imgPaths };