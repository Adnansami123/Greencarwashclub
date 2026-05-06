import { Inventory, apiSlice, Clients } from "../index"


export const InventoryAPI = apiSlice.injectEndpoints({

    endpoints: (build) => ({


        GetAllInventories: build.mutation({
            query: ({ CBXID }) => ({
                // url: assetAPIs_Assets.getAssetByID`${'5'}`,
                // url: assetAPIs_Assets.getAssetByID`${5}`,
                url: `Item/GetByCompanyBranch/${CBXID}`,
                // url: `/Inventory/GetAllInvoices/${CBXID}`,
                method: "GET",
                //    query: { contractXid: id },
            }),
        }),

        getInventoryByID: build.mutation({
            query: ({ id }) => ({
                //url: Inventory.Inventory`/${id}`,
                url: `item/${id}`,
                //  url: `/Invoice/${id}`,
                method: "GET",

            }),
        }),      
        getGetItemReportByCompanyBranch: build.mutation({
            query: ({ CBXID }) => ({
                //url: Inventory.Inventory`/${id}`,
                url: `item/GetItemReportByCompanyBranch/${CBXID}`,
                method: "GET",

            }),
        }),      
        putInventory: build.mutation({

            query: ({ data }) => ({
                url: Inventory.Inventory,
                method: "PUT",
                data: data,
                body: data,
            }),
        }),
        postInventory: build.mutation({

            query: ({ data }) => ({
                url: Inventory.Inventory,
                method: "POST",
                data: data,
                body: data,
            }),
        }),
        ExportInventoryBulkItems: build.mutation({

            query: ({ data }) => ({
                url: Inventory.ExportInventoryBulkItems,
                method: "POST",
                data: data,
                body: data,
            }),
        }),
        deleteInventory: build.mutation({
            query: ({ id }) => ({
                // url: assetAPIs_Assets.deleteAssetByID,
                url:  `Item/${id}`,
                method: "DELETE",

            }),
        }),

         /// Asset Category

         getUOMs: build.mutation({
            query: ({ id }) => ({
                url: Inventory.UOMs,
                method: "GET",
            }),
        }),

    }),
});

export const {
    useDeleteInventoryMutation,
    useGetAllInventoriesMutation,
    useGetInventoryByIDMutation,
    usePutInventoryMutation,
    useGetUOMsMutation,
    usePostInventoryMutation,
    useGetGetItemReportByCompanyBranchMutation,
    useExportInventoryBulkItemsMutation,

   
} = InventoryAPI;