import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './public/stylesheets/main.css';

import Header from './Components/Header';
import SplashPage from './Components/SplashPage';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';

class App extends React.Component {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <Header isLoggedIn={false}/>
                    <Route exact path="/" component={SplashPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/signup" component={SignupPage} />
                </React.Fragment>
            </Router>
        ); 
    }
}

ReactDOM.render(<App />, document.getElementById('root'))