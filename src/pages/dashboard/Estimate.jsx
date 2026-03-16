import React from "react";
import DashboardDataPage from "./DashboardDataPage";

const rows = [
  {
    estimateNo: "EST-2201",
    client: "Aster Robotics School",
    event: "FLL Regional Qualifier",
    amount: "INR 1,45,000",
    validTill: "2026-03-10",
    status: "Pending Approval",
  },
  {
    estimateNo: "EST-2202",
    client: "TechLeap Foundation",
    event: "FTC District Event",
    amount: "INR 2,80,000",
    validTill: "2026-03-12",
    status: "Approved",
  },
  {
    estimateNo: "EST-2203",
    client: "FutureMinds Academy",
    event: "Workshop + Demo Day",
    amount: "INR 95,000",
    validTill: "2026-03-09",
    status: "Pending Review",
  },
  {
    estimateNo: "EST-2204",
    client: "STEMX Labs",
    event: "FRC Trial Scrimmage",
    amount: "INR 3,10,000",
    validTill: "2026-03-15",
    status: "On Hold",
  },
];

const columns = [
  { key: "estimateNo", label: "Estimate #" },
  { key: "client", label: "Client" },
  { key: "event", label: "Event" },
  { key: "amount", label: "Amount" },
  { key: "validTill", label: "Valid Till" },
  { key: "status", label: "Status" },
];

const Estimate = () => {
  const stats = [
    { label: "Total Estimates", value: rows.length, meta: "Draft + approved" },
    { label: "Approved", value: 1, meta: "Ready to convert into event" },
    { label: "Pending", value: 2, meta: "Awaiting client confirmation" },
    { label: "Pipeline Value", value: "INR 8,30,000", meta: "Current quote volume" },
  ];

  return (
    <DashboardDataPage
      title="Estimate Desk"
      subtitle="Track quote generation, approval status, and value pipeline."
      badge="Events"
      actionLabel="+ New Estimate"
      stats={stats}
      columns={columns}
      rows={rows}
      emptyMessage="No estimate records yet."
    />
  );
};

export default Estimate;
