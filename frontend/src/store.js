import { configureStore } from '@reduxjs/toolkit'
import { newProductReducer, newReviewReducer, productDetailsReducer, productsReducer , productReducer } from "./reducers/productReducer"
import userReducer, { allUsersReducer, forgotPasswordReducer, profileReducer, userDetailsReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer, orderReducer } from './reducers/orderReducer';


// const reducer = combineReducers({
//     products: productReducer
// })

// let initialState = {
//     c:20,
// };

// const middleware = [thunk];

const initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems") 
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [], 
        shippingInfo: localStorage.getItem("shippingInfo") 
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
    },
};

const store = configureStore( {
    reducer:{
        products: productsReducer,
        productDetails: productDetailsReducer,
        user: userReducer,
        profile: profileReducer,
        forgotPassword: forgotPasswordReducer,
        cart: cartReducer,
        newOrder: newOrderReducer,
        myOrders: myOrdersReducer,
        orderDetails: orderDetailsReducer,
        newReview: newReviewReducer,
        newProduct: newProductReducer,
        product: productReducer,
        allOrders: allOrdersReducer,
        order: orderReducer,
        allUsers: allUsersReducer,
        userDetails: userDetailsReducer,
    },
    preloadedState: initialState,
}
);

export default store;


