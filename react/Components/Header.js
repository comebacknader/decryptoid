import React from 'react'
import {LoginLinks, LogoutLinks} from './AuthLinks'
import '../public/stylesheets/main.css'

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render () {
        const { isLoggedIn } = this.props;
        return ( 
            <header className="header">
                { !isLoggedIn ?
                    <LoginLinks />
                :
                    <LogoutLinks />
                }
            </header>
        );
    }
}

export default Header