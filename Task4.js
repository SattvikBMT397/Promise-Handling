async function fetchWithRetry(url, retries) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      return data;
    } catch (error) {
      if (retries > 0) {
        console.log(`Retrying... Attempts left: ${retries}`);
        return fetchWithRetry(url, retries - 1); 
      } else {
        throw new Error(`Failed to fetch data after multiple attempts: ${error.message}`);
      }
    }
  }
  fetchWithRetry('https://api.coindesk.com/v1/bpi/currentprce.json', 3)
    .then(data => console.log(data))
    .catch(error => console.error(error));
  