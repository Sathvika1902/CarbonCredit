import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";
import Navbar from "./components/Navbar";
import AdminPanel from "./components/AdminPanel";
import Marketplace from "./components/Marketplace";
import ProfileWallet from "./components/ProfileWallet";
import Retirement from "./components/Retirement";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/wallet" element={<ProfileWallet />} />
        <Route path="/retire" element={<Retirement />} />
      </Routes>
    </Router>
  );
}

export default App;
