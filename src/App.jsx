import { useRef, useReducer, useEffect, useState } from "react";
import Coins from "./components/Coins";
import Holdings from "./components/Holdings";
import Transactions from "./components/Transactions";

import CryptoContext from "./contexts/CryptoContext";

const ACTIONS = {
  THEME: "update-theme",
  COINS: "add-to-coinsList",
  HOLDS: "add-to-holdingsList",
  TRANS: "add-to-transactionsList",
  NAME: "boxName",
  PRICE: "boxPrice",
  WALLET: "wallet",
  VALUE: "value",
  QUANTITY: "quantity",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.THEME:
      if (state.theme === "light") {
        return { ...state, theme: "dark" };
      } else {
        return { ...state, theme: "light" };
      }

    case ACTIONS.COINS:
      state.coins = action.payLoad.slice();
      return { ...state };

    case ACTIONS.NAME:
      state.boxName = action.payLoad;
      return { ...state };

    case ACTIONS.PRICE:
      state.boxPrice = action.payLoad;
      return { ...state };

    case ACTIONS.WALLET:
      state.wallet = action.payLoad;
      return { ...state };

    case ACTIONS.VALUE:
      return { ...state };

    case ACTIONS.QUANTITY:
      state.quantity = action.payLoad;
      return { ...state };

    default:
      return state;
  }
}

function App() {
  let [state, dispatch] = useReducer(reducer, {
    theme: "dark",
    coins: [],
    holdings: [],
    transactions: [],
    boxName: null,
    boxPrice: null,
    wallet: 1000,
    value: 0,
    quantity: 0,
  });

  let [popup, setPopup] = useState('');

  function displayCoins(data) {
    dispatch({ type: ACTIONS.COINS, payLoad: data });
  }

  const handleClick = (name, price) => {
    dispatch({ type: ACTIONS.NAME, payLoad: name });
    dispatch({ type: ACTIONS.PRICE, payLoad: price });
    setPopup(() => 'popup');
  };
  let intervalID = useRef();
  useEffect(function () {
    intervalID.current = setInterval(function () {
      getData();
      console.log("rendered");
    }, 5000);

    getData();

    async function getData() {
      //https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20dogecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=%601h%2C24h%2C7d%60
      let response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20dogecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=%601h%2C24h%2C7d%60`
      );
      let data = await response.json();
      displayCoins(data);
    }
    return () => {
      clearInterval(intervalID.current);
    };
  }, []);

  return (
    <CryptoContext.Provider value={{}}>
      <div className={`container ${popup}`}>
        <main className="App">
          <section className="top">
            <h1 className="title">Earn some virtual money 💰</h1>
            <p className="sub-title">To buy virtual food🍕</p>
            <h2 className="wallet">🏛 Wallet : ${state.wallet}</h2>
            <h3 className="value">Porfolio Value: ${state.price}</h3>
          </section>

          <section className="mid">
            {state.coins.map((elem, ind) => {
              return (
                <Coins
                  setPopup={setPopup}
                  name={elem.name}
                  price={elem["current_price"]}
                  change={elem[
                    "price_change_percentage_24h_in_currency"
                  ].toFixed(2)}
                  image={elem.image}
                  handleClick={handleClick}
                  key={elem.id}
                />
              );
            })}
          </section>

          <section className="bottom">
            <div className="holdings-cont">
              <h1>Current Holdings</h1>
              {/* <button className="add_to_holdings">Go buy some 🚀</button> */}
              <Holdings />
            </div>
            <div className="transactions-cont">
              <h1>Transactions</h1>
              <Transactions />
            </div>
          </section>

          <section className="buy_box">
            <div className="buy_box_header">
              <p>Buy : {state.boxName}</p>
              <button className="close" onClick={() => {
                setPopup(() => '');
              }}
              >X</button>
            </div>
            <div className="buy_box_body">
              <p>Current Price: <b>${state.boxPrice}</b></p>
              <div className="input_max_amount">
                <input
                  type="number"
                  name=""
                  id="quantity"
                  onChange={(e) => {
                    dispatch({
                      type: ACTIONS.QUANTITY,
                      payLoad: e.target.value,
                    });
                  }}
                />
                <p>Max:{(state.wallet / state.boxPrice).toFixed(5)}</p>
              </div>
              <p>You will be charged $ {state.quantity * state.boxPrice}</p>
              <div className="radio_button">
                <input type="radio" id="buy" name="action" />{" "}
                <label htmlFor="buy">Buy</label>
                <br />
                <input type="radio" id="sell" name="action" />{" "}
                <label htmlFor="sell">Sell</label>
              </div>
              <div className="buy">
                <button className="buy_button">Buy</button>
              </div>
            </div>
          </section>
          <div className="overlay"></div>
        </main>
      </div>
    </CryptoContext.Provider>
  );
}

export default App;
