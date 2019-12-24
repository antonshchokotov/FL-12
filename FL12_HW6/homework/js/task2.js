//asking user to input integer values for triangle sides length
const a = parseInt(prompt('please input integer value of triangle side A length'));
const b = parseInt(prompt('please input integer value of triangle side B length'));
const c = parseInt(prompt('please input integer value of triangle side C length'));

//log error if any of entered values is not valid
let isInputValid;
if (!isFinite(a) || !isFinite(b) || !isFinite(c)) {
  console.log('input values should be ONLY numbers');
  isInputValid = false;
} else if (a <= 0 || b <= 0 || c <= 0) {
  console.log('A triangle must have 3 sides with a positive definite length');
  isInputValid = false;
} else {
  isInputValid = true;
}

//log error if triangle cannot be made up, else log triangle type
if (isInputValid) {
  if ( a >= b + c || b >= a + c || c >= a + b) {
    console.log("Triangle doesn't exist");
  } else if (a === b && a === c) {
    console.log('Equilateral triangle');
  } else if (a === b || a === c || b === c) {
    console.log('Isosceles triangle');
  } else {
    console.log('Scalene triangle');
  }
}