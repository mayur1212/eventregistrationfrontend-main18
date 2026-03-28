import React, { useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaCity,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import michiana from "../../assets/eventlogo1.png";
import runrobots from "../../assets/eventrobetic.png";
import european from "../../assets/europeevent1.png";

const initialFormState = {
  eventName: "",
  eventImage: "",
  clientName: "",
  contactNumber: "",
  email: "",
  password: "",
  venue: "",
  city: "",
  startDate: "",
  endDate: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\d{10}$/;
const textPattern = /^[A-Za-z][A-Za-z\s.'-]{1,49}$/;

const RegisterForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialFormState);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [eventPopup, setEventPopup] = useState(false);

const events = [
    {
      name: "Michiana Premier Event",
      img: michiana,
      venue: "BKC",
      city: "Mumbai",
      startDate: "2026-05-10",
      endDate: "2026-05-20",
    },
    {
      name: "Run the Robots Premier Event",
      img: runrobots,
      venue: "MVJ College of Engineering",
      city: "Bangalore",
      startDate: "2026-05-15",
      endDate: "2026-05-25",
    },
    {
      name: "European Premier Event",
      img: european,
      venue: "Pragati Maidan",
      city: "Delhi",
      startDate: "2026-05-21",
      endDate: "2026-05-30",
    },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    let nextValue = value;

    if (name === "contactNumber") {
      nextValue = value.replace(/\D/g, "").slice(0, 10);
    }

    setForm((prev) => ({ ...prev, [name]: nextValue }));
    setFormErrors((prev) => ({ ...prev, [name]: "", date: "" }));
    setError("");
  };

  const validateField = (name, value, currentForm = form) => {
    const trimmedValue = typeof value === "string" ? value.trim() : value;

    switch (name) {
      case "eventName":
        return trimmedValue ? "" : "Please select an event.";
      case "clientName":
        if (!trimmedValue) return "Client name is required.";
        if (!textPattern.test(trimmedValue)) {
          return "Client name must contain only letters and spaces.";
        }
        return "";
      case "contactNumber":
        if (!trimmedValue) return "Contact number is required.";
        if (!phonePattern.test(trimmedValue)) {
          return "Contact number must be exactly 10 digits.";
        }
        return "";
      case "email":
        if (!trimmedValue) return "Email address is required.";
        if (!emailPattern.test(trimmedValue)) {
          return "Enter a valid email address.";
        }
        return "";
      case "password":
        if (!trimmedValue) return "Password is required.";
        if (trimmedValue.length < 6) {
          return "Password must be at least 6 characters.";
        }
        if (!/(?=.*[A-Za-z])(?=.*\d)/.test(trimmedValue)) {
          return "Password must include at least one letter and one number.";
        }
        return "";
      case "venue":
        if (!trimmedValue) return "Venue is required.";
        if (trimmedValue.length < 3) {
          return "Venue must be at least 3 characters.";
        }
        return "";
      case "city":
        if (!trimmedValue) return "City is required.";
        if (!textPattern.test(trimmedValue)) {
          return "City must contain only letters and spaces.";
        }
        return "";
      case "startDate":
        if (!trimmedValue) return "Start date is required.";
        if (currentForm.endDate && trimmedValue > currentForm.endDate) {
          return "Start date cannot be after the end date.";
        }
        return "";
      case "endDate":
        if (!trimmedValue) return "End date is required.";
        if (currentForm.startDate && trimmedValue < currentForm.startDate) {
          return "End date cannot be before the start date.";
        }
        return "";
      default:
        return "";
    }
  };

  const validateForm = () => {
    const trimmedForm = {
      ...form,
      clientName: form.clientName.trim(),
      email: form.email.trim(),
      venue: form.venue.trim(),
      city: form.city.trim(),
    };

    const errors = {};

    Object.keys(trimmedForm).forEach((key) => {
      if (key === "eventImage") return;

      const errorMessage = validateField(key, trimmedForm[key], trimmedForm);
      if (errorMessage) {
        errors[key] = errorMessage;
      }
    });

    if (errors.startDate || errors.endDate) {
      errors.date = errors.startDate || errors.endDate;
    }

    setForm(trimmedForm);
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/register`, form);

      setError("");
      setSuccess("Registration successful! Check your email.");

      setTimeout(() => {
        navigate("/payment", { state: form });
      }, 2000);
    } catch (err) {
      setSuccess("");
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div
        className="flex-grow flex items-center justify-center bg-gradient-to-b to-white pt-40"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgb(111, 173, 255), #ffffff)",
        }}
      >
        <div className="bg-white/80 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md">
          <h2 className="text-xl font-semibold text-center mb-2">
            Register for an Event
          </h2>

          {error && <p className="text-red-500 text-sm mb-2 text-center">{error}</p>}
          {success && (
            <p className="text-green-600 text-sm mb-2 text-center font-semibold">
              {success}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-3" noValidate>
            <div onClick={() => setEventPopup(true)}>
              <Input
                icon={<FaUser />}
                name="eventName"
                type="text"
                placeholder="Select Event"
                value={form.eventName}
                readOnly
                error={formErrors.eventName}
              />
            </div>

            <Input
              icon={<FaUser />}
              name="clientName"
              type="text"
              placeholder="Client Name"
              autoComplete="name"
              maxLength={50}
              value={form.clientName}
              onChange={handleChange}
              error={formErrors.clientName}
            />

            <Input
              icon={<FaPhone />}
              name="contactNumber"
              type="tel"
              placeholder="Contact Number"
              autoComplete="tel"
              inputMode="numeric"
              maxLength={10}
              value={form.contactNumber}
              onChange={handleChange}
              error={formErrors.contactNumber}
            />

            <Input
              icon={<FaEnvelope />}
              type="email"
              name="email"
              placeholder="Email ID"
              autoComplete="email"
              value={form.email}
              onChange={handleChange}
              error={formErrors.email}
            />

            <Input
              icon={<FaLock />}
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="new-password"
              value={form.password}
              onChange={handleChange}
              error={formErrors.password}
            />

            <Input
              icon={<FaMapMarkerAlt />}
              name="venue"
              type="text"
              placeholder="Venue"
              autoComplete="street-address"
              maxLength={100}
              value={form.venue}
              onChange={handleChange}
              error={formErrors.venue}
            />

            <Input
              icon={<FaCity />}
              name="city"
              type="text"
              placeholder="City"
              autoComplete="address-level2"
              maxLength={50}
              value={form.city}
              onChange={handleChange}
              error={formErrors.city}
            />

            <div className="flex gap-2">
              <input
                type="date"
                name="startDate"
                value={form.startDate}
                onChange={handleChange}
                className="w-full border rounded-md p-2 text-sm"
              />
              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                min={form.startDate || undefined}
                className="w-full border rounded-md p-2 text-sm"
              />
            </div>
            {formErrors.date && <p className="text-red-500 text-xs">{formErrors.date}</p>}

            <button
              type="submit"
              className="w-full py-2 mt-3 rounded-md bg-black text-white font-semibold hover:opacity-90 transition"
            >
              Register
            </button>

          </form>

          <p className="mt-6 text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>

      {eventPopup && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex justify-center items-center z-50">
          <div className="relative bg-white shadow-2xl rounded-2xl w-[95%] max-w-4xl p-8">
            <button
              onClick={() => setEventPopup(false)}
              className="absolute top-4 right-4 bg-white hover:bg-gray-200 text-gray-700 w-10 h-10 flex items-center justify-center rounded-full shadow-md"
            >
              x
            </button>

            <h3 className="text-2xl font-bold text-center mb-8 uppercase text-[#0057ff] tracking-wide">
              Select Event
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {events.map((eventItem) => (
                <div
                  key={eventItem.name}
                  onClick={() => {
                    setForm((prev) => ({
                      ...prev,
                      eventName: eventItem.name,
                      eventImage: eventItem.img,
                      venue: eventItem.venue,
                      city: eventItem.city,
                      startDate: eventItem.startDate,
                      endDate: eventItem.endDate,
                    }));
                    setFormErrors((prev) => ({
                      ...prev,
                      eventName: "",
                      venue: "",
                      city: "",
                      startDate: "",
                      endDate: "",
                      date: "",
                    }));
                    setEventPopup(false);
                  }}
                  className="cursor-pointer bg-white rounded-xl overflow-hidden shadow-lg border hover:shadow-2xl hover:-translate-y-2 transition-all"
                >
                  <div className="bg-[#0057ff] text-white text-sm font-bold text-center py-2">
                    {eventItem.name}
                  </div>
                  <img
                    src={eventItem.img}
                    alt={eventItem.name}
                    className="w-full h-40 object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

const Input = ({ icon, error, ...props }) => (
  <div className="flex flex-col">
    <div className="flex items-center border rounded-md px-3 py-2 bg-white shadow-sm">
      <span className="text-gray-400 mr-2">{icon}</span>
      <input className="w-full outline-none text-sm bg-transparent" {...props} />
    </div>
    {error && <p className="text-red-500 text-xs">{error}</p>}
  </div>
);

export default RegisterForm;
