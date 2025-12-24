import React from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { certificates } from "../../data/certificates";

export const Certificate = () => {
  return (
    <HelmetProvider>
      <section id="certificate" className="certificate-page">
        <Helmet>
          <meta charSet="utf-8" />
          <title>Certificate</title>
          <meta name="description" content="My certificates and course completions" />
        </Helmet>

        <div className="container">
          <h2 className="section-title">Certificates</h2>
          <p className="section-sub">A collection of my completed courses and certificates.</p>

          <div className="cert-grid">
            {certificates && certificates.length > 0 ? (
              certificates.map((c) => (
                <div key={c.id} className="cert-card">
                  <div className="cert-body">
                    <h3 className="cert-title">{c.title}</h3>
                    <div className="cert-meta">
                      <span className="cert-issuer">{c.issuer}</span>
                      <span className="cert-date">{new Date(c.date).toLocaleDateString()}</span>
                    </div>
                    <div className="cert-actions">
                      <a href={c.url} target="_blank" rel="noreferrer" className="btn-link">View Certificate</a>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No certificates available yet.</p>
            )}
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};

export default Certificate;
