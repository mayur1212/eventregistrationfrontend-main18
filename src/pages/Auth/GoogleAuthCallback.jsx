import React, { useContext, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import API_BASE_URL from "../../api";
import { UserContext } from "../../context/UserContext";
import { buildSafeUser } from "../../utils/auth";

const GoogleAuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) return;
    processedRef.current = true;

    const finishGoogleAuth = async () => {
      const query = new URLSearchParams(location.search);
      const hash = new URLSearchParams(location.hash.replace(/^#/, ""));
      const getParam = (name) => query.get(name) || hash.get(name);

      const errorMessage = getParam("error");
      if (errorMessage) {
        throw new Error(errorMessage);
      }

      const userParam = getParam("user");
      let token = getParam("token") || getParam("jwt") || "";
      let userData = null;

      if (userParam) {
        try {
          userData = JSON.parse(userParam);
        } catch {
          userData = JSON.parse(decodeURIComponent(userParam));
        }
      }

      if (!userData) {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const response = await axios.get(`${API_BASE_URL}/me`, {
          headers,
          withCredentials: true,
        });
        userData = response?.data?.user || response?.data;
        token = token || response?.data?.token || "";
      }

      const safeUser = buildSafeUser(userData, token);
      if (!safeUser.email) {
        throw new Error("Google auth response is missing user data.");
      }

      if (safeUser.token) {
        localStorage.setItem("token", safeUser.token);
      } else {
        localStorage.removeItem("token");
      }

      localStorage.setItem("user", JSON.stringify(safeUser));
      setUser(safeUser);

      toast.success(`Welcome ${safeUser.name}!`);
      navigate(safeUser.role === "admin" ? "/dashboard" : "/", { replace: true });
    };

    finishGoogleAuth().catch((err) => {
      console.error("Google auth callback error:", err);
      localStorage.removeItem("token");
      setUser(null);
      toast.error(err?.response?.data?.message || err.message || "Google sign-in failed");
      navigate("/login", { replace: true });
    });
  }, [location.hash, location.search, navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 text-gray-700">
      Completing Google sign-in...
    </div>
  );
};

export default GoogleAuthCallback;
