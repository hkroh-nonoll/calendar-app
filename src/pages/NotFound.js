import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = props => {
  return (
    <>
      <p>NotFoundPage</p>
      <Link to="/">
        <button>index</button>
      </Link>
    </>
  );
}

export default NotFoundPage;
