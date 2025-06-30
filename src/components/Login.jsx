import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
  const [credentials, setCredentials] = useState({ id: '', password: '' });
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedId = localStorage.getItem('user_id');
    if (savedId) {
      setCredentials(prev => ({ ...prev, id: savedId }));
      setRememberMe(true);
    }
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (credentials.id.trim() === '' || credentials.password.trim() === '') {
      toast.warn('⚠️ Please enter both ID and password.', {
        position: 'top-center',
        autoClose: 2000,
        theme: 'light',
      });
      return;
    }

    if (rememberMe) {
      localStorage.setItem('user_id', credentials.id);
    } else {
      localStorage.removeItem('user_id');
    }

    localStorage.setItem('loggedIn', JSON.stringify(true));

    toast.success('Login successful!', {
      position: 'top-center',
      autoClose: 2000,
      theme: 'dark',
    });

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-600 px-4">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
        {/* Logo/Image */}
        <div className="flex justify-center mb-6">
          <img
            src="/image/png-boom.png"
            alt="boom"
            className="rounded-full object-cover "
          />
        </div>

        <p className="text-center text-gray-700 text-base sm:text-lg mb-10 font-dm font-[400] text-[14px]">
          Welcome Back! Please enter your details
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-1 font-dm font-semibold text-base">
              Enter ID
            </label>
            <input
              type="text"
              name="id"
              value={credentials.id}
              onChange={handleChange}
              placeholder="Enter your ID"
              className="w-full px-4 py-3 border rounded bg-[#F1F1F1] font-dm font-normal text-base focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div>
            <label className="block mb-1 font-dm font-semibold text-base">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full px-4 py-3 border rounded bg-[#F1F1F1] font-dm font-normal text-base focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="flex items-center justify-between text-sm sm:text-base">
            <label className="flex items-center select-none">
              <input
                type="checkbox"
                className="mr-2"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              Remember me
            </label>

            <Link
              to="/forgot-password"
              className="text-red-600 hover:underline font-dm font-normal"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded hover:bg-gray-800 transition font-dm font-semibold text-base"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
