import React from "react";
import DashboardDataPage from "./DashboardDataPage";

const rows = [
  {
    contractor: "Spark Event Tech",
    specialty: "Audio + Projection",
    city: "Mumbai",
    rating: "4.8",
    lastAssigned: "2026-02-20",
    availability: "Available",
  },
  {
    contractor: "FrameX Visuals",
    specialty: "Camera Crew",
    city: "Pune",
    rating: "4.6",
    lastAssigned: "2026-02-24",
    availability: "Limited",
  },
  {
    contractor: "Zenith Stage Works",
    specialty: "Stage Design",
    city: "Nashik",
    rating: "4.3",
    lastAssigned: "2026-02-19",
    availability: "Available",
  },
  {
    contractor: "Pulse Workforce",
    specialty: "Volunteer Staffing",
    city: "Nagpur",
    rating: "4.1",
    lastAssigned: "2026-02-27",
    availability: "Pending",
  },
];

const columns = [
  { key: "contractor", label: "Contractor" },
  { key: "specialty", label: "Specialty" },
  { key: "city", label: "City" },
  { key: "rating", label: "Rating" },
  { key: "lastAssigned", label: "Last Assigned" },
  { key: "availability", label: "Availability" },
];

const Contractors = () => {
  const stats = [
    { label: "Partner Vendors", value: rows.length, meta: "Approved vendor pool" },
    { label: "Available Now", value: 2, meta: "Ready for immediate deployment" },
    { label: "Avg Rating", value: "4.45", meta: "Based on recent projects" },
    { label: "Pending Confirmation", value: 1, meta: "Needs follow-up call" },
  ];

  return (
    <DashboardDataPage
      title="Contractor Network"
      subtitle="Track vendor capabilities, quality score, and live availability."
      badge="Workforce"
      actionLabel="+ Add Contractor"
      stats={stats}
      columns={columns}
      rows={rows}
      emptyMessage="No contractors assigned yet."
    />
  );
};

export default Contractors;
