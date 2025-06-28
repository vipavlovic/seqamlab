import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Papers from "./pages/Papers";
import Projects from "./pages/Projects";
import People from "./pages/People";
import Courses from "./pages/Courses";
import Submit from "./pages/Submit";

function App() {
  return (
    <Router basename="/seqamlab">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="papers" element={<Papers />} />
          <Route path="projects" element={<Projects />} />
          <Route path="people" element={<People />} />
          <Route path="courses" element={<Courses />} />
          <Route path="submit" element={<Submit />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
