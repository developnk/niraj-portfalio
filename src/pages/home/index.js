import React, { useState, useEffect } from "react";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import Typewriter from "typewriter-effect";
import { introdata, meta } from "../../content_option";
import { Link } from "react-router-dom";
import { doc, getDoc, updateDoc, setDoc, increment } from "firebase/firestore";
import { db } from "../../firebase"; // adjust path if needed

export const Home = () => {
  const [count, setCount] = useState(null);
  const [showVisit, setShowVisit] = useState(true);

useEffect(() => {
  const flagKey = "firebase_visit_hit";
  const docRef = doc(db, "counter", "developnk");

  const updateVisitor = async () => {
    try {
      if (!sessionStorage.getItem(flagKey)) {
        await setDoc(
          docRef,
          { count: increment(1) },
          { merge: true }
        );
        sessionStorage.setItem(flagKey, "1");
      }

      const snap = await getDoc(docRef);
      if (snap.exists()) {
        setCount(snap.data().count);
      }
    } catch (error) {
      console.error("Visitor counter error:", error);
    }
  };

  updateVisitor();
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
