import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./layout/pages/SignIn";
import Daejeon from "./layout/pages/daejeon";
import Gwangju from "./layout/pages/gwangju";
import Jamsil from "./layout/pages/jamsil";
import Suwon from "./layout/pages/suwon";
import Sajik from "./layout/pages/sajik";
import Gocheock from "./layout/pages/gocheok";
import Changwon from "./layout/pages/changwon";
import Incheon from "./layout/pages/incheon";
import Chat from "./layout/pages/chat";
import { createRoot } from "react-dom/client"; // createRoot를 react-dom/client에서 가져오기
import SignUp from "./layout/pages/SignUp";

const root = document.getElementById("root");
const rootElement = (
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
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
