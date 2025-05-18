/*
Implement Array.prototype.reduce. To avoid overwriting the actual Array.prototype.reduce which is being used by the autograder, we shall instead implement it as Array.prototype.myReduce.
*/

Array.prototype.myReduce = function (callbackFn, initialValue) {
    const arr = this;
    if(initialValue === undefined && arr.length==0){
      throw 'Not implemented!';
    }
    if(arr.length >0){
      let prev
      if(initialValue !== undefined){
        prev = callbackFn(initialValue,arr[0],0,arr) ;
      }else{
        prev = callbackFn(0,arr[0],0,arr) ;
      }
      
      for (let i=1; i<arr.length;i++){
        if(!(arr[i] !=0 && arr[i])){
          continue;
        }
        prev=callbackFn(prev,arr[i],i,arr);
      }
      return prev;
    }else{
      return 0
    }
    
    throw 'Not implemented!';
  };