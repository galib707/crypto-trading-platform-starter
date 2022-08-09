import React from "react";

export default function Transactions(props) {
    //console.log(props.elem['trans-type'])
    return (
        <div className="transaction_card">
            <div className={`left_bar ${props.elem['trans-type'] === 'Buy' ? 'green' : 'red'}`} ></div>
            <div className="transaction_description">
                <p>
                    {props.elem.Cname} - {props.elem.currQ} @{props.elem.currRate}
                </p>
                {props.elem['trans-type'] === 'Buy' ?
                    <p>Paid: ${props.elem.tp}</p>
                    : <p>Received: ${props.elem.got}</p>
                }
                <p>
                    {props.elem['trans-type'] === 'Buy' ? 'Bought' : 'Sold'} on: {props.elem.timeStamp}
                </p>
            </div>
        </div >
    );
}
