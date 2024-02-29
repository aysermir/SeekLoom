import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button'; // Import MUI Button

function Navbar() {
  return (
    <nav className="navbar">
        <div className="navbar-item">
          {/* Use Material UI Button as a Link */}
          <Button component={Link} to="/grid-visualization" color="inherit" variant="text">
            Grid Visualization
          </Button>
        </div>
        <div className="navbar-item">
          <Button component={Link} to="/sort-visualization" color="inherit" variant="text">
            Sorting Visualization
          </Button>
        </div>
        
    </nav>
  );
}

export default Navbar;
