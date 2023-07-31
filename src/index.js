import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { createRoot } from "react-dom/client"; // createRoot를 react-dom/client에서 가져오기

import Daejeon from "./component/pages/city/daejeon";
import Gwangju from "./component/pages/city/gwangju";
import Jamsil from "./component/pages/city/jamsil";
import Suwon from "./component/pages/city/suwon";
import Sajik from "./component/pages/city/sajik";
import Gocheock from "./component/pages/city/gocheok";
import Changwon from "./component/pages/city/changwon";
import Incheon from "./component/pages/city/incheon";

import Chat from "./component/pages/chat";
import Matching from "./component/pages/Matching";
import Weather from "./component/api/geolocation";
import SignIn from "./component/pages/SignIn";
import SignUp from "./component/pages/SignUp";
import Info from "./component/pages/Info";

const root = document.getElementById("root");
const rootElement = (
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/SignIn" element={<SignIn />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/Info" element={<Info />} />
        <Route path="/Matching" element={<Matching />} />
        <Route path="/Weather" element={<Weather />} />
        <Route path="/incheon" element={<Incheon />} />
        <Route path="/changwon" element={<Changwon />} />
        <Route path="/daejeon" element={<Daejeon />} />
        <Route path="/gocheock" element={<Gocheock />} />
        <Route path="/gwangju" element={<Gwangju />} />
        <Route path="/jamsil" element={<Jamsil />} />
        <Route path="/suwon" element={<Suwon />} />
        <Route path="/sajik" element={<Sajik />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </Router>
  </React.StrictMode>
);

const rootContainer = createRoot(root); // createRoot를 사용하여 렌더링하기
rootContainer.render(rootElement);

reportWebVitals();
