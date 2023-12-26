import { createReducer } from "@reduxjs/toolkit";
import {
    LOGIN_REQUEST,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAIL,
    CLEAR_ERRORS,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    UPDATE_PROFILE_FAIL,
    UPDATE_PROFILE_REQUEST,
    UPDATE_PROFILE_RESET,
    UPDATE_PROFILE_SUCCESS,
    UPDATE_PASSWORD_REQUEST, 
    UPDATE_PASSWORD_FAIL,
    UPDATE_PASSWORD_SUCCESS,
    UPDATE_PASSWORD_RESET,
    FORGOT_PASSWORD_REQUEST,
    FORGOT_PASSWORD_FAIL,
    FORGOT_PASSWORD_SUCCESS,
    RESET_PASSWORD_REQUEST,
    RESET_PASSWORD_FAIL,
    RESET_PASSWORD_SUCCESS,
    ALL_USERS_REQUEST,
    ALL_USERS_FAIL,
    ALL_USERS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    UPDATE_USER_FAIL,
    UPDATE_USER_REQUEST,
    UPDATE_USER_RESET,
    UPDATE_USER_SUCCESS,
    DELETE_USER_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_RESET,
    DELETE_USER_SUCCESS,

} from "../constants/userConstants"

const initialState = {};

const userReducer = createReducer(initialState, (builder) => {
    builder
        // Requests
        .addCase(LOGIN_REQUEST, (state, action) => {
            state.loading = true;
            state.isAuthenticated = false;
        })
        .addCase(REGISTER_USER_REQUEST, (state, action) => {
            state.loading = true;
            state.isAuthenticated = false;
        })
        .addCase(LOAD_USER_REQUEST , (state, action) => {
            state.loading = true;
            state.isAuthenticated = false;
        })

        // Success
        .addCase(LOGIN_SUCCESS, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        })
        .addCase(LOGOUT_SUCCESS, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
        })
        .addCase(REGISTER_USER_SUCCESS, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        })
        .addCase(LOAD_USER_SUCCESS, (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        })

        // FAILS
        .addCase(LOGIN_FAIL, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        })
        .addCase(LOGOUT_FAIL, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(REGISTER_USER_FAIL, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        })
        .addCase(LOAD_USER_FAIL, (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.user = null;
            state.error = action.payload;
        })

        // Clear Errors
        .addCase(CLEAR_ERRORS, (state, action) => {
            state.error = null;
        })

})

export const profileReducer = createReducer({}, (builder) => {
    builder

        // Requests 
        // .addCase([UPDATE_PROFILE_REQUEST , UPDATE_PASSWORD_REQUEST , UPDATE_USER_REQUEST , DELETE_USER_REQUEST], (state, action) => {
        //     state.loading = true;
        // })
        .addCase(UPDATE_PROFILE_REQUEST, (state, action) => {
            state.loading = true;
        })
        .addCase(UPDATE_PASSWORD_REQUEST, (state, action) => {
            state.loading = true;
        })
        .addCase(UPDATE_USER_REQUEST, (state, action) => {
            state.loading = true;
        })
        .addCase(DELETE_USER_REQUEST, (state, action) => {
            state.loading = true;
        })


        // Success 
        // .addCase([UPDATE_PROFILE_SUCCESS , UPDATE_PASSWORD_SUCCESS , UPDATE_USER_SUCCESS], (state, action) => {
        //     state.loading = false;
        //     state.isUpdated = action.payload;
        // })
        .addCase(DELETE_USER_SUCCESS, (state, action) => {
            state.loading = false;
            state.isDeleted = action.payload.success;
            state.message = action.payload.message;
        })
        .addCase(UPDATE_PASSWORD_SUCCESS, (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
        })
        .addCase(UPDATE_PROFILE_SUCCESS, (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload.success;
        })
        .addCase(UPDATE_USER_SUCCESS, (state, action) => {
            state.loading = false;
            state.isUpdated = action.payload;
            state.message = action.payload.message;
        })


        // Reset
        // .addCase([UPDATE_PROFILE_RESET , UPDATE_PASSWORD_RESET , UPDATE_USER_RESET], (state, action) => {
        //     state.isUpdated = false;
        // })
        .addCase(DELETE_USER_RESET, (state, action) => {
            state.isDeleted = false;
        })
        .addCase(UPDATE_PASSWORD_RESET, (state, action) => {
            state.isUpdated = false;
        })
        .addCase(UPDATE_PROFILE_RESET, (state, action) => {
            state.isUpdated = false;
        })
        .addCase(UPDATE_USER_RESET, (state, action) => {
            state.isUpdated = false;
        })


        // Fail
        // .addCase([UPDATE_PROFILE_FAIL , UPDATE_PASSWORD_FAIL , UPDATE_USER_FAIL , DELETE_USER_FAIL], (state, action) => {
        //     state.loading = false;
        //     state.error = action.payload;
        // })
        .addCase(UPDATE_PASSWORD_FAIL, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(DELETE_USER_FAIL, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(UPDATE_PROFILE_FAIL, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(UPDATE_USER_FAIL, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })

        // Clear Errors
        .addCase(CLEAR_ERRORS, (state, action) => {
            state.error = null;
        })
})

export const forgotPasswordReducer = createReducer({}, (builder) => {
    builder

        // Requests 
        .addCase(FORGOT_PASSWORD_REQUEST, (state, action) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(RESET_PASSWORD_REQUEST, (state, action) => {
            state.loading = true;
            state.error = null;
        })

        // Success 
        .addCase(FORGOT_PASSWORD_SUCCESS, (state, action) => {
            state.loading = false;
            state.message = action.payload;
        })
        .addCase(RESET_PASSWORD_SUCCESS, (state, action) => {
            state.loading = false;
            state.success = action.payload;
        })

        // Fail
        .addCase(FORGOT_PASSWORD_FAIL, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(RESET_PASSWORD_FAIL, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        })


        // Clear Errors
        .addCase(CLEAR_ERRORS, (state, action) => {
            state.error = null;
        })
})

export const allUsersReducer = createReducer({users:[]} , (builder) => {
    builder
    .addCase(ALL_USERS_REQUEST , (state , action) => {
        state.loading = true;
    })
    .addCase(ALL_USERS_SUCCESS , (state , action) => {
        state.loading = false;
        state.users = action.payload;
    })
    .addCase(ALL_USERS_FAIL , (state , action) => {
        state.loading = false;
        state.error = action.payload;

    })
    .addCase(CLEAR_ERRORS , (state,action) => {
        state.error = null;
    })
})

export const userDetailsReducer = createReducer({user:{}} , (builder) => {
    builder
    .addCase(USER_DETAILS_REQUEST , (state , action) => {
        state.loading = true;
    })
    .addCase(USER_DETAILS_SUCCESS , (state , action) => {
        state.loading = false;
        state.user = action.payload;
    })
    .addCase(USER_DETAILS_FAIL , (state , action) => {
        state.loading = false;
        state.error = action.payload;

    })
    .addCase(CLEAR_ERRORS , (state,action) => {
        state.error = null;
    })
})

export default userReducer;
