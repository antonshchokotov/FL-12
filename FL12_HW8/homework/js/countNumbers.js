const makeNumber = string => string.split('').map(i => parseInt(i)).filter(i => !isNaN(i)).join('');
const countNumbers = function countNumbers (string) {
  let result = {},
    i,
    array = makeNumber(string).split('').sort((a, b) => a - b);
  while ((i = array[0])) {
    let count = array.lastIndexOf(i) + 1;
    result[i] = count;
    array.splice(0, count);
  }
  return result;
}

countNumbers('erer384jj4444666888jfd123');
// => {'1': 1, '2': 1, '3': 2, '4': 5, '6': 3, '8': 4}
countNumbers('jdjjka000466588kkkfs662555');
// => {'0': 3, '2': 1, '4': 1, '5': 4, '6': 4, '8': 2}
countNumbers(''); // => {}