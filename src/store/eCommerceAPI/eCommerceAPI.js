import { Inventory, apiSlice, Clients } from "../index";

export const eCommerceAPI = apiSlice.injectEndpoints({
  endpoints: (build) => ({
    GetGetItemsByAssetCaetgoryAndCompanyBranchV1: build.mutation({
      query: ({ CBXID, CompanyXID }) => ({
        // url: assetAPIs_Assets.getAssetByID`${'5'}`,
        // url: assetAPIs_Assets.getAssetByID`${5}`,
        url: `eCommerce/GetItemsByAssetCaetgoryAndCompanyBranchV1/${CBXID}/${CompanyXID}/-1`,
        // url: `/Inventory/GetAllInvoices/${CBXID}`,
        method: "GET",
        //    query: { contractXid: id },
      }),
    }),

    GeteCommerceInvoicesByUser: build.mutation({
      query: ({ CompanyXID, CBXID, FormTypeID, UserXID }) => ({
        // url: assetAPIs_Assets.getAssetByID`${'5'}`,
        // url: assetAPIs_Assets.getAssetByID`${5}`,
        url: `eCommerce/GeteCommerceInvoicesByUser/${CompanyXID}/${CBXID}/-1/${UserXID}`,
        // url: `/Inventory/GetAllInvoices/${CBXID}`,
        method: "GET",
        //    query: { contractXid: id },
      }),
    }),

    PostItemRatingByUser: build.mutation({
      query: ({ data }) => ({
        url: `eCommerce/`,
        method: "POST",
        data: data,
        body: data,
      }),
    }),

    PostTransactionByUser: build.mutation({
      query: ({ data }) => ({
        url: `UserTransactionHistory`,
        method: "POST",
        data: data,
        body: data,
      }),
    }),

    GetTransactionByUser: build.mutation({
      query: ({ UserXID }) => ({
        url: `eCommerce/GetAllByUserID/${UserXID}`,
        method: "GET",
      }),
    }),
    //delete transaction by item x id.....and transaction.....
    DeleteTransactionByID: build.mutation({
      query: ({ id }) => ({
        // url: assetAPIs_Assets.deleteAssetByID,
        url: `/eCommerce/${id}`,
        method: "DELETE",
      }),
    }),

    GetUserCompanyByBrandAndUser: build.mutation({
      query: ({ CBXID, UserXID, ClientXid = -1 }) => ({
        url: `eCommerce/GetUserCompanyByBrandAndUser/${CBXID}/${UserXID}/${ClientXid}`,
        method: "GET",
      }),
    }),

    PostOrder: build.mutation({
      query: ({ data }) => ({
        url: `eCommerce/PostOrder`,
        method: "POST",
        data: data,
        body: data,
      }),
    }),


    //get all reating...

    GetAllUserRatingByCompanyID: build.mutation({
      query: ({ CompanyXID }) => ({
        url: `eCommerce/GetAllUserRatingByCompanyID/${CompanyXID}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetGetItemsByAssetCaetgoryAndCompanyBranchV1Mutation,
  usePostItemRatingByUserMutation,
  usePostTransactionByUserMutation,
  useGetTransactionByUserMutation,
  useDeleteTransactionByIDMutation,
  useGeteCommerceInvoicesByUserMutation,
  useGetUserCompanyByBrandAndUserMutation,
  usePostOrderMutation,
  useGetAllUserRatingByCompanyIDMutation,
} = eCommerceAPI;
