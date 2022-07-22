import React from "react";

export default function Coins(props) {
    return (
        <div className="coin-container">
            <div className="coin_icon">
                <img src="" alt="" srcset="" />
            </div>
            <div className="coin_status">
                <h1>{props.name}</h1>
                <h3>{props.price}</h3>
                <p>Last 24hr:{props.change}</p>
            </div>
        </div>
    );
}
