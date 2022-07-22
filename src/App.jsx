import { useRef, useReducer, useEffect } from "react";
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

    case ACTIONS.COINS:
      state.coins = action.payLoad.slice();
      return { ...state };

    default:
      return state;
  }
}

function App() {
  let [state, dispatch] = useReducer(reducer, { theme: 'dark', coins: [], holdings: [], transactions: [] });

  function displayCoins(data) {
    dispatch({ type: ACTIONS.COINS, payLoad: data });
  }

  let intervalID = useRef();
  useEffect(function () {
    intervalID.current = setInterval(function () {
      getData();
      console.log('rendered');
    }, 5000)

    getData();

    async function getData() {
      //https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20dogecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=%601h%2C24h%2C7d%60
      let response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20dogecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=%601h%2C24h%2C7d%60`);
      let data = await response.json();
      displayCoins(data);
    }
    return (() => {
      clearInterval(intervalID.current);
    })
  }, [])

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
            {state.coins.map((elem, ind) => { return <Coins name={elem.name} price={elem["current_price"]} change={elem["price_change_percentage_24h_in_currency"].toFixed(2)} image={elem.image} /> })}
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
