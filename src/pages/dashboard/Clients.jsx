import React from "react";
import DashboardDataPage from "./DashboardDataPage";

const rows = [
  {
    client: "Aster Robotics School",
    company: "Aster Education Group",
    email: "ops@asteredu.in",
    activeEvents: 3,
    tier: "Gold",
    status: "Active",
  },
  {
    client: "TechLeap Foundation",
    company: "TechLeap NGO",
    email: "events@techleap.org",
    activeEvents: 2,
    tier: "Silver",
    status: "Active",
  },
  {
    client: "FutureMinds Academy",
    company: "FutureMinds Pvt Ltd",
    email: "admin@futureminds.in",
    activeEvents: 1,
    tier: "Bronze",
    status: "Pending Review",
  },
  {
    client: "InnoSpark School Group",
    company: "InnoSpark Networks",
    email: "team@innospark.org",
    activeEvents: 2,
    tier: "Gold",
    status: "Active",
  },
];

const columns = [
  { key: "client", label: "Client" },
  { key: "company", label: "Organization" },
  { key: "email", label: "Email" },
  { key: "activeEvents", label: "Active Events" },
  { key: "tier", label: "Tier" },
  { key: "status", label: "Status" },
];

const Clients = () => {
  const totalEvents = rows.reduce((sum, row) => sum + row.activeEvents, 0);

  const stats = [
    { label: "Registered Clients", value: rows.length, meta: "Account base this season" },
    { label: "Active Events", value: totalEvents, meta: "Running engagements" },
    { label: "Gold Tier", value: 2, meta: "Priority support clients" },
    { label: "Pending KYC", value: 1, meta: "Compliance team follow-up" },
  ];

  return (
    <DashboardDataPage
      title="Client Directory"
      subtitle="Manage client organizations, engagement tier, and account health."
      badge="Users"
      actionLabel="+ Add Client"
      stats={stats}
      columns={columns}
      rows={rows}
      emptyMessage="No client data available."
    />
  );
};

export default Clients;
