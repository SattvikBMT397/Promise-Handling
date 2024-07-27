function fetchAllWithErrors(urls) {
  const fetching = urls.map(url=>fetch(url).then(res=>
  {
    if(res){
      return res.json();
    }
    throw new Error(`Error Fetching ${url}:${response.statusText}`);
  }
  ))
  return new Promise((resolve,reject)=>{
    Promise.all(fetching.map(res=>res.catch(e=>e))).then(results=>{
      const firstError = results.find(result => result instanceof Error);
        if (firstError) {
          reject(firstError);
        } else {
          resolve(results);
        }
    })
  })
}

const urls = [
  "https://api.coindesk.com/v1/bpi/currentprice.json","https://catfact.ninja/fact",
  "https://api.genderize.io/?name=luc",
  "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
 ];

fetchAllWithErrors(urls)
.then(results => console.log(results))
.catch(error => console.error('Failed:', error));
