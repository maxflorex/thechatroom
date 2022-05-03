import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import appApi from "./services/appApi";
import thunk from "redux-thunk";

// PERSIST OUR STORE - DON"T LOGIN EVERTIME CLOSE TAB OR BROWSER
import storage from 'redux-persist/lib/storage';
import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist'

// REDUCERS - COMBINING REDUCERS
const reducer = combineReducers({
    user: userSlice,
[appApi.reducerPath]: appApi.reducer,
})

const persistConfig = {
    key: 'root',
    storage,
    blackList: [appApi.reducerPath]
}

// PERSIST OUR STORE
const  persistedReducer = persistReducer(persistConfig, reducer);

// CREATING THE STORE
const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk, appApi.middleware]
});

export default store;

