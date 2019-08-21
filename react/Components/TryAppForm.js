import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import { encryptText } from "../redux/actions";

import axios from "axios";
import "../public/stylesheets/main.css";

class TryAppForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = { text:'', cipher:'simple-substitution', result: false };
        this.submitCrypt = this.submitCrypt.bind(this);
    }

    renderInput({ input, label, type, id, meta: {touched, error} }) {
        return (
             <React.Fragment>
                <label htmlFor={id} className="visuallyhidden"> {label} </label>
                { (touched && error) ?  
                <React.Fragment>
                    <input {...input} id={id} className="input-error" placeholder={label} type={type} />
                    <span id="try_input_errors">{error}</span>
                </React.Fragment>
                 : <input {...input} id={id} placeholder={label} type={type} /> }
            </React.Fragment>
        );
    }

    async submitCrypt(formValues) {
        this.setState({ result: true })
        const response = await axios.post(
            'http://localhost:3000/api/upload', {
                cipher: formValues.select_cipher,
                text: formValues.text_to_transform
            })
        this.props.encryptText(response.data.msg);
    }


    componentDidUpdate() {
    }

    render() {
        const { handleSubmit } = this.props
        return (
            <div className="try_app_box">
                <form onSubmit={handleSubmit(this.submitCrypt)} className="try_app_form">
                    <div id="try_input_box">
                        <Field name="text_to_transform" id="try_input" component={this.renderInput} type="text" 
                            placeholder="Enter Text" label="Enter Text" />
                    </div>
                    <div id="try_menu_options">
                        <Field name="select_cipher" component="select" id="try_select_cipher">    
                            <option value="simple-substitution">Simple Substitution</option>
                            <option value="double-transposition">Double Transposition</option>
                            <option value="RC4">RC4</option>
                        </Field>
                    </div>
                    <button className="try_app_btn">
                            Transform
                    </button>
                </form>
                { (this.state.result) && 
                    <div className="try_result_box">
                        { this.props.encryption }
                    </div>
                }
            </div>
        ); 
    }
}


const validate = (formValues) => {
    const errors = {};
    if(!formValues.text_to_transform) {
        errors.text_to_transform = "You must enter some text";
    }
    if(formValues.text_to_transform && formValues.text_to_transform.length > 30){
        errors.text_to_transform = "The input must be shorter than 30 characters";
    }
    return errors;
};

function mapStateToProps(state) {
    const { encryption } = state.encrypt
    return { encryption }
}


TryAppForm = connect(
    mapStateToProps,
    { encryptText }
)(TryAppForm);

export default reduxForm({
    form: 'try-app-form',
    validate 
})(TryAppForm);