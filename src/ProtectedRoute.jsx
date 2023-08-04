import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useJwt } from 'react-jwt';
const UserAuthenticated = () => {
    const token = JSON.parse(localStorage.getItem('token'));
    const { decodedToken, isExpired } = useJwt(token);
    console.log(decodedToken);
    // const user = JSON.parse(localStorage.getItem('user'));
    let isloggedin = false;
    if (token.length !== 0) {
        isloggedin = !isExpired;
    }
    return <div>{isloggedin ? <Outlet /> : <Navigate to='/login' />}</div>;
};

export default UserAuthenticated;
