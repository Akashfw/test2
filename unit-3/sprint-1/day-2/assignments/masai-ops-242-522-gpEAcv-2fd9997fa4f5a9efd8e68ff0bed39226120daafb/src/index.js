// the function is expected to return 3
function logicalOne() {
  let a = 0; // only change this line of code.
  let b = 2;
  let c = 3;
  let d = 4;

  return a || b && c || d;
}

// the function is expected to return 123
function getNumber() {
  let str = '123abc';
  return (parseInt(str)); // only change this line of code.
}

// the function is expected to return 6
function incrementNumber() {
  let num = 5;
  return ++num; // only change this line of code.
}

// the function is expected to return "123456"
function concatStrings() {
  let a = "123";
  let b = "456";
  return a+b; // only change this line of code.
}
export {logicalOne,getNumber,incrementNumber,concatStrings}