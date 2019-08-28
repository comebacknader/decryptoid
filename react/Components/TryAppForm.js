import React from "react";
import { connect } from "react-redux";
import { Field, reduxForm } from "redux-form";

import { encryptText } from "../redux/actions/index";

import "../public/stylesheets/main.css";

class TryAppForm extends React.Component {
    constructor(props) {
        super(props);
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
                 : <input {...input} id={id} placeholder={label} type={type} autoFocus/> }
            </React.Fragment>
        );
    }

    renderCipherSelect({ input, id, meta: {touched, error}}) {
        return (
            <React.Fragment>
                { (touched && error) ?
                    <React.Fragment>
                    <select {...input} id={id} className="input-error">
                        <option value="">Select a cipher...</option>   
                        <option value="simple-substitution">Simple Substitution</option>
                        <option value="double-transposition">Double Transposition</option>
                        <option value="RC4">RC4</option>
                    </select>
                    <span id="try_input_errors">{error}</span>
                    </React.Fragment>
                : 
                    <select {...input} id={id}>
                        <option value="">Select a cipher...</option>   
                        <option value="simple-substitution">Simple Substitution</option>
                        <option value="double-transposition">Double Transposition</option>
                        <option value="RC4">RC4</option>
                    </select>               
                }
            </React.Fragment>
        );
    }

    async submitCrypt(formValues) {
       /// console.log(formValues)
        this.props.encryptText(formValues);
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
                        <Field name="select_cipher" component={this.renderCipherSelect} id="try_select_cipher" /> 
                    </div>
                    <button className="try_app_btn">
                            Transform
                    </button>
                </form>
                { (this.props.encryption !== "") && 
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
    if(!formValues.select_cipher) {
        errors.select_cipher = "You must select a cipher";
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