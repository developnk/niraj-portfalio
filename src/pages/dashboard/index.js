import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAuthHeader, logout, getUser } from "../../utils/auth";
import DashboardLayout from "../../layouts/DashboardLayout";

import {
  dataportfolio,
  worktimeline,
  services,
  introdata,
  dataabout,
  contactConfig,
  socialprofils,
} from "../../content_option";

import { projects } from "../../data/projects";
import certificates from "../../data/certificates";

const Dashboard = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState("dashboard");
  const [editProfile, setEditProfile] = useState(false);

  const [profileForm, setProfileForm] = useState({
    name: "",
    description: "",
    about: "",
    email: "",
    phone: "",
    github: "",
    linkedin: "",
  });

  /* ================= AUTH / PROFILE ================= */
  useEffect(() => {
    const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

    const fetchProfile = async () => {
      const stored = getUser();
      if (stored) {
        setProfile(stored);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/api/users/me`, {
          headers: { ...getAuthHeader(), "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setProfile(data);
      } catch {
        logout();
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

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

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleProfileChange = (e) => {
    setProfileForm({ ...profileForm, [e.target.name]: e.target.value });
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    setProfile({ ...profile, name: profileForm.name });
    setEditProfile(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-xl font-semibold">
        Loading...
      </div>
    );
  }

  /* ================= SIDEBAR ================= */
  const sidebar = (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-blue-600">Niraj Pandey</h2>
        <p className="text-sm text-black-500">Welcome back</p>
      </div>

      <nav className="space-y-1">
        {[
          ["dashboard", "Dashboard"],
          ["profile", "Profile"],
          ["projects", "Projects"],
          ["certificates", "Certificates"],
          ["experience", "Experience"],
          ["services", "Services"],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setSelectedSection(key)}
            className={`w-full text-left px-4 py-2 rounded-lg font-medium transition
              ${
                selectedSection === key
                  ? "bg-blue-600 text-white shadow"
                  : "hover:bg-gray-100"
              }`}
          >
            {label}
          </button>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        className="w-full mt-6 px-4 py-2 rounded-lg bg-red-500 text-white font-semibold hover:bg-red-600"
      >
        Logout
      </button>
    </div>
  );

  /* ================= MAIN CONTENT ================= */
  let mainContent;

  /* DASHBOARD */
  if (selectedSection === "dashboard") {
    mainContent = (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold">
          Welcome{profile?.name ? `, ${profile.name}` : ""}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {[
            ["Projects", projects.length],
            ["Certificates", certificates.length],
            ["Experience", worktimeline.length],
            ["Services", services.length],
          ].map(([title, value], i) => (
            <div key={i} className="bg-white p-5 rounded-xl shadow">
              <p className="text-sm text-black-500">{title}</p>
              <h3 className="text-2xl font-bold">{value}</h3>
            </div>
          ))}
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4">Portfolio</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {dataportfolio.map((item, i) => (
              <div key={i} className="bg-white rounded-xl shadow overflow-hidden">
                <img src={item.img} alt="" className="h-40 w-full object-cover" />
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 font-semibold"
                  >
                    Visit →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* PROFILE */
  if (selectedSection === "profile") {
    mainContent = (
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Profile</h2>

        <div className="bg-white p-6 rounded-xl shadow">
          {!editProfile ? (
            <>
              {Object.entries(profileForm).map(([k, v]) => (
                <div key={k} className="mb-3">
                  <p className="text-sm text-black-500 capitalize">{k}</p>
                  <p className="font-medium">{v}</p>
                </div>
              ))}

              <button
                onClick={() => setEditProfile(true)}
                className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-lg"
              >
                Edit Profile
              </button>
            </>
          ) : (
            <form onSubmit={handleProfileSave} className="space-y-3">
              {Object.entries(profileForm).map(([k, v]) => (
                <input
                  key={k}
                  name={k}
                  value={v}
                  onChange={handleProfileChange}
                  className="w-full border rounded px-3 py-2"
                  placeholder={k}
                />
              ))}
              <div className="flex gap-3">
                <button className="px-4 py-2 bg-blue-600 text-white rounded">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setEditProfile(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    );
  }

  /* PROJECTS */
  if (selectedSection === "projects") {
    mainContent = (
      <div>
        <h2 className="text-2xl font-bold mb-4">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {projects.map((p, i) => (
            <div key={i} className="bg-white p-5 rounded-xl shadow">
              <h3 className="font-bold">{p.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{p.tagline}</p>
              <a href={p.demoLink} className="text-blue-600 font-semibold">
                View →
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* CERTIFICATES */
  if (selectedSection === "certificates") {
    mainContent = (
      <div>
        <h2 className="text-2xl font-bold mb-4">Certificates</h2>
        <ul className="space-y-3">
          {certificates.map((c) => (
            <li key={c.id} className="bg-white p-4 rounded-xl shadow">
              <strong>{c.title}</strong> – {c.issuer} ({c.date})
            </li>
          ))}
        </ul>
      </div>
    );
  }

  /* EXPERIENCE */
  if (selectedSection === "experience") {
    mainContent = (
      <div>
        <h2 className="text-2xl font-bold mb-4">Experience</h2>
        <ul className="space-y-4">
          {worktimeline.map((e, i) => (
            <li key={i} className="bg-white p-5 rounded-xl shadow border-l-4 border-blue-600">
              <strong>{e.jobtitle}</strong>
              <p className="text-sm text-black-500">
                {e.where} • {e.date}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  /* SERVICES */
  if (selectedSection === "services") {
    mainContent = (
      <div>
        <h2 className="text-2xl font-bold mb-4">Services</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {services.map((s, i) => (
            <li key={i} className="bg-white p-5 rounded-xl shadow">
              <strong>{s.title}</strong>
              <p className="text-sm text-gray-600">{s.description}</p>
            </li>
          ))}
        </ul>
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
