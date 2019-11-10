import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Login } from './Login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import fetch from '../../_mock_/loginService';
import NegativeFetch from '../../_mock_/loginService';

Enzyme.configure({ adapter: new Adapter() });

describe('Login Component', () => {
  const wrapper = Enzyme.mount(<Login />);

  it('Renders login form with two input elements', () => {
    expect(wrapper.find('input').length).toEqual(2);
    expect(wrapper.find('button').text()).toEqual('LOGIN');
  });

  it('calls "handleUserName()" on input changes', () => {
    const spy1 = jest.spyOn(Login.prototype, 'handleUserName');

    Enzyme.shallow(<Login />)
      .find('#userName')

      .simulate('change', { target: { value: 'foo', id: 'userName' } });
  
    expect(spy1).toHaveBeenCalled();
  });

  it('calls "handlePassword()" on input changes', () => {
    const spy1 = jest.spyOn(Login.prototype, 'handlePassword');

    Enzyme.shallow(<Login />)
      .find('#password')

      .simulate('change', { target: { value: 'foo', id: 'password' } });
  
    expect(spy1).toHaveBeenCalled();
  });

  it('calls "handleSubmit()" on input changes', () => {
    global.fetch = fetch;
  const spy = jest.spyOn(Login.prototype, 'handleLogin');
  Enzyme.shallow(<Login />)
    .find('#login')
    .simulate('click', { preventDefault: () => {} });
  expect(spy).toHaveBeenCalled();
  });

  it('calls "handleSubmit()" on input changes', () => {
    global.fetch = NegativeFetch;
  const spy = jest.spyOn(Login.prototype, 'handleLogin');
  Enzyme.shallow(<Login />)
    .find('#login')
    .simulate('submit', { preventDefault: () => {} });
  expect(spy).toHaveBeenCalled();
  });

  it('handleUserName() updates componentState', () => {
    const instance = wrapper.instance();
    instance.handleUserName({ target: { value: 'foo', id: 'userName' } });
    expect(wrapper.state('username')).toBe('foo');
  });

  it('handlePassword() updates componentState', () => {
    const instance = wrapper.instance();
    instance.handlePassword({ target: { value: 'foo', id: 'password' } });
    expect(wrapper.state('password')).toBe('foo');
  });
});
