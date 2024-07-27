async function fetchSequentially(urls) {
    const results = [];

    for (const url of urls) {
        try {
            const response = await fetch(url);
            if (!response) {
                throw new Error(`Error fetching ${url}: ${response.statusText}`);
            }
            const data = await response.json();
            results.push(data);
        } catch (error) {
            results.push({ error: error.message });
        }
    }

    return results;
}

const urls = [
    "https://api.coindesk.com/v1/bpi/currentprice.json",
    "https://catfact.ninja/fact",
    "https://api.genderize.io/?name=luc",
    "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
];

fetchSequentially(urls)
    .then(results => console.log(results))
    .catch(error => console.error(error));
