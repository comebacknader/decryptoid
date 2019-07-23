import React from 'react';

class SignupPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.submitSignup = this.submitSignup.bind(this);
    }

    submitSignup(event){
       // Validate the form 
       event.preventDefault();
       console.log(event);
       // Send the values to the database
       // Create an action creator that will post to the database
    }

    render() {
        return (
        <div className="login_body">
            <div className="login_center_box">
                <a href="/" id="login_title"> DECRYPTOID </a>
                <div id="login_box">
                    <div id="login_form_tabs">
                        <p className="auth_tab"> LOGIN </p> 
                        <p className="auth_tab_selected"> SIGN UP </p>
                    </div>
                    <div>
                        <form id="login_form" onSubmit={this.submitSignup}>
							<input className="auth_input" type="text" name="email" placeholder="Email" />
							<label className="auth_label"> Required </label>
							<input className="auth_input" type="text" name="username" placeholder="Username" />
							<label className="auth_label"> Required </label>
							<input className="auth_input" type="password" name="password" placeholder="Password" />
							<label className="auth_label"> Required </label>					
							<button className="auth_btn"> SIGN UP </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>       
        )
    }
}

export default SignupPage;