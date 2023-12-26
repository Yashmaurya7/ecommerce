import { 
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_FAIL , 
    CREATE_ORDER_SUCCESS,
    MY_ORDER_REQUEST,
    MY_ORDER_FAIL , 
    MY_ORDER_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_FAIL,
    ALL_ORDERS_SUCCESS,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_RSEST,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_FAIL,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_RSEST,
    CLEAR_ERRORS,
} from "../constants/orderConstants";

import { createReducer } from "@reduxjs/toolkit"

const initialState = {};

export const newOrderReducer = createReducer(initialState , (builder) => {
    builder 
    .addCase(CREATE_ORDER_REQUEST , (state,action) => {
        state.loading = true;
    })
    .addCase(CREATE_ORDER_SUCCESS , (state,action) => {
        state.loading = false;
        state.order = action.payload;
    })
    .addCase(CREATE_ORDER_FAIL , (state,action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(CLEAR_ERRORS , (state,action) => {
        state.error = null;
    })
});

export const myOrdersReducer = createReducer({orders: []} , (builder) => {
    builder 
    .addCase(MY_ORDER_REQUEST , (state,action) => {
        state.loading = true;
    })
    .addCase(MY_ORDER_SUCCESS , (state,action) => {
        state.loading = false;
        state.orders = action.payload;
    })
    .addCase(MY_ORDER_FAIL , (state,action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(CLEAR_ERRORS , (state,action) => {
        state.error = null;
    })
});

export const allOrdersReducer = createReducer({orders: []} , (builder) => {
    builder 
    .addCase(ALL_ORDERS_REQUEST , (state,action) => {
        state.loading = true;
    })
    .addCase(ALL_ORDERS_SUCCESS , (state,action) => {
        state.loading = false;
        state.orders = action.payload;
    })
    .addCase(ALL_ORDERS_FAIL , (state,action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(CLEAR_ERRORS , (state,action) => {
        state.error = null;
    })
});

export const orderReducer = createReducer({orders: []} , (builder) => {
    builder 
    .addCase(UPDATE_ORDER_REQUEST , (state,action) => {
        state.loading = true;
    })
    .addCase(DELETE_ORDER_REQUEST , (state,action) => {
        state.loading = true;
    })


    .addCase(UPDATE_ORDER_SUCCESS , (state,action) => {
        state.loading = false;
        state.isUpdated = action.payload;
    })
    .addCase(DELETE_ORDER_SUCCESS , (state,action) => {
        state.loading = false;
        state.isDeleted = action.payload;
    })


    .addCase(UPDATE_ORDER_FAIL , (state,action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(DELETE_ORDER_FAIL , (state,action) => {
        state.loading = false;
        state.error = action.payload;
    })


    .addCase(UPDATE_ORDER_RSEST , (state,action) => {
        state.isUpdated = false;
    })
    .addCase(DELETE_ORDER_RSEST , (state,action) => {
        state.isDeleted = false;
    })


    .addCase(CLEAR_ERRORS , (state,action) => {
        state.error = null;
    })
});



export const orderDetailsReducer = createReducer({order: {}} , (builder) => {
    builder 
    .addCase(ORDER_DETAILS_REQUEST , (state,action) => {
        state.loading = true;
    })
    .addCase(ORDER_DETAILS_SUCCESS, (state,action) => {
        state.loading = false;
        state.order = action.payload;
    })
    .addCase(ORDER_DETAILS_FAIL , (state,action) => {
        state.loading = false;
        state.error = action.payload;
    })
    .addCase(CLEAR_ERRORS , (state,action) => {
        state.error = null;
    })
})