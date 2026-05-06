
import { apiSlice, } from "../index"


export const SubscriptionAPI = apiSlice.injectEndpoints({
    endpoints: (build) => ({

        //REWARD CATEGORY....
        getSubscriptionPlans: build.mutation({
            query: ({ id }) => ({
                url: `/Plan/GetPlans/`,
                method: "GET",
            }),
        }),
        PostRazorOrder: build.mutation({
            query: ({ data }) => ({
                url: `/Plan/RazorPayOrder/`,
                method: "POST",
                data: data,
                body: data,
            }),
        }),
        Subscription: build.mutation({
            query: ({ data }) => ({
                url: `/Subscription/`,
                method: "POST",
                data: data,
                body: data,
            }),
        }),
    }),

});

export const {
    useGetSubscriptionPlansMutation,
    usePostRazorOrderMutation,
    useSubscriptionMutation


} = SubscriptionAPI