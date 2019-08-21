import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import auth from "./auth";
import encrypt from "./encrypt";

export default combineReducers({ auth, encrypt, form: formReducer });