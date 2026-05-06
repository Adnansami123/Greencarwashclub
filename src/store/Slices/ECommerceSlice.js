import { createAsyncThunk, createsl, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../../services/apis/apiClient";
import { eCommerceModule } from "../../common/endPoints";

export const eCommerceList = createAsyncThunk(
    eCommerceModule.eCommerceList, async ({ data, parameterData, authToken }, thunkAPI) => {
        console.log("datadata", data);
        try {
            const response = await apiClient.get(
                `${eCommerceModule.eCommerceList}${data.CBXID}`,
                data,
            );
            return response.data;
        } catch ({ response }) {
            console.error(response);
            return response.data;
        }
    }
);

const eCommerceList = {
    data: null,
    loading: null,
    code: null,
    error: "",
};

const ECommerceSlice = createSlice({
    name: "eCommerceList",
    initialState: eCommerceList,
    reducers: {
        reseteCommerceListStates: () => {
            return {
                ...eCommerceList
            };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(eCommerceList.pending, (state) => {
            state.data = null;
            state.code = null;
            state.loading = "loading";
        });
        builder.addCase(eCommerceList.fulfilled, (state, action) => {
            state.data = action.payload?.ecCount;
            state.code = action.payload?.error;
            state.loading = "loading";
        });
        builder.addCase(eCommerceList.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = "error";
        });
    }
});


export const { reseteCommerceListStates } = ECommerceSlice.actions;
export { ECommerceSlice };