
/* 
BLOCK ELEMENTS VS INLINE ELEMENTS
vertical align: 
- block: no vertical alginment
- inline: vertical alignment
- inline-block: vertical alignment
margin and padding:
-inline: when float becomes block element which allows margin and padding adjustment
- inline: only horizontally respected, vertically rely on line height

TYPE CHECK
- always use strict ==== to check if a value is undefined or null because null == undefined is true
*/
Function.prototype.myCall = function (thisArg, ...argArray) {
   const functionBeforeCall = this;
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
  
  console.log(multiplyAge.myCall(mary)); // 21
  console.log(multiplyAge.myCall(john, 2)); // 84
