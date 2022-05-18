import React, { useState, useEffect } from "react";

const Treatments = () => {
  useEffect(() => {
    document.title = "Treatments";
  }, []);

  return (
    <div className="container mt-4">
      <h1>Treatments</h1>
    </div>
  );
};

export default Treatments;
