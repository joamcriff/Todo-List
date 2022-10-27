import React from "react";
import {useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/signup');
            localStorage.removeItem('token');
            localStorage.removeItem('username');
            localStorage.removeItem('id');
    }
    return (
    <div className="header">
        <h3 className="h3">MonstarLab</h3>
        <div className="user">
            <h1 className="username">{localStorage.getItem('username')}</h1>
        <button className='btn-out' onClick={handleClick}>Log Out</button>
        </div>
    </div>
    )
}

export default Header;