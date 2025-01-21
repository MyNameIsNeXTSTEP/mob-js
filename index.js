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

var obj = {
  undefined: {
    a: 1,
    b: 2,
  },
  'key2': {
    c: 3,
    d: 4
  },
};

const iter = obj.iter(
  (...args) => console.log(args)
)();

// Outputs:
// [ 'undefined', { a: 1, b: 2 } ]
// [ 'key2', { c: 3, d: 4 } ]

const newIter = obj.newIter(
  (...args) => console.log(args)
)();

// Outputs:
// [ 'undefined', { a: 1, b: 2 } ]
// [ 'key2', { c: 3, d: 4 } ]