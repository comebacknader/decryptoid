import React from "react";
import "../public/stylesheets/main.css";

class TryAppForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text:'', cipher:'simple-substitution' };
        this.textChange = this.textChange.bind(this);
        this.cipherChange = this.cipherChange.bind(this);
        this.submitCrypt = this.submitCrypt.bind(this);
    }

    cipherChange(event) {
        this.setState({ cipher: event.target.value });
    }

    textChange(event) {
        this.setState({ text: event.target.value });
    }

    submitCrypt(event) {
        event.preventDefault();
        console.log("Submitted.");
    }

    render() {

        return (
            <div className="try_app_box">
                <form className="try_app_form">
                    <div id="try_input_box">
                        <label htmlFor="try_input" className="visuallyhidden">
                            Enter Text:
                        </label>
                        <input id="try_input" type="text" name="text_to_transform" placeholder="Enter Text"
                            value={this.state.text} onChange={this.textChange} autoFocus />
                    </div>
                    <div id="try_menu_options">
                        <select value={this.state.cipher} onChange={this.cipherChange}>    
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