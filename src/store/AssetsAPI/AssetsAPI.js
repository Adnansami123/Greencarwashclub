import { UserAPIs_Users, apiSlice, assetAPIs_Assets } from "../index"


export const myUsersAPI = apiSlice.injectEndpoints({

    endpoints: (build) => ({
        getAssets: build.mutation({
            query: ({ id }) => ({

                url: `Asset/GetByCompany/${id}`,
                method: "GET"


            }),
        }),
        getAssetsByCompanyID: build.mutation({
            query: ({ id }) => ({
                url: `Asset/GetByCompany/${id}`,
                method: "GET"


            }),
        }),
        getAssetByID: build.mutation({
            query: ({ id }) => ({
                url: `/Asset/${id}`,
                method: "GET",
                query: { Id: 5 },


            }),
        }),
        AddAsset: build.mutation({

            query: ({ data }) => ({
                url: assetAPIs_Assets.AddAsset,
                method: "POST",
                data: data,
                body: data,
            }),
        }),
        AddAssetImages: build.mutation({

            query: ({ data }) => ({
                url: assetAPIs_Assets.InsertAssetImages,
                method: "POST",
                data: data,
                body: data,
            }),
        }),

        AddContractImages: build.mutation({

            query: ({ data }) => ({
                url: assetAPIs_Assets.InsertContractImages,
                method: "POST",
                data: data,
                body: data,
            }),
        }),

        //emegency Call out images.....
        AddEmergencyCallOutImages: build.mutation({

            query: ({ data }) => ({
                url: assetAPIs_Assets.InsertEmergencyCallOutImages,
                method: "POST",
                data: data,
                body: data,
            }),
        }),


        putAsset: build.mutation({

            query: ({ data }) => ({
                url: assetAPIs_Assets.putAssetByID,
                method: "PUT",
                data: data,
                body: data,
            }),
        }),
        deleteAsset: build.mutation({

            query: ({ id }) => ({
                // url: assetAPIs_Assets.deleteAssetByID,
                url: `/Asset/${id}`,
                method: "DELETE",

            }),
        }),

        getAssetDetailsByID: build.mutation({
            query: ({ id }) => ({
                url: `AssetDetail/${id}`,
                method: "GET"
            }),
        }),
      
    }),
});

export const { useGetAssetsMutation, useAddAssetMutation, useGetAssetByIDMutation,
    usePutAssetMutation,
    useDeleteAssetMutation,
    useAddAssetImagesMutation,
    useAddContractImagesMutation,
    useAddEmergencyCallOutImagesMutation,
    useGetAssetDetailsByCompanyIDMutation,
    useGetAssetDetailsByIDMutation,
} = myUsersAPI;