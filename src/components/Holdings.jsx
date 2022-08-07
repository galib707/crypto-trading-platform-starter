import React from "react";

export default function Holdings(props) {
    return (
        <div className="holidings_card">
            <p>
                {props.elem.Cname} : {props.elem.currQ}
            </p>
            <p>
                Total Paid: ${props.elem.tp}, Current Value: ${props.elem.cp}
            </p>

            <p>P/L: <b style={{ color: props.elem.pl < 0 ? 'red' : 'green' }}>{props.elem.pl}%</b>🚀</p>
        </div>
    );
}
