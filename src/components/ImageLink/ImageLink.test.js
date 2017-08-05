import React from 'react';
import { shallow, render } from 'enzyme';
import ImageLink from './ImageLink';

it('renders without crashing', () => {
  shallow(
    <ImageLink
      to="/movie/330459"
      title="Rogue One: A Star Wars Story"
      releaseDate="2016-12-14"
    />
  );
});

test('should create an image url', () => {
  const component = shallow(
    <ImageLink
      to="/movie/330459"
      title="Rogue One: A Star Wars Story"
      releaseDate="2016-12-14"
      path="/qjiskwlV1qQzRCjpV0cL9pEMF9a.jpg"
    />
  );
  const { path } = component.instance().props;
  const url = `https://image.tmdb.org/t/p/w342${path}`;
  expect(url).toBe(
    'https://image.tmdb.org/t/p/w342/qjiskwlV1qQzRCjpV0cL9pEMF9a.jpg'
  );
});

// test('CheckboxWithLabel changes the text after click', () => {
//   // Render a checkbox with label in the document
//   const checkbox = shallow(<CheckboxWithLabel labelOn="On" labelOff="Off" />);

//   expect(checkbox.text()).toEqual('Off');

//   checkbox.find('input').simulate('change');

//   expect(checkbox.text()).toEqual('On');
// });
