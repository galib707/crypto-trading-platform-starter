import { useState, useReducer } from "react";
import Coins from "./components/Coins";
import Holdings from "./components/Holdings";
import Transactions from "./components/Transactions";

import CryptoContext from './contexts/CryptoContext'


const ACTIONS = {
  THEME: 'update-theme',
  COINS: 'add-to-coinsList',
  HOLDS: 'add-to-holdingsList',
  TRANS: 'add-to-transactionsList',
  deleteCOMPLETED: 'delete-completed-tasks'
}

function reducer(state, action) {
  switch (action.type) {

    case ACTIONS.THEME:
      if (state.theme === 'light') {
        return { ...state, theme: 'dark' }
      } else {
        return { ...state, theme: 'light' }
      }


    default:
      return state;
  }
}

function App() {
  let [state, dispatch] = useReducer(reducer, { theme: 'dark', coins: [], holdings: [], transactions: [] });

  useEffect(() => {
    async function getData() {
      // /https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2CEthereum%2Cdogecoin&vs_currencies=usd&include_24hr_change=true
      let response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2CEthereum%2Cdogecoin&vs_currencies=usd&include_24hr_change=true`);
      let data = await response.json();
      setMoviesList(data.results);
      setLoading(false);
    }
    getData()
    console.log('rendered');
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
            <Coins />
          </section>

          <section className="bottom">
            <div className="holdings-cont">
              <Holdings />
            </div>
            <div className="transactions-cont">
              <Transactions />
            </div>
          </section>
        </main>
      </div>
    </CryptoContext.Provider>
  )
}

export default App;
