import React from "react";
import BalanceText from "react-balance-text";
import "../public/stylesheets/main.css";

export function TitleScreen() {
    return (
        <div className="home_center_box">
            <h1 id="home_title"> DECRYPTOID </h1>
            <BalanceText className="home_tagline">
                    a cryptography suite for encrypting and decrypting files
            </BalanceText>
            <button id="home_btn"> Try It Now </button>
        </div>
    );
}

