import React from 'react';
import '../Styles/Result.css';
const Result = ({ time, cash, rate, money, firstCurrency, secondCurrency }) => {

    const time2 = time.slice(0, 10);
    const correctTime = new Date(time2 * 1000).toLocaleString()
    const correctCash = Number(cash).toFixed(2).toString().replace(".", ",");
    const correctRate = Number(rate).toFixed(5).toString().replace(".", ",");
    const correctMoney = Number(money).toFixed(2).toString().replace(".", ",");
    return (
        <div className='oneResult'>
            <p>{`${correctMoney} ${firstCurrency} = `}<span className='bold'>{correctCash}</span> <span className='bold'>{secondCurrency}</span> | <span>{correctTime}</span> | <span>Kurs {correctRate}</span></p>
        </div>
    );
}

export default Result;