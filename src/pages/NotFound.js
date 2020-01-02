import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <>
      <p>Not Found Page</p>
      <Link to="/">
        <button>index</button>
      </Link>
    </>
  );
}

export default NotFoundPage;
