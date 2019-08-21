import React from "react";
import { connect } from "react-redux";
import { signupUser } from "../redux/actions";

class SignupPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: '', username: '', password: '' };
        this.submitSignup = this.submitSignup.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
    }

    handleUpdate(input){
        // update the state
        console.log(input)
        this.setState({ input })
    }

    submitSignup(){
       // Validate the form 
       event.preventDefault();
       console.log();
       this.props.signupUser()
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
                        <form id="login_form">

							<input className="auth_input" type="text" name="email" placeholder="Email"
                                onChange={ e => this.handleUpdate(e) }
                                value={ this.state.email } />
							<label className="auth_label"> Required </label>

							<input className="auth_input" type="text" name="username" placeholder="Username" 
                                onChange={ e => this.handleUpdate(e) }
                                value={ this.state.username} />
							<label className="auth_label"> Required </label>

							<input className="auth_input" type="password" name="password" placeholder="Password" 
                                onChange={ e => this.handleUpdate(e) }
                                value={ this.state.password } />
							<label className="auth_label"> Required </label>					

							<button className="auth_btn" onClick={this.submitSignup}> SIGN UP </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>       
        )
    }
}

export default connect(
    null,
    { signupUser }
)(SignupPage)