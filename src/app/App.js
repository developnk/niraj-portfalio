import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";
import withRouter from "../hooks/withRouter";
import AppRoutes from "./routes";
import Headermain from "../header";
import AnimatedCursor  from "../hooks/AnimatedCursor";
import "./App.css";

// Top to button navigation

function _ScrollToTop(props) {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return props.children;
}
const ScrollToTop = withRouter(_ScrollToTop);

// left to right navigation
// function _ScrollToRight(props) {
//   const { pathname } = useLocation();

//   useEffect(() => {
//     window.scrollTo({
//       top: 0, // Ensure it scrolls to the top vertically
//       left: 0, // Start the scroll from the left
//       behavior: 'smooth' // Use smooth scrolling for a nice effect
//     });
//   }, [pathname]);

//   return props.children;
// }

// const ScrollToRight = withRouter(_ScrollToRight);

export default function App() {
  // Derive a safe basename for Router:
  // - during development serve at root (`/`)
  // - in production derive path from PUBLIC_URL (supports full URL or a path)
  const getBasename = () => {
    if (process.env.NODE_ENV === "development") return "/";
    const pub = process.env.PUBLIC_URL || "/";
    try {
      // If PUBLIC_URL is a full URL, extract its pathname
      if (pub.startsWith("http")) return new URL(pub).pathname.replace(/\/$/, "") || "/";
      return pub;
    } catch (e) {
      return "/";
    }
  };

  return (
    <Router basename={getBasename()}>
      <div className="cursor__dot">
        <AnimatedCursor
          innerSize={15}
          outerSize={15}
          color="255, 255 ,255"
          outerAlpha={0.4}
          innerScale={0.7}
          outerScale={5}
        />
      </div>
      <ScrollToTop>
        <Headermain />
        <AppRoutes />
      </ScrollToTop>
    </Router>
  );
}
