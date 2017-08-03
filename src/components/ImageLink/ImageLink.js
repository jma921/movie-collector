import React from 'react';
import { Route, Link } from 'react-router-dom';
import './ImageLink.css';

const ImageLink = ({ to, path, alt, title, releaseDate }) => {
  const releaseYear = releaseDate.split('-')[0];
  const url = `https://image.tmdb.org/t/p/w342/${path}`;
  console.log(url);
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

export default ImageLink;
