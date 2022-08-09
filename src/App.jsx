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
  BUY: "buy-coin"
};

function reducer(state, action) {
  console.log(action);
  switch (action.type) {
    case ACTIONS.THEME:
      if (state.theme === "light") {
        return { ...state, theme: "dark" };
      } else {
        return { ...state, theme: "light" };
      }

    case ACTIONS.COINS:
      state.coins = action.payLoad.slice();
      for (let i = 0; i < state.holdings.length; i++) {
        for (let j = 0; j < state.coins.length; j++) {
          if (state.holdings[i].Cname === state.coins[j].name) {
            state.holdings[i].cp = (Number(state.holdings[i].currQ) * Number(state.coins[j]["current_price"])).toFixed(3);
            state.holdings[i].pl = (((state.holdings[i].cp - state.holdings[i].tp) / state.holdings[i].tp) * 100).toFixed(3);
            break;
          }
        }
      }
      return { ...state };

    case ACTIONS.NAME:
      state.boxName = action.payLoad;
      return { ...state };

    case ACTIONS.PRICE:
      state.boxPrice = Number(action.payLoad);
      return { ...state };

    case ACTIONS.WALLET:
      state.wallet = (state.wallet - action.payLoad).toFixed(3);
      return { ...state };

    case ACTIONS.VALUE:
      return { ...state };

    case ACTIONS.QUANTITY:
      state.quantity = action.payLoad;
      return { ...state };

    case ACTIONS.HOLDS:
    // let found = false;
    // let copy = state.holdings.slice();
    // for (let i = 0; i < copy.length; i++) {
    //   if (copy[i].Cname === action.payLoad.Cname) {
    //     found = true;
    //     copy[i].currQ = copy[i].currQ + action.payLoad.currQ;
    //     copy[i].tp = (Number(copy[i].tp) + Number(action.payLoad.tp)).toFixed(3);
    //     copy[i].cp = (Number(copy[i].cp) + Number(action.payLoad.cp)).toFixed(3);
    //     copy[i].pl = (((copy[i].cp - copy[i].tp) / copy[i].tp) * 100).toFixed(3);
    //     break;
    //   }
    // }
    // if (!found) {
    //   copy.push(action.payLoad);
    // }
    // return { ...state, holdings: copy };

    case ACTIONS.TRANS:
    // let copy1 = state.transactions.slice();
    // console.log(action.payLoad);
    // copy1.push(action.payLoad);
    // // console.log(state.transactions);
    // return { ...state, transactions: copy1 };

    case ACTIONS.BUY:
      let found = false;
      let copy = state.holdings.slice();
      for (let i = 0; i < copy.length; i++) {
        if (copy[i].Cname === action.payLoad.Cname) {
          found = true;
          copy[i].currQ = copy[i].currQ + action.payLoad.currQ;
          copy[i].tp = (Number(copy[i].tp) + Number(action.payLoad.tp)).toFixed(3);
          copy[i].cp = (Number(copy[i].cp) + Number(action.payLoad.cp)).toFixed(3);
          copy[i].pl = (((copy[i].cp - copy[i].tp) / copy[i].tp) * 100).toFixed(3);
          break;
        }
      }
      if (!found) {
        copy.push({ ...action.payLoad });
      }

      let copy1 = state.transactions.slice();
      //console.log(action.payLoad);
      copy1.push({ ...action.payLoad });
      // console.log(state.transactions);
      return { ...state, holdings: copy, transactions: copy1, wallet: (state.wallet - action.payLoad.tp).toFixed(3) };

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
    wallet: 100000,
    value: 0,
    quantity: 0,
  });

  let [popup, setPopup] = useState('');
  let [act, setAct] = useState('Buy');

  function handleAct(action, currCoin, currRate, currQuantity) {
    if (action === 'Buy') {
      let objData = {
        'Cname': currCoin,
        'currRate': currRate,
        'currQ': currQuantity,
        'tp': Number((currQuantity * currRate).toFixed(3)),
        'cp': Number((currQuantity * currRate).toFixed(3)),
        'timeStamp': new Date().toString(),
      }
      objData.pl = (((objData.cp - objData.tp) / objData.tp).toFixed(4)) * 100;
      //console.log(objData);
      // dispatch({ type: ACTIONS.TRANS, payLoad: objData });
      // dispatch({ type: ACTIONS.HOLDS, payLoad: objData });
      // dispatch({ type: ACTIONS.WALLET, payLoad: objData.tp });
      dispatch({ type: ACTIONS.BUY, payLoad: objData })
      //state.transactions.push(objData);
    }
  }

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
    }, 50000);

    getData();

    async function getData() {
      //https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20dogecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=%601h%2C24h%2C7d%60
      let response = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin%2C%20ethereum%2C%20dogecoin&order=market_cap_desc&per_page=100&page=1&sparkline=false&price_change_percentage=%601h%2C24h%2C7d%60`
      );
      let data = await response.json();
      displayCoins(data);
    }

    //console.log(state)
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
                  ].toFixed(3)}
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
              {
                // useEffect(function () {
                state.holdings.map((elem, indx) => {
                  return <Holdings key={indx} elem={elem} />
                })
                // }, [state.holdings])
              }
            </div>
            <div className="transactions-cont">
              <h1>Transactions</h1>
              {
                // useEffect(function () {
                state.transactions.map((elem, indx) => {
                  return <Transactions key={`${elem}-${indx}`} elem={elem} />
                })
                // }, [state.transactions])
              }
            </div>
          </section>

          <section className="buy_box">
            <div className="buy_box_header">
              <p>{act} : {state.boxName}</p>
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
                <p>Max:{(state.wallet / state.boxPrice).toFixed(3)}</p>
              </div>
              <p>You will be charged $ {(state.quantity * state.boxPrice).toFixed(3)}</p>
              <div className="radio_button">
                <input type="radio" id="buy" name="action" value={'Buy'} onChange={(e) => {
                  setAct(() => e.target.value);
                }} />{" "}
                <label htmlFor="buy">Buy</label>
                <br />
                <input type="radio" id="sell" name="action" value={'Sell'} onChange={(e) => {
                  setAct(() => e.target.value);
                }} />{" "}
                <label htmlFor="sell">Sell</label>
              </div>
              <div className="buy">
                <button className="buy_button" onClick={() => {
                  handleAct(act, state.boxName, Number(state.boxPrice), Number(state.quantity));
                }}>{act}</button>
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
