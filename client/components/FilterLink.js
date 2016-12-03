import React from 'react';
import { Link } from 'react-router';

const FilterLink = ({ filter, className, children }) => (
  <Link
    to={filter === 'all' ? '' : filter}
    // activeStyle={{
    //   textDecoration: 'none',
    //   color: 'black'
    // }}
    className={className}
  >
    {children}
  </Link>
);

export default FilterLink;
