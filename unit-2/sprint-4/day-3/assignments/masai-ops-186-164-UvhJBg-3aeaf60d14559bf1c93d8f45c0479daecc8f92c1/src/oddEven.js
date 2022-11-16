
function generateNumber() {
  // generate a random integer(hint : Math.random)
 let num=Math.floor( Math.random()*100)+1;
 document.querySelector("#number").innerText=num;
 checkOddEven(num);
}

function checkOddEven(num) {
  // logic for even / odd
  let param=num;
  if(param%2==0){
    document.querySelector("#odd-even").innerText="The number is even"
  }else{
    document.querySelector("#odd-even").innerText="The number is odd"
  }
}

window.onload = function () {
  // add event listeners to the button here
  document.querySelector("#generate-number").addEventListener("click",generateNumber);
};

// donot change the following export statement

if (typeof exports !== "undefined") {
  module.exports = {
    generateNumber,
    checkOddEven,
  };
}
