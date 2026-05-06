import {  apiSlice, assetAPIs_Assets, Technician } from "../index"


export const TechnicianAPI = apiSlice.injectEndpoints({

    endpoints: (build) => ({         
        postTechnicianSubmitSurvey: build.mutation({
            query: ({ data }) => ({
                url: Technician.TechnicianApi,
                method: "POST",
                data: data,
                body: data,
            }),
        }), 
          //emegency Call out images.....
          ContractAssetSurvey_InsertContractAssetSurveyImages: build.mutation({

            query: ({ data }) => ({
                url: Technician.InsertContractAssetSurveyImages,
                method: "POST",
                data: data,
                body: data,
            }),
        }),
        getTechnicianByPPMFreqSurvSchId: build.mutation({
            query: ({ ppmFreqSurvSchId }) => ({
                url: Technician.TechnicianApi + `/${ppmFreqSurvSchId}`,
                method: "GET",                
            }),
        }), 

        putTechnicianSubmitSurvey: build.mutation({
            query: ({ data }) => ({
                url: Technician.TechnicianApi,
                method: "PUT",
                data: data,
                body: data,
            }),
        }), 
        getTechnician_GetOffline: build.mutation({
            query: ({ cbxid, userxid }) => ({
                url: Technician.TechnicianOfflineApi + `/${cbxid}`+ `/${userxid}`,
                method: "GET",                
            }),
        }), 
        
    }),
});

export const { usePostTechnicianSubmitSurveyMutation,
    useContractAssetSurvey_InsertContractAssetSurveyImagesMutation,
    useGetTechnicianByPPMFreqSurvSchIdMutation,
    usePutTechnicianSubmitSurveyMutation,
    useGetTechnician_GetOfflineMutation,

 } = TechnicianAPI;