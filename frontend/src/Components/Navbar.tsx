import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav>
      <ul>
        <li><Link to="/grid-visualization">Grid Visualization</Link></li>
        <li><Link to="/sort-visualization">Sorting Visualization</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
