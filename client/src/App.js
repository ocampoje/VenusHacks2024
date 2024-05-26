import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import NavBar from "./NavBar.jsx";
import HomePage from "./HomePage";
import Page2 from "./Page2";
import Testing from "./Testing";
import Page3 from "./Page3";

document.title = "ReCap";

function App() {
  const location = useLocation();

  const hideNavBarRoutes = ["/"];

  const shouldHideNavBar = () => {
    return hideNavBarRoutes.some((route) =>
      location.pathname.startsWith(route)
    );
  };

  return (
    <>
      {!shouldHideNavBar() && <NavBar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Page2" element={<Page2 />} />
        <Route path="/Testing" element={<Testing />} />
        <Route path="/page3/:lectureName" element={<Page3 />} />
      </Routes>
    </>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
