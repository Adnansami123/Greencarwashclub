import { apiSlice, AMCMAPAPIs, FileUPload } from "../index"


export const FileUPloadAPI = apiSlice.injectEndpoints({

    endpoints: (build) => ({
        uploadFile: build.mutation({
            query: ({ data }) => ({

                // url: assetAPIs_Assets.getAssetByID`${'5'}`,
                // url: assetAPIs_Assets.getAssetByID`${5}`,
                url: FileUPload.FileUpload,
                method: "POST",
                data: data,
                body: data,


            }),
        }),

    
     
    }),
});

export const { 
    useUploadFileMutation,  
} = FileUPloadAPI;