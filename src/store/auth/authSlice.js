// authSlice.js

import { createSlice } from '@reduxjs/toolkit';
import {resetPassword} from "./authActions.js";

const initialState = {
    user: null,
    accessToken: null,
    loading: false,
    error: null,
    status: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        resetError: (state) => {
            state.error = null;
        },

        loginStart(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            console.log(state, action)
            state.loading = false;
            state.error = null;
            state.user = action.payload.user;
            state.isAuthenticated = !!action.payload.user
            state.accessToken = action.payload.access_token;

            // Save the accessToken to localStorage
            localStorage.setItem('accessToken', action.payload.access_token);
        },
        loginFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        logout(state) {
            state.user = null;
            state.accessToken = null;
            state.loading = false;
            state.error = null;

            // Clear the accessToken from localStorage
            localStorage.removeItem('accessToken');
        },

        registerStart(state) {
            state.loading = true;
            state.error = null;
        },
        registerSuccess(state, action) {
            state.loading = false;
            state.error = null;
            state.user = action.payload.user;
        },
        registerFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        refreshTokenStart(state) {
            state.loading = true;
            state.error = null;
        },
        refreshTokenSuccess(state, action) {
            state.loading = false;
            state.error = null;
            state.accessToken = action.payload.accessToken;
            localStorage.setItem('accessToken', action.payload.accessToken);
        },
        refreshTokenFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },

        forgetPasswordStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        forgetPasswordSuccess: (state,action) => {
            state.loading = false;
            state.status = action.payload.status
        },
        forgetPasswordFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(resetPassword.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(resetPassword.fulfilled, (state,action) => {
                console.log("HERE", action)
                state.loading = false;
                state.status = 'success'
            })
            .addCase(resetPassword.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { resetError, loginStart, loginSuccess, loginFailure, logout,
                registerStart, registerSuccess, registerFailure,
                refreshTokenStart, refreshTokenSuccess, refreshTokenFailure,
                forgetPasswordStart, forgetPasswordSuccess,forgetPasswordFailure
} = authSlice.actions;

export default authSlice.reducer;
