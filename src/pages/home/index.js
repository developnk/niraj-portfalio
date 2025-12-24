import React, { useState, useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { introdata, meta } from "../../content_option";
import { Link } from "react-router-dom";

export const Home = () => {
  const [count, setCount] = useState(null);
  const [showVisit, setShowVisit] = useState(false);

  useEffect(() => {
    const ref = document.referrer;
    function isSearchForDevelopnk() {
      if (!ref) return false;
      try {
        const u = new URL(ref);
        const params = new URLSearchParams(u.search);
        const q = params.get('q') || params.get('query') || '';
        if (q && (q.includes('developnk.com') || decodeURIComponent(q).includes('developnk.com'))) return true;
        if (ref.includes('developnk.com')) return true;
      } catch (e) {
        return false;
      }
      return false;
    }

    if (isSearchForDevelopnk()) {
      setShowVisit(true);
      const namespace = 'developnk.com';
      const key = 'visits';
      const flagKey = 'visit_hit_developnk_visits';
      const hitUrl = `https://api.countapi.xyz/hit/${namespace}/${key}`;
      const getUrl = `https://api.countapi.xyz/get/${namespace}/${key}`;

      if (!sessionStorage.getItem(flagKey)) {
        fetch(hitUrl)
          .then((res) => res.json())
          .then((data) => {
            if (data && typeof data.value !== 'undefined') setCount(data.value);
            sessionStorage.setItem(flagKey, '1');
          })
          .catch(() => {
            fetch(getUrl)
              .then((r) => r.json())
              .then((d) => { if (d && typeof d.value !== 'undefined') setCount(d.value); })
              .catch(() => setCount(null));
          });
      } else {
        fetch(getUrl)
          .then((res) => res.json())
          .then((data) => {
            if (data && typeof data.value !== 'undefined') setCount(data.value);
          })
          .catch(() => setCount(null));
      }
    }
  }, []);

  return (
    <HelmetProvider>
      <section id="home" className="home">
        <Helmet>
          <meta charSet="utf-8" />
          <title> {meta.title}</title>
          <meta name="description" content={meta.description} />
        </Helmet>
        <div className="intro_sec d-block d-lg-flex align-items-center ">
          <div
            className="h_bg-image order-1 order-lg-2 h-100 "
            style={{ backgroundImage: `url(${introdata.your_img_url})` }}
          ></div>
          <div className="text order-2 order-lg-1 h-100 d-lg-flex justify-content-center">
            <div className="align-self-center ">
              <div className="intro mx-auto">
                <h2 className="mb-1x">{introdata.title}</h2>
                <h1 className="fluidz-48 mb-1x">
                  <Typewriter
                    options={{
                      strings: [
                        introdata.animated.first,
                        introdata.animated.second,
                        introdata.animated.third,
                      ],
                      autoStart: true,
                      loop: true,
                      deleteSpeed: 10,
                    }}
                  />
                </h1>
                <p className="mb-1x">{introdata.description}</p>
                <div className="intro_btn-action pb-5">
                  <Link to="/portfolio" className="text_2">
                    <div id="button_p" className="ac_btn btn ">
                      My Portfolio
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
                  <Link to="/contact">
                    <div id="button_h" className="ac_btn btn">
                      Contact Me
                      <div className="ring one"></div>
                      <div className="ring two"></div>
                      <div className="ring three"></div>
                    </div>
                  </Link>
                </div>
                <Link to="/DownloadCV" className="text_3">
                  <div className="ac_btn btn" id="button_p1">
                    Download CV
                  </div>
                </Link>
                {showVisit && (
                  <div className="visit-widget" title="Visitors from searches for https://developnk.com/">
                    <h4 className="visit-title">Visit</h4>
                    <div className="visit-count">{count !== null ? count : "..."}</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </HelmetProvider>
  );
};
