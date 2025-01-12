import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import postReducer from "./slices/postSlice";
import {persistReducer, persistStore} from "redux-persist"; 
import storage from "redux-persist/lib/storage"

const rootReducer = combineReducers({
    user: userReducer,
    post: postReducer
});

const persistConfig = {
    key: "root",
    storage,
    version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
   reducer: persistedReducer,
   middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({serializableCheck: false}),
})

export const persistor = persistStore(store);