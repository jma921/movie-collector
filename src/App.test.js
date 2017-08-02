import React from 'react';
import { shallow } from 'enzyme';
import App from './components';

jest.unmock('../config/constants');

it('renders without crashing', () => {
  shallow(<App />);
});
