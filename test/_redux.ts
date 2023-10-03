import { reducers } from "@/features/stores";
import { initialState as authState } from "@/features/auth";
import { initialState as projectState } from "@/features/project";

export const $preloadedState = {
    auth: authState,
    project: projectState,
};

export const $reducers = reducers;
