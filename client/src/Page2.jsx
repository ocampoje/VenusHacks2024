import React from 'react';
import { useState } from 'react';
import './HomePage.css';

export default function Page2() {
  return (
    <div className="homepage-container">
      <h1 className="righteous-regular">Recent ReCaps</h1>
      <ul style={{ color: '#ba55d3', listStyleType: 'none', padding: 0 }}>
      </ul>
    </div>
  );
}
