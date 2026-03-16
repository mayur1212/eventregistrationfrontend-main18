import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import API_BASE_URL from "../../api";

const SEND_OTP_ENDPOINTS = [
  "/forgot-password",
  "/forgot-password-otp",
  "/send-reset-otp",
];

const RESET_WITH_OTP_ENDPOINTS = [
  "/reset-password-with-otp",
  "/reset-password/otp",
  "/reset-password",
];

const RESEND_SECONDS = 30;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: "",
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [resendCountdown, setResendCountdown] = useState(0);

  useEffect(() => {
    if (!resendCountdown) return;
    const timer = setInterval(() => {
      setResendCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendCountdown]);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError("");
    setMessage("");
  };

  const postWithFallback = async (paths, payload) => {
    let lastError;
    for (const path of paths) {
      try {
        const res = await axios.post(`${API_BASE_URL}${path}`, payload, {
          withCredentials: true,
        });
        return res;
      } catch (err) {
        lastError = err;
        const status = err?.response?.status;
        const backendMessage = err?.response?.data?.message || "";
        const isMissingRoute =
          status === 404 ||
          status === 405 ||
          String(backendMessage).includes("Cannot POST");
        if (isMissingRoute) {
          continue;
        }
        throw err;
      }
    }
    throw lastError || new Error("Request failed");
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email.trim())) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await postWithFallback(SEND_OTP_ENDPOINTS, {
        email: form.email.trim(),
      });

      setMessage(
        res?.data?.message || "OTP sent successfully. Check your email inbox."
      );
      setStep(2);
      setResendCountdown(RESEND_SECONDS);
    } catch (err) {
      setError(err?.response?.data?.message || "Unable to send OTP.");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!form.otp.trim()) {
      setError("Please enter OTP.");
      return;
    }
    if (!/^\d{4,8}$/.test(form.otp.trim())) {
      setError("OTP must be 4 to 8 digits.");
      return;
    }
    if (!form.newPassword || form.newPassword.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.newPassword !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        email: form.email.trim(),
        otp: form.otp.trim(),
        password: form.newPassword,
        newPassword: form.newPassword,
        confirmPassword: form.confirmPassword,
      };

      const res = await postWithFallback(RESET_WITH_OTP_ENDPOINTS, payload);

      setMessage(
        res?.data?.message || "Password reset successful. Redirecting to login..."
      );
      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(err?.response?.data?.message || "OTP invalid or reset failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div
        className="flex-grow flex items-center justify-center bg-gradient-to-b to-white py-20 px-4"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgb(111, 173, 255), #ffffff)",
        }}
      >
        <div className="bg-white/85 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md mt-20">
          <h2 className="text-2xl font-bold text-center mb-2">Forgot Password</h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            {step === 1
              ? "Enter your email to receive OTP."
              : "Enter OTP and set a new password."}
          </p>

          {step === 1 ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={form.email}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Enter email"
                className="w-full border rounded-md px-3 py-2 text-sm outline-none bg-gray-100"
                value={form.email}
                onChange={handleChange}
                readOnly
              />
              <input
                type="text"
                name="otp"
                placeholder="Enter OTP"
                inputMode="numeric"
                maxLength={8}
                className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={form.otp}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New password"
                className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={form.newPassword}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={form.confirmPassword}
                onChange={handleChange}
                required
              />

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2 rounded-md bg-black text-white font-semibold hover:opacity-90 transition ${
                  loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
              >
                {loading ? "Resetting..." : "Reset Password"}
              </button>

              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading || resendCountdown > 0}
                className="w-full py-2 rounded-md border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 transition"
              >
                {resendCountdown > 0
                  ? `Resend OTP in ${resendCountdown}s`
                  : "Resend OTP"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setStep(1);
                  setForm((prev) => ({
                    ...prev,
                    otp: "",
                    newPassword: "",
                    confirmPassword: "",
                  }));
                  setResendCountdown(0);
                  setError("");
                  setMessage("");
                }}
                className="w-full py-2 rounded-md border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition"
              >
                Change Email
              </button>
            </form>
          )}

          {message && <p className="text-green-600 text-sm mt-4">{message}</p>}
          {error && <p className="text-red-500 text-sm mt-4">{error}</p>}

          <div className="mt-6 text-center">
            <Link to="/login" className="text-sm text-blue-600 hover:underline">
              Back to Login
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ForgotPassword;
