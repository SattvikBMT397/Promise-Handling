function Task3(){
    console.log("Program Started");
    const myPromise = new Promise((resolve,reject)=>{
        setTimeout(()=>{
       resolve({data: "Hello, friend!", error: null});
        },5000);
        console.log("Promise Pending");
        console.log("Program in Progress");
    });
    myPromise.then((message)=>{
       console.log(message);
       return new Promise ((resolve,reject)=>{
        setTimeout(()=>{
            resolve("First promise chain complete!");
        },2000)
        console.log("Promise Pending");
        console.log("Program in Progress");
    })
       }).then((message)=>{
              console.log(message);
              return new Promise((resolve,reject)=>{
               setTimeout(()=>{
                   resolve("Second promise chain complete!")
               },10000)
               console.log("Promise Pending");
               console.log("Program in Progress");
              }).then((message)=>{
                console.log(message);
              })
       })
}
Task3();