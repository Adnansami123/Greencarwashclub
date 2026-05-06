import {
    Common, Company, Contracts, CheckList, ContractAssets, RptAssetByContract,
    TemplateCheckListItemMap
} from "../../common/endPoints";
import { apiClient } from "../../services/apis/apiClient";
import { getMIMEType } from "../../utils/MIMETypes";
import { UserAPIs_Users, apiSlice, assetAPIs_Assets, Configurations } from "../index"


export const myConfigurationAPI = apiSlice.injectEndpoints({

    endpoints: (build) => ({
        Users: build.mutation({
            query: ({ id }) => ({
                url: `User`,
                method: "GET",
                query: { companyId: id },
            }),
        }),

        PurchaseUsers: build.mutation({
            query: ({ id }) => ({
                url: `User`,
                method: "GET",
                query: { companyId: id },
            }),
        }),
        GetAllUsers: build.mutation({
            query: ({ id }) => ({
                url: Configurations.GetAllUsersWithCompanyies,
                method: "GET",

            }),
        }),
        Login: build.mutation({
            query: ({ data }) => ({
                url: Configurations.Account,
                method: "POST",
                data: data,
                body: data,

            }),
        }),
        CheckReferralCode: build.mutation({
            query: ({ data }) => ({
                url: `/Accounts/CheckReferralCode/${data.referralCode}`,
                method: "POST",
                data: data,
                body: data,

            }),
        }),
        ForgotPassword: build.mutation({
            query: ({ data }) => ({
                url: `/Accounts/ForgotPassword/${data.username}`,
                method: "POST",
                data: data,
                body: data,

            }),
        }),

        ChangePassword: build.mutation({
            query: ({ data }) => ({
                url: `/Accounts/ChangePassword`,
                method: "POST",
                data: data,
                body: data,

            }),
        }),
        AddUser: build.mutation({

            query: ({ data }) => ({
                url: Configurations.userAdd,
                method: "POST",
                data: data,
                body: data,
            }),
        }),


        AddUserRegistration: build.mutation({

            query: ({ data }) => ({
                url: Configurations.userRegistration,
                method: "POST",
                data: data,
                body: data,
            }),
        }),

        PutUser: build.mutation({

            query: ({ data }) => ({
                url: Configurations.userPut,
                method: "PUT",
                data: data,
                body: data,
            }),
        }),

        GetUserByID: build.mutation({

            query: ({ id }) => ({
                url: `/User/${id}`,
                method: "GET",

            }),
        }),

        deleteUser: build.mutation({

            query: ({ id }) => ({
                // url: assetAPIs_Assets.deleteAssetByID,
                url: `/User/${id}`,
                method: "DELETE",

            }),
        }),


        PutBlockOrUnBlockUser: build.mutation({

            query: ({ data }) => ({
                url: Configurations.BlockOrUnBlockUser,
                method: "PUT",
                data: data,
                body: data,
            }),
        }),

        GetRoles: build.mutation({

            query: () => ({
                url: Configurations.Roles,
                method: "GET",

            }),
        }),

        /// here getting tree data....
        GetUserTree: build.mutation({
            query: ({ id }) => ({
                url: `/UserTree/${id}`,
                method: "GET",
            }),
        }),

        //end here....
        getTemplates: build.mutation({
            query: ({ id }) => ({
                // url: assetAPIs_Assets.getAssetByID`${'5'}`,
                // url: assetAPIs_Assets.getAssetByID`${5}`,
                url: `/Template/GetByCompany/${id}`,
                method: "GET",
                query: { companyId: id },
            }),
        }),
        getTemplateByID: build.mutation({
            query: ({ id }) => ({
                url: `/Template/${id}`,
                method: "GET",
                query: { Id: 5 },
            }),
        }),
        TemplateCheckListItemMap_GetByTemplate: build.mutation({
            query: ({ id }) => ({
                url: `/TemplateCheckListItemMap/GetByTemplate/${id}`,
                method: "GET",
            }),
        }),
        AddTemplate: build.mutation({
            query: ({ data }) => ({
                url: Configurations.Template,
                method: "POST",
                data: data,
                body: data,
            }),
        }),
        putTemplate: build.mutation({
            query: ({ data }) => ({
                url: Configurations.Template,
                method: "PUT",
                data: data,
                body: data,
            }),
        }),
        deleteTemplate: build.mutation({
            query: ({ id }) => ({
                url: `/Template/${id}`,
                method: "DELETE",
            }),
        }),


        /// Check item Category

        AddCheckListItemCategory: build.mutation({
            query: ({ data }) => ({
                url: Configurations.CheckListItemCategory,
                method: "POST",
                data: data,
                body: data,
            }),
        }),
        putCheckListItemCategory: build.mutation({
            query: ({ data }) => ({
                url: Configurations.CheckListItemCategory,
                method: "PUT",
                data: data,
                body: data,
            }),
        }),
        deleteCheckListItemCategory: build.mutation({
            query: ({ id }) => ({
                url: `/CheckListItemCategory/${id}`,
                method: "DELETE",
            }),
        }),


        // end here.


        /// Asset Category

        getAssetCategory: build.mutation({
            query: ({ id }) => ({
                url: `/AssetCategory`,
                method: "GET",
            }),
        }),
        getAssetCategoryByID: build.mutation({
            query: ({ id }) => ({
                url: `/AssetCategory/${id}`,
                method: "GET",
            }),
        }),
        addAssetCategory: build.mutation({
            query: ({ data }) => ({
                url: Configurations.AssetCategory,
                method: "POST",
                data: data,
                body: data,
            }),
        }),
        putAssetCategory: build.mutation({
            query: ({ data }) => ({
                url: Configurations.AssetCategory,
                method: "PUT",
                data: data,
                body: data,
            }),
        }),
        deleteAssetCategory: build.mutation({
            query: ({ id }) => ({
                url: `/AssetCategory/${id}`,
                method: "DELETE",
            }),
        }),

        // end here.
        //company

        getCompanies: build.mutation({
            query: ({ id }) => ({
                // url: assetAPIs_Assets.getAssetByID`${'5'}`,
                // url: assetAPIs_Assets.getAssetByID`${5}`,
                url: Company.Company,
                method: "GET"


            }),
        }),

        //get company by setup by ID
        Company_GetCompanySetupByID: build.mutation({
            query: ({ id, companyBranchID }) => ({
                // url: assetAPIs_Assets.getAssetByID`${'5'}`,
                // url: assetAPIs_Assets.getAssetByID`${5}`,
                url: `/Company/GetCompanySetupByID/${id}/${companyBranchID}`,
                method: "GET"
            }),
        }),
        getCompanyByID: build.mutation({
            query: ({ id }) => ({
                url: `/Company/${id}`,
                method: "GET",
                query: { Id: 5 },
            }),
        }),
        AddCommonCompany: build.mutation({

            query: ({ data }) => ({
                url: Common.AddCommonCompany,
                method: "POST",
                data: data,
                body: data,
            }),
        }),

        SendRegistrationEmail: build.mutation({
            query: ({ data }) => ({
                url: Configurations.userRegistrationEmail,
                data: data,
                method: "POST",
                query: { Id: 5 },
            }),
        }),

        putCompany: build.mutation({

            query: ({ data }) => ({
                url: Company.Company,
                method: "PUT",
                data: data,
                body: data,
            }),
        }),


        //contracts....
        //company
        getContracts: build.mutation({
            query: ({ cbXid }) => ({
                // url: assetAPIs_Assets.getAssetByID`${'5'}`,
                // url: assetAPIs_Assets.getAssetByID`${5}`,
                // url: Contracts.Contracts,
                url: `/Contract/GetAllByCbXid/${cbXid}`,
                method: "GET"


            }),

        }),

        GetContractsAllByClient: build.mutation({
            query: ({ clientXid }) => ({
                // url: assetAPIs_Assets.getAssetByID`${'5'}`,
                // url: assetAPIs_Assets.getAssetByID`${5}`,
                // url: Contracts.Contracts,
                url: `/Contract/GetAllByClient/${clientXid}`,
                method: "GET"


            }),

        }),
        Contract_GetFilter: build.mutation({
            query: ({ companyXid, clientXid = -1, contractXid = -1, userXid = -1 }) => ({
                url: `/Contract/GetFilter/${companyXid}/${clientXid}/${contractXid}/${userXid}`,
                method: "GET"
            }),

        }),
        Contract_GetFilterV1: build.mutation({
            //instead of companyXid passing the company branch x id....
            query: ({ companyXid, clientXid = -1, contractXid = -1, userXid = -1 }) => ({
                url: `/Contract/GetFilterV1/${companyXid}/${clientXid}/${contractXid}/${userXid}`,
                method: "GET"
            }),

        }),
        AddContract: build.mutation({

            query: ({ data }) => ({
                url: Contracts.Contracts,
                method: "Post",
                data: data,
                body: data,
            }),
        }),
        PutContract: build.mutation({

            query: ({ data }) => ({
                url: Contracts.Contracts,
                method: "PUT",
                data: data,
                body: data,
            }),
        }),
        getContractByID: build.mutation({

            query: ({ Id }) => ({
                url: `/Contract/${Id}`,
                method: "GET",
            }),
        }),

        //it is just put...
        deleteContract: build.mutation({

            query: ({ id, lastEditByXid }) => ({
                url: `/Contract/Delete/${id}/${lastEditByXid}`,
                method: "PUT",
            }),
        }),

        //Company Branch....
        //Contract Asset Detials....
        AddContractAssetDetails: build.mutation({

            query: ({ data }) => ({
                url: ContractAssets.ContractAssetDetail,
                method: "Post",
                data: data,
                body: data,
            }),
        }),

        PutContractAssetDetails: build.mutation({

            query: ({ data }) => ({
                url: ContractAssets.ContractAssetDetail,
                method: "PUT",
                data: data,
                body: data,
            }),
        }),

        DeleteContractAssetDetails: build.mutation({

            query: ({ id }) => ({
                url: `/ContractAssetDetail/${id}`,
                method: "DELETE",
            }),
        }),

        ContractAssetDetailsByID: build.mutation({

            query: ({ id }) => ({
                url: `/ContractAssetDetail/${id}`,
                method: "GET",
            }),
        }),


        // End here....


        //Contract Asset Common Detials....

        AddContractAssetCommonDetails: build.mutation({

            query: ({ data }) => ({
                url: ContractAssets.ContractAssetCommonDetail,
                method: "Post",
                data: data,
                body: data,
            }),
        }),

        PutContractAssetCommonDetails: build.mutation({

            query: ({ data }) => ({
                url: ContractAssets.ContractAssetCommonDetail,
                method: "PUT",
                data: data,
                body: data,
            }),
        }),

        DeleteContractAssetCommonDetails: build.mutation({

            query: ({ id }) => ({
                url: `/ContractAssetCommonDetail/${id}`,
                method: "DELETE",
            }),
        }),

        GetContractAssetCommonDetailsByID: build.mutation({

            query: ({ id }) => ({
                url: `/ContractAssetCommonDetail/${id}`,
                method: "GET",
            }),
        }),
        GetContractAssetDetailsByContractAssetDetailsID: build.mutation({

            query: ({ id }) => ({
                url: `/ContractAssetCommonDetail/GetContractAssetDetailsByContractAssetDetailsID/${id}`,
                method: "GET",
            }),
        }),

        GetContractAssetDetail_GetContractAssetDetailsByContractAssetDetailsID: build.mutation({

            query: ({ id }) => ({
                url: `/ContractAssetDetail/GetContractAssetDetailsByContractAssetDetailsID/${id}`,
                method: "GET",
            }),
        }),

        // End here....
        //barcode generation...
        postBarCode: build.mutation({
            queryFn: async ({ data }) => {
                const response = await apiClient.post(`/BarCode?codeToGenerate=${data.codeToGenerate}`, data,
                    {
                        responseType: "blob",
                    });

                console.log("getfetchBarCodeData", response.data);
                const blob = new Blob([response.data], {
                    type: getMIMEType({ filename: ".pdf" }),
                });
                //  const blob1 = new Blob([response], {
                //     type: getMIMEType({filename: ".JPG"}),
                //  });
                //  const blob2 = new Blob([response], {
                //     type: getMIMEType({filename: ".pdf"}),
                //  });

                //  const blob3 = new Blob([response], {
                //     type: getMIMEType({filename: ".JPEG"}),
                //  });
                //  const blob4 = new Blob([response], {
                //     type: getMIMEType({filename: ".bmp"}),
                //  });
                console.log("getfetchBarCodeData", blob);

                const blobURL = URL.createObjectURL(blob);
                console.log("getfetchBarCodeData", blobURL);

                const a = document.createElement("a");

                a.href = blobURL;
                // a.setAttribute("target","_blank");
                a.setAttribute("download", "barcode.png");
                a.click();
                return {};
            },
        }),

        downloadImages: build.mutation({
            queryFn: async ({ data }) => {
                const response = await apiClient.get(`/Upload/${data.fileName}?entityType=${data.entityType}`,
                    {
                        responseType: "blob",
                    });

                console.log("getfetchBarCodeData", response.data);
                const blob = new Blob([response.data], { type: getMIMEType({ filename: data.fileName }) });
                //  const blob1 = new Blob([response], {
                //     type: getMIMEType({filename: ".JPG"}),
                //  });
                //  const blob2 = new Blob([response], {
                //     type: getMIMEType({filename: ".pdf"}),
                //  });

                //  const blob3 = new Blob([response], {
                //     type: getMIMEType({filename: ".JPEG"}),
                //  });
                //  const blob4 = new Blob([response], {
                //     type: getMIMEType({filename: ".bmp"}),
                //  });
                console.log("getfetchBarCodeData", blob);

                const blobURL = URL.createObjectURL(blob);
                const a = document.createElement("a");

                // abc.setAttribute("download", "21848bd3-3cdb-41d6-afea-200e0a047540.jpg");
                // abc.href = blobURL;
                // // a.setAttribute("target","_blank");

                // abc.click();
                //a.setAttribute('target', '_blank');
                a.setAttribute("download", data.fileName);
                a.href = blobURL;
                a.click();
                return {};
            },
        }),
        ///this is to show and preview the image...
        downloadImagesPassBlob: build.mutation({
            queryFn: async ({ data }) => {
                const response = await apiClient.get(`/Upload/${data.fileName}?entityType=${data.entityType}`,
                    {
                        responseType: "blob",
                    });
                console.log("getfetchBarCodeData", response.data);


                console.log("getfetchBarCodeData", response.data);
                const blob = new Blob([response.data], { type: getMIMEType({ filename: data.fileName }) });
                // return blob;


                // console.log("getfetchBarCodeData", blob);

                // const blobURL = URL.createObjectURL(blob);
                // const a = document.createElement("a");

                // abc.setAttribute("download", "21848bd3-3cdb-41d6-afea-200e0a047540.jpg");
                // abc.href = blobURL;
                // // a.setAttribute("target","_blank");

                // abc.click();
                //a.setAttribute('target', '_blank');
                // a.setAttribute("download", data.fileName);
                // a.href = blobURL;
                // a.click();
                return { data: blob };
            },
        }),
        // postBarCode: build.mutation({
        //     query : ({ data}) =>
        //     ({
        //          url: `/BarCode?codeToGenerate=23423432423`,
        //         method: "Post",
        //         params: {
        //             "codeToGenerate" : data.codeToGenerate
        //         },
        //          data: data ,
        //          query: data ,
        //     }) ,
        //     // query: ({ data  }) => ({
        //     //    // url: Contracts.barCode,
        //     //    url: `/BarCode`,
        //     //     method: "Post",
        //     //      data: data ,
        //     //      body: data ,
        //     //      query: data , 

        //     // }),
        // }),
        //end here

        ///PPM Frequency 

        GetRptAssetByContract: build.mutation({
            query: ({ id = -1, CBXID = -1, userXid = -1, clientXid = -1 }) => ({
                url: `/RptAssetByContract/${id}/${CBXID}/${userXid}/${clientXid}`,
                method: "GET",
            }),

        }),

        GetRptPPMFrequencySurveyDtls: build.mutation({
            query: ({ pPMFrequencySurveySchudleXid, contractAssetCheckListXid }) => ({
                // url: assetAPIs_Assets.getAssetByID`${'5'}`,
                // url: assetAPIs_Assets.getAssetByID`${5}`,
                url: `/RptPPMFrequencySurveyDtls/RptFrequencySrvyScheduler/${pPMFrequencySurveySchudleXid}/${contractAssetCheckListXid}`,
                method: "GET",
                //    query: { contractXid: id },
            }),

        }),

        //end here...

        //contracts Asset....
        //company
        getContractAssets: build.mutation({
            query: ({ id }) => ({
                // url: assetAPIs_Assets.getAssetByID`${'5'}`,
                // url: assetAPIs_Assets.getAssetByID`${5}`,
                url: ContractAssets.ContractAssets,
                method: "GET"


            }),

        }),
        AddContractAssets: build.mutation({

            query: ({ data }) => ({
                url: ContractAssets.ContractAssets,
                method: "Post",
                data: data,
                body: data,
            }),
        }),
        deleteContractAssets: build.mutation({

            query: ({ id }) => ({
                url: `/ContractAsset/${id}`,
                method: "DELETE",
            }),
        }),


        getContractAssetByID: build.mutation({

            query: ({ id }) => ({
                url: `/ContractAsset/${id}`,
                method: "GET",
            }),
        }),

        GetContractAssetByContractAssetID: build.mutation({

            query: ({ id }) => ({
                url: `/ContractAsset/GetContractAssetByContractAssetID/${id}`,
                method: "GET",
            }),
        }),

        putContractAsset: build.mutation({

            query: ({ data }) => ({
                url: ContractAssets.ContractAssets,
                method: "PUT",
                data: data,
                body: data,
            }),
        }),

        //Contract Asset ....

        //Contract renewal...

        PostContractRenewal: build.mutation({

            query: ({ data }) => ({
                url: Contracts.ContractRenewal,
                method: "Post",
                data: data,
                body: data,
            }),
        }),

        GetContractRenewal: build.mutation({

            query: ({ id }) => ({
                url: `/ContractRenewalHistory/${id}`,
                method: "GET",
            }),
        }),

        GetRenewedTypes: build.mutation({

            query: () => ({
                url: `/RenewedTypes/`,
                method: "GET",
            }),
        }),
        // end here

        //company

        getCompanyBranches: build.mutation({
            query: ({ id }) => ({
                // url: assetAPIs_Assets.getAssetByID`${'5'}`,
                // url: assetAPIs_Assets.getAssetByID`${5}`,
                url: Company.CompanyBranch,
                method: "GET"

            }),
        }),
        getCompanyBranchByID: build.mutation({
            query: ({ id }) => ({
                // url: assetAPIs_Assets.getAssetByID`${'5'}`,
                // url: assetAPIs_Assets.getAssetByID`${5}`,
                url: `/CompanyBranch/${id}`,
                method: "GET",
                // body:
                //     { Id: 4 },
                // data:
                //     { Id: 4 },       
                query: { Id: 5 },


            }),
        }),

        getCompanyBranchByCompanyID: build.mutation({
            query: ({ id }) => ({
                // url: assetAPIs_Assets.getAssetByID`${'5'}`,
                // url: assetAPIs_Assets.getAssetByID`${5}`,
                url: `/CompanyBranch/GetCompanyBranchByCompany/${id}`,
                method: "GET",
                // body:
                //     { Id: 4 },
                // data:
                //     { Id: 4 },       
                query: { companyId: id },


            }),
        }),
        AddCompanyBranch: build.mutation({

            query: ({ data }) => ({
                url: Company.CompanyBranch,
                method: "Post",
                data: data,
                body: data,
            }),
        }),

        putCompanyBranch: build.mutation({

            query: ({ data }) => ({
                url: Company.CompanyBranch,
                method: "PUT",
                data: data,
                body: data,
            }),
        }),
        deleteCompanyBranch: build.mutation({

            query: ({ id }) => ({
                // url: assetAPIs_Assets.deleteAssetByID,
                url: `/CompanyBranch/${id}`,
                method: "DELETE",

            }),
        }),

        getCheckListItem: build.mutation({
            query: ({ companyXid }) => ({
                // url: assetAPIs_Assets.getAssetByID`${'5'}`,
                // url: assetAPIs_Assets.getAssetByID`${5}`,
                url: `/CheckListItem/GetAll/${companyXid}`,
                method: "GET"

            }),
        }),

        CheckListItem_GetCheckListItemByCategory: build.mutation({
            query: ({ CheckListItemCategoryXid }) => ({
                // url: assetAPIs_Assets.getAssetByID`${'5'}`,
                // url: assetAPIs_Assets.getAssetByID`${5}`,
                url: `/CheckListItem/GetCheckListItemByCategory/${CheckListItemCategoryXid}`,
                method: "GET"

            }),
        }),

        addCheckListItem: build.mutation({
            query: ({ data }) => ({
                // url: assetAPIs_Assets.getAssetByID`${'5'}`,
                // url: assetAPIs_Assets.getAssetByID`${5}`,
                //  url: TemplateCheckListItemMap.TemplateCheckListItemMap,
                url: CheckList.CheckListItem,
                method: "POST",
                data: data,
                body: data,

            }),
        }),

        addTemplateCheckListItemMap: build.mutation({
            query: ({ data }) => ({
                // url: assetAPIs_Assets.getAssetByID`${'5'}`,
                // url: assetAPIs_Assets.getAssetByID`${5}`,
                url: TemplateCheckListItemMap.TemplateCheckListItemMap,

                method: "POST",
                data: data,
                body: data,

            }),
        }),

        //get template by checklist item....
        GetTemplatesCheckListItemByCompanyID: build.mutation({
            query: ({ id }) => ({
                // url: assetAPIs_Assets.getAssetByID`${'5'}`,
                // url: assetAPIs_Assets.getAssetByID`${5}`,
                url: `/TemplateCheckListItemMap/GetTemplatesCheckListItemByCompany/${id}`,

                method: "GET",

            }),
        }),


        //delete template check listTemplate by ID

        //get template by checklist item....
        DeleteTemplatesCheckListItemByID: build.mutation({
            query: ({ id }) => ({
                // url: assetAPIs_Assets.getAssetByID`${'5'}`,
                // url: assetAPIs_Assets.getAssetByID`${5}`,
                url: `/TemplateCheckListItemMap/${id}`,

                method: "DELETE",

            }),
        }),

        putCheckListItem: build.mutation({

            query: ({ data }) => ({
                url: CheckList.CheckListItem,
                method: "PUT",
                data: data,
                body: data,
            }),
        }),

        deleteCheckListItem: build.mutation({

            query: ({ id }) => ({
                // url: assetAPIs_Assets.deleteAssetByID,
                url: `/CheckListItem/${id}`,
                method: "DELETE",

            }),
        }),
        getCheckListItemByID: build.mutation({
            query: ({ id }) => ({
                url: `/CheckListItem/${id}`,
                method: "GET",
                query: { companyId: id },


            }),
        }),


        ///checklist....

        getCheckList: build.mutation({
            query: ({ id }) => ({
                // url: assetAPIs_Assets.getAssetByID`${'5'}`,
                // url: assetAPIs_Assets.getAssetByID`${5}`,
                url: CheckList.CheckList,
                method: "GET"

            }),
        }),
        addCheckList: build.mutation({
            query: ({ data }) => ({
                // url: assetAPIs_Assets.getAssetByID`${'5'}`,
                // url: assetAPIs_Assets.getAssetByID`${5}`,
                url: CheckList.CheckList,
                method: "POST",
                data: data,
                body: data,

            }),
        }),

        putCheckList: build.mutation({

            query: ({ data }) => ({
                url: CheckList.CheckList,
                method: "PUT",
                data: data,
                body: data,
            }),
        }),

        deleteCheckList: build.mutation({

            query: ({ id }) => ({
                // url: assetAPIs_Assets.deleteAssetByID,
                url: `/CheckList/${id}`,
                method: "DELETE",

            }),
        }),
        getCheckListByID: build.mutation({
            query: ({ id }) => ({
                url: `/CheckList/${id}`,
                method: "GET",
                query: { companyId: id },


            }),
        }),


        ///Post Company Configuration
        PostCompanyBranchConfig: build.mutation({

            query: ({ data }) => ({
                url: Configurations.CompanyBranchConfig,
                method: "POST",
                data: data,
                body: data,
            }),
        }),

        ///Company Configuration
        PutCompanyBranchConfig: build.mutation({

            query: ({ data }) => ({
                url: Configurations.CompanyBranchConfig,
                method: "PUT",
                data: data,
                body: data,
            }),
        }),

        GetCompanyBranchConfigByID: build.mutation({

            query: ({ id }) => ({
                url: `/CompanyBranchConfig/${id}`,
                method: "GET",

            }),
        }),

        //end company configuration.

    }),
});

