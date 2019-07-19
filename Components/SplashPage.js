import React from 'react';
import '../public/stylesheets/main.css';

function SplashPage(props) {
    return (
		<section className="home_body">
			<div className="home_center_box">
				<h1 id="home_title"> DECRYPTOID </h1>
				{/* <h2 id="home_tagline1"> Decrypt Simple Substitution </h2> */} 
				<h3 id="home_tagline2"> a cryptography suite for encrypting and decrypting files</h3>
				<a href="/main" id="home_btn"> Get Started </a>
			</div>
        </section>
    );
} 

export default SplashPage;