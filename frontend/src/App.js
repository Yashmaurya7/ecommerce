import "./App.css";
import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import axios from "axios"

import Nav from "./components/layout/Header/Nav.jsx";
import Header from "./components/layout/Header/Header.jsx";
import SearchBar from "./components/layout/Header/SearchBar";
import Footer from "./components/layout/footer/Footer"


import Home from "./components/Pages/Home";
import Product from "./components/layout/Products/Product";
import ProductDetails from "./components/Pages/ProductDetails/ProductDetails.js"
import LoginSignUp from "./components/Pages/User/LoginSignUp";
import store from "./store"
import { loadUser } from "./actions/userAction";
import { useSelector } from "react-redux";
import UserOptions from "./components/layout/Header/UserOptions.jsx"
import Profile from "./components/Pages/User/Profile.jsx"
import ProtectedRoute from "./components/Route/ProtectedRoute";
import UpdateProfile from "./components/Pages/User/UpdateProfile.jsx"
import UpdatePassword from "./components/Pages/User/UpdatePassword.jsx"
import ForgotPassword from "./components/Pages/User/ForgotPassword.jsx"
import ResetPassword from "./components/Pages/User/ResetPassword.jsx"
import Cart from "./components/Pages/Cart/Cart.jsx"
import Shipping from "./components/Pages/Cart/Shipping.jsx"
import ConfirmOrder from "./components/Pages/Cart/ConfirmOrder.jsx"
import NewProcessPayment from "./components/Pages/Cart/NewProcessPayment";
import OrderSuccess from "./components/Pages/OrderSuccess.jsx"
import MyOrders from "./components/Pages/MyOrder.jsx"
import OrderDetails from "./components/Pages/OrderDetails.jsx"
import AdminDashboard from "./components/Pages/admin/AdminDashboard.jsx"
import ProductList from "./components/Pages/admin/ProductList.jsx"
import NewProduct from "./components/Pages/admin/NewProduct";
import UpdateProduct from "./components/Pages/admin/UpdateProduct.jsx";
import OrderList from "./components/Pages/admin/OrderList.jsx"
import ProcessOrder from "./components/Pages/admin/ProcessOrder.jsx"
import UserList from "./components/Pages/admin/UserList.jsx";
import UpdateUser from "./components/Pages/admin/UpdateUser.jsx";
import ProductReviews from "./components/Pages/admin/ProductReviews";


function App() {

  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  const { isAuthenticated, user } = useSelector((state) => state.user);

  return (
    <Router>
      <Header />
      <SearchBar />
      <Nav />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/products" element={<Product/>} />
        <Route path="/products/:keyword" element={<Product/>} />
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/login" element={<LoginSignUp/>} />


        <Route path='/account' element={<ProtectedRoute><Profile/></ProtectedRoute>} />
        <Route path='/me/update' element={<ProtectedRoute><UpdateProfile/></ProtectedRoute>} />
        <Route path='/password/update' element={<ProtectedRoute><UpdatePassword/></ProtectedRoute>} />


        <Route path='/password/forgot' element={<ForgotPassword/>} />
        <Route path='/password/reset/:token' element={<ResetPassword/>} />

        <Route path='/cart' element={<Cart/>} />

        <Route path='/shipping' element={<ProtectedRoute><Shipping/></ProtectedRoute>} />
        <Route path='/process/payment' element={<ProtectedRoute> <NewProcessPayment/> </ProtectedRoute>} />
        <Route path='/success' element={<ProtectedRoute><OrderSuccess/></ProtectedRoute>} />
        <Route path='/orders' element={<ProtectedRoute><MyOrders/></ProtectedRoute>} />

        {/* <Routes> */}
          <Route path='/order/:id' element={<ProtectedRoute><OrderDetails/></ProtectedRoute>} />
          <Route path='/order/confirm' element={<ProtectedRoute><ConfirmOrder/></ProtectedRoute>} />
        {/* </Routes> */}

          <Route path='/admin/dashboard' element={<ProtectedRoute isAdmin = {true} > <AdminDashboard/> </ProtectedRoute>} />
          <Route path='/admin/products' element={<ProtectedRoute isAdmin = {true} > <ProductList/> </ProtectedRoute>} />
          <Route path='/admin/product' element={<ProtectedRoute isAdmin = {true} > <NewProduct/> </ProtectedRoute>} />
          <Route path='/admin/products/:productId' element={<ProtectedRoute isAdmin = {true} > <UpdateProduct/> </ProtectedRoute>} />

          <Route path='/admin/orders' element={<ProtectedRoute isAdmin = {true} > <OrderList/> </ProtectedRoute>} />
          <Route path='/admin/order/:orderId' element={<ProtectedRoute isAdmin = {true} > <ProcessOrder/> </ProtectedRoute>} />

          <Route path='/admin/users' element={<ProtectedRoute isAdmin = {true} > <UserList/> </ProtectedRoute>} />
          <Route path='/admin/user/:userId' element={<ProtectedRoute isAdmin = {true} > <UpdateUser/> </ProtectedRoute>} />

          <Route path='/admin/reviews' element={<ProtectedRoute isAdmin = {true} > <ProductReviews/> </ProtectedRoute>} />

      </Routes>


      <Footer />
    </Router>
  );
}

export default App;
