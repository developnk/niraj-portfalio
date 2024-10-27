import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  useLocation,
} from "react-router-dom";
import withRouter from "../hooks/withRouter";
import AppRoutes from "./routes";
import Headermain from "../header";
import AnimatedCursor from "../hooks/AnimatedCursor";
import "./App.css";

// Scroll function to handle left-to-right or right-to-left scrolling
function _ScrollToRight({ scrollDirection, children }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (scrollDirection === "left-to-right") {
      window.scrollTo({
        top: 0,
        left: 0, // Start from the left
        behavior: 'smooth', // Smooth scrolling effect
      });
    } else if (scrollDirection === "right-to-left") {
      window.scrollTo({
        top: 0,
        left: document.body.scrollWidth, // Start from the right
        behavior: 'smooth', // Smooth scrolling effect
      });
    }
  }, [pathname, scrollDirection]);

  return children;
}

const ScrollToRight = withRouter(_ScrollToRight);

export default function App() {
  // You can pass "left-to-right" or "right-to-left" for horizontal scrolling direction
  return (
    <Router basename={process.env.PUBLIC_URL}>
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
      {/* Toggle scrollDirection between "left-to-right" and "right-to-left" */}
      <ScrollToRight scrollDirection="left-to-right">
        <Headermain />
        <AppRoutes />
      </ScrollToRight>
    </Router>
  );
}
