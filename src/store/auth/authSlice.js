// authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    accessToken: null,
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
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
            state.accessToken = action.payload.accessToken;
            localStorage.setItem('accessToken', action.payload.accessToken);
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
    },
});

export const { loginStart, loginSuccess, loginFailure, logout,
                registerStart, registerSuccess, registerFailure,
                refreshTokenStart, refreshTokenSuccess, refreshTokenFailure
} = authSlice.actions;

export default authSlice.reducer;
