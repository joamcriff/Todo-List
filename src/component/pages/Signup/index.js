import React, { useState, useContext } from 'react';
import AuthContext from '../../../context/AuthProvider';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup(){
    const {setAuth} = useContext(AuthContext);
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('https://www.task-manager.api.mvn-training.com/auth/login',
            { username: username, password: password },
            {
                headers: { 'Content-Type': 'application/json'},
                withCredentials: false
            });
            setAuth({username, password});
            localStorage.setItem('token', res.data.data.accessToken);
            localStorage.setItem('username', res.data.data.username);
            localStorage.setItem('id', res.data.data.id);
            navigate('/task')
        } catch (err) {
            console.log(err);
            alert("Tên đăng nhập hoặc mật khẩu không chính xác");
        }
    }
    return (
    <>
    <div className="app">
      <form onSubmit={handleSubmit} className="form2">
        <h1>Login</h1>
        <div className="form">
            <label className='font-label'>Tên đăng nhập</label>
            <input 
                type="text" 
                placeholder='Nhập tên đăng nhập' 
                autoComplete='off'
                value={username} 
                onChange={(e) => setUserName(e.target.value)}
                required
            />
        </div>
        <div className="form">
            <label className='font-label'>Mật khẩu</label>
            <input 
                type="password" 
                placeholder='Nhập mật khẩu' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required
            />
        </div>
        <button className='btn-sub'>Submit</button>
        <Link to='/register' className='Login1'>Register</Link>
      </form>
    </div>
</>
    )
}