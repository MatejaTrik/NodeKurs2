
const p = new Promise((resolve, reject) => {
    //kick off some async work
    // ...
    setTimeout(() => {
        resolve(1) // pending => resolved
        reject(new Error('Message')) //pending => rejected
    }, 2000);
});

p
    .then(result => console.log("result", result))
    .catch(err => console.log('Error', err.message))