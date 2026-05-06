import { createAsyncThunk, createsl, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../../services/apis/apiClient";
import { eCommerceModule } from "../../common/endPoints";

export const GeteCommerceList = createAsyncThunk(
    eCommerceModule.eCommerceList, async ({ data, parameterData, authToken }, thunkAPI) => {
        console.log("datadata", data);
        try {
            const response = await apiClient.get(
                `${eCommerceModule.eCommerceList}${data.CBXID}/${data.CompanyXID}/-1`,
                data,
            );
            return response;
        } catch ({ response }) {
            console.error(response);
            return response;
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
    name: "eCommerceListItems",
    initialState: eCommerceList,
    reducers: {
        reseteCommerceListStates: () => {
            return {
                ...eCommerceList
            };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(GeteCommerceList.pending, (state) => {
            state.data = null;
            state.code = null;
            state.loading = "loading";
        });
        // builder.addCase(GeteCommerceList.fulfilled, (state, action) => {
        //     state.data = action.payload?.data;
        //     state.code = action.payload?.error;
        //     state.loading = "loaded";
        // });
          builder.addCase(GeteCommerceList.fulfilled, (state, action) => {
            state.data = action.payload;
            state.code = action.payload?.error;
            state.loading = "loaded";
        });

        builder.addCase(GeteCommerceList.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = "error";
        });
    }
});


export const { reseteCommerceListStates } = ECommerceSlice.actions;
export { ECommerceSlice };