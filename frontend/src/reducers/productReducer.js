import {
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  CLEAR_ERRORS,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_FAIL,
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_RESET,
  ADMIN_PRODUCT_REQUEST ,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_RESET,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_RESET,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_RESET,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_RESET,
  ALL_REVIEWS_REQUEST,
  ALL_REVIEWS_FAIL,
  ALL_REVIEWS_SUCCESS,

} from "../constants/productConstants";

import { createReducer } from "@reduxjs/toolkit";

// let initialState = {};

export const productsReducer = createReducer({products: {}}, (builder) => {
        builder
        .addCase(ALL_PRODUCT_SUCCESS , (state, action) => {
                state.loading = false;
                state.products = action.payload.products;
                state.productCount = action.payload.productCount;
                state.filteredProductsCount = action.payload.filteredProductsCount;
                state.resultPerPage = action.payload.resultPerPage;
        })
        .addCase(ADMIN_PRODUCT_SUCCESS , (state , action) => {
                state.loading = false;
                state.products = action.payload;
        })
        .addCase(ALL_PRODUCT_REQUEST , (state, action) => {

                state.loading = true;
                state.products = [];
        })
        .addCase(ALL_PRODUCT_FAIL , (state, action) => {
                state.loading = false;
                state.error = action.payload;
        })
        .addCase(ADMIN_PRODUCT_REQUEST , (state, action) => {

                state.loading = true;
                state.products = [];
        })
        .addCase(ADMIN_PRODUCT_FAIL , (state, action) => {
                state.loading = false;
                state.error = action.payload;
        })
        .addCase(CLEAR_ERRORS , (state,action) => {
                state.error = null;
        })
});

export const newProductReducer = createReducer({product: {}}, (builder) => {
        builder
        .addCase(NEW_PRODUCT_REQUEST , (state,action) => {
                state.loading = true;
        })
        .addCase(NEW_PRODUCT_SUCCESS , (state,action) => {
                state.loading = false;
                state.success = action.payload.success;
                state.product = action.payload.product;
        })
        .addCase(NEW_PRODUCT_RESET , (state,action) => {
                state.success = false;
        })
        .addCase(NEW_PRODUCT_FAIL , (state,action) => { 
                state.loading = false;
                state.error = action.payload;
        })
        .addCase(CLEAR_ERRORS , (state,action) => {
                state.error = null;
        })
});

export const productReducer = createReducer({}, (builder) => {
        builder
        .addCase(DELETE_PRODUCT_REQUEST , (state,action) => {
                state.loading = true;
        })
        .addCase(UPDATE_PRODUCT_REQUEST , (state,action) => {
                state.loading = true;
        })


        .addCase(DELETE_PRODUCT_SUCCESS , (state,action) => {
                state.loading = false;
                state.isDeleted = action.payload;
        })
        .addCase(UPDATE_PRODUCT_SUCCESS , (state,action) => {
                state.loading = false;
                state.isUpdated = action.payload;
        })


        .addCase(DELETE_PRODUCT_RESET , (state,action) => {
                state.isDeleted = false;
        })
        .addCase(UPDATE_PRODUCT_RESET , (state,action) => {
                state.isUpdated = false;
        })


        .addCase(DELETE_PRODUCT_FAIL , (state,action) => { 
                state.loading = false;
                state.error = action.payload;
        })
        .addCase(UPDATE_PRODUCT_FAIL , (state,action) => { 
                state.loading = false;
                state.error = action.payload;
        })


        .addCase(CLEAR_ERRORS , (state,action) => {
                state.error = null;
        })
});


export const productDetailsReducer = createReducer({product: {}}, (builder) => {
        builder
        .addCase(PRODUCT_DETAILS_SUCCESS , (state,action) => {
                state.loading = false;
                state.product = action.payload.product;
        })
        .addCase(PRODUCT_DETAILS_REQUEST , (state,action) => {
                state.loading = true;
        })
        .addCase(PRODUCT_DETAILS_FAIL , (state,action) => {
                state.loading = false;
                state.error = action.payload;
        })
        .addCase(CLEAR_ERRORS , (state,action) => {
                state.error = null;
        })
});


export const newReviewReducer = createReducer({}, (builder) => {
        builder
        .addCase(NEW_REVIEW_REQUEST , (state,action) => {
                state.loading = true;
        })
        .addCase(NEW_REVIEW_SUCCESS , (state,action) => {
                state.loading = false;
                state.success = action.payload;
        })
        .addCase(NEW_REVIEW_RESET , (state,action) => {
                state.success = false;
        })
        .addCase(NEW_REVIEW_FAIL , (state,action) => { 
                state.loading = false;
                state.error = action.payload;
        })
        .addCase(CLEAR_ERRORS , (state,action) => {
                state.error = null;
        })
});


export const productReviewsReducer = createReducer({product: {}}, (builder) => {
        builder
        .addCase(PRODUCT_DETAILS_SUCCESS , (state,action) => {
                state.loading = false;
                state.product = action.payload.product;
        })
        .addCase(PRODUCT_DETAILS_REQUEST , (state,action) => {
                state.loading = true;
        })
        .addCase(PRODUCT_DETAILS_FAIL , (state,action) => {
                state.loading = false;
                state.error = action.payload;
        })
        .addCase(CLEAR_ERRORS , (state,action) => {
                state.error = null;
        })
});
