import React from "react";
import DashboardDataPage from "./DashboardDataPage";

const rows = [
  {
    requestId: "PR-3101",
    client: "MakerHub Pune",
    completion: "60%",
    pendingItems: "Audio Crew, LED Wall",
    coordinator: "Riya S.",
    status: "Partial",
  },
  {
    requestId: "PR-3102",
    client: "Skyline School",
    completion: "45%",
    pendingItems: "MC Script, Safety Marshal",
    coordinator: "Aman V.",
    status: "Pending",
  },
  {
    requestId: "PR-3103",
    client: "Robowiz Institute",
    completion: "72%",
    pendingItems: "Photography Team",
    coordinator: "Nikita P.",
    status: "Under Review",
  },
  {
    requestId: "PR-3104",
    client: "FutureMinds Academy",
    completion: "55%",
    pendingItems: "Projection Setup",
    coordinator: "Ritesh D.",
    status: "Partial",
  },
];

const columns = [
  { key: "requestId", label: "Request ID" },
  { key: "client", label: "Client" },
  { key: "completion", label: "Completion" },
  { key: "pendingItems", label: "Pending Items" },
  { key: "coordinator", label: "Coordinator" },
  { key: "status", label: "Status" },
];

const PartialRequests = () => {
  const stats = [
    { label: "Active Partial", value: rows.length, meta: "Need follow-up actions" },
    { label: "Avg Completion", value: "58%", meta: "Across running requests" },
    { label: "Critical Blocks", value: 2, meta: "Require vendor allocation" },
    { label: "Assigned Coordinators", value: 4, meta: "Currently handling backlog" },
  ];

  return (
    <DashboardDataPage
      title="Partial Requests"
      subtitle="Monitor partially fulfilled event requests and close pending dependencies."
      badge="Events"
      actionLabel="+ Add Follow-up"
      stats={stats}
      columns={columns}
      rows={rows}
      emptyMessage="No partial requests in queue."
    />
  );
};

export default PartialRequests;
