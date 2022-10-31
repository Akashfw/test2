
document.querySelector("form").addEventListener("submit",myfun)
let arr= JSON.parse(localStorage.getItem("todo")) || [];
displaytable(arr);
function myfun(event){
    event.preventDefault();
    document.querySelector("tbody").innerHTML="";
    let tas = document.querySelector("#task").value;
    let ass = document.querySelector("#priority").value;
   let  obj={
        tas,
        ass
    }
    arr.push(obj);
    localStorage.setItem("todo", JSON.stringify(arr));
    displaytable(arr);
}

let favarr= JSON.parse(localStorage.getItem("favtodo")) || [];

function displaytable(arr){
    arr.forEach(element => {
    let row=document.createElement("tr")
    let td1=document.createElement("td")
    td1.innerText=element.tas;
    let td2=document.createElement("td")
    td2.innerText=element.ass;
    if(element.ass=="High"){
        td2.style.backgroundColor= "red";
    }else{
        td2.style.backgroundColor= "green"; 
    }
    let td3=document.createElement("td")
    td3.innerText="Add as Fav";
    td3.addEventListener("click",function(){
       favarr.push(element);
       localStorage.setItem("favtodo", JSON.stringify(favarr));
    })
    row.append(td1,td2,td3);
    document.querySelector("tbody").append(row);
    });
    
}