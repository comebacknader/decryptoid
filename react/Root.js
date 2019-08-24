import React from 'react';
import { Provider } from 'react-redux';
import rootReducer from "./redux/reducers/index";
import { createStore } from "redux";

export default ({ children, initialState={} }) => {
    return (
     <Provider store={createStore(
    rootReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
         {children}
     </Provider>  
    );
};