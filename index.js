/**
 * @version 1
 */
Object.defineProperty(
  Object.prototype,
  'iter',
  {
    value: function (callback) {
      var obj = this;
      return function() {
        for (var [key, val] of Object.entries(obj)) {
          callback(key, val);
        };
      }
    },
    writable: false,
  }
);

/**
 * @version 2
 */
Object.defineProperty(
  Object.prototype,
  'newIter',
  {
    value: function (callback) {
      var obj = this;
      return function () {
        for (var key in obj) {
          callback(key, obj[key]);
        }
      }
    },
    writable: false,
  }
);

/**
 * @version 3
 */
Object.defineProperty(
  Object.prototype,
  'iter',
  {
    value: function(callback, options = {}) {
      var obj = this;
      const maxDepth = options.depth !== undefined ? options.depth : 0;
      /** Traverse the object recursively is wanted to dive deep in nested props
       * with a specified depth option (default depth === 0)
       */
      function traverse(currentObj, currentDepth = 0, path = []) {
        for (var key in currentObj) {
          if (currentObj.hasOwnProperty(key)) {
            var value = currentObj[key];
            var currentPath = [...path, key];
            callback(key, value, currentPath, currentDepth);
            /**
             * If the value is an object and not null, and we haven't reached max depth
             * Note: maxDepth of 0 means only top level, 1 means one level deep, etc.
             */
            if (
              value !== null && 
              typeof value === 'object' && 
              currentDepth < maxDepth
            ) traverse(value, currentDepth + 1, currentPath);
          }
        }
      };
      return function() {
        traverse(obj);
      };
    },
    writable: false,
    configurable: true
  },
);

var obj = {
  undefined: {
    a: 1,
    b: { x: 10 },
  },
  'key2': {
    c: 3,
    d: 4
  },
};

//----------------- @version 3
obj.iter((key, value, path, depth) => {
  console.log(`Depth: ${depth}, Path: ${path.join('.')}, Key: ${key}, Value:`, value);
})();

// Outputs:
// Depth: 0, Path: undefined, Key: undefined, Value: {a: 1, b: { x: 10 }}
// Depth: 0, Path: key2, Key: key2, Value: {c: 3, d: 4}

obj.iter((key, value, path, depth) => {
  console.log(`Depth: ${depth}, Path: ${path.join('.')}, Key: ${key}, Value:`, value);
}, { depth: 1 })();

// Outputs:
// Depth: 0, Path: undefined, Key: undefined, Value: {a: 1, b: { x: 10 }}
// Depth: 1, Path: undefined.a, Key: a, Value: 1
// Depth: 1, Path: undefined.b, Key: b, Value: {x: 10}
// Depth: 0, Path: key2, Key: key2, Value: {c: 3, d: 4}
// Depth: 1, Path: key2.c, Key: c, Value: 3
// Depth: 1, Path: key2.d, Key: d, Value: 4
//----------------- @version 3

//----------------- @version 1/@version 2
obj.newIter( // or .iter() @version 1
  (...args) => console.log(args)
)();

// Outputs:
// [ 'undefined', { a: 1, b: 2 } ]
// [ 'key2', { c: 3, d: 4 } ]

//----------------- @version 1/@version 2
