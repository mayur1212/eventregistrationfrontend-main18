import React from "react";
import DashboardDataPage from "./DashboardDataPage";

const rows = [
  {
    role: "Lead Emcee",
    department: "Stage Operations",
    openings: 1,
    location: "Mumbai",
    shift: "Full Day",
    status: "Open",
  },
  {
    role: "Camera Operator",
    department: "Media",
    openings: 3,
    location: "Pune",
    shift: "Morning",
    status: "Open",
  },
  {
    role: "Robot Inspector",
    department: "Technical",
    openings: 2,
    location: "Nashik",
    shift: "Rotational",
    status: "Active",
  },
  {
    role: "Safety Marshal",
    department: "Compliance",
    openings: 2,
    location: "Nagpur",
    shift: "Evening",
    status: "Pending",
  },
  {
    role: "Pit Admin",
    department: "Event Desk",
    openings: 1,
    location: "Aurangabad",
    shift: "Full Day",
    status: "Open",
  },
];

const columns = [
  { key: "role", label: "Position" },
  { key: "department", label: "Department" },
  { key: "openings", label: "Openings" },
  { key: "location", label: "Location" },
  { key: "shift", label: "Shift" },
  { key: "status", label: "Status" },
];

const Positions = () => {
  const totalOpenings = rows.reduce((sum, row) => sum + row.openings, 0);

  const stats = [
    { label: "Live Positions", value: rows.length, meta: "Roles accepting assignments" },
    { label: "Total Openings", value: totalOpenings, meta: "Slots available this week" },
    { label: "Urgent Roles", value: 2, meta: "Need assignment today" },
    { label: "Cities Covered", value: 5, meta: "Regional distribution active" },
  ];

  return (
    <DashboardDataPage
      title="Position Planning"
      subtitle="Manage staffing requirements for operations, media, and technical teams."
      badge="Workforce"
      actionLabel="+ Add Position"
      stats={stats}
      columns={columns}
      rows={rows}
      emptyMessage="No position records available."
    />
  );
};

export default Positions;
