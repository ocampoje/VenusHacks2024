// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import HomePage from './HomePage';
import Page2 from './Page2';
import Testing from './Testing'
import Page3 from './Page3';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Page2" element={<Page2 />} />
        <Route path="/Testing" element={<Testing />} />
        {/* <Route path="/Page3" element={<Page3 />} /> */}
        <Route path="/page3/:lectureName" element={<Page3 />} />
      </Routes>
    </Router>
    
  );
  
}


export default App;
