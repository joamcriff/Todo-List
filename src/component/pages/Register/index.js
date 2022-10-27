import React from 'react';
import { useState } from "react";
import { Link } from 'react-router-dom';
import FormInput from './FormInput/FormInput';
import axios from 'axios';

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [values, setValues] = useState({
    username: "",
    email: "",
    birthday: "",
    password: "",
    confirmPassword: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email address!",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
      label: "Password",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords don't match!",
      label: "Confirm Password",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
       await axios.post('https://www.task-manager.api.mvn-training.com/auth/register',
          { username: values.username, password: values.password },
          {
              headers: { 'Content-Type': 'application/json'},
              withCredentials: false
          }
      );
          setSuccess(true);
  } catch (err) {
      console.log(err);
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                    <Link to='/'>Main</Link>
                    </p>
                </section>
            ) :
    <div className="app">
      <form onSubmit={handleSubmit} className="form1">
        <h1>Register</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button className='btn-sub'>Submit</button>
        <p>
          Already registered?<br />
          <span className="line">
          <Link to='/signup' className='Signup1'>Signup</Link>
          </span>
        </p>
      </form>
    </div>}
    </>
  );
};

export default Register;