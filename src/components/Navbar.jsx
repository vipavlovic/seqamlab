import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/seqam_logo.png";
import navbarBg from "../data/imgs/navbar.jpg";

export default function Navbar() {
  return (
    <nav className="text-black shadow p-4 flex justify-between items-center bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url(${navbarBg})`}}>
      <div className="flex items-center space-x-3">
        <img src={logo} alt="SEQAM Logo" className="h-10" />
        <div className="text-xl font-bold bg-white/80 px-3 py-1 rounded">SEQAM Lab</div>
      </div>
      <div className="space-x-4">
        <Link to="/" className="hover:underline font-bold bg-white/80 px-2 py-1 rounded">Home</Link>
        <Link to="/papers" className="hover:underline font-bold bg-white/80 px-2 py-1 rounded">Papers</Link>
        <Link to="/projects" className="hover:underline font-bold bg-white/80 px-2 py-1 rounded">Projects</Link>
        <Link to="/people" className="hover:underline font-bold bg-white/80 px-2 py-1 rounded">People</Link>
        <Link to="/courses" className="hover:underline font-bold bg-white/80 px-2 py-1 rounded">Courses</Link>
        <Link to="/submit" className="hover:underline font-bold bg-white/80 px-2 py-1 rounded">Submit</Link>
      </div>
    </nav>
  );
}
