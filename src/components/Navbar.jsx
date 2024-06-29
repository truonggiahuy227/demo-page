// src/components/Navbar.js

import React from 'react';
// import './Navbar.css';

function Navbar() {
  return (
    <div className="navbar">
      <h2>Navigation</h2>
      <ul>
        <li><a href="#upload">Upload Image</a></li>
        <li><a href="#description">Image Description</a></li>
        {/* Add more links here as you add more features */}
      </ul>
    </div>
  );
}

export default Navbar;
