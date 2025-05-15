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
/*
Approach 2: using bind
Function.prototype.bind creates a new function with a specified this value and initial arguments, without executing the original function immediately. It allows you to permanently bind a specific context (this value) to the function and partially apply arguments if needed. 
*/

Function.prototype.myCall2 = function (thisArg, ...argArray) {
    return this.bind(thisArg)(...argArray);
  };
/*
Approach 3: using apply
Function.prototype.call and Function.prototype.apply are very similar. Here's an easy way to remember each function's signature:

Function.prototype.call starts with "C" and takes in a Comma-separated list of arguments
Function.prototype.apply starts with "A" and takes in an Array of arguments
*/
Function.prototype.myCall3 = function (thisArg, ...argArray) {
    return this.apply(thisArg, argArray);
  };

/*
Approach 4: using Symbol
- JavaScript Boxes Primitives Automatically (Implicitly) when we use .call()
When you write:
*/
function show() {
  console.log(typeof this);
}

show.call("hello"); // object
/*
Approach 4: using Symbol
- JavaScript Boxes Primitives Automatically (Implicitly) when we use .call()
When you write:
Internally, JavaScript does this:
1. It sees that "hello" is a primitive.
2. It wraps it into an object: new String("hello").
3. Then it assigns that as this for the call.
In case if it's null or undefined, depends on the strict mode. If in strict mode, it will throw error. If not strict, it will replace with windown/global object
When You’re Re-implementing .call(), JS Doesn't Help You --> boxing must do manually
So if thisArg is primitives, we box it using Object(thisArg), and if it is not error will be thrown
- Then we define wrapperObj which has tempo function property with key [sym] and value "this". This refers to the function that calls myCall. 
- Object.defineProperty(wrapperObj, sym, { enumerable: false, value: this }) is more precise. enumerable: false → hidden in loops like for...in. configurable: false (default unless you set it).writable: false (default unless you set it)
- After this we can have : delete wrapperObj[sym]; // Clean up after we asign it to other variable. We then return the variable.
*/

Function.prototype.myCall = function (thisArg, ...argArray) {
  const sym = Symbol();
  const wrapperObj = Object(thisArg);
  Object.defineProperty(wrapperObj, sym, {
    enumerable: false,
    value: this,
  });

  return wrapperObj[sym](...argArray);
};
