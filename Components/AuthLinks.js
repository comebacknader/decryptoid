import React from 'react';
import '../public/stylesheets/main.css';
import { Link } from 'react-router-dom';

export function LoginLinks(props) {
    return (
        <React.Fragment>
            <Link to="/login" id="login_link"> LOGIN </Link> 
            <Link to= "/signup" id="signup_link"> SIGN UP </Link> 
        </React.Fragment>
    );
}

export function LogoutLinks(props) {
    return (
        <React.Fragment>
            <Link to="/logout" id="logout_link"> LOG OUT </Link>
        </React.Fragment>
    );
}