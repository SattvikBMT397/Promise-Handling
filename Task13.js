async function fetchWithFallback(urls) {
    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Failed to fetch from ${url}`);
            }
            return await response.json();
        } catch (error) {
            return { error: error.message };
        }
    };
    const fetchPromises = urls.map(url => fetchData(url));

    const results = await Promise.allSettled(fetchPromises);
    const successfulResults = results
        .filter(result => result.status === 'fulfilled' && !result.value.error)
        .map(result => result.value);

    if (successfulResults.length > 0) {
        return successfulResults;
    } else {
        throw new Error('All fetches failed.');
    }
}

const urls = [
    "https://api.coindesk.com/v1/bpi/currentprice.json",
    "https://catfact.ninja/fact",
    "https://api.genderize.io/?name=luc",
    "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
];

fetchWithFallback(urls)
    .then(results => console.log('Successful fetch results:', results))
    .catch(error => console.error('Error:', error.message));
