import React from "react";
import DashboardDataPage from "./DashboardDataPage";

const rows = [
  {
    id: "NR-1012",
    client: "Aster Robotics School",
    eventType: "FLL Regional Qualifier",
    requestedOn: "2026-02-28",
    city: "Pune",
    priority: "High",
    status: "Pending Review",
  },
  {
    id: "NR-1013",
    client: "TechLeap Foundation",
    eventType: "FTC District Event",
    requestedOn: "2026-03-01",
    city: "Nashik",
    priority: "Medium",
    status: "Awaiting Documents",
  },
  {
    id: "NR-1014",
    client: "FutureMinds Academy",
    eventType: "Workshop + Demo Day",
    requestedOn: "2026-03-01",
    city: "Nagpur",
    priority: "Low",
    status: "Pending Review",
  },
  {
    id: "NR-1015",
    client: "STEMX Labs",
    eventType: "FRC Trial Scrimmage",
    requestedOn: "2026-03-02",
    city: "Mumbai",
    priority: "High",
    status: "Pending Approval",
  },
  {
    id: "NR-1016",
    client: "InnoSpark School Group",
    eventType: "Team Onboarding",
    requestedOn: "2026-03-03",
    city: "Aurangabad",
    priority: "Medium",
    status: "Under Review",
  },
];

const columns = [
  { key: "id", label: "Request ID" },
  { key: "client", label: "Client" },
  { key: "eventType", label: "Event Type" },
  { key: "requestedOn", label: "Requested On" },
  { key: "city", label: "City" },
  { key: "priority", label: "Priority" },
  { key: "status", label: "Status" },
];

const NewRequests = () => {
  const highPriority = rows.filter((row) => row.priority === "High").length;
  const todayRequests = rows.filter((row) => row.requestedOn === "2026-03-03").length;

  const stats = [
    { label: "Total New Requests", value: rows.length, meta: "Last 7 days intake" },
    { label: "High Priority", value: highPriority, meta: "Needs immediate assignment" },
    { label: "Today Added", value: todayRequests, meta: "Fresh leads for ops team" },
    { label: "Pending Review", value: 4, meta: "Waiting for manager action" },
  ];

  return (
    <DashboardDataPage
      title="New Requests Queue"
      subtitle="Review incoming event enquiries and move them to estimate or approval."
      badge="Events"
      actionLabel="+ Add Request"
      stats={stats}
      columns={columns}
      rows={rows}
      emptyMessage="No new requests right now."
    />
  );
};

export default NewRequests;
