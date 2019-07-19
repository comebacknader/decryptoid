import React from 'react';
import './public/stylesheets/main.css';

export function LoginLinks(props) {
    return (
        <React.Fragment>
            <a href="/login" id="login_link"> LOGIN </a> 
            <a href= "/signup" id="signup_link"> SIGN UP </a> 
        </React.Fragment>
    );
}

export function LogoutLinks(props) {
    return (
        <React.Fragment>
            <a href="/logout" id="logout_link"> LOG OUT </a>
        </React.Fragment>
    );
}