 function fetchWithExponentialBackoff(url, maxRetries){
   async function fetchData(attempt){
    try{
        const data =await fetch(url);
        if(!data.ok){
            throw new Error (`Failed to retrieve data`);
        }
        return await data.json();
    }
    catch(error){
         if(attempt<maxRetries){
            const backoffTime=Math.pow(attempt,10)*100;
            console.log(`${attempt} finished Retry after ${backoffTime} ms`);
            new Promise(resolve=>setTimeout(resolve,backoffTime));
            return fetchData(attempt+1);

         }
         else{
            throw new Error(`Failed to fetch from ${url} after ${maxRetries} attempts`);
         }
    }
   }
   return fetchData(0);

 }   

 const url = "https://api.coindesk.com/v1/bpi/currentprice.json";


 fetchWithExponentialBackoff(url, 5)
 .then(data => console.log('Fetched data:', data))
 .catch(error => console.error('Error:', error));
 