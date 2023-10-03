import { useEffect } from "react";
import { shallowEqual } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/config/firebase";
import {
    setUser,
    signOutAsync,
    googleSignIn as googleSignInAsync,
    githubSignIn as githubSignInAsync,
} from "./auth.slice";
import { useAppDispatch, useAppSelector } from "@/features/stores";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const { user, isLoggedIn } = useAppSelector(
        (state) => ({
            user: state.auth.user,
            isLoggedIn: state.auth.isLoggedIn,
        }),
        shallowEqual
    );
    const googleSignIn = async () => await dispatch(googleSignInAsync());
    const githubSignIn = async () => await dispatch(githubSignInAsync());
    const signOut = async () => await dispatch(signOutAsync());
    const unsubscribe = onAuthStateChanged(
        auth,
        async (currentUser) => await dispatch(setUser(currentUser))
    );

    useEffect(() => {
        return unsubscribe;
    }, []);

    return { user, isLoggedIn, googleSignIn, githubSignIn, signOut };
};
