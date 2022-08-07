import React from "react";

export default function Coins(props) {
    return (
        <div
            className="coin-container"
            onClick={() => {
                props.handleClick(props.name, Number(props.price));
            }}
        >
            <div className="coin_icon">
                <img src={props.image} alt="" />
            </div>
            <div className="coin_status">
                <h3>$ {props.price}</h3>
                <h1>{props.name}</h1>
                <p>Last 24hr: <b style={{color: props.change<0?'red':'green'}}>{props.change}%</b></p>
            </div>
        </div>
    );
}
