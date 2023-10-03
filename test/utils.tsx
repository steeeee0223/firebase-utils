import React, { PropsWithChildren } from "react";
import { render, renderHook } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import { persistor, AppStore, RootState } from "@/features/stores";
import { $preloadedState, $reducers } from "./_redux.ts";
import { PersistGate } from "redux-persist/integration/react";

// As a basic setup, import your same slice reducers

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
    preloadedState?: PreloadedState<RootState>;
    store?: AppStore;
}

export const $store: AppStore = configureStore({
    reducer: $reducers,
    preloadedState: $preloadedState,
});

export function renderWithProviders(
    ui: React.ReactElement,
    {
        preloadedState = $preloadedState,
        // Automatically create a store instance if no store was passed in
        store = configureStore({
            reducer: $reducers,
            preloadedState,
        }),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {children}
                </PersistGate>
            </Provider>
        );
    }

    // Return an object with the store and all of RTL's query functions
    return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
export function renderHookWithProviders<HookProps, HookResults>(
    hook: (initialProps: HookProps) => HookResults,
    initialProps?: HookProps,
    {
        preloadedState = $preloadedState,
        // Automatically create a store instance if no store was passed in
        store = configureStore({
            reducer: $reducers,
            preloadedState,
        }),
        ...renderOptions
    }: ExtendedRenderOptions = {}
) {
    function Wrapper({ children }: PropsWithChildren<unknown>): JSX.Element {
        return (
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    {children}
                </PersistGate>
            </Provider>
        );
    }

    // Return an object with the store and all of RTL's query functions
    return {
        store,
        ...renderHook(hook, {
            initialProps,
            wrapper: Wrapper,
            ...renderOptions,
        }),
    };
}