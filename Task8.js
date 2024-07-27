function fetchAnyWithErrors(urls) {
    const fetchWithHandling = url => 
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error fetching ${url}: ${response.statusText}`);
                }
                return response.json();
            })
            .catch(error => ({ error: error.message })); 

    const fetchPromises = urls.map(fetchWithHandling);

    return Promise.allSettled(fetchPromises)
        .then(results => {
            const success = results.find(result => result.status === 'fulfilled');
            
            if (success) {
                return success.value;
            }
            const errors = results
                .filter(result => result.status === 'rejected')
                .map(result => result.reason.message || 'Unknown error');

            throw new Error(`All requests failed: ${errors.join(', ')}`);
        });
}
const urls = [
    "https://api.coindesk.com/v1/bpi/currentprice.json",
    "https://catfact.ninja/fact",
    "https://api.genderize.io/?name=luc",
    "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
];

fetchAnyWithErrors(urls)
    .then(data => console.log(data))
    .catch(error => console.error(error));
