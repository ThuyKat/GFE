Function.prototype.myCall = function (thisArg, ...argArray) {  
    //get the function that call myCall function
    const functionBeforeCall = this;
    // create function inside thisArg and refer it to the function that call myCall
    if(thisArg == null){
     thisArg = {}
     thisArg.age =1
    }
   
     thisArg.functionBeforeCall = functionBeforeCall;
     return thisArg.functionBeforeCall(...argArray);
     
    
     throw 'Not implemented!';
};
function multiplyAge(multiplier = 1) {
    return this.age * multiplier;
  }
  
  const mary = {
    age: 21,
  };
  
  const john = {
    age: 42,
  };
  
  multiplyAge.myCall(mary); // 21
  multiplyAge.myCall(john, 2); // 84

/*
The above code defines a custom implementation of the `call` method for functions.

With actual .call() method, if this is null or undefined, it will be replaced with the global object (window in browsers, global in Node.js). Or in strict mode, it will be null ( if .call(null)) or undefined if .call(undefined).
*/