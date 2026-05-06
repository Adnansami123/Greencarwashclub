import {
  Invoice,
  apiSlice,
  assetAPIs_Assets,
  Configurations,
  PaymentTransaction,
} from "../index";

export const PaymentAPI = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    GetPaymentTransactionReportByIDData: build.mutation({
      query: ({ PaymentInvoiceNumber }) => ({
        // url: assetAPIs_Assets.getAssetByID`${'5'}`,
        // url: assetAPIs_Assets.getAssetByID`${5}`,
        url: `/RptPaymentTransaction/${PaymentInvoiceNumber}`,
        method: "GET",
        //    query: { contractXid: id },
      }),
    }),

    GetPaymentTransactionByCBXID: build.mutation({
      query: ({ CBXID, paymentType = 1 }) => ({
        // url: assetAPIs_Assets.getAssetByID`${'5'}`,
        // url: assetAPIs_Assets.getAssetByID`${5}`,
        // url: `/RptGSTInvoice/GetAllInvoices/${CBXID}`,
        url: `/PaymentTransaction/GetByCompanyBranchID/${CBXID}/${paymentType}`,
        method: "GET",
        //    query: { contractXid: id },
      }),
    }),

    GetExpensesByCompanyBranchID: build.mutation({
      query: ({ CBXID }) => ({
        // url: assetAPIs_Assets.getAssetByID`${'5'}`,
        // url: assetAPIs_Assets.getAssetByID`${5}`,
        // url: `/RptGSTInvoice/GetAllInvoices/${CBXID}`,
        url: `/PaymentTransaction/GetExpensesByCompanyBranchID/${CBXID}`,
        method: "GET",
        //    query: { contractXid: id },
      }),
    }),

    getPaymentTransactionByID: build.mutation({
      query: ({ id }) => ({
        url: `/PaymentTransaction/${id}`,
        method: "GET",
      }),
    }),
    AddPaymentTransaction: build.mutation({
      query: ({ data }) => ({
        url: PaymentTransaction.PaymentTransaction,
        method: "POST",
        data: data,
        body: data,
      }),
    }),

    AddPaymentTransactionExpenses: build.mutation({
      query: ({ data }) => ({
        url: PaymentTransaction.PaymentTransactionExpenses,
        method: "POST",
        data: data,
        body: data,
      }),
    }),
    putPaymentTransaction: build.mutation({
      query: ({ data }) => ({
        url: PaymentTransaction.PaymentTransaction,
        method: "PUT",
        data: data,
        body: data,
      }),
    }),
    deletePaymentTransaction: build.mutation({
      query: ({ id }) => ({
        // url: assetAPIs_Assets.deleteAssetByID,
        url: `/PaymentTransaction/${id}`,
        method: "DELETE",
      }),
    }),

    // this is payment .....
    // this is paymetn receipt....
    getRptPaymentTransactionByID: build.mutation({
      query: ({ id }) => ({
        url: `/RptPaymentReceipt/${id}`,
        method: "GET",
      }),
    }),

    getLedgerByClientByClientID: build.mutation({
      query: ({ cbxid, clientxid }) => ({
        url: `/RptPaymentReceipt/GetLedgerByClient/${cbxid}/${clientxid}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddPaymentTransactionExpensesMutation,
  useAddPaymentTransactionMutation,
  useDeletePaymentTransactionMutation,
  useGetPaymentTransactionByIDMutation,
  usePutPaymentTransactionMutation,
  useGetPaymentTransactionReportByIDDataMutation,
  useGetRptPaymentTransactionByIDMutation,
  useGetPaymentTransactionByCBXIDMutation,
  useGetLedgerByClientByClientIDMutation,
  useGetExpensesByCompanyBranchIDMutation,
} = PaymentAPI;
