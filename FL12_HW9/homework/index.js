function convert(...args) {
  for (let i = args.length; --i >= 0;) {
    args[i] = typeof args[i] === 'string' ? Number(args[i]) : String(args[i]);
  }
  return args;
}

function executeforEach(array, callback) {
  for (let item of array) {
    callback(item);
  }
}

function mapArray(array, callback) {
  const result = [];
  executeforEach(array, item => result.push(callback(Number(item))));
  return result;
}

function filterArray(array, callback) {
  const result = [];
  executeforEach(array, item => callback(item) ? result.push(item) : 0);
  return result;
}

function flipOver(string) {
  let result = '';
  for (let i of string) {
    result = i + result;
  }
  return result;
}

function makeListFromRange([start, end], result = []) {
  result.push(start);
  return start < end ? makeListFromRange([++start, end], result) : result;
}

function getArrayOfKeys(array, key) {
  const result = [];
  executeforEach(array, item => result.push(item[key]));
  return result;
}

function substitute(array) {
  return mapArray(array, item => item < 30 ? '*' : item);
}

function getPastDay(date, number) {
  return new Date(date.getTime() - number * 24 * 60 * 60 * 1000).getDate();
}

function formatDate(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours() > 9 ? date.getHours() : '0' + date.getHours();
  const min = date.getMinutes() > 9 ? date.getMinutes() : '0'+date.getMinutes();
  return `${year}/${month}/${day} ${hour}:${min}`;
}

// tests
console.log('\ntask 1');
console.log(convert('1', 2, 3, '4')); // [1, '2', '3', 4]

console.log('\ntask 2');
executeforEach([1,2,3], el => console.log(el * 2)); // logs 2 4 6

console.log('\ntask 3');
console.log(mapArray([2, '5', 8], el => el + 3)); // returns [5, 8, 11]

console.log('\ntask 4');
console.log(filterArray([2, 5, 8], el => el % 2 === 0)); // returns [2, 8]

console.log('\ntask 5');
console.log(flipOver('hey world')); // 'dlrow yeh'

console.log('\ntask 6');
console.log(makeListFromRange([2, 7])); // [2, 3, 4, 5, 6, 7]

console.log('\ntask 7');
const actors = [
  { name: 'tommy', age: 36 },
  { name: 'lee', age: 28 }
];
console.log(getArrayOfKeys(actors, 'name')); // [‘tommy’, ‘lee’]

console.log('\ntask 8');
console.log(substitute([58, 14, 48, 2, 31, 29])); // [58, '*', 48, '*', 31, '*']

console.log('\ntask 9');
const date = new Date(2019, 0, 2);
console.log(getPastDay(date, 1)); // 1, (1 Jan 2019)
console.log(getPastDay(date, 2)); // 31, (31 Dec 2018)
console.log(getPastDay(date, 365)); // 2, (2 Jan 2018)

console.log('\ntask 10');
console.log(formatDate(new Date('6/15/2018 09:15:00'))); // "2018/6/15 09:15"
console.log(formatDate(new Date())); // "2020/1/7 12:56" // current local time