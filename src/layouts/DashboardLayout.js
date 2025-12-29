import React from "react";
// import "./DashboardLayout.css";


import { useEffect } from "react";

const DashboardLayout = ({ sidebar, children }) => {
  // Ensure theme is set on initial load
  useEffect(() => {
    const theme = localStorage.getItem("theme") || "dark";
    document.documentElement.setAttribute("data-theme", theme);
  }, []);
  return (
    <div className="dashboard-layout" style={{ border: "2px solid #444", minHeight: "100vh", background: "var(--bg-color)" }}>
      <aside className="dashboard-sidebar" style={{ borderRight: "2px solid #333", background: "var(--primary-color)", color: "var(--text-color, #fff)" }}>{sidebar}</aside>
      <main className="dashboard-main">{children}</main>
    </div>
  );
};

export default DashboardLayout;
