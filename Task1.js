function Task1() {
  console.log("Program started");
  let isPending = true;

  console.log("Promise is pending...");
  console.log("Program in progress...");

  const myPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        reject(new Error("Promise rejected after 2 seconds"));
      }, 2000);
      setTimeout(() => {
        resolve("Promise resolved after 3 seconds");
      }, 3000);
    
  });   
  myPromise
    .then(message => {
      console.log(message);
      console.log("Program Completed");
    })
    .catch(err => {
      console.log(err);
      console.log("Promise Failure");
    });
}

Task1();


