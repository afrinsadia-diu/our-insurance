/* eslint-disable no-unused-vars */
/* eslint-disable react/button-has-type */
/** @format */

import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import useAuth from '../../Hooks/useAuth';
import logo from '../../images/logos/google.png';
import './Login.css';

const Login = () => {
    const { allContext } = useAuth();
    const { signInUsingGoogle, user } = allContext;
    // const [loggedInUser, setLoggedInUser] = user;

    const [alert, setAlert] = useState({
        success: false,
        error: '',
    });

    const location = useLocation();
    const history = useHistory();
    const redirectUrl = location.state?.from || '/';

    return (
        <div className="container d-flex align-items-center justify-content-center py-5 my-5">
            <div className="vn-login-register login p-md-5 p-3">
                {alert.error.length > 0 && (
                    <div className="alert alert-danger text-center">{alert.error}</div>
                )}

                <h4 className="mb-5">Login With</h4>
                <button
                    className="btn btn-outline-secondary social-login"
                    onClick={() => signInUsingGoogle(redirectUrl)}
                >
                    <img src={logo} alt="" />
                    Continue with Google
                </button>
                <h5 className="mt-3">
                    <span>Don’t have an account?</span>
                    <Link to="/login">Create an account</Link>
                </h5>
            </div>
        </div>
    );
};

export default Login;
