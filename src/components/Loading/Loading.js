import React from 'react';
import { Loader } from 'react-loaders';
import './Loading.css';

const Loading = () => {
  return <Loader type="line-scale-pulse-out" active />;
};

export default Loading;
