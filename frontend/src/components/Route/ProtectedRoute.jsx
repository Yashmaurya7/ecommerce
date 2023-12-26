import React, { Fragment } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, Navigate , Redirect } from 'react-router-dom';
import Loader from '../layout/Loader/Loader';

const ProtectedRoute = ({ isAdmin, children }) => {
    const location = useLocation();
    const { loading, isAuthenticated, user } = useSelector((state) => state.user);

    if(loading === false){
        if (isAuthenticated === false) {
            return <Navigate to='/login' from={{ from: location }} replace />
        }
    
        if (isAdmin === true && user.role !== "admin") {
            return <Navigate to='/login' from={{ from: location }} replace />
        }

        return children;
    }

    
}

export default ProtectedRoute