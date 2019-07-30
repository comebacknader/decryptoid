import React from "react";
import "../public/stylesheets/main.css";

class TryAppForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
        this.submitCrypt = this.submitCrypt.bind(this);
    }

    submitCrypt(event) {
        event.preventDefault();
        console.log("Submitted.")
    }

    render() {

        return (
            <div className="try_app_box">
                <form className="try_app_form">
                    <div>
                        <label htmlFor="try_input" className="visuallyhidden">
                            Enter Text:
                        </label>
                        <input id="try_input" type="text" name="text_to_transform" placeholder="Enter Text" />
                    </div>
                    <div id="try_menu_options">
                        <select>    
                            <option value="simple-substitution">Simple Substitution</option>
                            <option value="double-transposition">Double Transposition</option>
                            <option value="RC4">RC4</option>
                        </select>
                        <button className="try_app_btn" onClick={this.submitCrypt}>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        ); 
    }
}

export default TryAppForm;