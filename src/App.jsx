import "./App.css";
import Coins from "./components/Coins";
import Holdings from "./components/Holdings";
import Transactions from "./components/Transactions";

import CryptoContext from './contexts/CryptoContext'

function App() {
  return (
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
  )
}

export default App;
