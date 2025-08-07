function setTimeoutPromisifi(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function callback() {
	console.log("3 seconds have passed");
}

setTimeoutPromisifi(3000).then(callback)



// ****
// PROMISE CLASS says that i will take one function as an input and
//  the first arguments of the function  when ever call then,
//  i will call what ever you pass in .then()



// “The Promise class takes one function as input.
// That function receives two arguments: resolve and reject.
// When resolve is called, whatever you passed in .then() will be executed.”