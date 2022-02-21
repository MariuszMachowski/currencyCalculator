import React, { useState } from 'react';
import Result from './Result';
import currencyList from '../currencyList';
import '../Styles/App.css';
const API = 'https://www.live-rates.com/rates';
const App = () => {
  const showOptions = () => {
    return currencyList.map(currency => <option key={currency.id} value={currency.code}>{currency.name}</option>)
  }
  const [firstCurrency, setFirstCurrency] = useState("EUR");
  const [secondCurrency, setSecondCurrency] = useState("USD");
  const [moneyValue, setMoneyValue] = useState(1);
  const [results, setResults] = useState([]);
  const handleChangeSecondCurrency = (e) => setSecondCurrency(e.target.value);
  const handleChangeFirstCurrency = (e) => setFirstCurrency(e.target.value);
  const handleChangeMoneyValue = (e) => setMoneyValue(e.target.value);
  const handleCalculateValue = () => {
    fetch(API)
      .then(res => {
        if (res.ok) {
          return res
        }
        throw new Error('Something went wrong!')
      })
      .then(res => res.json())
      .then(data => {
        const myCurrencyPair = `${firstCurrency}/${secondCurrency}`;
        const onePair = data.filter(object => object.currency === myCurrencyPair);
        if (data.length === 1) {
          return alert("Wykonałeś maksymalną ilość zapytań, spróbuj ponownie później")
        }
        else if (onePair.length === 0) {
          return alert("Brak informacji dla podanej pary walut")
        } else {
          const cash = (moneyValue * onePair[0].rate).toFixed(2);
          const newResult = { time: onePair[0].timestamp, rate: onePair[0].rate, cash, firstCurrency, secondCurrency, moneyValue }
          setResults([...results, newResult])
          setMoneyValue(1);
        }

      })
      .catch(err => console.log(err))
  }
  const showAllResults = () => {
    if (results.length > 0) {
      return results.map(result => <Result key={result.time} time={result.time} money={result.moneyValue} firstCurrency={result.firstCurrency} secondCurrency={result.secondCurrency} cash={result.cash} rate={result.rate} />)
    } else {
      return null
    }
  }
  return (
    <div className="app">
      <h1 className='title'>Kalkulator walut</h1>
      <div className="form">
        <div className='amount'>
          <p>Wpisz kwotę: </p>
          <input type="number" value={moneyValue} onChange={handleChangeMoneyValue} />
        </div>
        <div className='currency'>
          <p>Mam: </p>
          <select value={firstCurrency} onChange={handleChangeFirstCurrency}>
            {showOptions()}
          </select>
        </div>
        <div className='currency'>
          <p>Chcę: </p>
          <select value={secondCurrency} onChange={handleChangeSecondCurrency}>
            {showOptions()}
          </select>
        </div>
        <button className='calculator' onClick={handleCalculateValue}>Oblicz</button>
      </div>
      <div className="resultsWrap">
        {showAllResults()}
        <hr />
      </div>
    </div>
  );
}

export default App;
