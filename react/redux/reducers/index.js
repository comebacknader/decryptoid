import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import encrypt from "./encrypt";

export default combineReducers({encrypt, form: formReducer });