
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { getAuthHeader, logout } from "../../utils/auth";
import { getUser } from "../../utils/auth";
import DashboardLayout from "../../layouts/DashboardLayout";
import { dataportfolio, worktimeline, services, introdata, dataabout, skills, meta, contactConfig, socialprofils } from "../../content_option";
import { projects } from "../../data/projects";
import certificates from "../../data/certificates";

export const Dashboard = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";
    async function fetchProfile() {
      // If a user object was returned at login and persisted, use it to avoid an extra API call
      const stored = getUser();
      if (stored) {
        setProfile(stored);
        setLoading(false);
        return;
      }
      try {
        // Align with backend namespace used by login helper
        const res = await fetch(`${API_BASE}/api/users/me`, {
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


  // Sidebar with selection state
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const sidebar = (
    <nav>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><button style={{ background: "none", border: "none", color: selectedSection === "dashboard" ? "#2563eb" : undefined, fontWeight: "bold", cursor: "pointer" }} onClick={() => setSelectedSection("dashboard")}>Dashboard</button></li>
        <li><button style={{ background: "none", border: "none", color: selectedSection === "profile" ? "#2563eb" : undefined, fontWeight: "bold", cursor: "pointer" }} onClick={() => setSelectedSection("profile")}>Profile</button></li>
        <li><button style={{ background: "none", border: "none", color: selectedSection === "projects" ? "#2563eb" : undefined, fontWeight: "bold", cursor: "pointer" }} onClick={() => setSelectedSection("projects")}>Projects</button></li>
        <li><button style={{ background: "none", border: "none", color: selectedSection === "certificates" ? "#2563eb" : undefined, fontWeight: "bold", cursor: "pointer" }} onClick={() => setSelectedSection("certificates")}>Certificates</button></li>
        <li><button style={{ background: "none", border: "none", color: selectedSection === "experience" ? "#2563eb" : undefined, fontWeight: "bold", cursor: "pointer" }} onClick={() => setSelectedSection("experience")}>Experience</button></li>
        <li><button style={{ background: "none", border: "none", color: selectedSection === "services" ? "#2563eb" : undefined, fontWeight: "bold", cursor: "pointer" }} onClick={() => setSelectedSection("services")}>Services</button></li>
        <li><button onClick={handleLogout} className="btn-logout" style={{ width: "100%", marginTop: 16 }}>Logout</button></li>
      </ul>
    </nav>
  );

  // Main content area: show section based on sidebar selection
  const [editProfile, setEditProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: profile?.name || introdata.title || "",
    description: introdata.description || "",
    about: dataabout.aboutme || "",
    email: contactConfig.YOUR_EMAIL || "",
    phone: contactConfig.YOUR_FONE || "",
    github: socialprofils.github || "",
    linkedin: socialprofils.linkedin || "",
  });

  useEffect(() => {
    setProfileForm({
      name: profile?.name || introdata.title || "",
      description: introdata.description || "",
      about: dataabout.aboutme || "",
      email: contactConfig.YOUR_EMAIL || "",
      phone: contactConfig.YOUR_FONE || "",
      github: socialprofils.github || "",
      linkedin: socialprofils.linkedin || "",
    });
  }, [profile]);

  const handleProfileChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    // Here you would call an API to update profile, or update local state/JSON
    setEditProfile(false);
    setProfile({ ...profile, name: profileForm.name });
    // Optionally show a success message
  };

  let mainContent;
  if (selectedSection === "profile") {
    mainContent = (
      <div className="dash-container">
        <h2>Profile</h2>
        <div className="dash-card">
          {!editProfile ? (
            <>
              <p><strong>Name:</strong> {profileForm.name}</p>
              <p><strong>Description:</strong> {profileForm.description}</p>
              <p><strong>About:</strong> {profileForm.about}</p>
              <p><strong>Email:</strong> {profileForm.email}</p>
              <p><strong>Phone:</strong> {profileForm.phone}</p>
              <p><strong>Github:</strong> <a href={profileForm.github} target="_blank" rel="noopener noreferrer">{profileForm.github}</a></p>
              <p><strong>LinkedIn:</strong> <a href={profileForm.linkedin} target="_blank" rel="noopener noreferrer">{profileForm.linkedin}</a></p>
              <button onClick={() => setEditProfile(true)} className="btn-login" style={{ marginTop: 12 }}>Edit Profile</button>
            </>
          ) : (
            <form onSubmit={handleProfileSave} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <label>Name: <input name="name" value={profileForm.name} onChange={handleProfileChange} /></label>
              <label>Description: <input name="description" value={profileForm.description} onChange={handleProfileChange} /></label>
              <label>About: <textarea name="about" value={profileForm.about} onChange={handleProfileChange} /></label>
              <label>Email: <input name="email" value={profileForm.email} onChange={handleProfileChange} /></label>
              <label>Phone: <input name="phone" value={profileForm.phone} onChange={handleProfileChange} /></label>
              <label>Github: <input name="github" value={profileForm.github} onChange={handleProfileChange} /></label>
              <label>LinkedIn: <input name="linkedin" value={profileForm.linkedin} onChange={handleProfileChange} /></label>
              <div style={{ display: "flex", gap: 8 }}>
                <button type="submit" className="btn-login">Save</button>
                <button type="button" className="btn-logout" onClick={() => setEditProfile(false)}>Cancel</button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  } else if (selectedSection === "projects") {
    mainContent = (
      <div className="dash-container">
        <h2>Projects</h2>
        <div className="dash-section">
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {projects.map((proj, idx) => (
              <div key={idx} className="dash-card" style={{ width: 260 }}>
                <strong>{proj.title}</strong>
                <p>{proj.tagline}</p>
                <a href={proj.demoLink} target="_blank" rel="noopener noreferrer">Demo</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  } else if (selectedSection === "certificates") {
    mainContent = (
      <div className="dash-container">
        <h2>Certificates</h2>
        <ul>
          {certificates.map(cert => (
            <li key={cert.id} style={{ marginBottom: 8 }}>
              <strong>{cert.title}</strong> - {cert.issuer} ({cert.date})
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (selectedSection === "experience") {
    mainContent = (
      <div className="dash-container">
        <h2>Experience</h2>
        <ul>
          {worktimeline.map((exp, idx) => (
            <li key={idx} style={{ marginBottom: 8 }}>
              <strong>{exp.jobtitle}</strong> at {exp.where} ({exp.date})
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (selectedSection === "services") {
    mainContent = (
      <div className="dash-container">
        <h2>Services</h2>
        <ul>
          {services.map((srv, idx) => (
            <li key={idx} style={{ marginBottom: 8 }}>
              <strong>{srv.title}</strong>: {srv.description}
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    mainContent = (
      <div className="dash-container">
        <h2>Dashboard</h2>
        <div className="dash-card">
          <p>Welcome{profile && profile.name ? `, ${profile.name}` : ""}!</p>
          <p className="muted">You are logged in.</p>
        </div>
        <div className="dash-section">
          <h3>Portfolio</h3>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {dataportfolio.map((item, idx) => (
              <div key={idx} className="dash-card" style={{ width: 260 }}>
                <img src={item.img} alt="portfolio" style={{ width: "100%", height: 120, objectFit: "cover", borderRadius: 8 }} />
                <p>{item.description}</p>
                <a href={item.link} target="_blank" rel="noopener noreferrer">Visit</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout sidebar={sidebar}>
      {mainContent}
    </DashboardLayout>
  );
};

export default Dashboard;
