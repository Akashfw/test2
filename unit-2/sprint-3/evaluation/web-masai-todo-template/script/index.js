// Write all the JS Code related to Home Page Here 
document.querySelector("form").addEventListener("submit",myfun);
let arr=JSON.parse(localStorage.getItem("tasks")) || [];
display(arr);
function myfun(event){
    event.preventDefault();
    document.querySelector("tbody").innerHTML="";
    let na=document.querySelector("#name").value;
    let ta=document.querySelector("#type").value;
    let da=document.querySelector("#date").value;
    let pri=document.querySelector("#priority").value;
    let obj={
        na,
        ta,
        da,
        pri
    }
   arr.push(obj);
   localStorage.setItem("tasks",JSON.stringify(arr));
   display(arr);
   
}
let com_arr= JSON.parse(localStorage.getItem("task-completed"))  || [];
function display(arr){
    
    arr.forEach(function(element,i){
        let row=document.createElement("tr");
        let td1=document.createElement("td");
        td1.innerText=element.na;
        let td2=document.createElement("td");
        td2.innerText=element.ta;
        let td3=document.createElement("td");
        td3.innerText=element.da;
        let td4=document.createElement("td");
        td4.innerText=element.pri;
        let td5=document.createElement("td");
        td5.innerText="completed"
        td5.addEventListener("click",function(){
           com_arr.push(element);
           localStorage.setItem("task-completed",JSON.stringify(com_arr));
           deletefav(element,i);
           
        });
        row.append(td1,td2,td3,td4,td5);
        document.querySelector("tbody").append(row);
    });
}

function deletefav(element,i){
    arr.splice(i,1);
    document.querySelector("tbody").innerHTML="";
    display(arr);
    localStorage.setItem("tasks",JSON.stringify(arr));
}

