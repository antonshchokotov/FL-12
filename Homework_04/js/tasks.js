// task 1
const maxElement = (array) => Math.max(...array);

console.log(`\ntask 1 test`);
const array = [1,2,3,4,5,6,7,23,45,456,12,345,657,678,234,5,678];
console.log(`maxElement(array) ${maxElement(array)}`);


// task 2
const copyArray = array => [...array];

console.log(`\ntask 2 test`);
const array2 = [1,2,3];
const copiedArray = copyArray(array2);
console.log(array2, copiedArray);
console.log(array2 === copiedArray);


// task 3
const addUniqueId = obj => ({id:Symbol(), ...obj});

console.log(`\ntask 3 test`);
const obj = {asd:'asd'};
const newObj = addUniqueId(obj);
console.log(obj);
console.log(newObj);


// task 4
const regroupObject = ({name: firstName, details: {id, age, university}}) => ({
  university, user: { age, firstName, id,}
});

console.log(`\ntask 4 test`);
const oldObj = {name: 'Someone', details: {id: 1, age: 11, university: 'UNI'}};
console.log(oldObj);
console.log(regroupObject(oldObj));


// task 5
const findUniqueElements = array => [...new Set(array)];

console.log(`\ntask 5 test`);
const array3 = [1,1,23,3,4,5,6,5,4,23,2,1,1,1,1,1];
console.log(array3);
console.log(findUniqueElements(array3));


// task 6
const hideNumber = str => str.slice(str.length - 4).padStart(str.length, '*');

console.log(`\ntask 6 test`);
const number = '0123456789';
console.log(number);
console.log(hideNumber(number));


// task 7
const required = () => {throw new Error('Missing property');};
const add = (a, b = required()) => a + b;

console.log(`\ntask 7 test`);
console.log(add(1, 2));


// task 8
function fetchRepos(username) {
  fetch(`https://api.github.com/users/${username}/repos`)
      .then(response => response.json())
      .then(data => {
        let names = [];
        for (let el of data) {
          names.push(el.name)
        }
        names.sort();
        console.log(`\ntask 8 test`);
        console.log(names);
      })
}

fetchRepos('antonshchokotov');


// task 9
async function fetchReposAsync(username) {
  const resp = await fetch(`https://api.github.com/users/${username}/repos`);
  const data = await resp.json();
  let names = [];
  for (let el of data) {
    names.push(el.name)
  }
  names.sort();
  console.log(`\ntask 9 test`);
  console.log(names);
}

fetchReposAsync('antonshchokotov');