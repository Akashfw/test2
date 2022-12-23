const sum= (a,b)=>{
    return a+b;
}

const sub= (a,b)=>{
   return a-b;
}

const mult = (a,b)=>{
   return a*b;
}

const divide= (a,b)=>{
   return a/b;

}


const crypto= require("crypto")
const val=process.argv.slice(2);

let cmd=val[0];
let x=Number(val[1]);
let y=Number(val[2]);


if(cmd=="sum"){
    console.log(sum(x,y))
}else if(cmd=="sub"){
    console.log(sub(x,y)) 
}else if(cmd=="mult"){
    console.log(mult(x,y)) 
}else if(cmd=="divide"){
    console.log(divide(x,y)) 
}else if(cmd=="sin"){
    console.log(Math.sin(x,y)) 
}else if(cmd=="cos"){
    console.log(Math.cos(x,y)) 
}else if(cmd=="tan"){
    console.log(Math.tan(x,y)) 
}else if(cmd=="random"){
    console.log(crypto.randomInt(1,100)) 
}