import * as React from 'react';
import Home from './pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Register from './components/Register/Register';
import UserAuthenticated from './ProtectedRoute';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ResetPassword/ResetPassword';
<<<<<<< HEAD
import UserDetails from './pages/userDetails/UserDetails';
=======
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy';
>>>>>>> origin/master

export default function App() {
    return (
        <Router>
            <Routes>
                <Route element={<UserAuthenticated />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/privacy-policy' element={<PrivacyPolicy />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/details' element={<UserDetails />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route
                    path='/reset-password/:token'
                    element={<ResetPassword />}
                />
            </Routes>
        </Router>
    );
}
