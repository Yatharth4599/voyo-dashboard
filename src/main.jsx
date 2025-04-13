import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";

export default function AppRouter() {
  return (
    <BrowserRouter basename="/dashboard">
      <Routes>
        <Route path="/" element={<App />} />
        {/* add more routes here if needed */}
      </Routes>
    </BrowserRouter>
  );
}
