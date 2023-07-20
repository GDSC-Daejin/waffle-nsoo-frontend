import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Daejeon from "./layout/pages/daejeon";
import Gwangju from "./layout/pages/gwanghu";
import Jamsil from "./layout/pages/jamsil";
import Suwon from "./layout/pages/suwon";
import Sajik from "./layout/pages/sajik";
import Gocheock from "./layout/pages/gocheok";
import Changwon from "./layout/pages/changwon";
import Incheon from "./layout/pages/incheon";

ReactDOM.render(
  <Router>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/incheon" element={<Incheon />} />
      <Route path="/changwon" element={<Changwon />} />
      <Route path="/daejeon" element={<Daejeon />} />
      <Route path="/gocheock" element={<Gocheock />} />
      <Route path="/gwangju" element={<Gwangju />} />
      <Route path="/jamsil" element={<Jamsil />} />
      <Route path="/suwon" element={<Suwon />} />
      <Route path="/sajik" element={<Sajik />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);

reportWebVitals();
