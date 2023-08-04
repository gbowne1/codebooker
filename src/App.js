import * as React from 'react';
import Home from './pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Register from './components/Register/Register';
import UserAuthenticated from './ProtectedRoute';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route element={<UserAuthenticated />}>
                    <Route path='/' element={<Home />} />
                    <Route path='/profile/:uid' element={<Profile />} />
                </Route>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
            </Routes>
        </Router>
    );
}
