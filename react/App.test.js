import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import Header from './Components/Header';
import SplashPage from './Components/SplashPage';
import LoginPage from './Components/LoginPage';
import SignupPage from './Components/SignupPage';

let wrapped, deepWrap;

beforeEach(() => {
    wrapped = shallow(<App />);
    deepWrap = mount(<App />);
});

afterEach(() => {
    wrapped.unmount();
})

it('shows a Header component', () => {
    expect(wrapped.find(Header).length).toEqual(1);
});

it('shows a Splash component', () => {
     expect(deepWrap.find(SplashPage).length).toEqual(1);
});

// it('shows a LoginPage component', () => {
//     expect(deepWrap.find(LoginPage).length).toEqual(1);
// });

// it('shows a SignupPage component', () => {
//     expect(deepWrap.find(SignupPage).length).toEqual(1);
// });