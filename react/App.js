import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Root from "./Root";
import "./public/stylesheets/main.css";

import { Header } from "./Components/Header";
import SplashPage from "./Components/SplashPage";

class App extends React.Component {
    render() {
        return (
            <Router>
                <React.Fragment>
                    <Header />
                    <Route exact path="/" component={SplashPage} />
                </React.Fragment>
            </Router>
        ); 
    }
}

ReactDOM.render(
    <Root>
        <App />
    </Root>, 
    document.getElementById('root') || document.createElement('div'));

export default App;