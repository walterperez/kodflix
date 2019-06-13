import React from 'react';
import './Loader.scss';

export default function Loader() {
  return (
    <div className="flex-container-loader" data-test="Loader">
      <div className="loader" />
    </div>
  );
}
