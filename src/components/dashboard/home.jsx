import React, { useState, useEffect } from "react";
import HomeChart from "../charts/homeChart";

const Home = () => {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  return (
    <div className="container mt-4">
      <h1>Dashboard</h1>
      <div className="mt-4">
        <HomeChart />
      </div>
    </div>
  );
};

export default Home;
