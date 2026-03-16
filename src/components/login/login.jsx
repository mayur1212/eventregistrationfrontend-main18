// src/components/login/Login.jsx
import React, { useState, useContext } from "react";
import { FaEnvelope, FaLock, FaGoogle } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { UserContext } from "../../context/UserContext";
import { buildSafeUser, startGoogleAuth } from "../../utils/auth";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: name === "email" ? value.trim() : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateField = (name, value) => {
    switch (name) {
      case "email":
        if (!value) return "Email is required.";
        if (!emailPattern.test(value)) return "Enter a valid email address.";
        return "";
      case "password":
        if (!value) return "Password is required.";
        if (value.length < 6) return "Password must be at least 6 characters.";
        return "";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const nextErrors = {
      email: validateField("email", form.email),
      password: validateField("password", form.password),
    };

    const filteredErrors = Object.fromEntries(
      Object.entries(nextErrors).filter(([, value]) => value)
    );

    setErrors(filteredErrors);
    return Object.keys(filteredErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/login`,
        form,
        { withCredentials: true }
      );

      const { token, user: userData, message } = res.data;
      if (!token) return toast.error(message || "Login failed");

      const safeUser = buildSafeUser(userData, token, form.email);

      localStorage.setItem("token", safeUser.token);
      localStorage.setItem("user", JSON.stringify(safeUser));
      setUser(safeUser);

      toast.success(
        `Welcome ${safeUser.name}! You are logged in as ${safeUser.role.toUpperCase()}.`
      );

      if (safeUser.role === "admin") navigate("/dashboard", { replace: true });
      else navigate("/", { replace: true });
    } catch (err) {
      console.error("Login error:", err);
      toast.error(err?.response?.data?.message || "Login failed");
    }
  };

  const handleGoogleLogin = () => {
    startGoogleAuth();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div
        className="flex-grow flex items-center justify-center bg-gradient-to-b to-white py-20"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgb(111, 173, 255), #ffffff)",
        }}
      >
        <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md mt-20">
          <div className="flex justify-center mb-6">
            <div className="bg-gray-200 p-4 rounded-full shadow">
              <FaLock className="text-2xl text-gray-600" />
            </div>
          </div>

          <h2 className="text-xl font-semibold text-center mb-2">Login</h2>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="flex items-center border rounded-md px-3 py-2 bg-white shadow-sm">
              <FaEnvelope className="text-gray-400 mr-2" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                autoComplete="username"
                className="w-full outline-none text-sm"
                value={form.email}
                onChange={handleChange}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

            <div className="flex items-center border rounded-md px-3 py-2 bg-white shadow-sm">
              <FaLock className="text-gray-400 mr-2" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                autoComplete="current-password"
                className="w-full outline-none text-sm"
                value={form.password}
                onChange={handleChange}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs">{errors.password}</p>
            )}

            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-md bg-black text-white font-semibold hover:opacity-90 transition"
            >
              Login
            </button>

            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-2 rounded-md border border-gray-300 text-gray-700 font-semibold hover:bg-gray-50 transition flex items-center justify-center gap-2"
            >
              <FaGoogle className="text-red-500" />
              Continue with Google
            </button>
          </form>

          <Link
            to="/register"
            className="mt-4 block text-center text-blue-500 hover:underline text-sm"
          >
            Or sign up
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
