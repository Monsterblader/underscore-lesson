(function() {
  
  // Call iterator(value, key, obj) for each element of obj
  var each = function(obj, iterator) {
    if(Array.isArray(obj)){
      for(var i = 0; i < obj.length; i++){
        iterator(obj[i], i, obj); 
      }
    }else{
      for(var i in obj){
        if(obj.hasOwnProperty(i)){
          iterator(obj[i], i, obj);
        }
      }
    }
  };

  // Determine if the array or object contains a given value (using `===`).
  var contains = function(obj, target) {
    var doesContain = false;
    _.each(obj, function(val){
      if(val === target){
        doesContain = true;
      }
    });
    return doesContain;    
  };

  // Return the results of applying an iterator to each element.
  var map = function(array, iterator) {
    var returnArray = [];
    if (array !== null) {
      _.each(array, function(value) {
        returnArray.push(iterator(value));
      });
    }
    return returnArray;
  };

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  var pluck = function(obj, property) {
    return _.map(obj, function(value, key, obj) {
      return value[property];
    });
  };

  // Return an array of the last n elements of an array. If n is undefined, return
  // just the last element
  // var last = function(array, n) {
  //   returnArray = [];
  //   if (array === null) {
  //     return undefined;
  //   }
  //   if (n === undefined) {
  //     return array.slice(-1);
  //   }
  //   if (n >= array.length) {
  //     return array;
  //   }

  //   _.each(array, function(value, key) {
  //     if (key >= array.length - n) {
  //       returnArray.push(value);
  //     }
  //   });

  //   return returnArray;
  // };

  var last = function(array, n) {
    var tempArray = [];

    if (array === null) {
      return undefined;
    }

    if (!Array.isArray(array)) {
      _.each(array, function(value) {
        tempArray.push(value);
      });
      array = tempArray;
    }
    
    n = n === undefined ? 1 : n;

    return n >= array.length ? array : array.slice(array.length - n);
  };


  // Like last, but for the first elements
  var first = function(array, n) {
    var tempArray = [];

    if (array === null) {
      return undefined;
    }

    if (!Array.isArray(array)) {
      _.each(array, function(value) {
        tempArray.push(value);
      });
      array = tempArray;
    }
    
    n = n === undefined ? 1 : n;

    return n >= array.length ? array : array.slice(0, n);
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  // 
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(previous_value, item){
  //     return previous_value + item;
  //   }, 0); // should be 6
  //
  var reduce = function(obj, iterator, initialValue) {
    var previousValue = initialValue === undefined ? 0 : initialValue;
    if(obj === null){
      obj = [0];
    }
    if (iterator() !== undefined) {
      _.each(obj, function(value){
        previousValue = iterator(previousValue, value);
      });
    }
    return previousValue;
  };
  // var reduce = function(obj, iterator, initialValue) {
  //   if(initialValue === undefined){
  //     initialValue = 0;
  //   }
  //   var sum = initialValue;
  //   if(obj === null){
  //     obj = [0];
  //   }
  //   if (iterator() !== undefined) {
  //     _.each(obj, function(value){
  //       sum += iterator(initialValue, value);
  //     });
  //   }
  //   return sum;
  // };

  // Return all elements of an array that pass a truth test.
  var select = function(array, iterator) {
    var returnArray = [];
    _.each(array, function(value) {
      if (iterator(value)) {
        returnArray.push(value);
      }
    });
    return returnArray;
  };

  // Return all elements of an array that don't pass a truth test.
  var reject = function(array, iterator) {
    var returnArray = [];
    _.each(array, function(value) {
      if (!iterator(value)) {
        returnArray.push(value);
      }
    });
    return returnArray;
  };

  // Determine whether all of the elements match a truth test.
  var every = function(obj, iterator) {
    var returnVal = true;
    _.each(obj, function(val){
      if(!iterator(val)) {
        returnVal = false;
      }
    })
    return returnVal;
  };

  // Determine whether any of the elements pass a truth test.
  var any = function(obj, iterator) {
    var returnVal = false;
    var newIterator = iterator;
    if (obj.length !== 0) {
      if (iterator === undefined) {
        newIterator = function(val) {
          return val;
        }
      };
      _.each(obj, function(val){
        if(newIterator(val)) {
          returnVal = true;
        }
      });
    };
    return returnVal;

  };

  // Produce a duplicate-free version of the array.
  var uniq = function(array) {
    var returnArray = [];
    _.each(array, function(value, key, array) {
      if (!_.contains(returnArray, value)) {
        returnArray.push(value);
      };
    });
    return returnArray;
  };

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  var once = function(func) {
    return function() {
      if (this.onceCalled === undefined) {
        func();
        this.onceCalled = true;
      };
    }
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  var memoize = function(func) {
    return function(n) {
      if (this.memoArray === undefined) {
        this.memoArray = {};
      };
      if (this.memoArray.n === undefined) {
        this.memoArray[n] = func(n);
      }
      return this.memoArray[n];
    }
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  var delay = function(func, wait) {
    setTimeout(func, wait);
  };

  // Extend a given object with all the properties of the passed in 
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  //
  var extend = function(obj) {
    var argumentArray = []
    _.each(arguments, function(value) {
      argumentArray.push(value);
    });
    var returnobj = {};
    _.each(argumentArray, function(val, index){
      var temp = argumentArray[index];
      _.each(Object.keys(temp), function(val, index){
        returnobj[Object.keys(temp)[index]] = temp[Object.keys(temp)[index]];
      });
    });
    return returnobj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  var defaults = function(obj) {
    var argumentArray = []
    _.each(arguments, function(value) {
      argumentArray.push(value);
    });
    var returnobj = argumentArray.shift();
    _.each(argumentArray, function(val, index){
      var temp = argumentArray[index];
      _.each(Object.keys(temp), function(val, index){
        if (returnobj[Object.keys(temp)[index]] === undefined) {
          returnobj[Object.keys(temp)[index]] = temp[Object.keys(temp)[index]];
        }
      });
    });
    return returnobj;
  };

  // Flattens a multidimensional array to a one-dimensional array that
  // contains all the elements of all the nested arrays.
  //
  // Hints: Use Array.isArray to check if something is an array
  //
  var flatten = function(nestedArray, result) {
    if (result === undefined) {
      result = [];
    };
    _.each(nestedArray, function(value, index) {
      if (!Array.isArray(nestedArray[index])) {
        result.push(value);
      } else {
        _.flatten(nestedArray[index], result);
      }
    });
    return result;
  };

  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  var sortBy = function(obj, iterator) {
    if (typeof(iterator) === "string") {
      var property = iterator;
      iterator = function(value) { return value[property] }; 
    };
    return obj.sort(function(a, b) {
      return iterator(a) - iterator(b);
    })
  };

  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d']]
  // refactor this as map inside map.
  var zip = function() {
    var resultArray = [];
    var argumentsArray = [];
    _.each(arguments, function(val){
      argumentsArray.push(val);
    });
    _.each(argumentsArray, function(value, j) {
      _.each(argumentsArray, function(value, i) {
        resultArray.push(argumentsArray[i][j]===undefined ? "" : argumentsArray[i][j]);
      });
    });
    return resultArray;
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  var intersection = function(array) {
    var argumentsArray = [];
    _.each(arguments, function(val){
      argumentsArray.push(val);
    });
    var comparisonArray = argumentsArray.shift();
    return _.map(argumentsArray, function(value){
      var allThere = true;
      _.each(comparisonArray, function(eachElement){
        allThere = allThere && _.contains(value, eachElement);
      });
      if (allThere) {
        return value;
      };
    });

  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  var difference = function(array) {
  };

  // Shuffle an array.
  var shuffle = function(obj) {
  };

  // EXTRA CREDIT:
  // Return an object that responds to chainable function calls for
  // map, pluck, select, etc
  //
  // See README for details
  var chain = function(obj) {
  };

  // EXTRA CREDIT:
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See README for details
  var throttle = function(func, wait) {
  };

  this._ = {
    each: each,
    contains: contains,
    map: map,
    pluck: pluck,
    last: last,
    first: first,
    reduce: reduce,
    select: select,
    reject: reject,
    every: every,
    any: any,
    uniq: uniq,
    once: once,
    memoize: memoize,
    delay: delay,
    extend: extend,
    defaults: defaults,
    flatten: flatten,
    sortBy: sortBy,
    zip: zip,
    intersection: intersection,
    difference: difference,
    shuffle: shuffle,
    chain: chain,
    throttle: throttle
  };


}).call(this);
