// === src/components/Sidebar.js ===
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
// import { AuthContext } from '../context/AuthContext.js';
import { AuthContext } from '../context/authContext';


function Sidebar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="w-64 bg-gray-800 text-white flex flex-col p-4">
      <h2 className="text-xl font-bold mb-6">BugTracker</h2>
      <nav className="flex flex-col gap-2">
        <Link to="/" className="hover:text-gray-300">Dashboard</Link>
        <Link to="/projects" className="hover:text-gray-300">Projects</Link>
        <Link to="/tickets" className="hover:text-gray-300">Tickets</Link>
      </nav>
      <button onClick={handleLogout} className="mt-auto bg-red-600 p-2 rounded hover:bg-red-700">
        Logout
      </button>
    </div>
  );
}

export default Sidebar;