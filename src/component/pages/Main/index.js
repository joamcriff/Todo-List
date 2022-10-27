import React from 'react';
import {Link} from 'react-router-dom'

export default function Main() {
    return (
    <>
        <h1 className='title'>MonstarLab</h1>
        <div className='main general'>
            <Link to='/register' className='Login'>Register</Link>
            <Link to='/signup' className='Signup'>Signup</Link>
        </div>
    </>
    )
}