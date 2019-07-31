import { combineReducers } from "redux";
import auth from "./auth";
import encrypt from "./encrypt";

export default combineReducers({ auth, encrypt });