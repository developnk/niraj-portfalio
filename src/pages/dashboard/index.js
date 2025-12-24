import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { getAuthHeader, logout } from "../../utils/auth";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_BASE = process.env.REACT_APP_API_URL || "";
    async function fetchProfile() {
      try {
        const res = await fetch(`${API_BASE}/auth/me`, {
          headers: { ...getAuthHeader(), "Content-Type": "application/json" },
        });
        if (!res.ok) {
          throw new Error("Not authenticated");
        }
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        // if not authenticated, redirect to login
        logout();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }
    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (loading) return <div className="dash-loading">Loading...</div>;

  return (
    <section className="dashboard-page">
      <div className="dash-container">
        <h2>Dashboard</h2>
        <div className="dash-card">
          <p>Welcome{profile && profile.name ? `, ${profile.name}` : ""}!</p>
          <p className="muted">You are logged in.</p>
          <div className="dash-actions">
            <button onClick={handleLogout} className="btn-logout">Logout</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