export const { useUsersMutation, useAddUserMutation, usePutUserMutation,
    useGetUserByIDMutation,
    useDeleteUserMutation,
    useGetTemplatesMutation,
    useAddTemplateMutation,
    usePutTemplateMutation,
    useDeleteTemplateMutation,
    useGetTemplateByIDMutation,
    useAddCommonCompanyMutation,
    useGetCompaniesMutation,
    useCompany_GetCompanySetupByIDMutation,
    useGetCompanyByIDMutation,
    usePutCompanyMutation,
    useGetContractsMutation,
    useGetContractsAllByClientMutation,
    useAddContractMutation,
    usePutContractMutation,
    useDeleteCompanyBranchMutation,
    useGetCompanyBranchByIDMutation,
    useGetCompanyBranchesMutation,
    usePutCompanyBranchMutation,
    useAddCompanyBranchMutation,
    useGetRolesMutation,
    useGetAllUsersMutation,
    useGetCompanyBranchByCompanyIDMutation,
    useLoginMutation,
    useCheckReferralCodeMutation,
    useForgotPasswordMutation,
    useChangePasswordMutation,
    useDeleteContractMutation,

    useGetCheckListItemMutation,
    useAddCheckListItemMutation,
    usePutCheckListItemMutation,
    useDeleteCheckListItemMutation,
    useGetCheckListItemByIDMutation,

    useGetContractAssetsMutation,
    useGetContractByIDMutation,
    useAddContractAssetsMutation,
    useDeleteContractAssetsMutation,
    usePutContractAssetMutation,
    usePostBarCodeMutation,
    useContract_GetFilterMutation, // this is reviesed with v1 but still it is there...
    useContract_GetFilterV1Mutation,

    useAddCheckListMutation,
    useGetCheckListMutation,
    useGetCheckListByIDMutation,
    usePutCheckListMutation,
    useDeleteCheckListMutation,

    useGetRptAssetByContractMutation,
    useGetRptPPMFrequencySurveyDtlsMutation,
    useAddTemplateCheckListItemMapMutation,
    useGetTemplatesCheckListItemByCompanyIDMutation,
    useDeleteTemplatesCheckListItemByIDMutation,

    useAddContractAssetDetailsMutation,
    useDeleteContractAssetDetailsMutation,
    useDownloadImagesMutation,
    useDownloadImagesPassBlobMutation,


    useAddContractAssetCommonDetailsMutation,
    usePutContractAssetCommonDetailsMutation,
    useDeleteContractAssetCommonDetailsMutation,
    useGetContractAssetCommonDetailsByIDMutation,
    useGetContractAssetDetailsByContractAssetDetailsIDMutation,


    useGetCheckListItemCategoryByIDMutation,
    useAddCheckListItemCategoryMutation,
    usePutCheckListItemCategoryMutation,
    useDeleteCheckListItemCategoryMutation,

    useTemplateCheckListItemMap_GetByTemplateMutation,
    useCheckListItem_GetCheckListItemByCategoryMutation,
    useContractAssetDetailsByIDMutation,
    usePutContractAssetDetailsMutation,

    useDeleteAssetCategoryMutation,
    useGetAssetCategoryByIDMutation,
    useGetAssetCategoryMutation,
    usePutAssetCategoryMutation,
    useAddAssetCategoryMutation,

    usePutCompanyBranchConfigMutation,
    usePostCompanyBranchConfigMutation,
    useGetCompanyBranchConfigByIDMutation,
    useGetContractAssetByIDMutation,
    useGetContractAssetByContractAssetIDMutation,
    useGetContractAssetDetail_GetContractAssetDetailsByContractAssetDetailsIDMutation,
    usePostContractRenewalMutation,
    useGetContractRenewalMutation,
    useGetRenewedTypesMutation,

    useGetUserTreeMutation,

    usePutBlockOrUnBlockUserMutation,
    useSendRegistrationEmailMutation,

    useAddUserRegistrationMutation,

} = myConfigurationAPI;