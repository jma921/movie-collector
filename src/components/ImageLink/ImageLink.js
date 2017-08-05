import React from 'react';
import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './ImageLink.css';

const ImageLink = props => {
  const { to, path, alt, title, releaseDate } = props;
  const releaseYear = releaseDate.split('-')[0];
  const url = `https://image.tmdb.org/t/p/w342/${path}`;
  return (
    <Route
      path={to}
      children={({ match }) =>
        <Link to={to}>
          <figure className="figure">
            <img src={url} className="figure-img img-fluid rounded" alt={alt} />
            <figcaption className="figure-caption">
              {title} <span className="image-link-date">({releaseYear})</span>
            </figcaption>
          </figure>
        </Link>}
    />
  );
};

ImageLink.propTypes = {
  to: PropTypes.string.isRequired,
  path: PropTypes.string,
  alt: PropTypes.string,
  title: PropTypes.string.isRequired,
  releaseDate: PropTypes.string,
};

export default ImageLink;
