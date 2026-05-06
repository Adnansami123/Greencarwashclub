import { createAsyncThunk, createsl, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../../services/apis/apiClient";
import { eCommerceModule } from "../../common/endPoints";

export const GetUserRating = createAsyncThunk(
    eCommerceModule.UserRating, async ({ data, parameterData, authToken }, thunkAPI) => {
        console.log("datadata", data);
        try {
            const response = await apiClient.get(
                `${eCommerceModule.UserRating}${data.CompanyXID}`,
                data,
            );
            return response;
        } catch ({ response }) {
            console.error(response);
            return response;
        }
    }
);

const UserRatingState = {
    data: null,
    loading: null,
    code: null,
    error: "",
};

const UserRatingSlice = createSlice({
    name: "UserRating",
    initialState: UserRatingState,
    reducers: {
        reseteUserRatingStates: () => {
            return {
                ...UserRatingState
            };
        }
    },
    extraReducers: (builder) => {
        builder.addCase(GetUserRating.pending, (state) => {
            state.data = null;
            state.code = null;
            state.loading = "loading";
        });
        // builder.addCase(GetUserRating.fulfilled, (state, action) => {
        //     state.data = action.payload?.data;
        //     state.code = action.payload?.error;
        //     state.loading = "loaded";
        // });
          builder.addCase(GetUserRating.fulfilled, (state, action) => {
            state.data = action.payload;
            state.code = action.payload?.error;
            state.loading = "loaded";
        });
        builder.addCase(GetUserRating.rejected, (state, action) => {
            state.error = action.error.message;
            state.loading = "error";
        });
    }
});


export const { reseteUserRatingStates } = UserRatingSlice.actions;
export { UserRatingSlice };