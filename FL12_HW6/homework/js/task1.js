//asking user to input values for Quadratic equation
const a = parseFloat(prompt('please input value of A for Quadratic equation'));
const b = parseFloat(prompt('please input value of B for Quadratic equation'));
const c = parseFloat(prompt('please input value of C for Quadratic equation'));

//log error if any of entered values is not valid for Quadratic equation
let isInputValid;
if (isNaN(a) || isNaN(b) || isNaN(c) || a===0) {
  console.log('Invalid input data');
  isInputValid = false;
}else{
  isInputValid = true;
}

//resolve Quadratic equation if users input is valid and log result
if (isInputValid) {
  let d = b*b-4*a*c;
  if (d>0){
    console.log(`x1 = ${Math.round((-b+Math.sqrt(d))/(2*a))} and x2 = ${Math.round((-b-Math.sqrt(d))/(2*a))}`);
  }else if (d===0){
    console.log(`x = ${Math.round(-b/(2*a))}`);
  } else {
    console.log('no solution');
  }
}