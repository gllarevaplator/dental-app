import React, { useState, useEffect } from "react";
import LeftBottomWhite1 from "../../tooth/Left Bottom White/Group 2430.png";
import LeftBottomWhite2 from "../../tooth/Left Bottom White/Group 2431.png";
import LeftBottomBlue1 from "../../tooth/Left Bottom Blue/1-Left-Tooth-Top-1-blue.png";
import LeftBottomBlue2 from "../../tooth/Left Bottom Blue/4-Left-Tooth-Bottom-2-blue.png";

export default function Treatments() {
  const [leftBottomTooth1, setLeftBottomTooth1] = useState(false);
  const [leftBottomTooth2, setLeftBottomTooth2] = useState(false);

  useEffect(() => {
    document.title = "Treatments";
  }, []);

  return (
    <div className="container mt-4">
      <h1>Treatments</h1>
      <img
        src={leftBottomTooth1 ? LeftBottomBlue1 : LeftBottomWhite1}
        alt=""
        width="30px"
        height="auto"
        onClick={() => setLeftBottomTooth1((prevTooth) => !prevTooth)}
      />
      <img
        src={leftBottomTooth2 ? LeftBottomBlue2 : LeftBottomWhite2}
        alt=""
        width="30px"
        height="auto"
        onClick={() => setLeftBottomTooth2((prevTooth) => !prevTooth)}
      />
    </div>
  );
}
