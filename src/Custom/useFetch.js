import { useState, useEffect } from 'react';
import Papa from 'papaparse';

function useFetch(url) {
    const [data, setData] = useState(null);
    
    function fetchCsv(){
        return fetch(url).then((response) => {
            let reader = response.body.getReader();
            let decoder = new TextDecoder('utf-8');

            return reader.read().then((result) => {
                return decoder.decode(result.value);
            });
        });
    }

    async function getCsvData() {
        let csvData = await fetchCsv();

        Papa.parse(csvData, {
            complete: function(results) {
                setData(results.data);
            }
        });
    }
  
    useEffect(()=>{
      getCsvData()
    }, [url])

    return [data]
}

export default useFetch