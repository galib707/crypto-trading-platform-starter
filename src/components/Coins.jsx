import React from "react";

export default function Coins() {
  return (
    <div className="container">
      <div className="coin_icon">
        <img src="" alt="" srcset="" />
      </div>
      <div className="coin_status">
        <h1>{}</h1>
        <h3>{}</h3>
        <p>Last 24hr:{}</p>
      </div>
    </div>
  );
}
