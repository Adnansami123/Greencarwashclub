import { apiSlice, DashboardAPIs } from "../index"


export const PayoutRequestAPI = apiSlice.injectEndpoints({

    endpoints: (build) => ({
        getPayoutRequest: build.mutation({
            query: ({ id }) => ({
                url: `/UserPayout/${id}`,
                method: "GET",

            }),
        }),        

        AddUserPayout: build.mutation({
            query: ({ data }) => ({
                url: '/UserPayout/',
                method: "POST",
                data: data,
                body: data,
            }),

        }),
        PutUserPayout: build.mutation({
            query: ({ data }) => ({
                url: '/UserPayout/',
                method: "PUT",
                data: data,
                body: data,
            }),

        }),


        GetAllPayoutBySuperAdmin: build.mutation({
            query: ({ id }) => ({
                url: `/UserPayout/GetAllPayoutBySuperAdmin/${id}`,
                method: "GET",

            }),
        }),     


        PutPayoutApproveByID: build.mutation({
            query: ({ data }) => ({
                url: '/UserPayout/PayoutApproveByID',
                method: "PUT",
                data: data,
                body: data,
            }),

        }),

        UserIncomeAndBalance: build.mutation({
            query: ({ id }) => ({
                url: `/UserPayout/UserIncomeAndBalance/${id}`,
                method: "GET",

            }),
        }),     

    }),
});

export const {
  useGetPayoutRequestMutation,
  useAddUserPayoutMutation,
  usePutUserPayoutMutation,
  useGetAllPayoutBySuperAdminMutation,
  usePutPayoutApproveByIDMutation,
  useUserIncomeAndBalanceMutation,
} = PayoutRequestAPI;