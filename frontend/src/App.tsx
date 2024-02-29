import React, { useState } from 'react';
import './App.css';
import Button from '@mui/material/Button';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import SearchVisualization from './Components/SearchVisualization';
import SortingVisualization from './Components/SortingVisualization';
function App() {
return(  <Router>
  <Navbar />
  <Routes>
    <Route path="/grid-visualization" element={<SearchVisualization />} />
    <Route path="/sort-visualization" element={<SortingVisualization />} />
      </Routes>
</Router>
);
}

export default App;
