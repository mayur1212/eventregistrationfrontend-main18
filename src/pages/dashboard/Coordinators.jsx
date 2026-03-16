import React from "react";
import DashboardDataPage from "./DashboardDataPage";

const rows = [
  {
    name: "Riya Sharma",
    zone: "West",
    assignedEvents: 4,
    phone: "+91 98765 44221",
    onDuty: "On-Duty",
    lastUpdated: "2026-03-04 10:50",
  },
  {
    name: "Aman Verma",
    zone: "North",
    assignedEvents: 3,
    phone: "+91 98765 11234",
    onDuty: "On-Duty",
    lastUpdated: "2026-03-04 10:20",
  },
  {
    name: "Nikita Patil",
    zone: "Central",
    assignedEvents: 2,
    phone: "+91 99222 88990",
    onDuty: "Pending",
    lastUpdated: "2026-03-03 18:10",
  },
  {
    name: "Ritesh Deshmukh",
    zone: "West",
    assignedEvents: 3,
    phone: "+91 99666 33990",
    onDuty: "On-Duty",
    lastUpdated: "2026-03-04 09:45",
  },
];

const columns = [
  { key: "name", label: "Coordinator" },
  { key: "zone", label: "Zone" },
  { key: "assignedEvents", label: "Assigned Events" },
  { key: "phone", label: "Phone" },
  { key: "onDuty", label: "Duty Status" },
  { key: "lastUpdated", label: "Last Updated" },
];

const Coordinators = () => {
  const stats = [
    { label: "Total Coordinators", value: rows.length, meta: "Field + desk coordinators" },
    { label: "On Duty", value: 3, meta: "Available for live operations" },
    { label: "Assigned Events", value: 12, meta: "Current event allocation" },
    { label: "Zones Covered", value: 3, meta: "Regional support footprint" },
  ];

  return (
    <DashboardDataPage
      title="Coordinator Roster"
      subtitle="View assignments, shift status, and coordination coverage by zone."
      badge="Users"
      actionLabel="+ Add Coordinator"
      stats={stats}
      columns={columns}
      rows={rows}
      emptyMessage="No coordinator records available."
    />
  );
};

export default Coordinators;
