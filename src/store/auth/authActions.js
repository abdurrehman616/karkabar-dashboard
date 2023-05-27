// authActions.js
import {
    loginStart,
    loginSuccess,
    loginFailure,
    logout,
    registerStart,
    registerSuccess,
    registerFailure
} from './authSlice';
import {API} from "../../layout/api.js";
import {USER_LOGIN_QUERY, USER_REGISTER_QUERY} from "../../components/Auth/queries.js";

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
            // Save the user and access token to Redux state
            dispatch(loginSuccess(data.data?.loginUser));
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
            // Save the user and access token to Redux state
            dispatch(registerSuccess(data.data?.registerUser));
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
