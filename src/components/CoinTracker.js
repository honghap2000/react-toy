import {useEffect, useState} from "react";

function CoinTracker() {
    const [loading, setLoading] = useState(true);
    const [coins, setCoins] = useState([]);
    const [price, setPrice] = useState(0);
    const [krw, setKrw] = useState(0);

    const onChange = (event) => {
        setPrice(event.target.value);
    }

    const onChangeKrw = (event) => {
        setKrw(event.target.value);
    }

    useEffect(() => {
      fetch("https://api.coinpaprika.com/v1/tickers")
        .then((response) => response.json())
        .then((json) => {
          setCoins(json);    
          setPrice(json[0].quotes.USD.price)      
          setLoading(false);
        });
    }, []);
    console.log("d");
        
    return (
      <div>
        <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
        {loading ? (
          <strong>loading...</strong>
        ) : (
          <div>
            <select id="sltBtc" onChange={onChange}>
              {coins.map((coin) => (
                <option key={coin.id} value={coin.quotes.USD.price}>
                  {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price} USD
                </option>
              ))}
            </select> <br/>
            <input type="text" value={krw} onChange={onChangeKrw}/>KRW <br/>
            <span>{krw === 0 ? '' : price/krw*1182}</span>
          </div>
        )}
      </div>
    );
}

export default CoinTracker;