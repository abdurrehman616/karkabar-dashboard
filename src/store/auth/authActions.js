// authActions.js
import {
    forgetPasswordFailure,
    forgetPasswordStart,
    forgetPasswordSuccess,
    loginFailure,
    loginStart,
    loginSuccess,
    logout,
    registerFailure,
    registerStart,
    registerSuccess
} from './authSlice';
import {API} from "../../layout/api.js";
import {
    USER_FORGET_PASSWORD_QUERY,
    USER_LOGIN_QUERY,
    USER_REGISTER_QUERY,
    USER_RESET_PASSWORD_QUERY
} from "../../components/Auth/queries.js";
import {createAsyncThunk} from '@reduxjs/toolkit';

// Login action
export const loginAction = (email, password) => async (dispatch) => {
    try {
        dispatch(loginStart());

        // Perform the login API request here using axios or fetch
        await API.post('', {
            query: USER_LOGIN_QUERY(),
            variables: {
                input: {
                    email,
                    password
                }
            }
        }).then(({data})=>{
            const loginData= data
            console.log("Data ", loginData)
            // Save the user and access token to Redux state
            if(loginData.data)
                dispatch(loginSuccess(loginData.data?.loginUser));
            else
                // console.log(registerData.errors.map((error)=>error.message))
                dispatch(loginFailure(loginData.errors.map((error)=>error.message)))
        }).catch(
            (error) => console.log(error)
        )


    } catch (error) {
        // Handle login failure and dispatch the error message
        dispatch(loginFailure(error.message));
    }
};

// Logout action
export const logoutAction = () => async (dispatch) => {
    try {
        // Perform the logout API request here using axios or fetch
        // await axios.post('/api/logout');

        // Clear the user and access token from Redux state
        dispatch(logout());
    } catch (error) {
        // Handle logout failure
        console.log(error);
    }
};

export const registerAction = (value) => async (dispatch) => {
    try {
        dispatch(registerStart());

        // Perform the registration API request here using axios or fetch
        await API.post('', {
            query: USER_REGISTER_QUERY(),
            variables: {
                input: {
                    name: value.name,
                    email: value.email,
                    username: value.username,
                    password: value.password,
                    confirmPassword: value.confirmPassword,
                    photo: value.photo || null
                }
            }
        }).then(({data})=>{
            const registerData= data
            // Save the user and access token to Redux state
            if(registerData.data)
                dispatch(registerSuccess(registerData.data?.registerUser));
            else
                // console.log(registerData.errors.map((error)=>error.message))
                dispatch(registerFailure(registerData.errors.map((error)=>error.message)))

        }).catch(
            (error) => console.log(error)
        )

        // Save the user and access token to Redux state
        // dispatch(registerSuccess(response.data));
    } catch (error) {
        // Handle registration failure and dispatch the error message
        dispatch(registerFailure(error.response.data.message));
    }
};

export const forgetPasswordAction = (email) => async (dispatch) => {
    try {
        dispatch(forgetPasswordStart());

        // Call the API to initiate the forget password process
        await API.post('', {
            query: USER_FORGET_PASSWORD_QUERY(),
            variables: {
                email: email
            }
        }).then(({data})=>{
            const forgetPassData= data
            // Save the user and access token to Redux state
            if(forgetPassData.data)
                dispatch(forgetPasswordSuccess(forgetPassData.data?.forgetPassword));
            else
                // console.log(registerData.errors.map((error)=>error.message))
                dispatch(forgetPasswordFailure(forgetPassData.errors.map((error)=>error.message)))

        }).catch(
            (error) => console.log(error)
        );

    } catch (error) {
        dispatch(forgetPasswordFailure(error.message));
    }
};

// Async action for resetting password
export const resetPassword = createAsyncThunk(
    'auth/resetPassword',
    async ({ resetToken, newPassword, confirmPassword }, thunkAPI) => {
        try {
            // Call the reset password API
            await API.post('', {
                query: USER_RESET_PASSWORD_QUERY(),
                variables: {
                    input: {
                        newPassword: newPassword,
                        confirmPassword: confirmPassword,
                        resetToken: resetToken
                    }
                }
            }).then(({data})=>{
                const resetPassData= data
                // Save the user and access token to Redux state
                if(resetPassData.data)
                    return resetPassData.data?.forgetPassword
                else
                    return resetPassData.errors.map((error) => error.message)

            }).catch(
                (error) => console.log(error)
            );

        } catch (error) {
            // Handle the error response
            throw error;
        }
    }
);

// Refresh token action
// export const refreshToken = () => async (dispatch) => {
//     try {
//         dispatch(refreshTokenStart());
//
//         // Perform the refresh token API request here using axios or fetch
//         const response = await axios.post('/api/refresh-token');
//
//         // Update the access token in Redux state and localStorage
//         dispatch(refreshTokenSuccess(response.data));
//     } catch (error) {
//         // Handle refresh token failure and dispatch the error message
//         dispatch(refreshTokenFailure(error.response.data.message));
//     }
// };
