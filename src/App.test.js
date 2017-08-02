import React from 'react';
import { shallow } from 'enzyme';
import App from './components';

jest.unmock('./config/constants.js');

it('renders without crashing', () => {
  shallow(<App />);
});
