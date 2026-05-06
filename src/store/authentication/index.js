import { createSlice, configureStore } from "@reduxjs/toolkit";

import { apiSlice } from '../apiSlice/apiSlice';
import { combineReducers } from 'redux';
import persistStore from "redux-persist/es/persistStore";
import { setupListeners } from "@reduxjs/toolkit/query";
import modalReducer from "../Slices/ModalLoaderSlice";
import persistReducer from "redux-persist/es/persistReducer";
import session from "redux-persist/lib/storage/session";
import { CommonFileUPloadSlice, CommonMultipleFileUPloadSlice } from "../Slices/FileUploadSlice";
import { EmergencyCallOutSlice } from "../Slices/EmergencyCallOutSlice";
import { ECommerceSlice } from "../Slices/ECommercesSlice";
import { UserRatingSlice } from "../Slices/UserRatingSlice";


const initialCounterState = {
    counter: 0
};

const counterSlice = createSlice({
    name: "counter",
    initialState: initialCounterState,
    reducers:
    {
        setCount: (state, action) => {
            state.counter = action.payload;
        }
    },
});


const initialMenuSettings = {
    showInvoiceOnly: false,
};

const MenuSettingsSlice = createSlice({
    name: "menusettings",
    initialState: initialMenuSettings,
    reducers: {
        showOnlyInoiceMenu(state) {
            console.log("showOnlyInoiceMenu");
            state.showInvoiceOnly = !state.showInvoiceOnly;
        },

    },
});

const initialAuthState = {
    isAuthenticated: false,
    token: "",
}

const authSlice = createSlice({
    name: "authentication",
    initialState: initialAuthState,
    reducers: {
        login(state) {
            state.isAuthenticated = true;
        },
        logout(state) {
            state.isAuthenticated = false;
        }
    }
})

const initialCartState = {
    CartState: {},
    UserXid: null,
    UnderUserXid: null,
    IsPurchased: false,
};

const cartSlice = createSlice({
    name: "CartState",
    initialState: initialCartState,
    reducers:
    {
        setCartStateState: (state, action) => {
            state.CartState = action.payload;
        },

        setUserXID: (state, action) => {
            state.UserXid = action.payload;
        },

        setUnderUserXid: (state, action) => {
            state.UnderUserXid = action.payload;
        },
        setIsPurchased: (state, action) => {
            state.IsPurchased = action.payload;
        }
    },
});
export const getPersistConfig = (key = "", whilelistConfig = {}) => {
    return {
        key,
        storage: session,
        ...whilelistConfig,
    };
};



const appReducer = combineReducers({
    counter: counterSlice.reducer,
    auth: authSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    modal: modalReducer,
    CommonFileUPloadSlice: CommonFileUPloadSlice.reducer,
    CommonMultipleFileUPloadSlice: CommonMultipleFileUPloadSlice.reducer,
    EmergencyCallOutSlice: EmergencyCallOutSlice.reducer,
    MenuSettingsSlice: MenuSettingsSlice.reducer,
    CartStateSlice: cartSlice.reducer,
    ECommerceSlice: ECommerceSlice.reducer,
    UserRatingSlice: UserRatingSlice.reducer,
});

const initialState = appReducer({}, {});

const rootReducer = (state, action) => {
    if (action.type === "USER_LOGOUT") {
        return initialState;
    }

    return appReducer(state, action);
}


const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);

export const persistor = persistStore(store, [{ manualPersist: true }])

export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;
export const menuSettingsActions = MenuSettingsSlice.actions;
export const cartStateActions = cartSlice.actions;

export default store;