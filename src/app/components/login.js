"use client";
import React, { useState, useEffect } from "react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [redirect, setRedirect] = useState("/");

  const [showPopup, setShowPopup] = useState(false);
  const [showErrorlogin, setSetshowErrorlogin] = useState(false);

  useEffect(() => {
    // Check if the user is already logged in
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch(
        `http://18.188.189.216:5000/admins/login?username=${username}&password=${password}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.json();

      if (response.ok && result.success) {
        localStorage.setItem("username", username);
        setIsLoggedIn(true);

        console.log(result.message);
        window.location.href = "/dashboard";
      } else {
        console.log(result.message);
        setSetshowErrorlogin(true);

        setTimeout(() => {
          setSetshowErrorlogin(false);
        }, 2000);
      }
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleLogout = () => {
    // Remove the stored username and reset login state
    localStorage.removeItem("username");
    window.location.href = "/";
    setIsLoggedIn(false);
  };

  return (
    <div className='relative flex justify-around  p-4 z-50'>
      <div className='flex grow ml-8'>
        <a
          className='text-blue-400 hover:text-blue-600 font-bold flex items-center p-4 my-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out'
          href='/'>
          Home
        </a>
      </div>
      <div className='relative flex justify-end p-4 z-50'>
        {/* Button to trigger the popup-card */}
        {isLoggedIn ? (
          <>
            <div className='flex flex-col items-center px-4'>
              <p>Welcome, {localStorage.getItem("username")}!</p>
              <a
                className='text-blue-400 hover:text-blue-600 transition duration-300 ease-in-out'
                href='/dashboard'>
                Go to Dashboard
              </a>
            </div>
            <button
              onClick={handleLogout}
              className='bg-red-400 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out'>
              Logout
            </button>
          </>
        ) : (
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out'
            onClick={() => setShowPopup(true)}>
            Login
          </button>
        )}
      </div>

      {/* Popup-card */}
      {showPopup && (
        <div className='fixed inset-0 overflow-hidden z-50 flex items-center justify-center'>
          <div className='absolute inset-0 bg-gray-800 opacity-75'></div>
          <div className='bg-white p-6 rounded-lg z-10'>
            <div className='flex justify-end'>
              {/* Close button (red 'X') */}
              <button
                className='text-red-500 hover:text-red-700'
                onClick={handleClosePopup}>
                <span className='text-2xl font-bold'>×</span>
              </button>
            </div>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='username'>
                Username:
              </label>
              <input
                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='username'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label
                className='block text-gray-700 text-sm font-bold mb-2'
                htmlFor='password'>
                Password:
              </label>
              <input
                className='appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className='flex justify-center'>
              <button
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                onClick={handleLogin}>
                Login
              </button>
            </div>
            {showErrorlogin && (
              <div className='text-center p-4'>
                <h1 className='text-red-500'>Usuario Incorrecto</h1>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
