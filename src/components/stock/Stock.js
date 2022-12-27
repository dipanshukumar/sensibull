import React, { useEffect, useState } from 'react'
import useFetch from '../../Custom/useFetch';
import { useLocation } from 'react-router-dom';

function Stock() {
  const [exp, setExp] = useState([]);
  let message = useLocation()
  let symbol = message.state.value
  const [data] = useFetch(`https://prototype.sbulltech.com/api/v2/quotes/${symbol}`)
  let json;
  let quotes;
  if(data){
    json = JSON.parse(JSON.stringify(data[0]).replaceAll(/\\/g,"").replaceAll('["{','[{').replaceAll('}"]','}]').replaceAll('true"','true'));
    quotes = json[0].payload[symbol];
    quotes.sort(function(a,b){
      // Turn your strings into dates, and then subtract them
      return new Date(a.time) - new Date(b.time);
    });  
  }

  useEffect(()=>{
    let inter = setInterval(()=>{
      if(quotes){
        quotes.forEach((a)=>{
          let expired = new Date(a.valid_till) >= new Date();
          if(expired){
            setExp([a, expired])
          }
        })
      }
    },10000);
    return () => clearInterval(inter);
  },[])

  return (
    <div className='main-wrapper'>
    { quotes ?
    <table>
      <thead>
        <tr>
          {Object.keys(quotes[0]).map((a,i) => {
            return <td key={i}>{a}</td>
          })}
        </tr>
      </thead>
      <tbody>
        {quotes.map((a, i)=>{
            return(
              <tr key={i}>
                <td>{a.price}</td>
                <td>{a.time}</td>
                <td>{a.valid_till}</td>
              </tr>
            )
        })}
      </tbody>
    </table>
    : "NO DATA FOUND"}
    </div>
  )
}

export default Stock;