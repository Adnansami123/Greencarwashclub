import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isOpen: false,
    loadingModalCofiguration: {isVisible: false, loadingText:""},    
};

const modalSlice = createSlice({
    name: "modal",
    initialState,
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
        },
        setLoadingModalConfiguration: (state, action) => {
            state.loadingModalCofiguration.isVisible = action.payload.isVisible;
           state.loadingModalCofiguration.loadingText = action.payload.loadingText;
          // state.loadingModalCofiguration.loadingText = "loading.....";
        },      
    },
});

export const { openModal, closeModal, setLoadingModalConfiguration} = modalSlice.actions;

export default modalSlice.reducer;