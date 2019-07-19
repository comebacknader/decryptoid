import React from 'react';
import ReactDOM from 'react-dom';
import './public/stylesheets/main.css';

import Header from './Header';
import SplashPage from './SplashPage';

class App extends React.Component {
    render() {
        return (
            <React.Fragment>
                <Header isLoggedIn={false}/>
                <SplashPage />
            </React.Fragment>
        ); 
    }
}

ReactDOM.render(<App />, document.getElementById('root'))