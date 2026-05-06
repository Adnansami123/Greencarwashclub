
import { apiClient } from "../../services/apis/apiClient";
import { getMIMEType } from "../../utils/MIMETypes";
import { UserAPIs_Users, apiSlice, assetAPIs_Assets, Configurations, ConfigurationsSLD } from "../index"


export const ConfigurationMLM = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        getLevelMatrix: build.mutation({
            query: ({ id }) => ({
                url: `/LevelMatrix`,
                method: "GET",
            }),
        }),

        //profits...
        getUserIncome: build.mutation({
            query: ({ id }) => ({
                url: `/UserIncome/${id}`,
                method: "GET",
            }),
        }),


        //My Referral / Direct Purchase......
        getDirectOrReferralMembers: build.mutation({
            query: ({ id }) => ({
                url: `/UserPurchase/${id}`,
                method: "GET",
            }),
        }),

        AddLevel: build.mutation({
            query: ({ data }) => ({
                url: '/LevelMatrix/',
                method: "POST",
                data: data,
                body: data,
            }),

        }),
        PutLevel: build.mutation({
            query: ({ data }) => ({
                url: '/LevelMatrix/',
                method: "PUT",
                data: data,
                body: data,
            }),

        }),
        getLevelMatrixByID: build.mutation({
            query: ({ id }) => ({
                url: `/LevelMatrix/${id}`,
                method: "GET",
            }),
        }),


        ///uploading images information
        AddUserProofImages: build.mutation({

            query: ({ data }) => ({
                url: "UserProof/InsertUserProofImages",
                method: "POST",
                data: data,
                body: data,
            }),
        }),

        putUserPurchase: build.mutation({

            query: ({ data }) => ({
                url: '/UserPurchase/',
                method: "PUT",
                data: data,
                body: data,
            }),
        }),

        postUserPurchase: build.mutation({

            query: ({ data }) => ({
                url: '/UserPurchase/',
                method: "POST",
                data: data,
                body: data,
            }),
        }),


        // this is by User ID... to get and bind....

        GetAllPuchaseByUser: build.mutation({

            query: ({ id }) => ({
                url: `/UserPurchase/GetAllPuchaseByUserForApproval/${id}`,
                method: "GET",
            }),
        }),

        // this is all...

        GetAllPuchaseForApproval: build.mutation({

            query: ({ id }) => ({
                url: `/UserPurchase/GetAllPuchaseForApproval`,
                method: "GET",
            }),
        }),

        ApprovedPurchase: build.mutation({

            query: ({ data }) => ({
                url: '/UserPurchase/ApprovedPurchase',
                method: "POST",
                data: data,
                body: data,
            }),
          
        }),


        //Bank details

        
        // this is all...

        GetUseBankByID: build.mutation({

            query: ({ id }) => ({
                url: `/UserBank/${id}`,
                method: "GET",
            }),
        }),

        GetBankDetailsByID: build.mutation({

            query: ({ id }) => ({
                url: `/UserBank/GetBankDetailsByID/${id}`,
                method: "GET",
            }),
        }),
        

        AddUserBank: build.mutation({

            query: ({ data }) => ({
                url: '/UserBank',
                method: "POST",
                data: data,
                body: data,
            }),
          
        }),

          // KYC

          GetUseKYCByID: build.mutation({

            query: ({ id }) => ({
                url: `/KYCInfo`,
                method: "GET",
            }),
        }),

        AddUserKYCInfo: build.mutation({

            query: ({ data }) => ({
                url: '/KYCInfo',
                method: "POST",
                data: data,
                body: data,
            }),
          
        }),
    }),
});

export const {
    useGetLevelMatrixMutation,
    useGetUserIncomeMutation,
    useGetDirectOrReferralMembersMutation,
    useAddLevelMutation,
    useGetLevelMatrixByIDMutation,
    usePutLevelMutation,
    useAddUserProofImagesMutation,
    usePutUserPurchaseMutation,
    useGetAllPuchaseByUserMutation,
    usePostUserPurchaseMutation,
    useApprovedPurchaseMutation,
    useGetAllPuchaseForApprovalMutation,
    useAddUserBankMutation,
    useGetUseBankByIDMutation,
    useAddUserKYCInfoMutation,
    useGetUseKYCByIDMutation,
    useGetBankDetailsByIDMutation,
} = ConfigurationMLM