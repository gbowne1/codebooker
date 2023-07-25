import * as React from 'react';
import Home from './pages/Home/Home';
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/profile/:uid' element={<Profile />} />
            </Routes>
        </Router>
    );
}
