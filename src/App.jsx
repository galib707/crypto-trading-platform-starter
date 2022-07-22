<<<<<<< HEAD
import { useRef, useReducer, useEffect } from "react";
=======
import { useState, useReducer, useEffect } from "react";
>>>>>>> ae38a9ae89b4a88a69585066a448c88628671ca0
import Coins from "./components/Coins";
import Holdings from "./components/Holdings";
import Transactions from "./components/Transactions";

import CryptoContext from "./contexts/CryptoContext";

const ACTIONS = {
  THEME: "update-theme",
  COINS: "add-to-coinsList",
  HOLDS: "add-to-holdingsList",
  TRANS: "add-to-transactionsList",
  deleteCOMPLETED: "delete-completed-tasks",
};

function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.THEME:
      if (state.theme === "light") {
        return { ...state, theme: "dark" };
      } else {
        return { ...state, theme: "light" };
      }

<<<<<<< HEAD
    case ACTIONS.COINS:
      state.coins = { ...action.payLoad };
      return { ...state };

=======
>>>>>>> ae38a9ae89b4a88a69585066a448c88628671ca0
    default:
      return state;
  }
}

function App() {
<<<<<<< HEAD
  let [state, dispatch] = useReducer(reducer, { theme: 'dark', coins: {}, holdings: [], transactions: [] });

  function displayCoins(data) {
    dispatch({ type: ACTIONS.COINS, payLoad: data });
  }

  let intervalID = useRef();
  useEffect(function () {
    intervalID.current = setInterval(function () {
      async function getData() {
        // /https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2CEthereum%2Cdogecoin&vs_currencies=usd&include_24hr_change=true
        let response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2CEthereum%2Cdogecoin&vs_currencies=usd&include_24hr_change=true`);
        let data = await response.json();
        displayCoins(data);
      }
      getData()
      console.log('rendered');
    }, 5000)

    return (() => {
      clearInterval(intervalID.current);
    })
  }, [])
=======
  let [state, dispatch] = useReducer(reducer, {
    theme: "dark",
    coins: [],
    holdings: [],
    transactions: [],
  });

  useEffect(() => {
    async function getData() {
      // /https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2CEthereum%2Cdogecoin&vs_currencies=usd&include_24hr_change=true
      let response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2CEthereum%2Cdogecoin&vs_currencies=usd&include_24hr_change=true`
      );
      let data = await response.json();
      console.log(data);
    }

    getData();
    console.log("rendered");
  }, []);
>>>>>>> ae38a9ae89b4a88a69585066a448c88628671ca0

  return (
    <CryptoContext.Provider value={{}}>
      <div className="container">
        <main className="App">
          <section className="top">
            <h1 className="title">Earn some virtual money 💰</h1>
            <p className="sub-title">To buy virtual food🍕</p>
            <h2 className="wallet">🏛 Wallet : ${59.35}</h2>
            <h3 className="value">Porfolio Value: ${40.56}</h3>
          </section>

          <section className="mid">
            {Object.keys(state.coins).map((elem, ind) => { return <Coins name={elem} price={state.coins[elem].usd} change={state.coins[elem]["usd_24h_change"].toFixed(2)} /> })}
          </section>

          <section className="bottom">
            <div className="holdings-cont">
              <h1>Current Holdings</h1>
              <Holdings />
            </div>
            <div className="transactions-cont">
              <h1>Transactions</h1>
              <Transactions />
            </div>
          </section>
        </main>
      </div>
    </CryptoContext.Provider>
  );
}

export default App;
