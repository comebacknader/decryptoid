import React from "react";
import "../public/stylesheets/main.css";
import TryAppForm from "./TryAppForm"; 

class SplashPage extends React.Component {

	constructor(props) {
		super(props);
		this.state = { try: false };
	}	
	
	render() {

		return (
			<section className="home_body">
				{ this.state.try === false ?
				<div className="home_center_box">
					<h1 id="home_title"> DECRYPTOID </h1>
					<h2 id="home_tagline2"> a cryptography suite for encrypting and decrypting files</h2>
					<button id="home_btn"> Try It Now </button>
				</div>
				: <TryAppForm /> }
			</section>
		);
	}
} 

export default SplashPage;