import React from "react";
import DashboardDataPage from "./DashboardDataPage";

const rows = [
  {
    name: "Mayur Takke",
    email: "takkemayur456@gmail.com",
    access: "Super Admin",
    lastLogin: "2026-03-04 11:22",
    status: "Active",
  },
  {
    name: "Digambar Marathe",
    email: "digambarmarathe.9@gmail.com",
    access: "Operations Admin",
    lastLogin: "2026-03-04 09:10",
    status: "Active",
  },
  {
    name: "Nisha Patil",
    email: "nisha.patil@event18.com",
    access: "Finance Admin",
    lastLogin: "2026-03-03 17:42",
    status: "On Hold",
  },
];

const columns = [
  { key: "name", label: "Admin Name" },
  { key: "email", label: "Email" },
  { key: "access", label: "Access Level" },
  { key: "lastLogin", label: "Last Login" },
  { key: "status", label: "Status" },
];

const Admins = () => {
  const stats = [
    { label: "Total Admins", value: rows.length, meta: "Accounts with elevated access" },
    { label: "Active Sessions", value: 2, meta: "Currently signed in" },
    { label: "Privileges Updated", value: 1, meta: "In the last 7 days" },
    { label: "Security Alerts", value: 0, meta: "No high-risk activity" },
  ];

  return (
    <DashboardDataPage
      title="Admin Access Control"
      subtitle="Monitor admin access levels, account health, and recent activity."
      badge="Users"
      actionLabel="+ Add Admin"
      stats={stats}
      columns={columns}
      rows={rows}
      emptyMessage="No admin records available."
    />
  );
};

export default Admins;
