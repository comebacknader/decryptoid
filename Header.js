import React from 'react'
import {LoginLinks, LogoutLinks} from './AuthLinks'
import './public/stylesheets/main.css'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {
        const { isLoggedIn } = this.props;
        let authLinks;
        if (!isLoggedIn) {
            authLinks = <LoginLinks />;
        } else {
            authLinks = <LogoutLinks />;
        }
        return ( 
            <div className="header">
                {authLinks}
            </div>
        );
    }
}

export default Header