import React from 'react';
import { Provider } from 'react-redux';
import rootReducer from "./redux/reducers/index";
import { createStore, applyMiddleware } from "redux";
import reduxPromise from "redux-promise";

export default ({ children, initialState={} }) => {
    const store = createStore(
        rootReducer,
        initialState,
        //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(reduxPromise)
        )

    return (
     <Provider store={store}>
         {children}
     </Provider>  
    );
};