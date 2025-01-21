/**
 * @todo
 * @error
 * for (var [key, val] of Object.entries(this)) {
 * TypeError: Cannot convert undefined or null to object
 */
Object.defineProperty(
  Object.prototype,
  'iter',
  {
    value: (callback) => () => {
      for (var [ key, val ] of Object.entries(this)) {
        callback(key, val);
      };
    },
    writable: false,
  }
);

Object.defineProperty(
  Object.prototype,
  'newIter',
  {
    value: (callback) => () => {
      for (var key in this) {
        if (this.hasOwnProperty(key)) {
          callback(key, this[key]);
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

/**
 * @todo
 * not logging the result
 */
const newIter = obj.iter(
  (...args) => console.log(args)
)();