import React from 'react';
import { Link } from 'react-router-dom';

function NavBar() {
  return (
    <nav>
      <Link to="/">Home</Link> |
      <Link to="/Page2">Page 2</Link> |
    </nav>
  );
}

export default NavBar;