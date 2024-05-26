import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Page2.css';

export default function Page2() {
  return (
    <div className="homepage-container">
      <h1 className="righteous-regular">Recent ReCaps</h1>
      <ul style={{ color: '#ba55d3', listStyleType: 'none', padding: 0 }}>
        <li>
          <Link to="/page3">Lecture 1</Link> {/* Use Link to navigate to Page3 */}
        </li>
        <li>
          <Link to="/page3">Lecture 2</Link> {/* Use Link to navigate to Page3 */}
        </li>
        <li>
          <Link to="/page3">Lecture 3</Link> {/* Use Link to navigate to Page3 */}
        </li>
        {/* Add more lecture buttons as needed */}
      </ul>
    </div>
  );
}
