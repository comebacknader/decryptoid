import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';
import { Header } from './Components/Header';
import SplashPage from './Components/SplashPage';

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
