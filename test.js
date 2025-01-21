

var obj = {
  'key1': {
    a: 1,
    b: 2,
  },
  'key2': {
    c: 3,
    d: 4
  },
};

const iter = obj.iter((...args) => console.log(args));
iter();

// Outputs:
// [
//   "key1",
//   {
//     "a": 1,
//     "b": 2
//   }
// ]
// [
//   "key2",
//   {
//     "c": 3,
//     "d": 4
//   }
// ]