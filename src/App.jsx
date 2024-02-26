import { useState, useEffect } from 'react'
import './styles.css'

import stockData from './data/stockData'
import Stock from './components/Stock'
export default function App() {
  const [currentData, setCurrentData] = useState(stockData);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentData(prevData => prevData.map(stock => {
        const randomChange = (Math.random() * 20).toFixed(2);
        const newPrice = parseFloat(stock.currentPrice) + (Math.random() > 0.5 ? parseFloat(randomChange) : -parseFloat(randomChange));
        return {
          ...stock,
          currentPrice: newPrice.toFixed(2)
        };
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <header>
        <img className='app-logo' src='./images/app-logo.svg' alt='App Logo' />
        <h1>
          <span>Stok Takip</span>
        </h1>
      </header>
      <div className='wrapper'>
        {currentData.map(stock => <Stock key={stock.stockName} stock={stock} />)}
      </div>
    </div>
  );
}