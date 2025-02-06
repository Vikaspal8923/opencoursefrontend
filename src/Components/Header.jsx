import { Link, useNavigate } from 'react-router-dom';
import { setToken, logout } from '../reducer/slice/authSlice';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isexpired, setisexpired] = useState(true);
  const { token } = useSelector((state) => state.auth);
  const [menuOpen, setMenuOpen] = useState(false);

  const verifyAccessToken = (token) => {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp < Math.floor(Date.now() / 1000)) {
        setisexpired(true);
        dispatch(logout());
      } else {
        setisexpired(false);
      }
    } catch (error) {
      toast.success('Please login again', { autoClose: 5000, theme: "light" });
      setisexpired(true);
      dispatch(logout());
    }
  };

  useEffect(() => {
    if (token) verifyAccessToken(token);
  }, [token]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    toast.success('Logged out successfully', { autoClose: 3000, theme: "light" });
  };

  return (
    <header className="sticky top-0 w-full bg-bg-dark bg-opacity-[.96] text-white py-4 flex items-center justify-between px-6 md:px-28 z-50">
      <Link to="/" className="text-3xl font-bold text-white">Open Course</Link>
      
      {/* Mobile Menu Button */}
      <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-white p-2 border border-white rounded-lg hover:bg-gray-700 transition-all">
        More
      </button>

      {/* Dropdown Menu */}
      <div className={`absolute top-16 right-5 w-48 bg-bg-dark bg-opacity-[.96] rounded-lg shadow-lg z-50 transform transition-transform duration-300 ${menuOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 hidden'}`}>
        <Link to="/Admin" className="block px-4 py-2 text-gray-300 hover:text-white">Contribute</Link>
        <Link to="/Userpanel" className="block px-4 py-2 text-gray-300 hover:text-white">Courses</Link>
        <Link to="/interviewprep/Startprep" className="block px-4 py-2 text-gray-300 hover:text-white">Interview</Link>
        <Link to="/about" className="block px-4 py-2 text-gray-300 hover:text-white">About Us</Link>
        <Link to="/community" className="block px-4 py-2 text-gray-300 hover:text-white">Community</Link>
         {isexpired && token ? (
          <>
            <Link to="/signup" className="block px-4 py-2 bg-white text-blue-600 rounded hover:bg-blue-500">Sign Up</Link>
            <Link to="/login" className="block px-4 py-2 bg-white text-blue-600 rounded hover:bg-blue-500">Login</Link>
          </>
        ) : (
          <Link to="/" onClick={handleLogout} className="block px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800">Logout</Link>
        )}
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex space-x-8">
        <Link to="/Admin" className="text-xl text-gray-300 hover:text-white">Contribute</Link>
        <Link to="/Userpanel" className="text-xl text-gray-300 hover:text-white">Courses</Link>
        <Link to="/interviewprep/Startprep" className="text-xl text-gray-300 hover:text-white">Interview</Link>
        <Link to="/about" className="text-xl text-gray-300 hover:text-white">About Us</Link>
        <Link to="/community" className="text-xl text-gray-300 hover:text-white">Community</Link>

        {/* {!isexpired && token && (
          <Link to="/" onClick={handleLogout} className="bg-red-700 text-white py-2 px-4 rounded hover:bg-red-800">Logout</Link>
        )} */}

         {isexpired && token ? (
          <>
            <Link to="/signup" className="block px-4 py-2 bg-white text-blue-600 rounded hover:bg-blue-500">Sign Up</Link>
            <Link to="/login" className="block px-4 py-2 bg-white text-blue-600 rounded hover:bg-blue-500">Login</Link>
          </>
        ) : (
          <Link to="/" onClick={handleLogout} className="block px-4 py-2 bg-red-700 text-white rounded hover:bg-red-800">Logout</Link>
        )}
      </nav>
    </header>
  );
}

export default Header;
