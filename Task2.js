console.log("Program Started");

const firstPromise =new Promise((resolve)=>{
   setTimeout(()=>{
    resolve("Step 1 Completed");
   },3000);
   console.log("Promise state: pending");
})

firstPromise.then((message)=>{
   console.log(message);
   console.log("Program in progress...");

   return new Promise((res)=>{
     setTimeout(()=>{
     res("Step 2 Completed");
     },3000)
     console.log("Promise state: pending");
   })
   .then((message)=>{
    console.log(message);
    console.log("Program complete");
   })
   .catch((error) => {
    console.log("Program failure");
    console.log(error);
  })
})