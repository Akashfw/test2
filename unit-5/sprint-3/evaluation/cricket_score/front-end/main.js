const socket= io("http://localhost:8080/",{transports:["websocket"]});
let val;

socket.on("scores",(msg)=>{
    
    val=msg;
})
console.log(val)
document.getElementById("btn").addEventListener("click",(event)=>{
    let tr1=document.createElement("tr");
   let td1= document.createElement("td");
   td1.innerHTML=val.run;
   let td2= document.createElement("td");
   td2.innerHTML=val.wicket;
   let td3= document.createElement("td");
   td3.innerHTML=val.over;
   tr1.append(td1,td2,td3);
   document.getElementById("runs").append(tr1)
});


// let tr2=document.createElement("tr");
//    let td4= document.createElement("td");
//    td4.innerHTML=val.batsman1;
//    let td5= document.createElement("td");
//    td5.innerHTML=val.run1;
//    let td6= document.createElement("td");
//    td6.innerHTML=val.over1;
//    let td7= document.createElement("td");
//    td7.innerHTML=val.four1;
//    let td8= document.createElement("td");
//    td8.innerHTML=val.six1;
//    tr2.append(td4,td5,td6,td7,td8);
//    document.getElementById("bat-table").append(tr2)



