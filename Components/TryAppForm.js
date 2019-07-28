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
                    <button className="try_app_btn" onClick={this.submitCrypt}>
                        Submit
                    </button>
                </form>
            </div>
        ); 
    }
}

export default TryAppForm;