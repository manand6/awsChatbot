import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Login, Dashboard } from '../components';
import { BrowserRouter } from 'react-router-dom';

Enzyme.configure({ adapter: new Adapter() });

describe('Header Component', () => {
  const wrapper = Enzyme.mount(
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});
});
