import React from "react";

export default function Transactions() {
    return (
        <div className="transaction_card">
            <div className="left_bar"></div>
            <div className="transaction_description">
                <p>
                    { }-{ } @{ }
                </p>
                <p>Paid:$ { }</p>
                <p>
                    Bought on: { },{ }
                </p>
            </div>
        </div>
    );
}
