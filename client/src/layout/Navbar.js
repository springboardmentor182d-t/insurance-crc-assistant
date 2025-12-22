import React from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="bg-blue-500 h-16 flex items-center justify-between px-6 text-white">
  
      <div className="font-bold text-xl">Insurance CRC Assistant</div>

     
      <ul className="flex space-x-6 text-sm font-medium">
        <li>
          <Link
            className="hover:text-blue-200 transition-colors duration-200"
            to="/"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            className="hover:text-blue-200 transition-colors duration-200"
            to="/compare"
          >
            Comparison
          </Link>
        </li>
        <li>
          <span className="hover:text-blue-200 cursor-pointer transition-colors duration-200">
            Claims
          </span>
        </li>
      </ul>


      <div className="flex space-x-4 text-xl">
        <span className="cursor-pointer">🔔</span>
        <span className="cursor-pointer">👤</span>
      </div>
    </nav>
  );
}
