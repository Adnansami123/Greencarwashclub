import { createAsyncThunk, createsl, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../../services/apis/apiClient";
import { ClientModule } from "../../common/endPoints";

export const EmergencyCallOutCount = createAsyncThunk(
    ClientModule.EmergencyCallOutCount, async ({ data, parameterData, authToken }, thunkAPI) => {
        console.log("datadata", data);
        try {
            const response = await apiClient.get(
                `${ClientModule.EmergencyCallOutCount}${data.CBXID}`,
                data,
            );
            return response.data;
        } catch ({ response }) {
            console.error(response);
            return response.data;
        }
    }
);

const EmergencyCallOutState = {
    data: null,
    loading: null,
    code: null,
    error: "",
};

const EmergencyCallOutSlice = createSlice({
    name: "EmergencyCallOutCount",
    initialState: EmergencyCallOutState,
    reducers: {
        resetEmergencyCallOutStateStates: () => {
            return {
                ...EmergencyCallOutState
            };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(EmergencyCallOutCount.pending, (state) => {
            state.data = null;
            state.code = null;
            state.loading = "loading";
        });
        builder.addCase(EmergencyCallOutCount.fulfilled, (state, action) => {
            state.data = action.payload?.ecCount;
            state.code = action.payload?.error;
            state.loading = "loading";
        });
        builder.addCase(EmergencyCallOutCount.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = "error";
        });
    }
});


export const { resetEmergencyCallOutStateStates } = EmergencyCallOutSlice.actions;
export { EmergencyCallOutSlice };