import { Invoice, apiSlice, assetAPIs_Assets, Configurations, Clients } from "../index"


export const InvoiceAPI = apiSlice.injectEndpoints({

    endpoints: (build) => ({


        GetInvoiceReportData: build.mutation({
            query: ({ GSTInvoiceNumber }) => ({
                // url: assetAPIs_Assets.getAssetByID`${'5'}`,
                // url: assetAPIs_Assets.getAssetByID`${5}`,
                url: `/RptGSTInvoice/${GSTInvoiceNumber}`,
                method: "GET",
                //    query: { contractXid: id },
            }),
        }),

        GetAllInvoices: build.mutation({
            query: ({ CBXID, FormTypeID = -1 }) => ({
                // url: assetAPIs_Assets.getAssetByID`${'5'}`,
                // url: assetAPIs_Assets.getAssetByID`${5}`,
                url: `/RptGSTInvoice/GetAllInvoices/${CBXID}/${FormTypeID}`,
                method: "GET",
                //    query: { contractXid: id },
            }),
        }),

        getClients: build.mutation({
            query: ({ id, userXid = -1, clientXid = -1 }) => ({

                // url: assetAPIs_Assets.getAssetByID`${'5'}`,
                // url: assetAPIs_Assets.getAssetByID`${5}`,
                url: Clients.Clients + `${id}/${userXid}/${clientXid}`,
                method: "GET"


            }),
        }),
        getInvoiceByID: build.mutation({
            query: ({ id }) => ({
                url: `/Invoice/${id}`,
                method: "GET",

            }),
        }),
        //this is used for payment first....
        getInvoiceByClientID: build.mutation({
            query: ({ ClientID, FormTypeID }) => ({
                url: `/Invoice/GetInvoicesByClient/${ClientID}/${FormTypeID}`,
                method: "GET",

            }),
        }),

        //this is used for payment detials only and updated in add payment section....
        //is Edit means we need to show all the details by invoice...
        //if it is payment done then we are not showing int he list.
        //on edit we need to show....
        //by dfault 6 is GST.......
        getInvoicesWithPaymentByClient: build.mutation({
            query: ({ ClientID, isEdit = false, FormTypeXid = 6 }) => ({
                url: `/Invoice/GetInvoicesWithPaymentByClient/${ClientID}/${isEdit}/${FormTypeXid}`,
                method: "GET",

            }),
        }),
        AddInvoice: build.mutation({

            query: ({ data }) => ({
                url: Invoice.Invoice,
                method: "POST",
                data: data,
                body: data,
            }),
        }),
        putInvoice: build.mutation({

            query: ({ data }) => ({
                url: Invoice.Invoice,
                method: "PUT",
                data: data,
                body: data,
            }),
        }),
        deleteInvoice: build.mutation({
            query: ({ id }) => ({
                // url: assetAPIs_Assets.deleteAssetByID,
                url: `/Invoice/${id}`,
                method: "DELETE",

            }),
        }),

    }),
});

export const {
    useAddInvoiceMutation,
    useDeleteInvoiceMutation,
    useGetInvoiceByIDMutation,
    useGetClientsMutation,
    usePutInvoiceMutation,
    useGetInvoiceReportDataMutation,
    useGetAllInvoicesMutation,
    useGetInvoiceByClientIDMutation,
    useGetInvoicesWithPaymentByClientMutation,
} = InvoiceAPI;