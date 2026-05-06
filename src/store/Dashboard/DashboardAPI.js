import { apiSlice, DashboardAPIs } from "../index"


export const DashboardAPI = apiSlice.injectEndpoints({

    endpoints: (build) => ({
        get_Dashboard: build.mutation({
            query: ({ id }) => ({

                // url: assetAPIs_Assets.getAssetByID`${'5'}`,
                // url: assetAPIs_Assets.getAssetByID`${5}`,
                url: `/Dashboard/GetCompanyProfileWithChildCountByID/${id}`,
                method: "GET",

            }),
        }),   
        get_DashboardByUser: build.mutation({
            query: ({ id }) => ({

                // url: assetAPIs_Assets.getAssetByID`${'5'}`,
                // url: assetAPIs_Assets.getAssetByID`${5}`,
                url: `/Dashboard/GetCompanyProfileWithChildCountByUserID/${id}`,
                method: "GET",

            }),
        }),   

        GetRferralCodeByID: build.mutation({
            query: ({ id }) => ({

                // url: assetAPIs_Assets.getAssetByID`${'5'}`,
                // url: assetAPIs_Assets.getAssetByID`${5}`,
                url: `/Dashboard/GetRferralCodeByID/${id}`,
                method: "GET",

            }),
        }),   


    }),
});

export const {
    useGet_DashboardMutation,
    useGet_DashboardByUserMutation,
    useGetRferralCodeByIDMutation,
 
} = DashboardAPI;