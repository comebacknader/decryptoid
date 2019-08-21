import React from "react";
import TryAppForm from "./TryAppForm"; 
import { TitleScreen } from "./TitleScreen";

import "../public/stylesheets/main.css";

class SplashPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = { try: false };
		this.toggleTryApp = this.toggleTryApp.bind(this);
	}	

	toggleTryApp() {
		this.setState({ try: !this.state.try });
	}
	
	render() {

		return (
			<section className="home_body">
				{ this.state.try === false ?
				<TitleScreen toggleTry={this.toggleTryApp}/>
				: <TryAppForm /> }
			</section>
		);
	}
} 

export default SplashPage;