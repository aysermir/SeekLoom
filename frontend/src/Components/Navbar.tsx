import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button'; // Import MUI Button
import IconButton from '@mui/material/IconButton'; // Import IconButton for the GitHub logo
import GitHubIcon from '@mui/icons-material/GitHub'; // Import GitHub icon
import Typography from '@mui/material/Typography'; // 
function Navbar() {
  return (
    <nav className="navbar">
        <div className="navbar-item">
          <Button component={Link} to="/grid-visualization" color="inherit" variant="text">
            Search Visualization
          </Button>
        </div>
        <div className="navbar-item">
          <Button component={Link} to="/sort-visualization" color="inherit" variant="text">
            Sorting Visualization
          </Button>
        </div>
        {/* GitHub Logo Button */}
        <div className="navbar-item">
          <IconButton 
            aria-label="github" 
            component="a" 
            href="https://github.com/aysermir/SeekLoom" // Replace with your repository link
            target="_blank"
            color="inherit">
            <GitHubIcon />
          </IconButton>
        </div>
        <Typography variant="body2" color="inherit" style={{ marginLeft: 5 }}>
            Developed by Mir Safwat Ayser
          </Typography>
    </nav>
  );
}

export default Navbar;
