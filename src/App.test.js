import React from 'react';
import { shallow } from 'enzyme';
import App from './components';

it('renders without crashing', () => {
  shallow(<App />);
});
