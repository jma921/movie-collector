import React from 'react';
import { shallow } from 'enzyme';
import Collection from './Collection';

const matchParams = {
  params: {
    path: '/collection',
    uid: '/76s76s76s67s',
    url: '/collection',
  },
};

it('renders without crashing', () => {
  shallow(<Collection match={matchParams} />);
});
