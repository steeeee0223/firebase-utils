import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { authReducer } from "./auth";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { projectReducer } from "./project";

const rootPersistConfig = {
    key: "root",
    storage,
    /**
     * @param whitelist
     * @description The key names of reducers to be persisted
     */
    whitelist: ["auth"],
};
export const reducers = {
    auth: authReducer,
    project: projectReducer,
};
export const rootReducer = combineReducers(reducers);

const store = configureStore({
    reducer: persistReducer(rootPersistConfig, rootReducer),
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export const persistor = persistStore(store);
export default store;

export type AppStore = ReturnType<typeof configureStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
