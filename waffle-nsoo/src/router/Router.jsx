import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "../component/Navigation/Header";
import Login from "../component/pages/Login";
import Nav from "../component/pages/Nav";
import Weather from "../component/pages/Weather";
import Home from "../component/pages/Home";

const Router = () => {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="pages/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Nav" element={<Nav />} />
        <Route path="/Weather" element={<Weather />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
