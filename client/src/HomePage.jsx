import React from 'react';
import { useState } from 'react';
import './HomePage.css';

function textBox(){
  return (
    <div>
      <input> Enter Text Here
      </input>
    </div>
  )
}

function SubmitButton(){
  const SubmitQuery = () => {

  };
  return (
    <div className="submit-button-container">
      <button onClick={SubmitQuery} className="compare-notes-button">
        Compare Notes
      </button>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="homepage-container">
      <h1 className="righteous-regular">ReCap</h1>
      <ul style={{ color: '#ba55d3', listStyleType: 'none', padding: 0 }}>
        <l1 style={{ color: 'white' }}>Take note of what you missed.</l1>
        {/* add the buttons here */}
        <li style={{ color: 'white' }}>Type your notes here:</li>
        
      </ul>
      
      <p >Enter Text Here</p>
      <SubmitButton />
      {/* <div className="anteater"></div> */}
    </div>
  );
}
