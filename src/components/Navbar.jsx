import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/seqam_logo.png";

export default function Navbar() {
  return (
    <nav className="bg-[#cc0033] text-white shadow p-4 flex justify-between items-center">
      <div className="flex items-center space-x-3">
        <img src={logo} alt="SEQAM Logo" className="h-10" />
        <div className="text-xl font-semibold">SEQAM Lab</div>
      </div>
      <div className="space-x-4">
        <Link to="/" className="hover:underline">Home</Link>
        <Link to="/papers" className="hover:underline">Papers</Link>
        <Link to="/projects" className="hover:underline">Projects</Link>
        <Link to="/people" className="hover:underline">People</Link>
        <Link to="/courses" className="hover:underline">Courses</Link>
        <Link to="/submit" className="hover:underline">Submit</Link>
      </div>
    </nav>
  );
}
