import { createAsyncThunk, createsl, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../../services/apis/apiClient";
import { FileUPload } from "../../common/endPoints";
import { getMIMEType } from "../../utils/MIMETypes";


export const AllFileUpload = createAsyncThunk(
    FileUPload.FileUpload, async ({ data, parameterData, authToken }, thunkAPI) => {
        try {
            const response = await apiClient.post(
                `${FileUPload.FileUpload}?entityType=${parameterData.entityType}&existingFile=${parameterData.existingFile}&userXid=${parameterData.userXid}&fileNameGuid=${parameterData.fileNameGuid}`,
                data,
                {
                    headers: {
                        'Content-Type': "multipart/form-data",
                    }
                },
                {

                    entityType: 'axios',
                    existingFile: 2,
                    userXid: 9999,

                },
            );
            return response.data;
        } catch ({ response }) {
            console.error(response);
            return response.data;
        }
    }
);

const CommonFileUploadState = {
    data: null,
    loading: null,
    code: null,
    error: "",
};

const CommonFileUPloadSlice = createSlice({
    name: "CommonFileUpload",
    initialState: CommonFileUploadState,
    reducers: {
        resetCommonFileUploadStates: () => {
            return {
                ...CommonFileUploadState
            };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(AllFileUpload.pending, (state) => {
            state.data = null;
            state.code = null;
            state.loading = "loading";
        });
        builder.addCase(AllFileUpload.fulfilled, (state, action) => {
            state.data = action.payload?.status;
            state.code = action.payload?.error;
            state.loading = "loading";
        });
        builder.addCase(AllFileUpload.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = "error";
        });
    }
});


export const MultipleFileUpload = createAsyncThunk(
    FileUPload.FileUploadMultiple, async ({ data,  authToken }, thunkAPI) => {
        try {
            const response = await apiClient.post(FileUPload.FileUploadMultiple,   
                data,              
                {

                    entityType: 'axios',
                    existingFile: 2,
                    userXid: 9999,

                },
            );
            return response;
        } catch ({ response }) {
            console.error("error" + response);
            return response;
        }
    }
);


const CommonMultipleFileUploadState = {
    data: null,
    loading: null,
    code: null,
    error: "",
};

const CommonMultipleFileUPloadSlice = createSlice({
    name: "CommonMultipleFileUpload",
    initialState: CommonMultipleFileUploadState,
    reducers: {
        resetCommonMultipleFileUploadStates: () => {
            return {
                ...CommonMultipleFileUploadState
            };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(MultipleFileUpload.pending, (state) => {
            state.data = null;
            state.code = null;
            state.loading = "loading";
        });
        builder.addCase(MultipleFileUpload.fulfilled, (state, action) => {
            state.data = action.payload?.data;
            state.code = action.payload?.error;
            state.loading = "loaded";
        });
        builder.addCase(MultipleFileUpload.rejected, (state, action) => {
            state.error = action?.error?.message;
            state.loading = "error";
        });
    }
});


export const { resetCommonFileUploadStates } = CommonFileUPloadSlice.actions;
export const { resetCommonMultipleFileUploadStates} = CommonMultipleFileUPloadSlice.actions;
export { CommonFileUPloadSlice, CommonMultipleFileUPloadSlice };
