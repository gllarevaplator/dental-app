import React, { useEffect } from "react";

export default function Treatments() {
  useEffect(() => {
    document.title = "Treatments";
  }, []);
  return (
    <div className="container mt-4">
      <h1>Treatments</h1>
    </div>
  );
}
