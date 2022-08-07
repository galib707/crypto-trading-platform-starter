import React from "react";

export default function Transactions(props) {
    return (
        <div className="transaction_card">
            <div className="left_bar"></div>
            <div className="transaction_description">
                <p>
                    {props.elem.name} - {props.elem.currQ} @{props.elem.currRate}
                </p>
                <p>Paid: ${props.elem.tp}</p>
                <p>
                    Bought on: {props.elem.timeStamp}
                </p>
            </div>
        </div>
    );
}
