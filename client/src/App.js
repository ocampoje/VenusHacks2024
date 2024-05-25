import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './NavBar.jsx';
import HomePage from './HomePage';
import Page2 from './Page2';
import Testing from './Testing'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Page2" element={<Page2 />} />
        <Route path="/Testing" element={<Testing />} />
      </Routes>
    </Router>
  );
}

export default App;
