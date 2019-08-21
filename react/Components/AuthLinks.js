import React from "react";
import { Link } from "react-router-dom";
import "../public/stylesheets/main.css";

export function LoginLinks(props) {
    return (
        <React.Fragment>
            <Link to="/login"> LOGIN </Link> 
            <Link to= "/signup"> SIGN UP </Link> 
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