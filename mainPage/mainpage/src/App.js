import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./layout/home";
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
import SignUp from "./layout/pages/SignUp";

export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
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
    </>
  );
}
