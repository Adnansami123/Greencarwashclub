import { UserAPIs_Users, apiSlice, assetAPIs_Assets, Configurations, Clients, PaymentTypes, PaymentMaster } from "../index"


export const PaymentTypesAPI = apiSlice.injectEndpoints({

    endpoints: (build) => ({

        getPaymentTypes: build.mutation({
            query: () => ({

                // url: assetAPIs_Assets.getAssetByID`${'5'}`,
                // url: assetAPIs_Assets.getAssetByID`${5}`,
                // url: Clients.Clients + `${id}/${userXid}/${clientXid}`,
                url: PaymentTypes.PaymentTypes,
                method: "GET"


            }),
        }),
        getPaymentMaster: build.mutation({
            query: () => ({

                // url: assetAPIs_Assets.getAssetByID`${'5'}`,
                // url: assetAPIs_Assets.getAssetByID`${5}`,
                // url: Clients.Clients + `${id}/${userXid}/${clientXid}`,
                url: PaymentMaster.PaymentMaster,
                method: "GET"


            }),
        }),
        getPaymentMasterByID: build.mutation({
            query: ({ id }) => ({

                // url: assetAPIs_Assets.getAssetByID`${'5'}`,
                // url: assetAPIs_Assets.getAssetByID`${5}`,
                url: `/PaymentMaster/${id}`,
                method: "GET",
                query: { Id: 5 },


            }),
        }),
        AddPaymentMaster: build.mutation({

            query: ({ data }) => ({
                url: PaymentMaster.PaymentMaster,
                method: "POST",
                data: data,
                body: data,
            }),
        }),
        AddPaymentType: build.mutation({

            query: ({ data }) => ({
                url: PaymentTypes.PaymentTypes,
                method: "POST",
                data: data,
                body: data,
            }),
        }),
        putPaymentMaster: build.mutation({

            query: ({ data }) => ({
                url: PaymentMaster.PaymentMaster,
                method: "PUT",
                data: data,
                body: data,
            }),
        }),
        deletePaymentMaster: build.mutation({
            query: ({ id }) => ({
                // url: assetAPIs_Assets.deleteAssetByID,
                url: `/PaymentMaster/${id}`,
                method: "DELETE",

            }),
        }),

    }),
});

export const {
   useGetPaymentTypesMutation, 
    useGetPaymentMasterMutation,
    useAddPaymentMasterMutation,
    usePutPaymentMasterMutation,
    useDeletePaymentMasterMutation,
    useGetPaymentMasterByIDMutation,
    useAddPaymentTypeMutation,
} = PaymentTypesAPI;