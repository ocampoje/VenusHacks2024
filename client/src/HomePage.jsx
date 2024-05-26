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
        Submit ReCap
      </button>
    </div>
  )
}

function AllNotesButton(){
  const handleAllNotesClick = () => {
  };
  
  return (
    <div className="all-notes-button-container">
      <button onClick={handleAllNotesClick} className="all-notes-button">
        View All ReCaps
      </button>
    </div>
  )
}

export default function HomePage() {
  return (
    <div className="homepage-container">
      <h1 className="righteous-regular">ReCap</h1>
      <p className="subheading">Take note of what you missed.</p>
      <ul style={{ color: '#ba55d3', listStyleType: 'none', padding: 0 }}>
        {/* add the buttons here */}
        <li style={{ color: 'white' }}>Type your notes here:</li>
        
      </ul>
      
      <p >Enter Text Here</p>
      <div className="buttons-container">
      <AllNotesButton />
      <SubmitButton /></div>
    </div>
  );
}
