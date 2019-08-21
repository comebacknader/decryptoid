import React from 'react';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.submitLogin = this.submitLogin.bind(this);
    }

    submitLogin(event){
       // Validate the form 
       event.preventDefault();
       console.log(event);
    }

    render() {
        return ( 
            <div className="login_body">
                <div className="login_center_box">
                    <a href="/" id="login_title"> DECRYPTOID </a>
                    <div id="login_box">
                        <div id="login_form_tabs">
                            <p className="auth_tab_selected"> LOGIN </p> 
                            <p className="auth_tab"> SIGN UP </p>
                        </div>
                        <div>
                            <form id="login_form" onSubmit={this.submitLogin}>
                                <input className="auth_input" type="text" name="credential" placeholder="Username/Email" /> 
                                <label className="auth_label"> Required </label>
                                <input className="auth_input" type="password" name="password" placeholder="Password" />
                                <label className="auth_label"> Required </label>					
                                <button className="auth_btn"> LOGIN </button>
                            </form>
                        </div>						
                    </div>
                </div>
            </div>
        );
    }
}

export default LoginPage;