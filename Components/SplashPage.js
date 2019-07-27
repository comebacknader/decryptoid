import React from "react";
import TryAppForm from "./TryAppForm"; 
import BalanceText from "react-balance-text";

import "../public/stylesheets/main.css";

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
					<BalanceText className="home_tagline">
						 a cryptography suite for encrypting and decrypting files
					</BalanceText>
					<button id="home_btn"> Try It Now </button>
				</div>
				: <TryAppForm /> }
			</section>
		);
	}
} 

export default SplashPage;