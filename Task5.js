 function fetchWithTimeout(url, timeout) {
    const timeoutPromise = new Promise((resolve, reject) =>
        setTimeout(() => reject(new Error('Request timed out')), timeout)
    );
    const fetchPromise = fetch(url).then(response => {
        if (!response) {
            throw new Error('Network response was not ok');
        }
        return response.json(); 
    });
    return Promise.race([fetchPromise, timeoutPromise]);
}
fetchWithTimeout('https://api.coindesk.com/v1/bpi/currentprice.json', 1000)
    .then(data => console.log(data))
    .catch(error => console.error(error));
