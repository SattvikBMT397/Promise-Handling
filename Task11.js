async function batchFetch(urls,batchSize){
    const result=[]

  const fetching =async(data)=>{
        const promises = data.map(url => fetch(url).then(response => response.json()));
            return Promise.all(promises);
    }
    for(let i=0;i<urls.length;i+=batchSize){
        let data= urls.slice(i,i+batchSize)
        const batchResults = await fetching(data);
        result.push(...batchResults);
    }   
    return result;
}

const urls = [
    "https://api.coindesk.com/v1/bpi/currentprice.json",
    "https://catfact.ninja/fact",
    "https://api.genderize.io/?name=luc",
    "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
];
 batchFetch(urls,2).then((data)=>{
    console.log(data)
 })
 .catch()
{
console.error();
}